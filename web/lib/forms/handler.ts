import { Sheets, sheetsConfig } from "./sheets";
import { InvalidSubmission, CONTACT_HEADERS, NEWSLETTER_HEADERS, validate } from "./submissions";
import { sendSubmissionEmail } from "./email";
import { randomUUID } from "node:crypto";
import { FormStateStore, UpstashFormStateStore, upstashConfig } from "./shared-kv";

type FormKind = "newsletter" | "contato";
type FormAdapters = {
  sheets: Pick<Sheets, "verifyHeaders" | "emails" | "append">;
  sendEmail: typeof sendSubmissionEmail;
  store: FormStateStore;
};

function serviceUnavailable(stage: string, message = "Não foi possível registrar os dados. Tente novamente mais tarde."): Response {
  const headers = process.env.NODE_ENV === "development" ? { "X-Form-Failure-Stage": stage } : undefined;
  return Response.json(
    { error: message },
    { status: 503, headers },
  );
}

export async function handleSubmission(request: Request, kind: FormKind, adapters?: FormAdapters): Promise<Response> {
  // Public collection stays disabled until privacy, abuse and suppression requirements are ready.
  if (process.env.FORMS_ENABLED !== "true") return serviceUnavailable("forms-disabled", "Formulário indisponível.");
  const origin = request.headers.get("origin");
  let allowed = Boolean(origin && origin === process.env.FORMS_ALLOWED_ORIGIN);
  if (!allowed && origin && process.env.NODE_ENV === "development" && process.env.FORMS_LOCAL_TEST === "true") {
    try {
      const incoming = new URL(origin);
      const configured = new URL(process.env.FORMS_ALLOWED_ORIGIN || "");
      const requested = new URL(request.url);
      const loopback = (host: string) => host === "localhost" || host === "127.0.0.1";
      allowed = incoming.origin === requested.origin && incoming.protocol === "http:" && configured.protocol === "http:" && incoming.port === configured.port && loopback(incoming.hostname) && loopback(configured.hostname);
    } catch { allowed = false; }
  }
  if (!allowed) return Response.json({ error: "Origem não permitida." }, { status: 403 });
  if (request.method !== "POST") return Response.json({ error: "Método não permitido." }, { status: 405 });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({ error: "Conteúdo inválido." }, { status: 415 });
  let failedAt = "request-processing";
  try {
    failedAt = "client-ip";
    const ip = process.env.NODE_ENV === "development"
      ? "development-local"
      : request.headers.get("x-real-ip")?.trim();
    if (!ip) throw new Error("Client IP unavailable");
    const store = adapters?.store ?? new UpstashFormStateStore(upstashConfig());
    failedAt = "shared-storage-rate-limit";
    if (await store.consumeRateLimit(ip, Date.now()) > 5) return Response.json({ error: "Limite de envios atingido. Tente novamente em 15 minutos." }, { status: 429 });
    const reader = request.body?.getReader();
    if (!reader) throw new InvalidSubmission();
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 16384) { await reader.cancel(); throw new InvalidSubmission(); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let input: unknown;
    try { input = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); } catch { throw new InvalidSubmission(); }
    const values = validate(kind, input);
    const sheets = adapters?.sheets ?? new Sheets(sheetsConfig());
    const requestKey = kind === "newsletter" ? `newsletter:${values[0]}` : `contact:${request.headers.get("idempotency-key") || ""}`;
    if (kind === "contato" && !/^contact:[A-Za-z0-9-]{16,100}$/.test(requestKey)) throw new InvalidSubmission();
    const claimToken = randomUUID();
    failedAt = "shared-storage-claim";
    const claim = await store.claim(requestKey, claimToken);
    if (claim === "suppressed") return Response.json({ error: "Este endereço não pode ser reinscrito." }, { status: 409 });
    if (claim === "existing") return Response.json({ error: "Esta solicitação já foi processada." }, { status: 409 });
    if (claim === "pending") return Response.json({ error: "Esta solicitação está sendo processada ou precisa de conferência antes de nova tentativa." }, { status: 409 });

    try {
      failedAt = "google-sheets-read";
      await sheets.verifyHeaders(kind === "newsletter" ? "Newsletter" : "Contato", kind === "newsletter" ? NEWSLETTER_HEADERS : CONTACT_HEADERS);
      if (kind === "newsletter" && (await sheets.emails()).includes(values[0])) {
        await store.complete(requestKey, claimToken, "active");
        return Response.json({ error: "Não foi possível concluir a inscrição." }, { status: 409 });
      }
    } catch (error) {
      await store.release(requestKey, claimToken);
      throw error;
    }
    try {
      failedAt = "google-sheets-write";
      await sheets.append(kind === "newsletter" ? "Newsletter" : "Contato", values);
    } catch {
      console.error("Form submission failed", { kind, stage: "google-sheets-write" });
      // The provider may have committed the row before a timeout. Keep the claim to prevent duplicates.
      return Response.json(
        { error: "Não foi possível confirmar o registro. Consulte a planilha antes de tentar novamente." },
        { status: 503, headers: process.env.NODE_ENV === "development" ? { "X-Form-Failure-Stage": "google-sheets-write" } : undefined },
      );
    }
    failedAt = "shared-storage-complete";
    if (!await store.complete(requestKey, claimToken, kind === "newsletter" ? "active" : "completed")) {
      return Response.json(
        { error: "O registro foi salvo, mas precisa de conferência antes de novo envio." },
        { status: 503, headers: process.env.NODE_ENV === "development" ? { "X-Form-Failure-Stage": failedAt } : undefined },
      );
    }
    try {
      let confirmationEmailSent: boolean | undefined;
      let emailSent = true;
      if (kind === "newsletter") {
        const result = await (adapters?.sendEmail ?? sendSubmissionEmail)({ kind, email: values[0] });
        emailSent = result?.emailSent ?? true;
      } else {
        const result = await (adapters?.sendEmail ?? sendSubmissionEmail)({ kind, nome: values[0], email: values[1], assunto: values[2], mensagem: values[3] });
        emailSent = result?.emailSent ?? true;
        confirmationEmailSent = result?.confirmationEmailSent ?? true;
        if (!confirmationEmailSent) console.error("Form contact confirmation email delivery failed", { kind });
      }
      return Response.json({ ok: true, emailSent, ...(kind === "contato" ? { confirmationEmailSent } : {}) });
    } catch {
      console.error("Form email delivery failed", { kind });
      return Response.json({ ok: true, emailSent: false, ...(kind === "contato" ? { confirmationEmailSent: false } : {}) });
    }
  } catch (error) {
    if (error instanceof InvalidSubmission) return Response.json({ error: "Confira os dados informados." }, { status: 400 });
    console.error("Form submission failed", { kind, stage: failedAt });
    return serviceUnavailable(failedAt);
  }
}

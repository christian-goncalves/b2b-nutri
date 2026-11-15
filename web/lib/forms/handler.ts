import { Sheets, sheetsConfig } from "./sheets";
import { InvalidSubmission, persist, validate } from "./submissions";
import { sendSubmissionEmail } from "./email";

export async function handleSubmission(request: Request, kind: "newsletter" | "contato"): Promise<Response> {
  // Public collection stays disabled until privacy, abuse and suppression requirements are ready.
  if (process.env.FORMS_ENABLED !== "true") return Response.json({ error: "Formulário indisponível." }, { status: 503 });
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
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return Response.json({ error: "Conteúdo inválido." }, { status: 415 });
  try {
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
    const sheets = new Sheets(sheetsConfig());
    const result = await persist(sheets, kind, values);
    if (result === "existing") return Response.json({ error: "Não foi possível concluir a inscrição." }, { status: 409 });
    try {
      if (kind === "newsletter") {
        await sendSubmissionEmail({ kind, email: values[0] });
      } else {
        await sendSubmissionEmail({ kind, nome: values[0], email: values[1], assunto: values[2], mensagem: values[3] });
      }
      return Response.json({ ok: true, emailSent: true });
    } catch {
      console.error("Form email delivery failed", { kind });
      return Response.json({ ok: true, emailSent: false });
    }
  } catch (error) {
    if (error instanceof InvalidSubmission) return Response.json({ error: "Confira os dados informados." }, { status: 400 });
    return Response.json({ error: "Não foi possível registrar os dados. Tente novamente mais tarde." }, { status: 503 });
  }
}

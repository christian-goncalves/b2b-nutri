import { UpstashFormStateStore, upstashConfig } from "@/lib/forms/shared-kv";
import { readUnsubscribeToken } from "@/lib/forms/unsubscribe";

export const runtime = "nodejs";

function response(html: string, status = 200) {
  return new Response(html, { status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  if (!readUnsubscribeToken(token)) return response("<!doctype html><html lang=\"pt-BR\"><meta charset=\"utf-8\"><title>Link inválido</title><p>Este link de descadastro é inválido ou expirou. Escreva para contato@b2bnutris.com.</p></html>", 400);
  return response(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Cancelar inscrição</title><main><h1>Cancelar inscrição</h1><p>Confirme para deixar de receber a newsletter B2B Nutris.</p><form method="post"><input type="hidden" name="token" value="${token}"><button type="submit">Cancelar inscrição</button></form></main></html>`);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const token = form.get("token");
    const email = typeof token === "string" ? readUnsubscribeToken(token) : null;
    if (!email) return response("<!doctype html><html lang=\"pt-BR\"><meta charset=\"utf-8\"><title>Link inválido</title><p>Este link de descadastro é inválido ou expirou.</p></html>", 400);
    const store = new UpstashFormStateStore(upstashConfig());
    await store.suppress(email);
    return response("<!doctype html><html lang=\"pt-BR\"><meta charset=\"utf-8\"><title>Inscrição cancelada</title><main><h1>Inscrição cancelada</h1><p>Este endereço foi removido da newsletter.</p></main></html>");
  } catch {
    return response("<!doctype html><html lang=\"pt-BR\"><meta charset=\"utf-8\"><title>Indisponível</title><p>Não foi possível concluir o descadastro. Tente novamente.</p></html>", 503);
  }
}

import { Sheets, sheetsConfig } from "@/lib/forms/sheets";
import { anonymizeResolvedContacts } from "@/lib/forms/retention";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }
  try {
    const anonymized = await anonymizeResolvedContacts(new Sheets(sheetsConfig()));
    return Response.json({ ok: true, anonymized });
  } catch {
    return Response.json({ error: "Não foi possível concluir a rotina de retenção." }, { status: 503 });
  }
}

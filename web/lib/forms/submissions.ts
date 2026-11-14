import { Sheets } from "./sheets";

export const NEWSLETTER_HEADERS = ["email", "consentimento", "data_hora", "origem", "status"];
export const CONTACT_HEADERS = ["nome", "email", "assunto", "mensagem", "data_hora"];

export class InvalidSubmission extends Error {}
function field(data: Record<string, unknown>, name: string, max: number): string {
  const value = data[name];
  if (typeof value !== "string" || !value.trim() || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) throw new InvalidSubmission();
  return value.trim();
}
function email(data: Record<string, unknown>): string {
  const value = field(data, "email", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new InvalidSubmission();
  return value;
}
export function validate(kind: "newsletter" | "contato", input: unknown): string[] {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new InvalidSubmission();
  const data = input as Record<string, unknown>;
  if (data.website !== undefined && data.website !== "") throw new InvalidSubmission();
  if (kind === "newsletter") {
    if (data.consentimento !== true) throw new InvalidSubmission();
    const origin = field(data, "origem", 100);
    return [email(data), "sim", new Date().toISOString(), origin, "ativo"];
  }
  return [field(data, "nome", 120), email(data), field(data, "assunto", 200), field(data, "mensagem", 5000), new Date().toISOString()];
}
export async function persist(sheets: Pick<Sheets, "verifyHeaders" | "emails" | "append">, kind: "newsletter" | "contato", values: string[]): Promise<"created" | "existing"> {
  const sheet = kind === "newsletter" ? "Newsletter" : "Contato";
  await sheets.verifyHeaders(sheet, kind === "newsletter" ? NEWSLETTER_HEADERS : CONTACT_HEADERS);
  if (kind === "newsletter" && (await sheets.emails()).includes(values[0])) return "existing";
  await sheets.append(sheet, values);
  return "created";
}

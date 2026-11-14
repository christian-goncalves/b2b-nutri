import { createSign } from "node:crypto";

export type SheetName = "Newsletter" | "Contato";
type Fetch = typeof fetch;

export interface SheetsConfig {
  spreadsheetId: string;
  clientEmail: string;
  privateKey: string;
}

export function sheetsConfig(): SheetsConfig {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!spreadsheetId || !clientEmail || !privateKey) throw new Error("Sheets configuration unavailable");
  return { spreadsheetId, clientEmail, privateKey };
}

export class Sheets {
  constructor(private config: SheetsConfig, private request: Fetch = fetch) {}

  private async token(): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
    const payload = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: this.config.clientEmail, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 })}`;
    const signer = createSign("RSA-SHA256");
    signer.update(payload);
    const assertion = `${payload}.${signer.sign(this.config.privateKey, "base64url")}`;
    const response = await this.request("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Google authentication failed");
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("access_token" in data) || typeof data.access_token !== "string" || !data.access_token) throw new Error("Invalid Google authentication response");
    return data.access_token;
  }

  private async call(range: string, init?: RequestInit): Promise<Response> {
    const token = await this.token();
    const base = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(this.config.spreadsheetId)}/values/${encodeURIComponent(range)}`;
    const response = await this.request(`${base}${init ? ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS" : ""}`, { ...init, headers: { Authorization: `Bearer ${token}`, ...(init ? { "Content-Type": "application/json" } : {}) }, cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Google Sheets request failed");
    return response;
  }

  async verifyHeaders(sheet: SheetName, expected: string[]): Promise<void> {
    const response = await this.call(`'${sheet}'!A1:${String.fromCharCode(64 + expected.length)}1`);
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("values" in data) || !Array.isArray(data.values) || !Array.isArray(data.values[0])) throw new Error("Google Sheets headers do not match");
    const row: unknown[] = data.values[0];
    if (row.length !== expected.length || expected.some((value, index) => row[index] !== value)) throw new Error("Google Sheets headers do not match");
  }

  async emails(): Promise<string[]> {
    const response = await this.call("'Newsletter'!A2:A");
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || ("values" in data && !Array.isArray(data.values))) throw new Error("Invalid Google Sheets response");
    return ("values" in data ? data.values as unknown[] : []).map(row => Array.isArray(row) && typeof row[0] === "string" ? row[0].trim().toLowerCase() : "").filter(Boolean);
  }

  async append(sheet: SheetName, values: string[]): Promise<void> {
    const response = await this.call(`'${sheet}'!A:${String.fromCharCode(64 + values.length)}`, { method: "POST", body: JSON.stringify({ majorDimension: "ROWS", values: [values] }) });
    const data: unknown = await response.json();
    if (!data || typeof data !== "object" || !("updates" in data) || !data.updates || typeof data.updates !== "object" || !("updatedRows" in data.updates) || data.updates.updatedRows !== 1) throw new Error("Google Sheets write not confirmed");
  }
}

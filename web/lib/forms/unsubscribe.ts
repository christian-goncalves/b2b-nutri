import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  const value = process.env.FORMS_UNSUBSCRIBE_SECRET;
  if (!value) throw new Error("Unsubscribe token secret unavailable");
  return value;
}

function signature(encodedEmail: string): Buffer {
  return createHmac("sha256", secret()).update(encodedEmail).digest();
}

export function createUnsubscribeToken(email: string): string {
  const encodedEmail = Buffer.from(email.trim().toLowerCase()).toString("base64url");
  return `${encodedEmail}.${signature(encodedEmail).toString("base64url")}`;
}

export function readUnsubscribeToken(token: string): string | null {
  const [encodedEmail, encodedSignature, extra] = token.split(".");
  if (!encodedEmail || !encodedSignature || extra !== undefined) return null;
  let given: Buffer;
  try { given = Buffer.from(encodedSignature, "base64url"); } catch { return null; }
  const expected = signature(encodedEmail);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  const email = Buffer.from(encodedEmail, "base64url").toString("utf8");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

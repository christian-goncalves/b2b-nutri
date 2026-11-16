import { createHash } from "node:crypto";

export interface FormStateStore {
  claim(key: string, token: string): Promise<"claimed" | "existing" | "pending" | "suppressed">;
  complete(key: string, token: string, state?: "active" | "completed"): Promise<boolean>;
  release(key: string, token: string): Promise<boolean>;
  suppress(email: string): Promise<void>;
  consumeRateLimit(ip: string, now: number): Promise<number>;
}

type Fetch = typeof fetch;
export interface UpstashConfig { url: string; token: string }

export function upstashConfig(): UpstashConfig {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Shared form storage configuration unavailable");
  return { url: url.replace(/\/+$/, ""), token };
}

const CLAIM = `local current = redis.call('GET', KEYS[1])
if not current then redis.call('SET', KEYS[1], 'pending:' .. ARGV[1]); return 'claimed' end
if current == 'suppressed' then return 'suppressed' end
if current == 'active' or current == 'completed' then return 'existing' end
return 'pending'`;
const COMPLETE = `if redis.call('GET', KEYS[1]) == 'pending:' .. ARGV[1] then redis.call('SET', KEYS[1], ARGV[2]); return 1 end
return 0`;
const RELEASE = `if redis.call('GET', KEYS[1]) == 'pending:' .. ARGV[1] then return redis.call('DEL', KEYS[1]) end
return 0`;
const SUPPRESS = `redis.call('SET', KEYS[1], 'suppressed'); return 1`;
const RATE_LIMIT = `local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return count`;

export class UpstashFormStateStore implements FormStateStore {
  constructor(private config: UpstashConfig, private request: Fetch = fetch, private clock: () => number = Date.now) {}

  private key(value: string): string {
    return `b2b-nutri:forms:${createHash("sha256").update(value).digest("hex")}`;
  }

  private async eval(script: string, keys: string[], args: string[]): Promise<unknown> {
    const command = ["EVAL", script, String(keys.length), ...keys, ...args];
    const response = await this.request(this.config.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.config.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(command),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Shared form storage request failed");
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("result" in payload)) throw new Error("Invalid shared form storage response");
    const data = payload as { result?: unknown; error?: unknown };
    if (data.error) throw new Error("Shared form storage command failed");
    return data.result;
  }

  async claim(key: string, token: string): Promise<"claimed" | "existing" | "pending" | "suppressed"> {
    const result = await this.eval(CLAIM, [this.key(key)], [token]);
    if (result === "claimed" || result === "existing" || result === "pending" || result === "suppressed") return result;
    throw new Error("Invalid shared form storage claim result");
  }

  async complete(key: string, token: string, state: "active" | "completed" = "completed"): Promise<boolean> {
    return await this.eval(COMPLETE, [this.key(key)], [token, state]) === 1;
  }

  async release(key: string, token: string): Promise<boolean> {
    return await this.eval(RELEASE, [this.key(key)], [token]) === 1;
  }

  async suppress(email: string): Promise<void> {
    await this.eval(SUPPRESS, [this.key(`newsletter:${email.trim().toLowerCase()}`)], []);
  }

  async consumeRateLimit(ip: string, now = this.clock()): Promise<number> {
    const bucket = Math.floor(now / 900_000);
    const result = await this.eval(RATE_LIMIT, [this.key(`rate:${ip}:${bucket}`)], ["900"]);
    if (typeof result !== "number") throw new Error("Invalid shared form rate limit response");
    return result;
  }
}

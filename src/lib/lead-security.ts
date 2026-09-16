import { createHmac } from "node:crypto";
type Entry = { value: string; expires: number };
const memory = new Map<string, Entry>();
const hasRedis = () =>
  Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
async function redis(command: (string | number)[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL!;
  if (new URL(url).protocol !== "https:")
    throw new Error("Security store unavailable");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error("Security store unavailable");
  const body = await res.json();
  if (body.error) throw new Error("Security store unavailable");
  return body.result;
}
function ensureStore() {
  if (
    process.env.NODE_ENV === "production" &&
    (!hasRedis() || !process.env.RATE_LIMIT_SECRET)
  )
    throw new Error("Security store not configured");
}
function prune() {
  const now = Date.now();
  for (const [key, v] of memory) if (v.expires <= now) memory.delete(key);
}
export async function rateLimit(ip: string) {
  ensureStore();
  const key = `rybacki:rate:${createHmac(
    "sha256",
    process.env.RATE_LIMIT_SECRET || "local-only",
  )
    .update(ip)
    .digest("hex")}`;
  if (hasRedis()) {
    const count = await redis([
      "EVAL",
      "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n",
      1,
      key,
      900,
    ]);
    return Number(count) <= 8;
  }
  prune();
  const previous = memory.get(key);
  const count = Number(previous?.value || 0) + 1;
  memory.set(key, {
    value: String(count),
    expires: previous?.expires || Date.now() + 900000,
  });
  return count <= 8;
}
export async function claimSubmission(
  id: string,
): Promise<"new" | "pending" | "done"> {
  ensureStore();
  const key = `rybacki:lead:${id}`;
  if (hasRedis()) {
    const result = await redis(["SET", key, "pending", "NX", "EX", 86400]);
    if (result === "OK") return "new";
    return (await redis(["GET", key])) === "done" ? "done" : "pending";
  }
  prune();
  const existing = memory.get(key);
  if (existing) return existing.value === "done" ? "done" : "pending";
  memory.set(key, { value: "pending", expires: Date.now() + 86400000 });
  return "new";
}
export async function finishSubmission(id: string) {
  const key = `rybacki:lead:${id}`;
  if (hasRedis()) await redis(["SET", key, "done", "EX", 86400]);
  else memory.set(key, { value: "done", expires: Date.now() + 86400000 });
}
export async function releaseSubmission(id: string) {
  const key = `rybacki:lead:${id}`;
  if (hasRedis()) await redis(["DEL", key]);
  else memory.delete(key);
}

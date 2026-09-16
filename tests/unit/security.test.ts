import { afterEach, it, expect, vi } from "vitest";
import {
  rateLimit,
  claimSubmission,
  finishSubmission,
  releaseSubmission,
} from "../../src/lib/lead-security";
afterEach(() => vi.unstubAllEnvs());
it("enforces a bounded rate window", async () => {
  vi.stubEnv("NODE_ENV", "test");
  const key = crypto.randomUUID();
  for (let i = 0; i < 8; i++) expect(await rateLimit(key)).toBe(true);
  expect(await rateLimit(key)).toBe(false);
});
it("atomically claims, finishes and releases submission IDs", async () => {
  vi.stubEnv("NODE_ENV", "test");
  const id = crypto.randomUUID();
  expect(await claimSubmission(id)).toBe("new");
  expect(await claimSubmission(id)).toBe("pending");
  await finishSubmission(id);
  expect(await claimSubmission(id)).toBe("done");
  await releaseSubmission(id);
  expect(await claimSubmission(id)).toBe("new");
});
it("requires durable protection and a secret in production", async () => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
  await expect(rateLimit("test")).rejects.toThrow(
    "Security store not configured",
  );
});

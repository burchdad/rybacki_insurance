import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";
import { coverageSchema, contactSchema } from "../../src/lib/validation";
import { getLeadAdapter } from "../../src/lib/lead-adapter";
import { validLead } from "../fixtures";
import { POST } from "../../src/app/api/leads/route";
vi.mock("../../src/lib/lead-security", () => ({
  rateLimit: vi.fn(async () => true),
  claimSubmission: vi.fn(async () => "new"),
  finishSubmission: vi.fn(async () => {}),
  releaseSubmission: vi.fn(async () => {}),
}));
import {
  rateLimit,
  claimSubmission,
  finishSubmission,
} from "../../src/lib/lead-security";
function request(body: unknown, origin = "http://localhost:3000") {
  return new NextRequest("http://localhost:3000/api/leads", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("NODE_ENV", "test");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
  vi.stubEnv("LEAD_ADAPTER", "development");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("validation", () => {
  it("accepts a minimal review without health data", () =>
    expect(coverageSchema.safeParse(validLead()).success).toBe(true));
  it("requires consent, valid email, phone and ZIP", () => {
    for (const change of [
      { consent: false },
      { email: "invalid" },
      { phone: "123" },
      { zip: "bad" },
    ])
      expect(
        coverageSchema.safeParse({ ...validLead(), ...change }).success,
      ).toBe(false);
  });
  it("requires all small business fields", () => {
    expect(
      coverageSchema.safeParse({ ...validLead(), need: "Small business" })
        .success,
    ).toBe(false);
    expect(
      coverageSchema.safeParse({
        ...validLead(),
        need: "Small business",
        businessName: "Example",
        employees: 5,
        groupCoverage: "Not currently offered",
      }).success,
    ).toBe(true);
  });
  it("requires phone only for contact callbacks", () => {
    const contact = {
      ...validLead(),
      kind: "contact",
      name: "Test",
      phone: "",
      preferredContact: "Email",
    };
    expect(contactSchema.safeParse(contact).success).toBe(true);
    expect(
      contactSchema.safeParse({ ...contact, preferredContact: "Phone" })
        .success,
    ).toBe(false);
  });
  it("strips unknown fields and neutralizes markup delimiters", () => {
    const parsed = coverageSchema.parse({
      ...validLead(),
      diagnosis: "not a permitted field",
      message: "<script>hello</script>",
    });
    expect(parsed).not.toHaveProperty("diagnosis");
    expect(parsed.message).not.toContain("<");
  });
  it("rejects impossible dates and oversized messages", () => {
    expect(
      coverageSchema.safeParse({ ...validLead(), startDate: "2026-02-31" })
        .success,
    ).toBe(false);
    expect(
      coverageSchema.safeParse({ ...validLead(), message: "a".repeat(1201) })
        .success,
    ).toBe(false);
  });
});
describe("server and delivery boundaries", () => {
  it("labels development simulation explicitly", async () => {
    const res = await POST(request(validLead()));
    expect(res.status).toBe(200);
    expect((await res.json()).status).toBe("development");
  });
  it("rejects cross-origin submissions", async () =>
    expect(
      (await POST(request(validLead(), "https://other.example"))).status,
    ).toBe(403));
  it("rejects bots and submissions that are too fast", async () => {
    expect(
      (await POST(request({ ...validLead(), website: "spam" }))).status,
    ).toBe(400);
    expect(
      (await POST(request({ ...validLead(), startedAt: Date.now() }))).status,
    ).toBe(400);
  });
  it("rejects invalid payloads on the server", async () =>
    expect(
      (await POST(request({ ...validLead(), consent: false }))).status,
    ).toBe(422));
  it("fails closed when no delivery provider is configured", async () => {
    vi.stubEnv("LEAD_ADAPTER", "");
    expect((await POST(request(validLead()))).status).toBe(503);
  });
  it("forbids development adapter in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(() => getLeadAdapter()).toThrow();
  });
  it("returns rate limits without delivering", async () => {
    vi.mocked(rateLimit).mockResolvedValueOnce(false);
    expect((await POST(request(validLead()))).status).toBe(429);
  });
  it("does not resend completed or concurrent duplicates", async () => {
    vi.mocked(claimSubmission).mockResolvedValueOnce("done");
    expect((await POST(request(validLead()))).status).toBe(200);
    expect(finishSubmission).not.toHaveBeenCalled();
    vi.mocked(claimSubmission).mockResolvedValueOnce("pending");
    expect((await POST(request(validLead()))).status).toBe(409);
  });
  it("delivers through the webhook with an idempotency key", async () => {
    vi.stubEnv("LEAD_ADAPTER", "webhook");
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://provider.example/leads");
    vi.stubEnv("LEAD_WEBHOOK_TOKEN", "test-token");
    const fetchMock = vi.fn(async () => new Response("{}", { status: 202 }));
    vi.stubGlobal("fetch", fetchMock);
    const lead = validLead();
    const res = await POST(request(lead));
    expect(res.status).toBe(200);
    expect((await res.json()).status).toBe("delivered");
    const init = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init[1].headers).toHaveProperty(
      "Idempotency-Key",
      lead.submissionId,
    );
    expect(finishSubmission).toHaveBeenCalledWith(lead.submissionId);
  });
  it("does not report success if the provider rejects the lead", async () => {
    vi.stubEnv("LEAD_ADAPTER", "webhook");
    vi.stubEnv("LEAD_WEBHOOK_URL", "https://provider.example/leads");
    vi.stubEnv("LEAD_WEBHOOK_TOKEN", "test-token");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
    expect((await POST(request(validLead()))).status).toBe(503);
  });
  it("rejects excessive request bodies", async () =>
    expect((await POST(request({ message: "a".repeat(17000) }))).status).toBe(
      413,
    ));
});

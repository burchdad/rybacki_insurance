import type { Lead } from "./validation";
export type DeliveryReceipt = {
  status: "delivered" | "development";
  reference: string;
};
export interface LeadAdapter {
  deliver(lead: Lead): Promise<DeliveryReceipt>;
}
class WebhookAdapter implements LeadAdapter {
  async deliver(lead: Lead): Promise<DeliveryReceipt> {
    const url = process.env.LEAD_WEBHOOK_URL;
    const token = process.env.LEAD_WEBHOOK_TOKEN;
    if (!url || !token || new URL(url).protocol !== "https:")
      throw new Error("Provider unavailable");
    const response = await fetch(url, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Idempotency-Key": lead.submissionId,
      },
      body: JSON.stringify({
        schemaVersion: 1,
        lead,
        consentVersion: "2026-09-16",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Provider unavailable");
    return { status: "delivered", reference: lead.submissionId };
  }
}
class DevelopmentAdapter implements LeadAdapter {
  async deliver(lead: Lead): Promise<DeliveryReceipt> {
    // Explicit simulation only. No personal data written to disk or logs.
    if (process.env.NODE_ENV === "production")
      throw new Error("Development adapter forbidden");
    return { status: "development", reference: lead.submissionId };
  }
}
export function getLeadAdapter(): LeadAdapter {
  if (process.env.LEAD_ADAPTER === "webhook") return new WebhookAdapter();
  if (
    process.env.LEAD_ADAPTER === "development" &&
    process.env.NODE_ENV !== "production"
  )
    return new DevelopmentAdapter();
  throw new Error("Lead delivery is not configured");
}

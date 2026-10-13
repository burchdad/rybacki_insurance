import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { site } from "@/content/site";
import { getLeadAdapter } from "@/lib/lead-adapter";
import {
  claimSubmission,
  finishSubmission,
  rateLimit,
  releaseSubmission,
} from "@/lib/lead-security";
export const runtime = "nodejs";
const reply = (body: object, status = 200) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const expected = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : request.nextUrl.origin;
  if (
    !origin ||
    (origin !== expected &&
      !(
        process.env.NODE_ENV !== "production" &&
        [
          request.nextUrl.origin,
          "http://localhost:3000",
          "http://127.0.0.1:3000",
        ].includes(origin)
      ))
  )
    return reply({ error: "Please submit from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply({ error: "Unsupported request format." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return reply({ error: "The message is too large." }, 413);
  let id: string | undefined;
  let claimed = false;
  let delivered = false;
  try {
    // Bound the actual stream; content-length is not trusted.
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "An inquiry is required." }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 16000) {
        await reader.cancel();
        return reply({ error: "The message is too large." }, 413);
      }
      chunks.push(value);
    }
    let input: unknown;
    try {
      input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return reply({ error: "Please check the form and try again." }, 400);
    }
    const parsed = leadSchema.safeParse(input);
    if (!parsed.success)
      return reply(
        {
          error: "Please check the highlighted fields.",
          fields: parsed.error.flatten().fieldErrors,
        },
        422,
      );
    const lead = parsed.data;
    if (
      lead.website ||
      Date.now() - lead.startedAt < 1500 ||
      lead.startedAt > Date.now()
    )
      return reply(
        {
          error:
            "We could not verify this request. Please try again or call us.",
        },
        400,
      );
    // Vercel supplies this trusted header. Unknown hosts share a conservative bucket.
    const ip = process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() ||
        "unknown"
      : "local-or-untrusted";
    if (!(await rateLimit(ip)))
      return reply(
        { error: "Too many attempts. Please wait 15 minutes or call us." },
        429,
      );
    const adapter = getLeadAdapter();
    id = lead.submissionId;
    const state = await claimSubmission(id);
    if (state === "done")
      return reply({
        ok: true,
        status:
          process.env.LEAD_ADAPTER === "development"
            ? "development"
            : "delivered",
        duplicate: true,
      });
    if (state === "pending")
      return reply(
        {
          error:
            "This inquiry is already being processed. Please wait before retrying.",
        },
        409,
      );
    claimed = true;
    const receipt = await adapter.deliver(lead);
    delivered = true;
    await finishSubmission(id);
    return reply({ ok: true, status: receipt.status });
  } catch {
    // Never log request bodies, form values, provider errors, tokens or personal data.
    if (id && claimed && !delivered) {
      try {
        await releaseSubmission(id);
      } catch {}
    }
    if (delivered) return reply({ ok: true, status: "delivered" });
    return reply(
      {
        error: `Your inquiry could not be confirmed. Your entries are still here. Please retry or call ${site.phone}.`,
      },
      503,
    );
  }
}

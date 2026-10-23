import { site } from "../../src/content/site";
import { faqs } from "../../src/content/faqs";
import { services } from "../../src/content/services";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  useRouter: () => ({ push: vi.fn() }),
}));
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ReviewCTA } from "../../src/components/ui";
import CoverageReview from "../../src/app/coverage-review/page";
import ContentPage from "../../src/app/[slug]/page";

describe("October client review copy", () => {
  it("keeps Start My Quote routed to intake, not scheduling", () => {
    const html = renderToStaticMarkup(createElement(ReviewCTA));
    expect(html).toContain("Start My Quote");
    expect(html).toContain('href="/coverage-review"');
    expect(html).not.toContain("calendly.com");
  });
  it("explains questionnaire and consultation without instant pricing", () => {
    const html = renderToStaticMarkup(createElement(CoverageReview));
    expect(html).toContain("not an instant price");
    expect(html).toContain("questionnaire");
    expect(html).toContain("consultation");
    expect(html).toContain('src="https://form.jotform.com/261974651459066"');
  });
  it("removes unapproved video placeholder without inventing reviews", async () => {
    const html = renderToStaticMarkup(
      await ContentPage({ params: Promise.resolve({ slug: "reviews" }) }),
    );
    expect(html).not.toContain("video testimonials");
    expect(html).not.toContain("MORE CLIENT STORIES");
    expect(html.match(/<blockquote>/g)).toHaveLength(1);
    expect(html).toContain("Kristy Daniels-Beckham");
  });
  it("uses first person and only attested Navy and Tyler facts", async () => {
    const html = renderToStaticMarkup(
      await ContentPage({
        params: Promise.resolve({ slug: "about-steven-rybacki" }),
      }),
    );
    expect(html).toContain("I served in the Navy");
    expect(html).toContain("downtown Tyler, Texas");
    expect(html).toContain("I start by listening");
    expect(html).not.toContain("Steven Rybacki leads");
  });
  it("uses owner-approved multiple-state wording without an unverified list", async () => {
    const html = renderToStaticMarkup(
      await ContentPage({
        params: Promise.resolve({ slug: "licensed-states" }),
      }),
    );
    expect(html).toContain("Licensed in multiple states");
    expect(html).not.toMatch(/23 states|33 states|Alabama|Wyoming/);
    expect(faqs[12].answer).toContain("Licensed in multiple states");
  });
  it("preserves confirmed contact details and referral-only service boundaries", () => {
    expect(site.email).toBe("Steven@RybackiInsuranceAgency.com");
    expect(site.phoneHref).toBe("tel:+19039417282");
    expect(site.hours).toEqual([
      "Monday–Friday: 8:00 AM–10:00 PM",
      "Saturday: 9:00 AM–1:00 PM",
    ]);
    expect(site.marketplaceReferral).toContain("Matt Jubie and Gary Morazzano");
    expect(site.marketplaceReferral).toContain(
      "rather than directly issued or serviced",
    );
    expect(site.medicareReferral).toContain("not Medicare-licensed");
    expect(site.medicareReferral).toContain("With your permission");
    expect(
      services.find((s) => s.slug === "small-business-health-insurance")
        ?.options[2].body,
    ).toContain(
      "preliminary coverage proposals within our available product offerings",
    );
  });
  it("links existing clients to official portal and member services, referrals to direct contact", async () => {
    const html = renderToStaticMarkup(
      await ContentPage({ params: Promise.resolve({ slug: "contact" }) }),
    );
    expect(html).toContain('href="https://myushg.ushealthgroup.com/"');
    expect(html).toContain(
      'href="https://www.ushealthgroup.com/member-services"',
    );
    expect(html).toContain("claim determinations");
    expect(html).toContain('id="referral-help"');
    expect(html).toContain("Medicare inquiries can be referred");
  });
  it("labels the owner-supplied Google URL as a review action and preserves the original excerpt", async () => {
    const html = renderToStaticMarkup(
      await ContentPage({ params: Promise.resolve({ slug: "reviews" }) }),
    );
    expect(html).toContain('href="https://g.page/r/CUm5ik5bKFWHEBM/review"');
    expect(html).toContain("Leave a review on Google");
    expect(html.match(/<blockquote>/g)).toHaveLength(1);
  });
});

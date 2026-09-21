import { Breadcrumbs, PageIntro } from "@/components/ui";
import { site } from "@/content/site";
import { metadata as makeMetadata } from "@/lib/seo";
export const metadata = makeMetadata(
  "Start Your Coverage Review",
  "Complete Steven Rybacki’s health insurance questionnaire, one question at a time, to prepare for your consultation.",
  "/coverage-review",
);
export default function CoverageReview() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Coverage review" }]} />
      <div className="intake-wrap">
        <PageIntro
          eyebrow="RYBACKI INSURANCE AGENCY"
          title="Let's Find Your Options"
          description="No pressure. Just real options."
        />
        <iframe
          className="intake-frame"
          src={site.intakeUrl}
          title="Rybacki Insurance health insurance questionnaire"
          allow="fullscreen"
        />
        <p className="intake-fallback">
          Having trouble viewing the questions?{" "}
          <a href={site.intakeUrl} target="_blank" rel="noopener noreferrer">
            Open the questionnaire in a new tab
          </a>
          .
        </p>
      </div>
    </div>
  );
}

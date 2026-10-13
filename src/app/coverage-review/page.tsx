import { Breadcrumbs, PageIntro } from "@/components/ui";
import { site } from "@/content/site";
import { metadata as makeMetadata } from "@/lib/seo";
export const metadata = makeMetadata(
  "Start Your Coverage Review",
  "Complete our existing health insurance questionnaire to prepare for your coverage review.",
  "/coverage-review",
);
export default function CoverageReview() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Coverage review" }]} />
      <div className="intake-wrap">
        <PageIntro
          eyebrow="RYBACKI INSURANCE AGENCY"
          title="Start My Coverage Review"
          description="No pressure. Just real options."
        />
        <p className="intake-notice">
          Complete our existing questionnaire below, then use the thank-you page
          to book your coverage review. The intake includes relevant health
          questions. Completing it does not enroll you in insurance or establish
          coverage.
        </p>
        <p className="intake-notice">{site.appointments}</p>
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

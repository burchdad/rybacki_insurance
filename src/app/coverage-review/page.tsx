import { CoverageReviewForm } from "@/components/lead-forms";
import { Breadcrumbs, PageIntro } from "@/components/ui";
import { metadata as makeMetadata } from "@/lib/seo";
export const metadata = makeMetadata(
  "Start Your Coverage Review",
  "Share a few basic details to start a no-obligation health coverage conversation with Steven Rybacki. No medical history required.",
  "/coverage-review",
);
export default async function CoverageReview({
  searchParams,
}: {
  searchParams: Promise<{ need?: string }>;
}) {
  const { need } = await searchParams;
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "Coverage review" }]} />
      <div className="form-wrap">
        <PageIntro
          eyebrow="A CLEARER PATH STARTS HERE"
          title="Let’s find your next step."
          description="About two minutes. A few basic details. A real person on the other end."
        />
        <CoverageReviewForm initialNeed={need} />
      </div>
    </div>
  );
}

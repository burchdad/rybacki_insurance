import Link from "next/link";
import { articles } from "@/content/articles";
import {
  ArticleCard,
  Breadcrumbs,
  PageIntro,
  CTASection,
} from "@/components/ui";
import { metadata as makeMetadata } from "@/lib/seo";
export const metadata = makeMetadata(
  "Health Coverage Resources",
  "Useful guides to comparing plans, checking networks and navigating life changes. Plain-language health coverage information for Texans.",
  "/resources",
);
export default async function Resources({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = [...new Set(articles.map((a) => a.category))];
  const selected = categories.includes(category || "") ? category : undefined;
  return (
    <>
      <div className="container" style={{ paddingBottom: 80 }}>
        <Breadcrumbs items={[{ label: "Resources" }]} />
        <PageIntro
          eyebrow="A LITTLE KNOWLEDGE. A LOT MORE CLARITY."
          title="Make sense of your options."
          description="Practical guides for the questions that come up before you choose a health plan."
        />
        <nav className="resource-filter" aria-label="Resource categories">
          <Link href="/resources" aria-current={!selected ? "page" : undefined}>
            All guides
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/resources?category=${encodeURIComponent(c)}`}
              aria-current={selected === c ? "page" : undefined}
            >
              {c}
            </Link>
          ))}
        </nav>
        <div className="article-grid">
          {articles
            .filter((a) => !selected || a.category === selected)
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
      </div>
      <CTASection />
    </>
  );
}

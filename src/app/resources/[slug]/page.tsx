import { notFound } from "next/navigation";
import { articles } from "@/content/articles";
import { site } from "@/content/site";
import {
  ArticleCard,
  Breadcrumbs,
  PageIntro,
  JsonLd,
  Disclaimer,
  ReviewCTA,
} from "@/components/ui";
import { metadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) return {};
  const base = metadata(a.title, a.description, `/resources/${slug}`);
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: a.published,
      modifiedTime: a.updated,
      authors: [`${site.name} editorial team`],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <div className="container">
      <Breadcrumbs
        items={[
          { label: "Resources", href: "/resources" },
          { label: article.title },
        ]}
      />
      <article>
        <PageIntro
          eyebrow={article.category}
          title={article.title}
          description={article.description}
        />
        <div className="article-meta">
          <span>By {site.name} editorial team</span>
          <span>
            Published{" "}
            <time dateTime={article.published}>{article.published}</time>
          </span>
          <span>
            Updated <time dateTime={article.updated}>{article.updated}</time>
          </span>
        </div>
        <div className="prose">
          <aside className="draft-notice">
            Editorial starter guide · Agency review required before publication.
            General insurance information, not individual advice.
          </aside>
          <nav className="toc" aria-label="On this page">
            <h2>In this guide</h2>
            <ol>
              {article.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#section-${i + 1}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          {article.sections.map((s, i) => (
            <section key={s.title} id={`section-${i + 1}`}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <h2>Keep learning from official sources</h2>
          <ul className="source-list">
            {article.sources.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
          <Disclaimer />
          <div className="empty-state">
            <h2>Apply this to your own situation.</h2>
            <p>
              Bring your questions to a personal coverage conversation with
              Steve.
            </p>
            <div style={{ marginTop: 20 }} data-resource-cta>
              <ReviewCTA />
            </div>
          </div>
        </div>
      </article>
      <section style={{ paddingBottom: 80 }}>
        <h2>Keep the clarity going.</h2>
        <div className="article-grid">
          {articles
            .filter((a) => a.slug !== slug)
            .slice(0, 3)
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.published,
          dateModified: article.updated,
          author: {
            "@type": "Organization",
            name: `${site.name} editorial team`,
          },
          publisher: { "@id": `${site.url}/#agency` },
          mainEntityOfPage: `${site.url}/resources/${slug}`,
        }}
      />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, MapPin, Check, Plus } from "lucide-react";
import { site, testimonials, reviewDisclaimer } from "@/content/site";
import { services } from "@/content/services";
import { faqs, type FAQ } from "@/content/faqs";
import type { Article } from "@/content/articles";
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
export function ReviewCTA({
  label = "Start My Quote",
  href = "/coverage-review",
}: {
  label?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="button" data-event="primary_cta_click">
      {label}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function CalendlyCTA() {
  return (
    <a
      href={site.calendly}
      target="_blank"
      rel="noopener noreferrer"
      className="button button-outline"
    >
      Book My Coverage Review <ArrowUpRight size={17} />
      <span className="sr-only"> (opens Calendly in a new tab)</span>
    </a>
  );
}
export function PhoneCTA() {
  return (
    <a className="phone-link" href={site.phoneHref}>
      <Phone size={17} /> {site.phone}
    </a>
  );
}
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {all.map((item, i) => (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
              {i < all.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${site.url}${item.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{description}</p>
    </div>
  );
}
export function AdvisorPortrait({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`advisor-portrait ${compact ? "compact" : ""}`}>
      <div className="advisor-image">
        <Image
          src={site.images.steven}
          alt="Steven Rybacki, pictured on the agency’s current website"
          fill
          sizes="(max-width:600px) 85vw, (max-width:1400px) 45vw, 640px"
        />
      </div>
      <figcaption>
        Steven Rybacki <span>Your Tyler-based insurance advisor</span>
      </figcaption>
    </figure>
  );
}
export function AudienceSelector() {
  const descriptions = [
    "For you and the people who matter most.",
    "For a working life you’ve made your own.",
    "For the coverage decisions that come with running a business.",
    "For a new job, a new chapter, or what comes next.",
  ];
  const cards = [
    ...services.slice(0, 4).map((s, i) => ({
      title: s.short,
      href: `/${s.slug}`,
      text: descriptions[i],
    })),
    {
      title: "Existing Client Help",
      href: "/contact#existing-client-help",
      text: "Contact us about cards, billing or your existing policy.",
    },
    {
      title: "Just have a question?",
      href: "/contact",
      text: "A friendly conversation is a good place to start.",
    },
  ];
  return (
    <section className="coverage-paths" id="coverage">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WHEREVER LIFE TAKES YOU</p>
            <h2>Coverage Built Around YOUR Life.</h2>
          </div>
          <p>
            Whether you&apos;re self-employed, raising a family, or growing a
            business, we&apos;ll help you compare the options that fit your
            needs and your budget.
          </p>
        </div>
        <div className="open-coverage-grid">
          {cards.slice(0, 4).map((c, i) => {
            return (
              <Link className="open-coverage-path" key={c.title} href={c.href}>
                <span className="path-number">0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="card-action">
                  Explore this path
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="other-paths">
          {cards.slice(4).map((c) => (
            <Link key={c.title} href={c.href}>
              {c.title}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Steps() {
  return (
    <section className="section soft process-section">
      <div className="container">
        <div className="center section-title">
          <p className="eyebrow">LESS GUESSWORK. MORE CLARITY.</p>
          <h2>Let’s take it one step at a time.</h2>
        </div>
        <div className="steps">
          {[
            {
              title: "Tell us what you need.",
              text: "Complete the questionnaire, one question at a time, to prepare for your consultation.",
            },
            {
              title: "Book your coverage review.",
              text: "After submitting the questionnaire, use the scheduling link on the thank-you page to choose a time.",
            },
            {
              title: "Review coverage and referral options.",
              text: "We will discuss available private products, networks, benefits and costs. Marketplace policies are handled through licensed referral partners.",
            },
          ].map((s, i) => (
            <div key={s.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <p className="fine center">
          Completing the intake starts a conversation. It does not enroll you in
          insurance or establish coverage.
        </p>
        <p className="center">
          <Link className="text-link" href="/contact#referral-help">
            Ask about Marketplace or Medicare referral help
          </Link>
        </p>
      </div>
    </section>
  );
}
export function FAQAccordion({
  items = faqs.slice(0, 6),
  schema = false,
}: {
  items?: FAQ[];
  schema?: boolean;
}) {
  return (
    <>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
      )}
      <div className="faq-list">
        {items.map((f) => (
          <details key={f.question}>
            <summary>
              {f.question}
              <Plus size={19} />
            </summary>
            <div>
              <p>{f.answer}</p>
              {f.source && (
                <a className="text-link" href={f.source}>
                  Read the official HealthCare.gov guidance{" "}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
export function Testimonials() {
  return (
    <div className="review-block">
      {testimonials.map((t) => (
        <figure key={t.author}>
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote>{t.quote}</blockquote>
          <figcaption>
            <span className="review-avatar" aria-hidden="true">
              KD
            </span>
            <div>
              <strong>{t.author}</strong>
              <a href={t.href}>{t.source}</a>
            </div>
          </figcaption>
        </figure>
      ))}
      <p className="fine">{reviewDisclaimer}</p>
    </div>
  );
}
export function CTASection() {
  return (
    <section className="cta-section">
      <Image
        src={site.images.ocean}
        alt=""
        fill
        sizes="100vw"
        className="cta-ocean-image"
      />
      <div className="container cta-inner">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</p>
        <h2>
          Let’s find the coverage path
          <br />
          that fits your life.
        </h2>
        <p>No pressure. Just real options.</p>
        <div className="actions">
          <ReviewCTA />
          <PhoneCTA />
        </div>
      </div>
    </section>
  );
}
export function Disclaimer() {
  return (
    <aside className="disclaimer">
      <p>{site.disclaimer}</p>
    </aside>
  );
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/resources/${article.slug}`} className="article-card">
      <span className="eyebrow">{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <span className="card-action">
        Read the guide <ArrowUpRight size={18} />
      </span>
    </Link>
  );
}
export function LocalInformation() {
  return (
    <div className="local-info">
      <p>
        <MapPin size={19} />
        <span>{site.address}</span>
      </p>
      <PhoneCTA />
      <a href={`mailto:${site.email}`}>{site.email}</a>
      <div>
        <p>{site.appointments}</p>
        <strong>Office hours · {site.timezone}</strong>
        {site.hours.map((h) => (
          <p key={h}>{h}</p>
        ))}
      </div>
      <a
        className="text-link"
        href={site.map}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get directions in Google Maps <ArrowUpRight size={16} />
      </a>
      {site.socials.map((s) => (
        <a key={s.href} href={s.href}>
          {s.label}
        </a>
      ))}
    </div>
  );
}
export function TrustIndicators() {
  return (
    <div className="trust-indicators">
      {[
        "Tyler-based, personal service",
        "Private coverage and Marketplace referrals",
        "No-obligation conversation",
      ].map((t) => (
        <span key={t}>
          <Check size={16} />
          {t}
        </span>
      ))}
    </div>
  );
}

import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  MapPin,
  Check,
  Plus,
  Users,
  BriefcaseBusiness,
  Building2,
  ArrowRightLeft,
  HeartHandshake,
  MessageCircle,
  ImageIcon,
} from "lucide-react";
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
  label = "Start My Coverage Review",
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
      Schedule a Consultation <ArrowUpRight size={17} />
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
export function PhotoPlaceholder({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`portrait-placeholder ${compact ? "compact" : ""}`}
      role="img"
      aria-label="Placeholder for an approved portrait of Steven Rybacki"
    >
      <div className="portrait-top">
        <span>YOUR LOCAL ADVISOR</span>
        <MapPin size={19} />
      </div>
      <div className="portrait-center">
        <span className="portrait-monogram">
          SR<span>.</span>
        </span>
        <div className="photo-label">
          <ImageIcon size={15} /> Steven’s approved portrait goes here
        </div>
      </div>
      <div className="portrait-caption">
        <div>
          <strong>Steven Rybacki</strong>
          <span>Real conversations. Personal guidance.</span>
        </div>
        <span className="portrait-location">TYLER, TX</span>
      </div>
    </div>
  );
}
export function AudienceSelector() {
  const icons = [
    Users,
    BriefcaseBusiness,
    Building2,
    ArrowRightLeft,
    HeartHandshake,
    MessageCircle,
  ];
  const cards = [
    ...services.slice(0, 4).map((s) => ({
      title: s.short,
      href: `/${s.slug}`,
      text: s.description.split(".")[0] + ".",
    })),
    {
      title: "Medicare referral",
      href: "/coverage-review?need=Medicare%20referral",
      text: "Connect with an appropriately licensed Medicare specialist.",
    },
    {
      title: "Just have a question?",
      href: "/contact",
      text: "A friendly conversation is a good place to start.",
    },
  ];
  return (
    <section className="section container" id="coverage">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A GOOD PLACE TO START</p>
          <h2>
            What type of coverage
            <br className="desktop-break" /> are you looking for?
          </h2>
        </div>
        <p>
          Your life isn’t one-size-fits-all.
          <br />
          Your coverage conversation shouldn’t be either.
        </p>
      </div>
      <div className="audience-grid">
        {cards.map((c, i) => {
          const Icon = icons[i];
          return (
            <Link className="audience-card" key={c.title} href={c.href}>
              <Icon size={27} strokeWidth={1.5} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="card-action">
                {i === 5 ? "Ask Steve" : "Explore your options"}
                <ArrowUpRight size={18} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export function Steps() {
  return (
    <section className="section soft">
      <div className="container">
        <div className="center section-title">
          <p className="eyebrow">LESS GUESSWORK. MORE CLARITY.</p>
          <h2>A conversation, not a complicated process.</h2>
        </div>
        <div className="steps">
          {[
            {
              title: "Tell Steve what you need.",
              text: "Share a few basic details about your situation. No medical history. No obligation.",
            },
            {
              title: "Compare available options.",
              text: "Talk through networks, benefits and costs with someone who takes time to explain.",
            },
            {
              title: "Choose coverage confidently.",
              text: "Understand the next steps and decide what works for you, at your own pace.",
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
          Submitting the initial form starts a conversation. It does not enroll
          you in a plan.
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
          <CalendlyCTA />
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
        "Private & Marketplace options",
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

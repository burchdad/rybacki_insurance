import Link from "next/link";
import { MapPin, ArrowUpRight, Check } from "lucide-react";
import {
  ReviewCTA,
  CalendlyCTA,
  PhotoPlaceholder,
  TrustIndicators,
  AudienceSelector,
  Steps,
  Testimonials,
  FAQAccordion,
  CTASection,
  PhoneCTA,
} from "@/components/ui";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { metadata as makeMetadata } from "@/lib/seo";
export const metadata = makeMetadata(
  "Health Insurance Options for Texas Families & Businesses",
  "Compare private and Marketplace coverage with Steven Rybacki, a local Tyler advisor for families, self-employed professionals and small businesses.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow location">
              <MapPin size={15} /> ROOTED IN TYLER. HERE FOR YOU.
            </p>
            <h1>
              Health insurance.
              <br />
              <em>
                With a human
                <br className="desktop-break" /> touch.
              </em>
            </h1>
            <p className="hero-audience">
              For Texas families, self-employed professionals
              <br className="desktop-break" /> and small businesses.
            </p>
            <p className="hero-description">
              Compare private and Marketplace coverage with a local advisor who
              explains the details clearly and helps you choose around your
              doctors, budget and family.
            </p>
            <div className="actions">
              <ReviewCTA />
              <a
                className="underlined-link"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule a Consultation
                <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="fine hero-microcopy">
              Takes about two minutes. No obligation.
              <br />
              Steve will review your information and follow up personally.
            </p>
            <div className="hero-phone">
              <span>Prefer a conversation?</span>
              <PhoneCTA />
            </div>
          </div>
          <div className="hero-visual">
            <PhotoPlaceholder />
            <div className="personal-note">
              <span className="note-rule" />
              <p>
                “No pressure.
                <br />
                <em>Just real options.</em>”
              </p>
              <span>— Steve Rybacki</span>
            </div>
          </div>
        </div>
        <div className="container">
          <TrustIndicators />
        </div>
      </section>
      <AudienceSelector />
      <Steps />
      <section className="section container coverage-section">
        <div>
          <p className="eyebrow">LOOK BEYOND THE MONTHLY PREMIUM</p>
          <h2>
            Understand what
            <br />
            you’re choosing.
          </h2>
          <p>
            A good coverage conversation looks at the whole picture. Steve helps
            you understand the details and the tradeoffs, so the next step feels
            clearer.
          </p>
          <ul className="check-list">
            {[
              "Doctors and hospital networks",
              "Benefits, exclusions and out-of-pocket costs",
              "Eligibility, enrollment and effective dates",
            ].map((t) => (
              <li key={t}>
                <Check size={18} />
                {t}
              </li>
            ))}
          </ul>
          <Link className="text-link" href="/texas-health-insurance">
            Explore Texas coverage guidance <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="coverage-links">
          {services.slice(0, 4).map((s, i) => (
            <Link key={s.slug} href={`/${s.slug}`}>
              <span>0{i + 1}</span>
              <div>
                <h3>{s.short}</h3>
                <p>{s.options[0].body}</p>
              </div>
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section reviews-section">
        <div className="container review-grid">
          <div>
            <p className="eyebrow">REAL PEOPLE. REAL CONVERSATIONS.</p>
            <h2>
              Good guidance
              <br />
              starts with listening.
            </h2>
            <Link href="/reviews" className="text-link">
              Read client feedback <ArrowUpRight size={17} />
            </Link>
          </div>
          <Testimonials />
        </div>
      </section>
      <section className="section container about-section">
        <div className="about-panel">
          <p className="eyebrow">A NEIGHBOR, NOT A CALL CENTER</p>
          <span className="about-initials" aria-hidden="true">
            Steve<span>.</span>
          </span>
          <p>
            Steven Rybacki
            <br />
            Your Tyler-based insurance advisor
          </p>
          <Link className="text-link" href="/about-steven-rybacki">
            Get to know Steve <ArrowUpRight size={17} />
          </Link>
        </div>
        <div>
          <p className="eyebrow">PERSONAL BY DESIGN</p>
          <h2>Your story comes first.</h2>
          <p className="large-copy">{site.positioning}</p>
          <p>
            You deserve time to ask questions, space to weigh your options, and
            a person you can reach when you need clarity.
          </p>
          <CalendlyCTA />
        </div>
      </section>
      <section className="section soft">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">LET’S CLEAR A FEW THINGS UP</p>
            <h2>
              Good questions.
              <br />
              Straightforward answers.
            </h2>
            <p>
              You don’t have to know all the insurance terms to get started.
            </p>
            <Link className="text-link" href="/health-insurance-faq">
              View all questions <ArrowUpRight size={17} />
            </Link>
          </div>
          <FAQAccordion />
        </div>
      </section>
      <CTASection />
    </>
  );
}

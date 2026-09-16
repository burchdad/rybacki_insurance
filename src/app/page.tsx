import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  ReviewCTA,
  AdvisorPortrait,
  AudienceSelector,
  Steps,
  Testimonials,
  FAQAccordion,
  CTASection,
} from "@/components/ui";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { metadata as makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata(
  "Health Insurance Options for Texas Families & Businesses",
  "Compare private and Marketplace coverage with Steven Rybacki, a local Tyler advisor for families, self-employed professionals and small businesses.",
  "/",
);

export default function Home() {
  return (
    <div className="ocean-home">
      <section className="ocean-hero" aria-labelledby="home-heading">
        <Image
          src={site.images.ocean}
          alt=""
          fill
          preload
          sizes="100vw"
          className="ocean-image"
        />
        <div className="ocean-shade" />
        <div className="container ocean-hero-content">
          <p className="eyebrow">A LOCAL ADVISOR. A CLEARER HORIZON.</p>
          <h1 id="home-heading">
            Health insurance.
            <br />
            <em>With you in mind.</em>
          </h1>
          <p className="ocean-hero-description">
            Life has enough unknowns. Let’s make your health coverage
            <br className="desktop-break" /> easier to understand, together.
          </p>
          <div className="actions">
            <ReviewCTA />
          </div>
          <p className="ocean-microcopy">
            A few simple questions. No obligation. Personally reviewed by Steve.
          </p>
        </div>
        <div className="ocean-hero-bottom container">
          <span>
            TYLER, TEXAS <span aria-hidden="true">—</span> HERE FOR YOU
          </span>
          <a href="#meet-steve">
            A more personal approach <ArrowDown size={16} />
          </a>
        </div>
        <svg
          className="shoreline"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 35 C360 118 1050 112 1440 20 L1440 100 L0 100 Z" />
        </svg>
      </section>

      <section className="container personal-intro" id="meet-steve">
        <AdvisorPortrait />
        <div className="personal-intro-copy">
          <p className="eyebrow">MEET STEVEN RYBACKI</p>
          <h2>
            A real person.
            <br />
            <em>In your corner.</em>
          </h2>
          <p>
            You don’t need another stack of insurance information. You need
            someone who listens, explains the details, and gives you room to
            decide.
          </p>
          <p>
            I’m Steve, your Tyler-based advisor. Let’s talk about your life,
            your family, and what comes next.
          </p>
          <p className="personal-signoff">No pressure. Just real options.</p>
          <Link className="text-link" href="/about-steven-rybacki">
            A little more about Steve <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <AudienceSelector />
      <Steps />

      <section className="ocean-testimonial">
        <div className="container">
          <p className="eyebrow">SPACE TO ASK. TIME TO UNDERSTAND.</p>
          <h2 className="sr-only">A client’s experience with Steve</h2>
          <Testimonials />
          <Link href="/reviews" className="text-link">
            More about the client experience <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="container ocean-questions">
        <div>
          <p className="eyebrow">WHEN YOU’RE READY TO EXPLORE</p>
          <h2>
            A little clarity
            <br />
            goes a long way.
          </h2>
          <Link href="/health-insurance-faq" className="text-link">
            See all questions <ArrowUpRight size={17} />
          </Link>
        </div>
        <FAQAccordion items={[faqs[1], faqs[2], faqs[4], faqs[6], faqs[15]]} />
      </section>

      <section className="quiet-invitation container">
        <p>
          For Texas families, independent professionals, and small businesses.
        </p>
        <p>Private and Marketplace options. A conversation built around you.</p>
      </section>
      <CTASection />
    </div>
  );
}

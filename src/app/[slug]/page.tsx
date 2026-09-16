import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { services } from "@/content/services";
import { site, licensedStates } from "@/content/site";
import { faqs } from "@/content/faqs";
import { legalPages } from "@/content/legal";
import {
  Breadcrumbs,
  PageIntro,
  ReviewCTA,
  PhoneCTA,
  CTASection,
  FAQAccordion,
  Steps,
  Disclaimer,
  Testimonials,
  AdvisorPortrait,
  CalendlyCTA,
  LocalInformation,
  JsonLd,
} from "@/components/ui";
import { ContactForm } from "@/components/lead-forms";
import { metadata } from "@/lib/seo";
const otherPages: Record<string, { title: string; description: string }> = {
  "about-steven-rybacki": {
    title: "Meet Steven Rybacki",
    description:
      "A Tyler-based advisor who puts your story first. Get to know Steve’s personal approach to health coverage guidance.",
  },
  reviews: {
    title: "Client Reviews",
    description:
      "Read accurately attributed client feedback about working with Steven Rybacki in Tyler, Texas.",
  },
  "health-insurance-faq": {
    title: "Health Insurance FAQ",
    description:
      "Straightforward answers about health plans, networks, eligibility, enrollment and working with Steve.",
  },
  "licensed-states": {
    title: "Licensed States",
    description:
      "Review the agency’s published 23-state service list and confirm current licensing and product availability.",
  },
  contact: {
    title: "Contact Steve",
    description:
      "Call, email or schedule a conversation with Rybacki Insurance Agency in downtown Tyler, Texas.",
  },
  "thank-you": {
    title: "Inquiry Confirmation",
    description:
      "What happens after your inquiry and how to prepare for a coverage conversation.",
  },
  ...Object.fromEntries(
    Object.entries(legalPages).map(([key, value]) => [
      key,
      { title: value.title, description: value.intro },
    ]),
  ),
};
export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...services.map((s) => ({ slug: s.slug })),
    ...Object.keys(otherPages).map((slug) => ({ slug })),
  ];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  const page = otherPages[slug];
  if (!service && !page) return {};
  return {
    ...metadata(
      service?.eyebrow || page.title,
      service?.description || page.description,
      `/${slug}`,
    ),
    ...(slug === "thank-you"
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (service)
    return (
      <>
        <section className="interior-hero">
          <div className="container">
            <Breadcrumbs items={[{ label: service.short }]} />
            <PageIntro
              eyebrow={service.eyebrow}
              title={service.title}
              description={service.description}
            />
            <div className="actions">
              <ReviewCTA
                href={`/coverage-review?need=${encodeURIComponent(service.need)}`}
              />
              <PhoneCTA />
            </div>
          </div>
        </section>
        <section className="section container">
          <div className="content-grid">
            <div>
              <p className="eyebrow">MAKE ROOM FOR THE RIGHT QUESTIONS</p>
              <h2>Start with what matters to you.</h2>
              <ul className="check-list">
                {service.problems.map((p) => (
                  <li key={p}>
                    <Check size={18} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Who this conversation is for</h2>
              <p>{service.fit}</p>
              <aside className="limitation">{service.limitation}</aside>
            </div>
          </div>
          <div className="option-grid">
            {service.options.map((o) => (
              <div className="option-card" key={o.title}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </section>
        <Steps />
        <section className="section container faq-grid">
          <div>
            <p className="eyebrow">A LITTLE MORE CLARITY</p>
            <h2>Your coverage questions, answered.</h2>
            <Link className="text-link" href="/health-insurance-faq">
              Explore all frequently asked questions
            </Link>
          </div>
          <FAQAccordion items={service.faqIndices.map((i) => faqs[i])} />
        </section>
        <section className="section reviews-section">
          <div className="container review-grid">
            <div>
              <p className="eyebrow">CLIENT PERSPECTIVE</p>
              <h2>Time for your questions.</h2>
            </div>
            <Testimonials />
          </div>
        </section>
        <div className="container">
          <Disclaimer />
        </div>
        <CTASection />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.eyebrow,
            description: service.description,
            provider: { "@id": `${site.url}/#agency` },
            areaServed: { "@type": "State", name: "Texas" },
            url: `${site.url}/${slug}`,
          }}
        />
      </>
    );
  if (!otherPages[slug]) notFound();
  const legal = legalPages[slug as keyof typeof legalPages];
  if (legal)
    return (
      <div className="container">
        <Breadcrumbs items={[{ label: legal.title }]} />
        <PageIntro
          eyebrow="WEBSITE INFORMATION"
          title={legal.title}
          description={legal.intro}
        />
        <div className="prose">
          <div className="draft-notice">
            Editable draft · Professional and owner review required before
            launch.
          </div>
          {legal.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <h2>Contact the agency</h2>
          <LocalInformation />
        </div>
      </div>
    );
  if (slug === "about-steven-rybacki")
    return (
      <>
        <div className="container">
          <Breadcrumbs items={[{ label: "About Steve" }]} />
          <PageIntro
            eyebrow="A PERSON YOU CAN TALK TO"
            title="Meet Steve. Your story comes first."
            description="Health coverage is personal. The guidance you get should be, too."
          />
          <section className="content-grid" style={{ paddingBottom: 80 }}>
            <AdvisorPortrait compact />
            <div>
              <h2>A local connection.</h2>
              <p>
                Steven Rybacki leads Rybacki Insurance Agency in downtown Tyler,
                Texas. He and his wife, Sarah, are high school sweethearts and
                parents of two sons.
              </p>
              <p>
                Steve’s approach begins with listening. He helps individuals,
                families and business owners understand available coverage, ask
                useful questions and make an informed choice without pressure.
              </p>
              <h3>Every conversation starts with you.</h3>
              <p>{site.positioning}</p>
              <div className="actions" style={{ marginTop: 25 }}>
                <CalendlyCTA />
                <PhoneCTA />
              </div>
              <Link className="text-link" href="/licensed-states">
                See the published licensed-state list
              </Link>
            </div>
          </section>
        </div>
        <Steps />
        <CTASection />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.agent,
            worksFor: { "@id": `${site.url}/#agency` },
            url: `${site.url}/${slug}`,
          }}
        />
      </>
    );
  if (slug === "reviews")
    return (
      <>
        <div className="container">
          <Breadcrumbs items={[{ label: "Reviews" }]} />
          <PageIntro
            eyebrow="IN THEIR OWN WORDS"
            title="Guidance that makes room for you."
            description="The best place to begin is with a conversation. Here is one client’s perspective on working with Steve."
          />
          <div className="prose">
            <Testimonials />
          </div>
        </div>
        <CTASection />
        <section className="section container">
          <div className="empty-state">
            <p className="eyebrow">MORE CLIENT STORIES</p>
            <h2>Prefer to hear a story firsthand?</h2>
            <p>
              Ask Steve about the process and what to expect. Approved video
              testimonials will be added here when available.
            </p>
            <Link className="text-link" href="/contact">
              Talk with Steve
            </Link>
          </div>
        </section>
      </>
    );
  if (slug === "health-insurance-faq")
    return (
      <>
        <div className="container">
          <Breadcrumbs items={[{ label: "FAQ" }]} />
          <PageIntro
            eyebrow="INSURANCE, IN PLAIN LANGUAGE"
            title="Good questions deserve clear answers."
            description="Start here, then bring your own questions to a personal conversation with Steve."
          />
          <div className="prose">
            <FAQAccordion items={faqs} schema />
            <Disclaimer />
          </div>
        </div>
        <CTASection />
      </>
    );
  if (slug === "licensed-states")
    return (
      <>
        <div className="container">
          <Breadcrumbs items={[{ label: "Licensed states" }]} />
          <PageIntro
            eyebrow="BASED IN TYLER. CONNECTED BEYOND TEXAS."
            title="Start local. Check your state."
            description="The agency’s current published list includes the following 23 states. Please confirm current availability with Steve."
          />
          <div className="draft-notice">
            Owner confirmation of this licensing list is required before launch.
          </div>
          <ul className="states-grid">
            {licensedStates.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p>{site.licensingDisclaimer}</p>
          <div className="actions" style={{ margin: "30px 0 65px" }}>
            <ReviewCTA />
            <PhoneCTA />
          </div>
        </div>
        <CTASection />
      </>
    );
  if (slug === "contact")
    return (
      <div className="container">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <PageIntro
          eyebrow="NO PRESSURE. JUST A CONVERSATION."
          title="Let’s talk about what’s next."
          description="A coverage question, a change in your life, or simply a second look. Steve is here to help you understand your options."
        />
        <div className="contact-grid">
          <div>
            <h2>Reach Steve directly.</h2>
            <LocalInformation />
            <CalendlyCTA />
            <p className="fine" style={{ marginTop: 25 }}>
              {site.response}
            </p>
            <p className="fine" style={{ marginTop: 20 }}>
              This inbox is for insurance questions and is not monitored for
              emergencies. For an urgent medical concern, contact an appropriate
              medical service.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    );
  return (
    <div className="container thank-you">
      <Breadcrumbs items={[{ label: "Inquiry confirmation" }]} />
      <div className="success-icon">
        <Check />
      </div>
      <PageIntro
        eyebrow="YOUR NEXT STEPS"
        title="Thank you for reaching out."
        description="If you arrived here after a successful submission, your inquiry has been received. Steve will review your request and follow up personally."
      />
      <p>{site.response}</p>
      <div className="actions">
        <CalendlyCTA />
        <PhoneCTA />
      </div>
      <h2>Prepare for a useful conversation.</h2>
      <ul className="check-list">
        {[
          "Think about your preferred start date and general budget.",
          "Have your current plan documents handy, if applicable.",
          "Make a private list of the doctors and facilities you want to check.",
          "Save detailed health information for an appropriate secure intake process.",
        ].map((t) => (
          <li key={t}>
            <Check size={18} />
            {t}
          </li>
        ))}
      </ul>
      <p className="limitation">
        Your inquiry does not enroll you in insurance or confirm an appointment.
        Calendly will provide a separate confirmation if you book a time.
      </p>
    </div>
  );
}

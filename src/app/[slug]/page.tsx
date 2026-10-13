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
      "Straightforward answers about health plans, networks, eligibility, enrollment and working with our agency.",
  },
  "licensed-states": {
    title: "Licensed States",
    description:
      "Review the agency’s published 23-state service list and confirm current licensing and product availability.",
  },
  contact: {
    title: "Contact Us and Existing Client Help",
    description:
      "Call or email Rybacki Insurance Agency in Tyler, Texas for general questions and existing-client assistance.",
  },
  "contact-thank-you": {
    title: "Contact Inquiry Next Steps",
    description:
      "Next steps after sending a general contact question to our agency.",
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
    ...(["thank-you", "contact-thank-you"].includes(slug)
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
        {slug === "texas-health-insurance" && (
          <div className="container local-guide-link">
            <Link
              className="text-link"
              href="/resources/choosing-health-insurance-tyler"
            >
              Read our guide to choosing health insurance in Tyler, TX
            </Link>
          </div>
        )}
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
                Our approach begins with listening. We help individuals,
                families and business owners understand available coverage, ask
                useful questions and make an informed choice without pressure.
              </p>
              <h3>Every conversation starts with you.</h3>
              <p>{site.positioning}</p>
              <div className="actions" style={{ marginTop: 25 }}>
                <ReviewCTA />
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
            description="The best place to begin is with a conversation. Here is one client’s perspective on working with our agency."
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
              Ask us about the process and what to expect. Approved video
              testimonials will be added here when available.
            </p>
            <Link className="text-link" href="/contact">
              Talk with us
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
            description="Start here, then bring your own questions to a personal conversation with us."
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
            description="The agency’s current published list includes the following 23 states. Please confirm current availability with us."
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
          description="A coverage question, a change in your life, or simply a second look. We are here to help you understand your options."
        />
        <div className="contact-grid">
          <div>
            <h2>Reach us directly.</h2>
            <LocalInformation />
            <ReviewCTA />
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
        <section
          className="existing-client-help"
          id="existing-client-help"
          aria-labelledby="client-help-heading"
        >
          <h2 id="client-help-heading">Existing Client Help</h2>
          <p>
            Need help with insurance cards, billing, policy information or
            another service question? Call or email us directly. You do not need
            to complete a new-prospect questionnaire.
          </p>
          <div className="actions">
            <PhoneCTA />
            <a className="text-link" href={`mailto:${site.email}`}>
              Email us for client help
            </a>
          </div>
          <p className="fine">
            Please keep medical details, Social Security numbers, payment
            information and policy documents out of a general email or contact
            question. Ask us how to provide any information needed for your
            request.
          </p>
        </section>
      </div>
    );
  if (slug === "contact-thank-you")
    return (
      <div className="container thank-you">
        <Breadcrumbs items={[{ label: "Contact inquiry next steps" }]} />
        <PageIntro
          eyebrow="YOUR CONTACT QUESTION"
          title="Thank you for reaching out."
          description="If your contact form confirmed a successful submission, we will review your question and follow up."
        />
        <p>{site.response}</p>
        <p>
          For a new coverage review, please complete the detailed questionnaire
          before scheduling.
        </p>
        <div className="actions">
          <ReviewCTA />
          <PhoneCTA />
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
        title="Your next step: book your coverage review."
        description="After submitting your coverage questionnaire, choose a time for us to review your options together. If you have not completed the intake yet, please start there."
      />
      <p>{site.appointments}</p>
      <Link className="text-link" href="/coverage-review">
        Complete the coverage questionnaire
      </Link>
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
          "Follow the detailed intake instructions for health information; keep it out of general contact messages.",
        ].map((t) => (
          <li key={t}>
            <Check size={18} />
            {t}
          </li>
        ))}
      </ul>
      <p className="limitation">
        Completing your intake does not enroll you in insurance, establish
        coverage or confirm an appointment. Calendly will provide a separate
        confirmation if you book a time.
      </p>
    </div>
  );
}

// Contact details and service scope confirmed by owner October 23, 2026.
// Active state list, privacy/consent practices and final launch approval remain pending.
export const site = {
  name: "Rybacki Insurance Agency",
  agent: "Steven Rybacki",
  shortName: "Steve",
  intakeUrl: "https://form.jotform.com/261974651459066",
  images: {
    ocean: "/images/current-site-brand.png",
    steven: "/images/current-site-steven.png",
  },
  phone: "(903) 941-7282",
  phoneHref: "tel:+19039417282",
  email: "Steven@RybackiInsuranceAgency.com",
  address: "110 N. College Ave., Suite 801, Tyler, TX 75702",
  addressParts: {
    streetAddress: "110 N. College Ave., Suite 801",
    addressLocality: "Tyler",
    addressRegion: "TX",
    postalCode: "75702",
    addressCountry: "US",
  },
  hours: ["Monday–Friday: 8:00 AM–10:00 PM", "Saturday: 9:00 AM–1:00 PM"],
  timezone: "Central time",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.rybackiinsuranceagency.com",
  calendly:
    "https://calendly.com/steven-rybacki/health-insurance-coverage-review",
  map: "https://www.google.com/maps/search/?api=1&query=110+N+College+Ave+Suite+801+Tyler+TX+75702",
  memberPortal: "https://myushg.ushealthgroup.com/",
  memberServices: "https://www.ushealthgroup.com/member-services",
  googleReview: "https://g.page/r/CUm5ik5bKFWHEBM/review",
  licensing: "Licensed in multiple states",
  marketplaceReferral:
    "ACA Marketplace policies are handled through licensed referral partners Matt Jubie and Gary Morazzano, rather than directly issued or serviced by Steven Rybacki.",
  medicareReferral:
    "Steven Rybacki is not Medicare-licensed and does not directly sell Medicare policies. With your permission, Medicare inquiries can be referred to an appropriately licensed agent.",
  socials: [] as { label: string; href: string }[], // Add only verified agency profiles.
  appointments:
    "Most appointments take place by phone and screen sharing. Office visits are available by appointment.",
  affiliation:
    "Steven Rybacki works directly with private, medically underwritten health insurance products through USHEALTH Advisors and associated carriers, including Freedom Life Insurance Company of America. ACA Marketplace coverage is handled through licensed referral partners. Steven does not directly sell Medicare policies; Medicare referrals require your permission.",
  response:
    "We will follow up during office hours. If your coverage deadline is close, please call.",
  positioning:
    "Every client has a different story. Our job is to help you understand your options, compare plans honestly, and choose coverage that fits your doctors, your budget, and your family.",
  disclaimer:
    "Plan availability, eligibility, networks, benefits and pricing vary by plan, location and individual circumstances. This website provides general information, not legal, tax or medical advice. Review the policy documents before enrolling.",
  licensingDisclaimer:
    "Licensing and product availability may change. Contact Rybacki Insurance Agency to confirm availability in your state.",
  sensitiveNotice:
    "Do not enter medical diagnoses, prescription details, Social Security numbers, payment information or other highly sensitive information. The detailed coverage questionnaire is a separate intake process; follow its instructions for health questions.",
  consent:
    "I agree that Rybacki Insurance Agency may contact me about my inquiry using the contact information I provide. This does not enroll me in insurance or require a purchase.",
  smsConsent:
    "Optional: I agree to receive text messages from Rybacki Insurance Agency about this inquiry. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
};
export const navigation = [
  { label: "About Steve", href: "/about-steven-rybacki" },
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/health-insurance-faq" },
  { label: "Existing Client Help", href: "/contact#existing-client-help" },
];
export const coverageTypes = [
  "Individual",
  "Family",
  "Self-employed/1099",
  "Small business",
  "Losing employer coverage",
  "Other/general question",
] as const;
export const testimonials = [
  {
    author: "Kristy Daniels-Beckham",
    quote:
      "Steve was great to work with. He was very knowledgeable and patient with all of my questions.",
    source: "Excerpt from the agency’s existing reviews page",
    href: "https://www.rybackiinsuranceagency.com/reviews",
  },
];
export const reviewDisclaimer =
  "Individual experiences vary and do not guarantee future results, eligibility or savings. This excerpt preserves the reviewer’s original wording. No independent rating or review count is claimed.";

// OWNER: Confirm licensing, hours, contact details, consent language and links before launch.
export const site = {
  name: "Rybacki Insurance Agency",
  agent: "Steven Rybacki",
  shortName: "Steve",
  images: {
    ocean: "/images/current-site-brand.png",
    steven: "/images/current-site-steven.png",
  },
  phone: "(903) 941-7282",
  phoneHref: "tel:+19039417282",
  email: "steven.rybacki@ushadvisors.com",
  address: "110 N. College Ave., Suite 801, Tyler, TX 75702",
  addressParts: {
    streetAddress: "110 N. College Ave., Suite 801",
    addressLocality: "Tyler",
    addressRegion: "TX",
    postalCode: "75702",
    addressCountry: "US",
  },
  hours: ["Monday–Friday: 8am–10pm", "Saturday: 9am–1pm"],
  timezone: "Central time",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.rybackiinsuranceagency.com",
  calendly:
    "https://calendly.com/steven-rybacki/health-insurance-coverage-review",
  map: "https://www.google.com/maps/search/?api=1&query=110+N+College+Ave+Suite+801+Tyler+TX+75702",
  socials: [] as { label: string; href: string }[], // Add only verified agency profiles.
  response:
    "Steve will follow up personally during office hours. If your coverage deadline is close, please call.",
  positioning:
    "Every client has a different story. My job is to help you understand your options, compare plans honestly, and choose coverage that fits your doctors, budget and family.",
  disclaimer:
    "Plan availability, eligibility, networks, benefits and pricing vary by plan, location and individual circumstances. This website provides general information, not legal, tax or medical advice. Review the policy documents before enrolling.",
  licensingDisclaimer:
    "Licensing and product availability may change. Contact Rybacki Insurance Agency to confirm availability in your state.",
  sensitiveNotice:
    "Do not enter medical diagnoses, prescription details, Social Security numbers, payment information or other highly sensitive information. Detailed health questions belong in a separate secure intake process.",
  consent:
    "I agree that Rybacki Insurance Agency may contact me about my inquiry using the contact information I provide. This does not enroll me in insurance or require a purchase.",
  smsConsent:
    "Optional: I agree to receive text messages from Rybacki Insurance Agency about this inquiry. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.",
  analyticsEnabled: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true",
};
// OWNER MUST VERIFY BEFORE LAUNCH. Source: existing agency website, reviewed 2026-09-16.
export const licensedStates = [
  "Alabama",
  "Arkansas",
  "Colorado",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maryland",
  "Michigan",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "North Carolina",
  "Ohio",
  "Oklahoma",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Wyoming",
];
export const navigation = [
  { label: "About Steve", href: "/about-steven-rybacki" },
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/health-insurance-faq" },
  { label: "Contact", href: "/contact" },
];
export const coverageTypes = [
  "Individual",
  "Family",
  "Self-employed/1099",
  "Small business",
  "Losing employer coverage",
  "Medicare referral",
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

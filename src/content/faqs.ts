export type FAQ = { question: string; answer: string; source?: string };
export const faqs: FAQ[] = [
  {
    question: "Does working with an insurance agent cost more?",
    answer:
      "Ask how the agent is paid and whether any fee applies before proceeding. Steve can explain compensation and the costs shown in your available plan options so you can make an informed comparison.",
  },
  {
    question:
      "What is the difference between private and Marketplace coverage?",
    answer:
      "Marketplace plans are offered by private insurers through a public enrollment platform. “Private coverage” can also mean plans purchased outside that platform. Compare the actual policy: benefits, exclusions, network and eligibility matter more than the label. Financial assistance is subject to Marketplace rules.",
    source:
      "https://www.healthcare.gov/quick-guide/one-page-guide-to-the-marketplace/",
  },
  {
    question: "Can I keep my doctor?",
    answer:
      "That depends on the exact plan and network. Before enrolling, check the insurer’s current directory and confirm participation with the doctor’s office using the full plan name. A familiar insurance company name alone is not enough.",
  },
  {
    question: "How are prescriptions handled?",
    answer:
      "Coverage depends on the plan’s drug list, cost-sharing and any authorization requirements. Steve can explain how to check these details during a private consultation. Please do not put prescription information in this website’s forms.",
  },
  {
    question: "How do preexisting conditions affect options?",
    answer:
      "Marketplace plans cannot deny coverage or charge more because of a preexisting condition. Other products may have different protections, exclusions or underwriting requirements. Review the specific policy before applying.",
    source: "https://www.healthcare.gov/coverage/pre-existing-conditions/",
  },
  {
    question: "What is medical underwriting?",
    answer:
      "Medical underwriting is an insurer’s evaluation of health information for certain products. It can affect eligibility or policy terms where permitted. Marketplace plans do not use health status to determine eligibility or premiums. Detailed questions should only be handled through an appropriate secure application process.",
  },
  {
    question: "Can I obtain coverage outside open enrollment?",
    answer:
      "A qualifying life change may make a Marketplace Special Enrollment Period available. Timing, documentation and eligibility depend on the event. Other products have their own enrollment rules. Contact Steve promptly to review the options.",
    source:
      "https://www.healthcare.gov/coverage-outside-open-enrollment/special-enrollment-period/",
  },
  {
    question: "What happens when I lose employer coverage?",
    answer:
      "Compare the continuation coverage described in your employer’s notice with individual coverage options. Losing qualifying coverage may open a Marketplace enrollment opportunity. Ask about effective dates before your current coverage ends; do not assume every loss or voluntary cancellation qualifies.",
    source:
      "https://www.healthcare.gov/have-job-based-coverage/if-you-lose-job-based-coverage/",
  },
  {
    question: "What options exist for self-employed people?",
    answer:
      "Individual and family plans may be worth reviewing when you work for yourself. Compare year-round costs, networks and benefits rather than premium alone. Business structure and eligibility affect whether group options are available.",
  },
  {
    question: "How does small-business health insurance work?",
    answer:
      "Start with the number of eligible employees, your contribution budget and existing benefits. Steve can help compare available group and other benefit arrangements, including their participation requirements, funding obligations and limitations.",
  },
  {
    question: "What information is needed to begin?",
    answer:
      "Your contact details, ZIP code, general coverage need and preferred timing are enough for an initial conversation. Do not send medical details, Social Security numbers, payment information or full birth dates through the website.",
  },
  {
    question: "How quickly can coverage start?",
    answer:
      "Effective dates depend on the product, enrollment window, application processing and required payment. Request written confirmation of your start date before ending existing coverage.",
  },
  {
    question: "Which states does Steve serve?",
    answer:
      "The agency’s current published list contains 23 states, including Texas. Licensing and product availability may change. Confirm availability directly with Steve before proceeding.",
  },
  {
    question: "Does Steve sell Medicare plans?",
    answer:
      "Medicare inquiries can be referred to an appropriately licensed Medicare specialist. This website does not present Steve as a Medicare plan seller.",
  },
  {
    question: "How is personal information handled?",
    answer:
      "The initial form is limited to contact and general coverage information. It is processed server-side and sent to the configured agency lead provider. Form values are not sent to analytics. See the privacy policy for the draft data-use and retention terms.",
  },
  {
    question: "Does submitting a form enroll me in coverage?",
    answer:
      "No. Your request starts a conversation. Enrollment requires a separate application, any required approvals and confirmation from the insurer.",
  },
];

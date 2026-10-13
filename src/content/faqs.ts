export type FAQ = { question: string; answer: string; source?: string };
export const faqs: FAQ[] = [
  {
    question: "Does working with an insurance agent cost more?",
    answer:
      "Ask how the agent is paid and whether any fee applies before proceeding. We can explain compensation and the costs shown in your available plan options so you can make an informed comparison.",
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
      "Coverage depends on the plan’s drug list, cost-sharing and any authorization requirements. We can explain how to check these details during a private consultation. Please do not put prescription information in the general contact form; follow the instructions in the separate detailed intake.",
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
      "A qualifying life change may make a Marketplace Special Enrollment Period available. Timing, documentation and eligibility depend on the event. Other products have their own enrollment rules. Contact us promptly to review the options.",
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
      "Start with your own coverage and household needs. If you are seeking help with employee benefits, contact us to confirm which services are available before assuming that we offer a particular group or funding arrangement.",
  },
  {
    question: "What information is needed to begin?",
    answer:
      "New coverage reviews begin with our existing detailed JotForm questionnaire, including its relevant health questions. For a general contact question, provide only your contact details and a brief description. Do not put medical details, Social Security numbers or payment information in the general contact form.",
  },
  {
    question: "How quickly can coverage start?",
    answer:
      "Effective dates depend on the product, enrollment window, application processing and required payment. Request written confirmation of your start date before ending existing coverage.",
  },
  {
    question: "Which states do we serve?",
    answer:
      "The agency’s current published list contains 23 states, including Texas. Licensing and product availability may change. Confirm availability directly with us before proceeding.",
  },
  {
    question: "What if I need a service you do not handle?",
    answer:
      "Contact us to confirm whether we can help directly. If another licensed insurance professional may be appropriate, we will discuss a referral with you before sharing your information.",
  },
  {
    question: "How is personal information handled?",
    answer:
      "The general contact form and the detailed JotForm questionnaire are separate processes. Do not include sensitive information in a general contact question. Our site does not copy JotForm answers into its own API or analytics. Please review the privacy policy and contact us with questions about how information is handled.",
  },
  {
    question: "Does submitting a form enroll me in coverage?",
    answer:
      "No. Your request starts a conversation. Enrollment requires a separate application, any required approvals and confirmation from the insurer.",
  },
];

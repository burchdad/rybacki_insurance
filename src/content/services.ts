import type { coverageTypes } from "./site";
export type Service = {
  slug: string;
  title: string;
  short: string;
  eyebrow: string;
  description: string;
  need: (typeof coverageTypes)[number];
  problems: string[];
  options: { title: string; body: string }[];
  fit: string;
  limitation: string;
  faqIndices: number[];
};
export const services: Service[] = [
  {
    slug: "individual-family-health-insurance",
    title: "Health coverage for the people who matter most.",
    short: "Individuals & families",
    eyebrow: "Individual & family health insurance",
    description:
      "A growing family. A new chapter. A plan that no longer fits. Get clear guidance on health insurance options built around your household’s priorities.",
    need: "Family",
    problems: [
      "Understanding what you will pay beyond the premium",
      "Checking doctors, hospitals and covered services",
      "Finding a path for early retirement before Medicare eligibility",
    ],
    options: [
      {
        title: "Marketplace coverage",
        body: "Marketplace policies are handled through licensed referral partners Matt Jubie and Gary Morazzano, rather than directly issued or serviced by Steven Rybacki.",
      },
      {
        title: "Off-Marketplace options",
        body: "Review private, medically underwritten products available through USHEALTH Advisors and associated carriers, including Freedom Life Insurance Company of America.",
      },
      {
        title: "A household-wide perspective",
        body: "Consider different needs across your family without assuming one option fits everyone.",
      },
    ],
    fit: "Families, individuals, newly married couples and early retirees who want help understanding their next coverage decision.",
    limitation:
      "Off-Marketplace products differ. Some may use underwriting or exclude benefits. Availability is not an approval or coverage guarantee.",
    faqIndices: [2, 4, 11],
  },
  {
    slug: "self-employed-health-insurance",
    title: "You run your business. Let’s simplify your coverage.",
    short: "Self-employed & 1099",
    eyebrow: "Health insurance for self-employed Texans",
    description:
      "Work may be independent. Choosing health coverage does not have to be. Explore options for freelancers, contractors and people building a business of their own.",
    need: "Self-employed/1099",
    problems: [
      "Replacing benefits from a former employer",
      "Planning for both premiums and out-of-pocket costs",
      "Balancing your own coverage with your family’s needs",
    ],
    options: [
      {
        title: "Individual and family plans",
        body: "Review available private, medically underwritten products. ACA Marketplace policies are handled through licensed referral partners, not directly issued or serviced by Steven Rybacki.",
      },
      {
        title: "Coverage through a transition",
        body: "Compare timing and plan terms when moving from employment into self-employment.",
      },
      {
        title: "A sustainable budget",
        body: "Look at deductibles, cost-sharing and covered care alongside the monthly premium.",
      },
    ],
    fit: "Freelancers, independent contractors, sole proprietors and 1099 professionals looking for an understandable comparison.",
    limitation:
      "Income and household circumstances can affect Marketplace assistance. Discuss tax questions with a qualified tax professional; no tax outcome is promised.",
    faqIndices: [8, 1, 6],
  },
  {
    slug: "small-business-health-insurance",
    title: "Your business is personal. So is your health coverage.",
    short: "Small business owners",
    eyebrow: "Health coverage for small business owners",
    description:
      "We help small-business owners explore coverage for themselves, their households and their employees within our available product offerings.",
    need: "Small business",
    problems: [
      "Finding coverage for yourself and your family",
      "Comparing premiums with the cost of using a plan",
      "Planning ahead when work or household coverage changes",
    ],
    options: [
      {
        title: "Your own coverage",
        body: "Start with your current plan, household priorities and the options available where you live.",
      },
      {
        title: "A household comparison",
        body: "Consider available individual coverage alongside any coverage through a spouse’s employer.",
      },
      {
        title: "Questions about your team",
        body: "We can conduct consultations, gather employee census information and develop preliminary coverage proposals within our available product offerings. Contact us to discuss next steps; do not send employee health information through the general contact form.",
      },
    ],
    fit: "Small-business owners, sole proprietors and independent professionals exploring coverage for themselves, their households or employees.",
    limitation:
      "Proposals are limited to available product offerings. Level-funded group plans are not advertised as a service we directly provide. No eligibility or coverage approval is guaranteed.",
    faqIndices: [9, 0, 10],
  },
  {
    slug: "losing-employer-coverage",
    title: "A change in work shouldn’t leave you without a plan.",
    short: "Losing employer coverage",
    eyebrow: "Guidance for your next chapter",
    description:
      "Leaving a job, changing careers or retiring early? Understand your coverage paths and the timing questions to ask before your employer plan ends.",
    need: "Losing employer coverage",
    problems: [
      "Avoiding an unplanned gap between policies",
      "Comparing continuation coverage with individual plans",
      "Knowing which deadlines and documents matter",
    ],
    options: [
      {
        title: "Employer continuation options",
        body: "Review the notice from your employer and ask the plan administrator about available continuation coverage.",
      },
      {
        title: "Marketplace enrollment",
        body: "A loss of qualifying coverage may create a Special Enrollment Period. Marketplace policies are handled through licensed referral partners who can review your circumstances and timing.",
      },
      {
        title: "Other available coverage",
        body: "Review applicable individual options and family-member employer coverage where available.",
      },
    ],
    fit: "People changing jobs, losing benefits, leaving a family member’s plan or retiring before Medicare eligibility.",
    limitation:
      "Voluntary cancellation does not necessarily create an enrollment opportunity. Do not cancel an existing plan until the new effective date is confirmed.",
    faqIndices: [7, 6, 11],
  },
  {
    slug: "texas-health-insurance",
    title: "Texas coverage guidance. A Tyler point of view.",
    short: "Texas coverage guidance",
    eyebrow: "Your local health insurance conversation",
    description:
      "From East Texas families to independent professionals across the state, start with someone who will listen and explain your available options clearly.",
    need: "Individual",
    problems: [
      "Understanding plans available in your county",
      "Confirming that an East Texas doctor participates",
      "Choosing a plan when work or family life changes",
    ],
    options: [
      {
        title: "Your location matters",
        body: "Plan availability and networks vary by ZIP code and county. Start with a local comparison.",
      },
      {
        title: "Your priorities come first",
        body: "Discuss doctors, budget and timing privately with us, then compare the details.",
      },
      {
        title: "An accessible local office",
        body: "Most appointments take place by phone and screen sharing. Office visits in Tyler are available by appointment.",
      },
    ],
    fit: "Texas residents seeking individual, family, self-employed or small-business coverage guidance.",
    limitation:
      "Texas residency does not establish eligibility for a particular product. Networks, enrollment requirements and benefits vary.",
    faqIndices: [1, 2, 12],
  },
];

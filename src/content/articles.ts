export type Article = {
  slug: string;
  title: string;
  category: string;
  description: string;
  published: string;
  updated: string;
  sections: { title: string; body: string }[];
  sources: { label: string; href: string }[];
};
const draftDate = "2026-09-16";
export const articles: Article[] = [
  {
    slug: "private-vs-marketplace-texas",
    title: "Private Health Insurance vs. Marketplace Plans in Texas",
    category: "Texas Coverage Guidance",
    description:
      "Understand the labels, then compare the benefits that matter.",
    sections: [
      {
        title: "Start with the policy, not the label",
        body: "Marketplace plans are offered by private insurance companies. Buying outside the Marketplace does not tell you, by itself, what a policy covers. Ask for the Summary of Benefits and Coverage or the applicable benefit documents.",
      },
      {
        title: "Compare the same things",
        body: "Put premiums, deductibles, covered services, network rules and exclusions next to each other. Check whether the product is comprehensive coverage or a limited benefit product. A lower monthly premium alone does not establish better value.",
      },
      {
        title: "Ask about eligibility",
        body: "Enrollment rules and any financial assistance depend on your circumstances and the coverage route. Use the current Marketplace application and official guidance to confirm eligibility.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Marketplace overview",
        href: "https://www.healthcare.gov/quick-guide/one-page-guide-to-the-marketplace/",
      },
    ],
  },
  {
    slug: "after-losing-employer-coverage",
    title: "Health Insurance Options After Losing Employer Coverage",
    category: "Losing Employer Coverage",
    description:
      "A practical checklist for a change in employment or benefits.",
    sections: [
      {
        title: "Find your current end date",
        body: "Ask your employer for written confirmation of when coverage ends and retain any continuation coverage notice. Your final day of work and final day of coverage may differ.",
      },
      {
        title: "Review the available paths",
        body: "Compare any employer continuation option with individual coverage and a family member’s employer plan where available. Losing qualifying coverage may create a Marketplace Special Enrollment Period. Confirm the rules for your own situation promptly.",
      },
      {
        title: "Coordinate the handoff",
        body: "Ask the new insurer to confirm the effective date and any required first payment. Keep your notices and confirmation records. Do not assume that submitting an inquiry or application means your coverage has begun.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Losing job-based coverage",
        href: "https://www.healthcare.gov/have-job-based-coverage/if-you-lose-job-based-coverage/",
      },
    ],
  },
  {
    slug: "self-employed-texans",
    title: "Health Coverage for Self-Employed Texans",
    category: "Self-Employed",
    description:
      "Plan around the way you work and the people who depend on you.",
    sections: [
      {
        title: "Build a year-round budget",
        body: "Consider a regular month and a year when you need more care. Compare the premium with the deductible, cost-sharing and policy limits. A variable business income makes it especially useful to understand the full range of costs.",
      },
      {
        title: "Review household options",
        body: "Your business and family needs may overlap. Ask about individual plans and any available coverage through a spouse’s employer. Verify doctors and hospitals against the exact plan network.",
      },
      {
        title: "Keep business questions separate",
        body: "Group plan eligibility, reimbursement arrangements and tax treatment require their own review. Bring business structure questions to the conversation and consult a qualified tax professional for tax advice.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Self-employed people",
        href: "https://www.healthcare.gov/self-employed/",
      },
    ],
  },
  {
    slug: "check-doctor-network",
    title: "How to Check Whether Your Doctor Is In Network",
    category: "Understanding Health Plans",
    description: "Go beyond the carrier name before you choose.",
    sections: [
      {
        title: "Use the full plan name",
        body: "An insurer can offer several different networks. Write down the exact plan and network name, then search the insurer’s current provider directory for the correct year and location.",
      },
      {
        title: "Confirm with both sides",
        body: "Call the doctor’s office and the insurer. Ask whether the specific practice location and clinician participate in that exact network. Confirm hospitals and specialists separately.",
      },
      {
        title: "Keep a record and check again",
        body: "Save the date and details of the confirmation. Networks can change. Verify participation again before arranging care and ask about referrals or authorization requirements.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Plan types and networks",
        href: "https://www.healthcare.gov/choose-a-plan/plan-types/",
      },
    ],
  },
  {
    slug: "medical-underwriting",
    title: "What Medical Underwriting Means",
    category: "Understanding Health Plans",
    description: "Know when health questions can affect a policy.",
    sections: [
      {
        title: "Understand the process",
        body: "For certain products, an insurer evaluates health information when considering an application. Where permitted, that evaluation can affect eligibility or policy terms. Do not assume every health product follows the same rules.",
      },
      {
        title: "Know the distinction",
        body: "Marketplace plans cannot deny you coverage or charge more because of a preexisting condition. Other products may have different protections. Ask exactly what is covered, excluded or limited.",
      },
      {
        title: "Use an appropriate intake process",
        body: "Health information belongs in a secure application or intake process designated for that purpose. This website’s initial forms only begin a conversation; do not include diagnoses or prescription details.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Preexisting conditions",
        href: "https://www.healthcare.gov/coverage/pre-existing-conditions/",
      },
    ],
  },
  {
    slug: "small-business-2-50-employees",
    title: "Health Insurance Options for Small Businesses with 2–50 Employees",
    category: "Small Business",
    description: "Begin with your team and budget, then examine the contract.",
    sections: [
      {
        title: "Define the business goal",
        body: "Are you offering benefits for the first time or evaluating a renewal? List the employee groups involved, the desired start date and a contribution budget. Use approximate employee counts for the first conversation.",
      },
      {
        title: "Compare obligations as well as premiums",
        body: "Ask about participation, contributions, administration, funding risk and renewals. Fully insured and level-funded arrangements differ. Review the actual contract with appropriate professional guidance.",
      },
      {
        title: "Plan the employee experience",
        body: "Consider how employees will choose benefits, ask questions and access their network. Set aside time to communicate important dates and explain the available documents.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Small businesses",
        href: "https://www.healthcare.gov/small-businesses/",
      },
    ],
  },
  {
    slug: "questions-before-choosing-a-plan",
    title: "Questions to Ask Before Choosing a Health Plan",
    category: "Individuals and Families",
    description: "Bring these questions to your next coverage conversation.",
    sections: [
      {
        title: "What will I pay?",
        body: "Ask about premiums, deductibles, copays, coinsurance and any applicable out-of-pocket limit. Ask which expenses do not count toward that limit and how out-of-network care is handled.",
      },
      {
        title: "What does the plan actually cover?",
        body: "Review covered services, exclusions and authorization requirements. Confirm your doctors and facilities. Ask how to check prescription benefits privately without entering medical details in a general form.",
      },
      {
        title: "When and how does coverage begin?",
        body: "Confirm enrollment requirements, any approval process, the effective date and payment instructions. Ask who can help with service questions after enrollment and keep the policy documents.",
      },
    ],
    sources: [
      {
        label: "HealthCare.gov: Compare plans",
        href: "https://www.healthcare.gov/choose-a-plan/",
      },
    ],
  },
].map((article) => ({ ...article, published: draftDate, updated: draftDate }));

import type { CoverageInput } from "../src/lib/validation";
export function validLead(): CoverageInput {
  return {
    kind: "coverage",
    need: "Family",
    firstName: "Test",
    lastName: "Visitor",
    email: "test@example.com",
    phone: "9035550100",
    zip: "75702",
    people: 2,
    currentCoverage: "No current coverage",
    startDate: "2026-10-01",
    preferredContact: "Email",
    bestTime: "Any time",
    businessName: "",
    employees: 0,
    groupCoverage: "",
    message: "A fictional test inquiry.",
    consent: true,
    smsConsent: false,
    website: "",
    submissionId: crypto.randomUUID(),
    startedAt: Date.now() - 5000,
  };
}

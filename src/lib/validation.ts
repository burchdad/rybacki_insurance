import { z } from "zod";
import { coverageTypes } from "@/content/site";
const clean = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) =>
      v.replace(/[<>\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, ""),
    );
const name = clean(80).pipe(z.string().min(1, "Please enter your name."));
const email = z.string().trim().email("Enter a valid email address.").max(254);
const phone = z
  .string()
  .trim()
  .max(30)
  .refine(
    (v) =>
      v.replace(/\D/g, "").length >= 10 && v.replace(/\D/g, "").length <= 15,
    "Enter a phone number with 10–15 digits.",
  );
const consent = z
  .boolean()
  .refine((v) => v, "Please agree to contact permission before submitting.");
const common = {
  email,
  message: clean(1200),
  consent,
  smsConsent: z.boolean(),
  website: z.string().max(200),
  submissionId: z.uuid(),
  startedAt: z.number().finite().positive(),
};
export const coverageSchema = z
  .object({
    ...common,
    kind: z.literal("coverage"),
    need: z.enum(coverageTypes),
    firstName: name,
    lastName: name,
    phone,
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code."),
    people: z.number().int().min(1).max(100),
    currentCoverage: z.enum([
      "Employer plan",
      "Individual or family plan",
      "No current coverage",
      "Coverage ending",
      "Other / unsure",
    ]),
    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a desired start date.")
      .refine((v) => {
        const d = new Date(`${v}T12:00:00Z`);
        return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
      }, "Choose a real date."),
    preferredContact: z.enum(["Phone", "Email"]),
    bestTime: z.enum(["Morning", "Afternoon", "Evening", "Any time"]),
    businessName: clean(140),
    employees: z.number().int().min(0).max(10000),
    groupCoverage: z.enum([
      "Currently offered",
      "Not currently offered",
      "Unsure",
      "",
    ]),
  })
  .superRefine((data, ctx) => {
    if (data.need === "Small business") {
      if (!data.businessName)
        ctx.addIssue({
          code: "custom",
          path: ["businessName"],
          message: "Enter the business name.",
        });
      if (data.employees < 1)
        ctx.addIssue({
          code: "custom",
          path: ["employees"],
          message: "Enter the approximate eligible employee count.",
        });
      if (!data.groupCoverage)
        ctx.addIssue({
          code: "custom",
          path: ["groupCoverage"],
          message: "Choose the current group coverage status.",
        });
    }
  });
export const contactSchema = z
  .object({
    ...common,
    kind: z.literal("contact"),
    name,
    phone: z.union([z.literal(""), phone]),
    preferredContact: z.enum(["Phone", "Email"]),
  })
  .superRefine((data, ctx) => {
    if (data.preferredContact === "Phone" && !data.phone)
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "A phone number is required for a callback.",
      });
    if (!data.message)
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Please include a short, non-sensitive question.",
      });
  });
export const leadSchema = z.union([coverageSchema, contactSchema]);
export type CoverageInput = z.input<typeof coverageSchema>;
export type ContactInput = z.input<typeof contactSchema>;
export type Lead = z.output<typeof leadSchema>;

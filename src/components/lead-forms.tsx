"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useForm,
  useWatch,
  type FieldPath,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole } from "lucide-react";
import {
  coverageSchema,
  contactSchema,
  type CoverageInput,
  type ContactInput,
} from "@/lib/validation";
import { coverageTypes, site } from "@/content/site";
import { event } from "./analytics";
type FieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  options?: string[];
  hint?: string;
  full?: boolean;
  required?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
};
function Field({
  label,
  registration,
  error,
  type = "text",
  options,
  hint,
  full,
  required,
  autoComplete,
  min,
  max,
}: FieldProps) {
  const id = registration.name;
  const props = {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby":
      [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
        .filter(Boolean)
        .join(" ") || undefined,
    required,
    ...registration,
  };
  return (
    <div className={`field ${full ? "field-full" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {options ? (
        <select {...props}>
          <option value="">Select an option</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea {...props} maxLength={1200} />
      ) : (
        <input
          {...props}
          type={type}
          autoComplete={autoComplete}
          min={min}
          max={max}
        />
      )}{" "}
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
function Honeypot({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div className="honeypot" aria-hidden="true">
      <label>
        Leave this field empty
        <input {...registration} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
async function submitLead(data: CoverageInput | ContactInput) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await response.json();
  if (!response.ok)
    throw new Error(
      body.error || "Unable to send. Please try again or call us.",
    );
  return body as { ok: boolean; status: "delivered" | "development" };
}
function Consent({
  registerConsent,
  registerSms,
  error,
}: {
  registerConsent: UseFormRegisterReturn;
  registerSms?: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <>
      <label className="checkbox-row">
        <input
          type="checkbox"
          {...registerConsent}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "consent-error" : undefined}
        />
        <span>{site.consent} *</span>
      </label>
      {error && (
        <p id="consent-error" className="field-error">
          {error}
        </p>
      )}
      {registerSms && (
        <label className="checkbox-row">
          <input type="checkbox" {...registerSms} />
          <span>{site.smsConsent}</span>
        </label>
      )}
      <div className="consent-links">
        <Link href="/privacy-policy">Privacy policy</Link>
        <Link href="/terms">Terms of use</Link>
      </div>
    </>
  );
}
const initialCoverage: CoverageInput = {
  kind: "coverage",
  need: "Individual",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  zip: "",
  people: 1,
  currentCoverage: "No current coverage",
  startDate: "",
  preferredContact: "Phone",
  bestTime: "Any time",
  businessName: "",
  employees: 0,
  groupCoverage: "",
  message: "",
  consent: false,
  smsConsent: false,
  website: "",
  submissionId: "",
  startedAt: 0,
};
export function CoverageReviewForm({ initialNeed }: { initialNeed?: string }) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const identity = useRef<{ id: string; startedAt: number } | null>(null);
  const router = useRouter();
  const {
    register,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CoverageInput>({
    resolver: zodResolver(coverageSchema),
    defaultValues: {
      ...initialCoverage,
      need: coverageTypes.includes(initialNeed as CoverageInput["need"])
        ? (initialNeed as CoverageInput["need"])
        : "Individual",
    },
    shouldFocusError: true,
  });
  // React Hook Form watches deliberately subscribe the conditional business fields.
  const need = useWatch({ control, name: "need" });
  function ensureIdentity() {
    if (!identity.current) {
      identity.current = { id: crypto.randomUUID(), startedAt: Date.now() };
      event("coverage_review_start");
    }
    setValue("submissionId", identity.current.id);
    setValue("startedAt", identity.current.startedAt);
  }
  function move(next: number) {
    setStep(next);
    setStatus("");
    requestAnimationFrame(() => heading.current?.focus());
  }
  async function next() {
    ensureIdentity();
    const fields: FieldPath<CoverageInput>[] =
      step === 1
        ? ["need"]
        : [
            "firstName",
            "lastName",
            "email",
            "phone",
            "zip",
            "people",
            "currentCoverage",
            "startDate",
            "preferredContact",
            "bestTime",
            "message",
            ...(need === "Small business"
              ? ([
                  "businessName",
                  "employees",
                  "groupCoverage",
                ] as FieldPath<CoverageInput>[])
              : []),
          ];
    if (await trigger(fields, { shouldFocus: true })) {
      event("step_completion", String(step));
      move(step + 1);
    }
  }
  async function send() {
    if (busyRef.current) return;
    ensureIdentity();
    if (!(await trigger(undefined, { shouldFocus: true }))) return;
    busyRef.current = true;
    setBusy(true);
    setStatus("");
    try {
      const result = await submitLead(getValues());
      if (result.status === "development") {
        setStatus(
          "Development test completed. No inquiry was delivered. Configure a lead provider before launch.",
        );
        event("form_completion", "development");
      } else {
        event("form_completion", "coverage");
        router.push("/thank-you");
      }
    } catch (e) {
      setStatus(
        e instanceof Error ? e.message : "Please try again or call us.",
      );
      event("form_error", "coverage");
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }
  const field = (
    key: FieldPath<CoverageInput>,
    label: string,
    extra: Partial<FieldProps> = {},
  ) => (
    <Field
      key={key}
      label={label}
      registration={register(
        key,
        extra.type === "number" ? { valueAsNumber: true } : undefined,
      )}
      error={errors[key]?.message}
      {...extra}
    />
  );
  return (
    <>
      <ol className="form-steps" aria-label="Coverage review progress">
        {["Your coverage need", "A few basic details", "Review & consent"].map(
          (s, i) => (
            <li key={s} aria-current={step === i + 1 ? "step" : undefined}>
              {i + 1}. {s}
            </li>
          ),
        )}
      </ol>
      <form
        className="form-panel"
        noValidate
        onFocus={ensureIdentity}
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) void next();
          else void send();
        }}
      >
        <Honeypot registration={register("website")} />
        <h2 ref={heading} tabIndex={-1}>
          {step === 1
            ? "What brings you here?"
            : step === 2
              ? "Let’s start with the basics."
              : "Ready for a personal conversation?"}
        </h2>
        <p>
          {step === 1
            ? "Choose the path that best describes your situation."
            : step === 2
              ? "Only general details for now. Fields marked * are required."
              : site.response}
        </p>
        {step === 1 && (
          <>
            <fieldset className="form-choices">
              <legend className="sr-only">Coverage need</legend>
              {coverageTypes.map((type) => (
                <label key={type} className="form-choice">
                  <input
                    type="radio"
                    value={type}
                    {...register("need", {
                      onChange: (e) =>
                        event("coverage_type_selected", e.target.value),
                    })}
                  />
                  {type}
                </label>
              ))}
            </fieldset>
            <p className="fine">
              <LockKeyhole
                size={14}
                style={{ display: "inline", verticalAlign: "middle" }}
              />{" "}
              No medical details. No obligation. This form does not enroll you
              in coverage.
            </p>
          </>
        )}
        {step === 2 && (
          <div className="field-grid">
            {field("firstName", "First name", {
              required: true,
              autoComplete: "given-name",
            })}
            {field("lastName", "Last name", {
              required: true,
              autoComplete: "family-name",
            })}
            {field("email", "Email", {
              type: "email",
              required: true,
              autoComplete: "email",
            })}
            {field("phone", "Phone", {
              type: "tel",
              required: true,
              autoComplete: "tel",
            })}
            {field("zip", "ZIP code", {
              required: true,
              autoComplete: "postal-code",
            })}
            {field("people", "People seeking coverage", {
              type: "number",
              required: true,
              min: 1,
              max: 100,
            })}
            {field("currentCoverage", "Current coverage", {
              required: true,
              options: [
                "Employer plan",
                "Individual or family plan",
                "No current coverage",
                "Coverage ending",
                "Other / unsure",
              ],
            })}
            {field("startDate", "Desired coverage start date", {
              type: "date",
              required: true,
              hint: "A preferred date, not a guaranteed effective date.",
            })}
            {field("preferredContact", "Preferred contact method", {
              required: true,
              options: ["Phone", "Email"],
            })}
            {field("bestTime", "Best general contact time", {
              required: true,
              options: ["Morning", "Afternoon", "Evening", "Any time"],
            })}
            {need === "Small business" && (
              <>
                {field("businessName", "Business name", {
                  required: true,
                  full: true,
                  autoComplete: "organization",
                })}
                {field("employees", "Approximate eligible employees", {
                  required: true,
                  type: "number",
                  min: 1,
                  max: 10000,
                })}
                {field("groupCoverage", "Current group coverage status", {
                  required: true,
                  options: [
                    "Currently offered",
                    "Not currently offered",
                    "Unsure",
                  ],
                })}
              </>
            )}
            {field("message", "Short message (optional)", {
              type: "textarea",
              full: true,
              hint: site.sensitiveNotice,
            })}
          </div>
        )}
        {step === 3 && (
          <>
            <dl className="form-summary">
              <div>
                <dt>Coverage need</dt>
                <dd>{getValues("need")}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>
                  {getValues("firstName")} {getValues("lastName")}
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{getValues("email")}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{getValues("phone")}</dd>
              </div>
              <div>
                <dt>Preferred contact</dt>
                <dd>
                  {getValues("preferredContact")} · {getValues("bestTime")}
                </dd>
              </div>
              <div>
                <dt>Desired start</dt>
                <dd>{getValues("startDate")}</dd>
              </div>
            </dl>
            <p className="fine">
              Please check your contact details. You can go back to edit them.
              Submitting starts a conversation and does not enroll you in
              insurance.
            </p>
            <Consent
              registerConsent={register("consent")}
              registerSms={register("smsConsent")}
              error={errors.consent?.message}
            />
          </>
        )}
        <div aria-live="polite" aria-atomic="true">
          {status && (
            <p className="form-alert" role="status">
              {status}
            </p>
          )}
          {busy && <p>Sending your inquiry securely…</p>}
        </div>
        <div className="form-controls">
          {step > 1 ? (
            <button
              type="button"
              className="button button-outline"
              onClick={() => move(step - 1)}
              disabled={busy}
            >
              Back
            </button>
          ) : (
            <span className="fine">Step {step} of 3</span>
          )}
          <button className="button" type="submit" disabled={busy}>
            {busy
              ? "Sending…"
              : step === 3
                ? "Request my coverage review"
                : "Continue"}
            <ArrowRight size={17} />
          </button>
        </div>
      </form>
    </>
  );
}
export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const identity = useRef<{ id: string; startedAt: number } | null>(null);
  const busyRef = useRef(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      kind: "contact",
      name: "",
      email: "",
      phone: "",
      preferredContact: "Email",
      message: "",
      consent: false,
      smsConsent: false,
      website: "",
      submissionId: "",
      startedAt: 0,
    },
  });
  function initialize() {
    if (!identity.current)
      identity.current = { id: crypto.randomUUID(), startedAt: Date.now() };
    setValue("submissionId", identity.current.id);
    setValue("startedAt", identity.current.startedAt);
  }
  return (
    <form
      className="form-panel"
      noValidate
      onFocus={initialize}
      onSubmit={(e) => {
        void handleSubmit(async (data) => {
          if (busyRef.current) return;
          busyRef.current = true;
          setStatus("");
          try {
            const result = await submitLead(data);
            if (result.status === "development")
              setStatus(
                "Development test completed. No inquiry was delivered. Configure a lead provider before launch.",
              );
            else {
              event("form_completion", "contact");
              router.push("/contact-thank-you");
            }
          } catch (e) {
            setStatus(e instanceof Error ? e.message : "Please try again.");
            event("form_error", "contact");
          } finally {
            busyRef.current = false;
          }
        })(e);
      }}
    >
      <h2>Ask us a question.</h2>
      <p className="fine">Fields marked * are required. {site.response}</p>
      <Honeypot registration={register("website")} />
      <div className="field-grid">
        <Field
          label="Name"
          registration={register("name")}
          error={errors.name?.message}
          required
          autoComplete="name"
        />
        <Field
          label="Email"
          registration={register("email")}
          error={errors.email?.message}
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label="Phone (required for a callback)"
          registration={register("phone")}
          error={errors.phone?.message}
          type="tel"
          autoComplete="tel"
        />
        <Field
          label="Preferred reply method"
          registration={register("preferredContact")}
          error={errors.preferredContact?.message}
          options={["Email", "Phone"]}
          required
        />
        <Field
          label="Your question"
          registration={register("message")}
          error={errors.message?.message}
          type="textarea"
          hint={site.sensitiveNotice}
          full
          required
        />
      </div>
      <Consent
        registerConsent={register("consent")}
        error={errors.consent?.message}
      />
      <div aria-live="polite">
        {status && <p className="form-alert">{status}</p>}
        {isSubmitting && <p>Sending your inquiry…</p>}
      </div>
      <button
        className="button"
        style={{ marginTop: 25 }}
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Sending…" : "Send my question"}
        <ArrowRight size={17} />
      </button>
    </form>
  );
}

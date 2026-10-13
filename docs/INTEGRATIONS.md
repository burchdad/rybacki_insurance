# Lead integration and security

## Typed contract

Implement `LeadAdapter.deliver(lead: Lead): Promise<DeliveryReceipt>` in `src/lib/lead-adapter.ts`. `Lead` is a discriminated union of coverage and contact data, inferred from the Zod schemas. Validation strips unknown fields and neutralizes markup delimiters; consumers must still escape output appropriately. The optional message is plain text, limited to 1,200 characters, and accompanied by a prominent sensitive-information warning. Automated filtering cannot guarantee that a visitor will never type medical information; receiving systems must be reviewed accordingly.

The provided adapter posts JSON containing `schemaVersion: 1`, `lead`, `consentVersion` and `receivedAt`. Authentication uses `Authorization: Bearer …`. `Idempotency-Key` contains the random submission UUID. Redirects are rejected; timeout is 10 seconds. A non-2xx response is treated as failure. Responses and provider errors are never logged or exposed to visitors.

The receiver must persist the inquiry before returning 2xx, enforce its own validation/authentication, deduplicate keys for at least 24 hours, honor consent flags, and monitor delivery failures. A timeout can happen after the provider accepts a lead; deduplication at the receiver is therefore essential for a safe retry. Do not point this endpoint at an arbitrary service that returns success without saving the inquiry.

## Abuse controls and durability

- Same-origin POST JSON only; production origin comes from `NEXT_PUBLIC_SITE_URL`.
- Maximum body size 16 KB, checked while streaming as well as against the header.
- Honeypot and a 1.5-second minimum interaction interval.
- Eight attempts per 15-minute hashed IP bucket; the hash is HMAC-SHA256 with a server secret.
- Redis uses an atomic Lua increment/expiry operation for rate limiting and `SET NX` to claim submissions.
- Completed requests return success without another delivery. Pending requests return 409. IDs expire after 24 hours. A crash while pending may require direct agency contact; the UI never claims that a pending request succeeded.
- No credentials or lead bodies enter the client bundle, URL, analytics or application logs.
- In-memory controls are strictly for development. Production requires Redis and a secret.

The Vercel-provided IP header is only trusted when `VERCEL` is set. On another host, add a documented trusted-proxy integration before public traffic. Redis receives a hashed IP, random UUID and processing state, not contact details. Review subprocess/provider retention and access controls before launch.

## Calendly

The verified link from the existing agency homepage opens Calendly in a new tab. No embed or calendar script loads until interaction. Opening the calendar is not a booking confirmation. A verified Calendly webhook could later emit `appointment_booking_confirmation` without customer identifiers, after signature verification and replay protection; that integration is not configured here.

## Analytics, retention and operations

Optional analytics require both the build-time flag and affirmative visitor consent. Disable immediately through the footer preference. Sensitive fields are never event properties. Set a retention policy in the receiving CRM; the website itself keeps no inquiry database. `LEAD_RETENTION_DAYS` is only a placeholder. No period is approved or enforced by this code. The receiving provider’s administrator must implement the owner-approved schedule.

Set up provider delivery alerts, a named owner for unanswered inquiries and monitoring of aggregate endpoint error counts. Do not capture request bodies in error reporting or reverse-proxy logs. No claim of HIPAA compliance is made.

## Existing Jotform intake — September 17 revision

The current homepage publicly links https://form.jotform.com/261974651459066 (RIA Health Insurance Intake Form v1.0). `/coverage-review` now embeds that exact form, with a direct-link fallback. Its card layout, wording, conditional questions and submission handling remain owned by Jotform. No question values are copied into our API, query strings or analytics. Legacy `need` links still open the same form; no unverified Jotform field mapping is attempted. The previous local CoverageReviewForm remains unused; ContactForm still uses the existing lead adapter and requires its own configured provider.

The surrounding site palette is controlled locally; the embedded form theme must be changed in its Jotform account. Public inspection cannot verify email recipients, reminder rules, CRM integrations or delivery. Before launch, inspect those settings with account access and run an owner-authorized end-to-end submission. No live submission was made during this revision.

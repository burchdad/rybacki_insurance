# Content provenance and migration

Reviewed 2026-09-16. The local workspace contained only an empty Git repository. The supplied GitHub repository returned no refs; no existing code, assets, instructions, test suite or package manager needed preservation. The new project uses npm, TypeScript, Next.js App Router, Tailwind CSS, Lucide, React Hook Form and Zod. No component library was added for primitives already provided accessibly by native HTML.

## Source inventory

- [Existing homepage](https://www.rybackiinsuranceagency.com/): address, contact information, office hours and the linked Calendly consultation URL.
- [Existing biography](https://www.rybackiinsuranceagency.com/meet-the-team): Tyler service, family introduction and the published 23-state list. Confirm those details with the owner before launch.
- [Existing reviews](https://www.rybackiinsuranceagency.com/reviews): one short, exact excerpt attributed to Kristy Daniels-Beckham. It is clearly labeled as an excerpt. No individual platform attribution was verified, so the source is the agency’s existing page. Other named reviews and video reviews are intentionally not invented; obtain an approved export to expand the content collection.
- The user’s brief supplies the positioning, business identity, audiences and licensed-state list. The count is derived from the central 23-entry list; no 33-state claim is used.
- HealthCare.gov official pages linked within FAQs and articles support general coverage distinctions. No enrollment deadline, subsidy threshold, tax outcome or guaranteed eligibility is invented. Starter guides need editorial approval and final publication dates before public launch.

## Permanent redirects

| Previous route   | Destination               |
| ---------------- | ------------------------- |
| `/home`          | `/`                       |
| `/meet-the-team` | `/about-steven-rybacki`   |
| `/faqs-4`        | `/health-insurance-faq`   |
| `/blog-1-1`      | `/resources`              |
| `/new-page`      | `/licensed-states`        |
| `/texas`         | `/texas-health-insurance` |

Next.js returns permanent 308 redirects. Obtain the old Squarespace sitemap and blog export before DNS cutover. Individual article URLs were not supplied and must be matched by content to a new article or intentionally retained. Do not blindly redirect every unknown article to the library; unrelated replacements can be treated as soft 404s.

## Editorial decisions

The main headline is a shorter, human-centered alternative to the brief’s recommended wording; the audience and Texas coverage intent remain visible directly beneath it and in the title metadata. The visual identity combines navy and amber with a restrained serif, a clear coverage selector and direct call/scheduling links.

The photo area is explicitly labeled, as requested when no approved repository assets exist. No fake likeness or stock stand-in is used. Business hours are transcribed from the existing site, not inferred. No unverified social profile or carrier logo appears. Licensing and legal review notes remain visible so a preview cannot be mistaken for an approved launch version.

## CMS migration

Retain the current types while replacing array imports with a server-side loader. Preserve slugs and published/updated dates, validate incoming data with a schema, and review every statement before publication. Render rich text using an escaped/allowlisted renderer. Keep secrets and lead integration outside content fields.

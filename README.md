# Rybacki Insurance Agency

A complete Next.js App Router replacement for the agency’s Squarespace website. Navy, warm amber and editorial typography support a calm, personal coverage conversation. The homepage is followed by five distinct service pages, biography, reviews, FAQ, a seven-guide resource library, licensed states, contact, a three-step coverage review, legal drafts, confirmation and 404 pages.

## Run locally

Requires Node.js 20.9+ and npm. The committed lockfile is authoritative.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://127.0.0.1:3000. On PowerShell, use `Copy-Item .env.example .env.local` instead of `cp` if preferred. Default forms return a visible delivery-unavailable message; they do not discard production leads or claim success.

For a **fictional-data-only development simulation**, set `LEAD_ADAPTER=development` and restart. The form explicitly reports that nothing was delivered. This adapter is prohibited in production. No inquiry payloads are written to disk or logs.

## Verify

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts the dev server when needed. Browser tests cover all pages and internal links, metadata, axe accessibility checks, redirects, mobile focus, four widths, and form journeys. The success UI test intercepts the API; server tests separately exercise delivery using a mocked webhook. Real CRM acceptance must be tested after credentials are configured. On OneDrive, a locked previous test-results directory may require a fresh output path: `npm run test:e2e -- --output=test-results/new-run`.

If your shell wrapper drops forwarded npm arguments, use `node node_modules/@playwright/test/cli.js test --output=test-results/new-run` directly. If OneDrive locks an old `.next` directory, set a fresh `NEXT_DIST_DIR` for the build (PowerShell: `$env:NEXT_DIST_DIR='.next-local-build'`) and run `npm run build`. Use the same value for `npm start`, and clear it before returning to the default preview. This setting is optional; Vercel uses `.next` normally.

## Content and architecture

- `src/content/site.ts`: business identity, hours, 23 states, contact/consent/disclaimer copy, social profiles, calendar link and testimonial excerpt.
- `src/content/services.ts`: five service narratives, limitations and audience-specific FAQs.
- `src/content/faqs.ts`: 16 editable FAQs and official source links.
- `src/content/articles.ts`: seven typed starter guides, dates, sections and sources. These data objects can be replaced with a CMS/MDX loader without changing the article presentation components.
- `src/content/legal.ts`: clearly marked drafts requiring professional review.
- `src/components/`: reusable navigation, layout, cards, FAQ, CTA, form, analytics and business-information components.
- `src/app/[slug]/page.tsx`: statically generated service and informational routes, with unknown slugs rejected.
- `src/app/api/leads/route.ts`: bounded POST-only intake, origin checks, validation, anti-spam, rate limits and idempotency.
- `src/lib/lead-adapter.ts`: typed adapter contract and HTTPS webhook implementation.

Server Components are the default. Only navigation, forms and optional analytics require client state. Local font files are optimized with `next/font/local`; no Google Fonts request is made by visitors. The ocean backdrop and Steven portrait are reused from the existing agency site following the requested visual revision, served locally through `next/image`. Their source URLs and rights-review note are in `public/images/README.md`. No new likeness was generated. The homepage uses open coverage paths, curved transitions and shorter copy; `src/app/coastal.css` carries that direction into the inner pages.

## Connect delivery

1. Configure `LEAD_ADAPTER=webhook`, `LEAD_WEBHOOK_URL` (HTTPS) and `LEAD_WEBHOOK_TOKEN` as server-only secrets.
2. Configure `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` and a high-entropy `RATE_LIMIT_SECRET`. Production fails closed without durable protection.
3. Set `NEXT_PUBLIC_SITE_URL` to the exact deployed origin. Use an appropriate preview origin for preview deployments, and the canonical public domain for production.
4. Implement the receiving endpoint described in [the integration contract](docs/INTEGRATIONS.md). It must persist accepted leads before returning 2xx and deduplicate `Idempotency-Key` values.
5. Enforce your reviewed retention schedule in the CRM. `LEAD_RETENTION_DAYS` is a configuration target for that external process, not an automatic deletion job.
6. Test an authorized fictional inquiry through the deployed website and verify it reaches the receiving system once. Do not enable advertising until this passes.

Form data stays in React Hook Form memory during recoverable errors and Back/Continue navigation. It is not saved to browser storage and is lost on reload or navigation away. Only a random idempotency ID and hashed rate-limit key are stored in Redis, with 24-hour and 15-minute lifetimes respectively. The production handler uses Vercel’s forwarded IP header; other hosts intentionally share a conservative bucket until their trusted proxy is explicitly integrated.

## Deployment

Import this GitHub repository into Vercel, select Next.js, use `npm ci` and `npm run build`, and configure the environment above. Deploy a protected preview, complete [the launch checklist](docs/LAUNCH-CHECKLIST.md), then attach the domain. There is no static export: forms require the Node.js runtime. No deployment or live domain changes have been made as part of the source implementation.

## Important handoff documents

- [Launch checklist and required assets](docs/LAUNCH-CHECKLIST.md)
- [Content provenance and migration map](docs/CONTENT-MIGRATION.md)
- [Lead provider and security contract](docs/INTEGRATIONS.md)
- [Analytics event map](docs/ANALYTICS.md)
- [Verification results and limitations](docs/VERIFICATION.md)

Legal drafts, licensed-state confirmation, approved photos, CRM credentials and an end-to-end provider acceptance test remain owner launch tasks. No HIPAA-compliance claim, unverified star rating, savings guarantee or Medicare-selling claim is made.

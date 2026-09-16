# Launch checklist

## Owner assets and content

- [ ] Approved Steven portrait, preferably 1600×2000 or larger, with enough space for a 4:5 crop; confirm publication rights. Replace `PhotoPlaceholder` with `next/image` and descriptive alt text.
- [ ] Optional approved Steven and Sarah image for the biography, around 1600×1200; approved downtown Tyler or office image, around 1800×1200, if desired. No additional photos are required for layout integrity.
- [ ] Original vector logo, if the owner wants it instead of the typographic wordmark.
- [ ] Confirm agent name, phone, email, office address, hours/time zone, response expectation and current calendar availability.
- [ ] Verify every entry in the 23-state license list against current records and confirm which products are available.
- [ ] Approve the testimonial excerpt, provide approved full testimonials/platform URLs, and remove the old-site attribution dependency after migration if appropriate.
- [ ] Supply verified social links. The empty social collection intentionally renders no invented profiles.
- [ ] Review the seven resource guides and replace their starter publication dates with actual approved dates. Remove editorial notices only after approval.
- [ ] Have qualified counsel review privacy, terms, disclaimer, contact consent, SMS consent and cookie/analytics disclosures. Identify the actual lead provider and retention schedule in the privacy page.

## Integrations and operations

- [ ] Configure production HTTPS lead webhook, token, Redis credentials and HMAC rate-limit secret.
- [ ] Confirm webhook receiver persistence and idempotency before it returns success.
- [ ] Submit an authorized fictional lead through production and verify exactly one record arrives. Test both forms and failure recovery.
- [ ] Apply the reviewed retention schedule in the receiving provider. Set a responsible contact for provider failure alerts and unhandled inquiries.
- [ ] Do not send texts until the provider configuration, consent handling, STOP/HELP behavior and messaging requirements have been reviewed.
- [ ] Verify the Calendly event still accepts bookings. Booking confirmation analytics require a separate verified integration.
- [ ] If enabling analytics, test opt-in, decline and withdrawal and confirm no personal data reaches events or URLs.

## Hosting and migration

- [ ] Deploy a protected Vercel preview with the correct preview origin. Never use real health information in testing.
- [ ] Set the final production canonical origin before building the public deployment.
- [ ] Inventory old blog URLs using Squarespace export, sitemap and Search Console; add content-specific redirects.
- [ ] Confirm all six existing redirect rules, sitemap, robots, Open Graph image and custom 404 on the deployed host.
- [ ] Test keyboard-only navigation, screen-reader announcements and real iOS/Android browsers; check 200% zoom.
- [ ] Run Lighthouse/Core Web Vitals against the production deployment after approved images are installed. Automated axe checks do not certify complete WCAG conformance.
- [ ] Check HTTPS, DNS, security headers, form origin rules and provider monitoring before domain cutover.
- [ ] Keep the old site/export backed up for rollback. Submit the new sitemap and monitor missing URLs after launch.

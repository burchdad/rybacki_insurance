# October 13 review-stage changes

This branch is for review. Do not merge it into the production branch or switch the live domain until the owner approves the remaining launch items.

## Implemented

- Use Steven@RybackiInsuranceAgency.com consistently, including structured data.
- Use “Start My Coverage Review” for primary intake buttons, agency “we/our/us” wording and the requested audience language. Preserve the original customer review.
- Keep the exact existing JotForm URL and field flow. Explain relevant health questions, phone/screen-sharing appointments, office visits by appointment, and that intake does not create coverage.
- Remove public pre-intake Calendly shortcuts from navigation, footer, contact, about and shared calls to action. The coverage thank-you page retains the existing calendar link. General contact confirmation now has its own noindex page without a scheduling bypass.
- Expose Existing Client Help in navigation and on Contact using the verified agency phone and email, with no new-prospect questionnaire. The owner's preferred service workflow still needs confirmation.
- Stop promising unconfirmed group, level-funded or Medicare services. Keep small-business-owner coverage guidance while requiring confirmation of the services actually offered.
- Add USHEALTH Advisors / Freedom Life affiliation and permission-based referral wording grounded in the current public privacy policy: https://www.rybackiinsuranceagency.com/privacy-policy.
- Add the missing `/lets-find-your-options` redirect and a content-specific redirect for the indexed Tyler article. All eight legacy rules explicitly use 301. Query strings are preserved.
- Add a six-section Tyler guide with official consumer-information sources, a self-referencing canonical, sitemap entry, and links from the homepage and Texas page. This remains editorial-review copy. The existing Texas, family, self-employed and comparison pages remain distinct destinations.
- Remove the unsupported 30-day retention target from the privacy draft and environment example. Distinguish the general contact form from JotForm intake. This does **not** finalize or approve legal policy.

## Checks

- Typecheck, lint, production build and 20 unit tests passed locally.
- HTTP smoke checks cover built routes, internal destinations, canonical tags, calendar isolation, public email, noindex confirmation pages, 301 redirects, sitemap, robots and Open Graph image.
- Browser regression tests cover 1440, 768, 390 and 320px layouts, keyboard navigation, serious/critical axe findings, CTA consistency, client help, iframe/fallback preservation, contact errors and legacy routes. CI captures screenshots and test reports.
- Browser tests use a static JotForm fixture. They do not validate or submit the real questionnaire or prove any email was delivered.

## Dependency review

The inherited lockfile contained Next.js 16.3.5, sharp 0.35.4 and source-map-js 1.2.1. This branch updates to Next.js/eslint-config-next 16.3.8, sharp 0.35.5 and source-map-js 1.2.2. The production dependency audit reports zero known vulnerabilities on October 13. This is not a general security certification.

The full development-tool audit still flags the unpatched braces/micromatch/fast-glob chain under eslint-config-next. The registry's suggested major downgrade is not applied. These are build/lint dependencies; restrict them to trusted repository input and revisit when the upstream fix is available.

The critical Next.js ImageResponse advisory requires attacker-controlled SVG input. This site's Open Graph image uses static content; no matching exploitation path was identified. The patch is retained as preventive maintenance. Official advisories: https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j and https://github.com/advisories/GHSA-wq5f-xc86-pv6w.

## Remaining launch decisions and account-level checks

1. Confirm the exact circular anchor-and-rope logo asset, agent/contact/address/hours details, licensed states and final service list. The current original agency image asset is preserved, not replaced with an invented mark.
2. Confirm the actual existing-client service process. The review now offers the verified phone/email channels, but no service portal, response-time promise or unverified workflow was invented.
3. Inspect the existing JotForm's family and spouse-only paths, destination records, notification recipients, integrations, post-submit URL and scheduling-link email. Connect the post-submit URL only after approving the deployment destination. The website cannot configure these account-owned settings.
4. Verify Calendly booking, confirmations, reminders, rescheduling and cancellation with an authorized fictional test and approved test email. No live booking or intake submission was made.
5. The separate Contact form still requires its approved persistence/delivery provider and production rate-limit/idempotency configuration. It fails safely when unconfigured. A generic email inbox alone does not complete this integration. Do not publish a functioning-looking form until successful delivery and retry/error behavior are verified.
6. Finalize privacy from the current September 22 policy, including carrier/referral/provider disclosures, JotForm, Calendly, applicable analytics/ads, access, retention, choices and authorized guardian information. Verify agreements/settings, and approve terms/consent copy. The draft warnings remain intentionally visible in this review.
7. Inventory the existing Google Analytics, Ads, GTM, Search Console and Meta setup; preserve accounts/history. No accounts, campaigns, tracking IDs or budgets were changed. Separate button, completed-intake and confirmed-booking events without duplicate conversions or personal data. No JotForm completion or Calendly booking webhook is configured by this branch.
8. Export/back up the current site and complete the old-URL inventory. Preserve `www`, HTTPS, email/DNS and Squarespace dependencies. Review current Search Console exclusions and redirect mappings. Broader keyword/competitor work is optional and is not a prerequisite for fixing the verified issues above.
9. Obtain owner approval of copy, legal policy, testing summary, launch date, support owner/scope and any costs. No new cost or completion-date commitment has been made. Keep the existing site operating until this is approved.
10. After an authorized launch, verify immediately, monitor closely for two days, then check daily for the next week. No domain cutover, service cancellation or production promotion was performed here.

## Reproduce

The inherited package lock requires `npm ci --legacy-peer-deps` with this npm version. Then run lint, typecheck, unit tests, build, and Playwright. CI uses Node 24, matching the hosting project. Optional `PORT` and `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` support an already-installed local browser; neither changes production configuration.

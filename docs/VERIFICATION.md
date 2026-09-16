# Verification results

Verified locally on 2026-09-16 using Node 20.19.4 and the locked dependency versions.

The final production build used `NEXT_DIST_DIR=.next-verify` because OneDrive held a lock on an older output directory. This changes only the build-output location, not application behavior.

| Check                             | Result                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| TypeScript strict checking        | Passed                                                                                                                    |
| ESLint                            | Passed without warnings                                                                                                   |
| Prettier                          | Passed                                                                                                                    |
| Unit tests                        | 20 passed across validation, API, webhook adapter, rate limiting and idempotency                                          |
| Production build                  | Passed; all requested routes generated or server-rendered                                                                 |
| Browser suite                     | 7 passed                                                                                                                  |
| Page and link crawl               | 24 content routes plus every discovered internal link returned successfully                                               |
| Accessibility                     | No serious or critical axe violations across all 24 content routes                                                        |
| Heading and metadata              | One H1, unique title, description and canonical verified per content route                                                |
| Legacy redirects                  | All six returned 308 to the correct destination                                                                           |
| Sitemap, robots and unknown route | Verified 200/200/404 respectively                                                                                         |
| Responsive overflow               | None at 320, 390, 768 and 1440 pixels on home, service, review, contact, resources and licensed states                    |
| Mobile navigation                 | Focus containment, Escape close and trigger focus restoration passed                                                      |
| Form flow                         | Validation, separate unchecked SMS consent, business fields, Medicare referral, recoverable error and confirmation passed |
| Real unconfigured API             | Returns an explicit failure; browser entries remain available                                                             |
| Dependency audit                  | No known vulnerabilities reported                                                                                         |

Desktop and phone screenshots were visually inspected. Browser checks used Chromium and agent-browser; Playwright and axe provide repeatable tests in the repository. The initial browser pass caught contrast issues, a mobile dialog focus-cycle edge case and a development origin mismatch; each was corrected before the passing run.

The covered customer journey is: audience selection → coverage details → consent → POST validation → adapter response → visible error or confirmation. Browser success responses are intercepted in the UI test. Unit tests independently exercise the actual API route and HTTPS adapter using a mocked provider. **No real CRM acceptance or production delivery is claimed.** A connected provider, durable Redis service and deployed-host acceptance test remain required before launch.

## Limits of these results

- Automated accessibility checks are not a WCAG certification. Manual screen-reader, zoom and real-device testing remains on the launch checklist.
- No live deployment, custom-domain cutover or carrier enrollment integration has been performed.
- No Lighthouse score or field Core Web Vitals result is claimed. Performance should be measured on the final hosted build with approved images.
- Legal pages and starter guides are labeled drafts. Portraits remain clearly identified placeholders until the owner supplies approved assets.
- Only a verified short review excerpt is included. Additional testimonials, video and social links require approved content.
- External booking confirmation and downstream retention are integration tasks, not simulated features.
- Generic forms discourage sensitive data and have no medical-history fields. They cannot prevent every visitor from typing sensitive text; receiving-system handling still requires review.

Repeat the documented checks after changing content, fonts, approved photos, provider configuration or deployment settings.

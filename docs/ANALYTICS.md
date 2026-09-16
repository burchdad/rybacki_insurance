# Analytics event map

Disabled by default. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` only after reviewing disclosure and consent obligations. Visitors must opt in before the Vercel Analytics component loads. The footer allows withdrawal. The only local-storage key is `analytics-consent`; no form values are persisted.

| Event                              | Trigger                                         | Allowed property                                                   |
| ---------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| `primary_cta_click`                | Review CTA click                                | None                                                               |
| `phone_click`                      | Telephone link                                  | None                                                               |
| `email_click`                      | Email link                                      | None                                                               |
| `coverage_review_start`            | First interaction with the review               | None                                                               |
| `coverage_type_selected`           | Coverage radio choice                           | Coverage enum only                                                 |
| `step_completion`                  | Validated review step                           | Step number string                                                 |
| `form_completion`                  | Confirmed delivery response                     | `coverage`, `contact`; `development` for explicit local simulation |
| `form_error`                       | Delivery request failure                        | Form kind only                                                     |
| `calendar_opened`                  | Calendly link                                   | None                                                               |
| `resource_cta_click`               | Article consultation CTA                        | None                                                               |
| `appointment_booking_confirmation` | Reserved for a verified future Calendly webhook | Not currently emitted                                              |

URL query strings and fragments are stripped from analytics events. There are no name, email, phone, ZIP, date, message, medical, income or birth-date event properties. No automatic form-capture integration is installed. Provider logs and dashboard configuration must also be reviewed before enabling analytics. An open calendar and a successfully delivered lead are separate from a confirmed appointment.

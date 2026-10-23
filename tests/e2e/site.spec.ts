import { test, expect } from "@playwright/test";
import path from "node:path";
import { services } from "../../src/content/services";
import { articles } from "../../src/content/articles";
// Site-shell regression tests intentionally do not submit to or depend on JotForm.
// Its family/spouse branches, saved records and notifications need account-level QA.
test.beforeEach(async ({ page }) => {
  await page.route("https://form.jotform.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html lang='en'><title>Intake fixture</title><body><main>Existing provider form fixture</main></body></html>",
    }),
  );
});
const routes = [
  "/",
  "/about-steven-rybacki",
  "/reviews",
  "/health-insurance-faq",
  "/licensed-states",
  "/contact",
  "/coverage-review",
  "/resources",
  "/privacy-policy",
  "/terms",
  "/accessibility",
  "/thank-you",
  "/contact-thank-you",
  ...services.map((s) => `/${s.slug}`),
  ...articles.map((a) => `/resources/${a.slug}`),
];
test("mobile contact actions follow the hero and stay off forms", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const actions = page.locator(".mobile-actions");
  await expect(actions).toBeHidden();
  await expect(page.locator(".header-cta")).toBeHidden();
  await page.locator(".ocean-hero").evaluate((hero) => {
    window.scrollTo({
      top: hero.getBoundingClientRect().bottom + window.scrollY + 1,
      behavior: "instant",
    });
  });
  await expect(actions).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(actions).toBeHidden();
  for (const route of ["/coverage-review", "/contact", "/thank-you"]) {
    await page.goto(route);
    await expect(actions).toBeHidden();
  }
});

test("all routes, headings, metadata, accessibility and internal links", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title), route).toBe(false);
    titles.add(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.rybackiinsuranceagency.com${route === "/" ? "" : route}`,
    );
    expect(
      await page.locator('meta[name="description"]').getAttribute("content"),
    ).toBeTruthy();
    expect(await page.locator("img:not([alt])").count()).toBe(0);
    await page.addScriptTag({
      path: path.resolve("node_modules/axe-core/axe.min.js"),
    });
    const violations = await page.evaluate(async () => {
      const axe = (
        window as unknown as {
          axe: {
            run: () => Promise<{
              violations: {
                id: string;
                impact: string;
                nodes: { target: string[] }[];
              }[];
            }>;
          };
        }
      ).axe;
      return (await axe.run()).violations
        .filter((v) => v.impact === "critical" || v.impact === "serious")
        .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) }));
    });
    expect(violations, route).toEqual([]);
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")!)))
      links.add(href);
  }
  for (const href of links) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});
test("legacy redirects, sitemap, robots and 404", async ({ request, page }) => {
  const redirects: Record<string, string> = {
    "/home": "/",
    "/meet-the-team": "/about-steven-rybacki",
    "/faqs-4": "/health-insurance-faq",
    "/blog-1-1": "/resources",
    "/lets-find-your-options": "/coverage-review",
    "/blog-1-1/choosing-the-best-health-insurance-with-rybacki-insurance-agency-in-tyler-tx":
      "/resources/choosing-health-insurance-tyler",
    "/new-page": "/licensed-states",
    "/texas": "/texas-health-insurance",
  };
  for (const [from, to] of Object.entries(redirects)) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(301);
    expect(res.headers().location).toBe(to);
  }
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /api/",
  );
  const missing = await page.goto("/missing-page");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "different path",
  );
});
test("responsive pages fit desktop, tablet and phone", async ({ page }) => {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 950 });
    for (const route of [
      "/",
      "/individual-family-health-insurance",
      "/coverage-review",
      "/contact",
      "/resources",
      "/licensed-states",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
    await page.goto("/");
    await page.screenshot({
      path: `test-results/home-${width}.png`,
      fullPage: true,
    });
  }
});
test("mobile dialog traps focus, closes with Escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  for (let i = 0; i < 18; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        Boolean(document.activeElement?.closest("dialog")),
      ),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
});
test("coverage review preserves the existing Jotform and offers a direct fallback", async ({
  page,
}) => {
  await page.route("https://form.jotform.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html lang='en'><title>Intake fixture</title><body><main>Existing provider form</main></body></html>",
    }),
  );
  const response = await page.goto("/coverage-review?need=Small%20business");
  expect(response?.headers()["content-security-policy"]).toContain(
    "frame-src https://form.jotform.com",
  );
  const frame = page.getByTitle(
    "Rybacki Insurance health insurance questionnaire",
  );
  await expect(frame).toBeVisible();
  await expect(frame).toHaveAttribute(
    "src",
    "https://form.jotform.com/261974651459066",
  );
  await expect(
    page.getByRole("link", { name: "Open the questionnaire in a new tab" }),
  ).toHaveAttribute("href", "https://form.jotform.com/261974651459066");
  await expect(page.locator("form")).toHaveCount(0);
});
test("contact callback requires a phone and displays real unconfigured-provider failure", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: false }).first().fill("Test Visitor");
  await page
    .getByLabel("Email", { exact: false })
    .first()
    .fill("test@example.com");
  await page.getByLabel("Preferred reply method").selectOption("Phone");
  await page.getByLabel("Your question").fill("Fictional test question");
  await page.getByLabel(/^I agree that/).check();
  await page.getByRole("button", { name: "Send my question" }).click();
  await expect(
    page.getByText("A phone number is required for a callback."),
  ).toBeVisible();
  await page.getByLabel("Phone (required").fill("9035550100");
  // Exercise the delivery branch after the real anti-bot minimum interval.
  await page.waitForTimeout(1600);
  await page.getByRole("button", { name: "Send my question" }).click();
  await expect(
    page.getByText("Your inquiry could not be confirmed."),
  ).toBeVisible();
  await expect(page.getByLabel("Your question")).toHaveValue(
    "Fictional test question",
  );
});

test("prospect pages keep intake first and use the approved review CTA", async ({
  page,
}) => {
  for (const route of routes.filter((route) => route !== "/thank-you")) {
    await page.goto(route);
    await expect(page.locator('a[href*="calendly.com"]'), route).toHaveCount(0);
    const buttons = page.locator(
      'a.button[href^="/coverage-review"], .mobile-actions a[href="/coverage-review"]',
    );
    for (const button of await buttons.all()) {
      await expect(button, route).toHaveText(/Start My Quote/);
    }
    await expect(
      page
        .locator('a[href="mailto:Steven@RybackiInsuranceAgency.com"]')
        .first(),
    ).toBeAttached();
    await expect(page.locator('a[href*="ushadvisors.com"]')).toHaveCount(0);
  }
  await page.goto("/thank-you");
  await expect(page.locator('a[href*="calendly.com"]')).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: /Book My Coverage Review/ }),
  ).toHaveAttribute(
    "href",
    "https://calendly.com/steven-rybacki/health-insurance-coverage-review",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
});

test("client help uses direct contact without a new intake", async ({
  page,
}) => {
  await page.goto("/contact#existing-client-help");
  const help = page.locator("#existing-client-help");
  await expect(
    help.getByRole("heading", { name: "Existing Client Help" }),
  ).toBeVisible();
  await expect(help.locator('a[href="tel:+19039417282"]')).toBeVisible();
  await expect(
    help.locator('a[href="mailto:Steven@RybackiInsuranceAgency.com"]'),
  ).toBeVisible();
  await expect(help.locator("form, iframe")).toHaveCount(0);
  await expect(
    page
      .getByText(/Most appointments take place by phone and screen sharing/)
      .first(),
  ).toBeVisible();
});

test("intake notices distinguish questionnaires from enrollment and general contact", async ({
  page,
}) => {
  await page.route("https://form.jotform.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<html lang='en'><title>Intake fixture</title><body><main>Existing provider form</main></body></html>",
    }),
  );
  await page.goto("/coverage-review");
  await expect(page.locator(".intake-notice").first()).toContainText(
    "does not enroll you in insurance or establish coverage",
  );
  await expect(page.locator(".intake-notice").first()).toContainText(
    "relevant health questions",
  );
  await page.goto("/contact-thank-you");
  await expect(page.locator('a[href*="calendly.com"]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  );
  await page.goto("/reviews");
  await expect(page.locator("blockquote")).toHaveText(
    "Steve was great to work with. He was very knowledgeable and patient with all of my questions.",
  );
});

test("migration redirects retain query strings and the Tyler destination is substantive", async ({
  request,
  page,
}) => {
  const response = await request.get(
    "/lets-find-your-options?utm_source=legacy",
    { maxRedirects: 0 },
  );
  expect(response.status()).toBe(301);
  expect(response.headers().location).toBe(
    "/coverage-review?utm_source=legacy",
  );
  await page.goto("/resources/choosing-health-insurance-tyler");
  await expect(page.locator("article h1")).toHaveText(
    "Choosing Health Insurance in Tyler, TX",
  );
  expect(await page.locator("article section").count()).toBe(6);
});

test("a confirmed general contact submission does not bypass coverage intake", async ({
  page,
}) => {
  let localRequests = 0;
  await page.route("**/api/leads", async (route) => {
    localRequests += 1;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, status: "delivered" }),
    });
  });
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: false }).first().fill("Test Visitor");
  await page
    .getByLabel("Email", { exact: false })
    .first()
    .fill("test@example.com");
  await page.getByLabel("Your question").fill("Fictional routing test only");
  await page.getByLabel(/^I agree that/).check();
  await page.getByRole("button", { name: "Send my question" }).click();
  await expect(page).toHaveURL(/\/contact-thank-you$/);
  expect(localRequests).toBe(1);
  await expect(page.locator('a[href*="calendly.com"]')).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Start My Quote/ }).first(),
  ).toHaveAttribute("href", "/coverage-review");
});

test("quote intake explains consultation and reviews have no video placeholder", async ({
  page,
}) => {
  await page.goto("/coverage-review");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Start My Quote",
  );
  await expect(page.getByText(/not an instant price/)).toBeVisible();
  await page.goto("/reviews");
  await expect(page.getByText(/Approved video testimonials/)).toHaveCount(0);
  await expect(page.locator("blockquote")).toHaveCount(1);
});

test("contact validation exposes required fields and focuses invalid callback", async ({
  page,
}) => {
  await page.goto("/contact");
  const phone = page.getByLabel("Phone (required");
  await expect(phone).not.toHaveAttribute("required");
  await expect(page.getByLabel(/^I agree that/)).toHaveAttribute(
    "required",
    "",
  );
  await page.getByLabel("Name", { exact: false }).first().fill("Test Visitor");
  await page
    .getByLabel("Email", { exact: false })
    .first()
    .fill("test@example.com");
  await page.getByLabel("Preferred reply method").selectOption("Phone");
  await expect(phone).toHaveAttribute("required", "");
  await page.getByLabel("Your question").fill("Fictional validation test only");
  await page.getByLabel(/^I agree that/).check();
  await page.getByRole("button", { name: "Send my question" }).click();
  await expect(phone).toBeFocused();
  await expect(phone).toHaveAttribute("aria-invalid", "true");
  await expect(phone).toHaveAttribute("aria-describedby", "phone-error");
  await page.getByLabel("Preferred reply method").selectOption("Email");
  await expect(phone).not.toHaveAttribute("required");
});

test("contact retains input after unconfirmed responses and retries once with same identity", async ({
  page,
}) => {
  const ids: string[] = [];
  await page.route("**/api/leads", async (route) => {
    ids.push(route.request().postDataJSON().submissionId);
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "{}",
    });
  });
  await page.goto("/contact");
  await page.getByLabel("Name", { exact: false }).first().fill("Test Visitor");
  await page
    .getByLabel("Email", { exact: false })
    .first()
    .fill("test@example.com");
  await page.getByLabel("Your question").fill("Fictional retry test only");
  await page.getByLabel(/^I agree that/).check();
  for (let i = 0; i < 2; i++) {
    await page.getByRole("button", { name: "Send my question" }).click();
    await expect(
      page.getByText(
        "Your inquiry could not be confirmed. Please try again or call us.",
      ),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.getByLabel("Your question")).toHaveValue(
      "Fictional retry test only",
    );
  }
  expect(ids).toHaveLength(2);
  expect(ids[0]).toBe(ids[1]);
});

test("confirmed owner facts keep referrals separate from intake and expose member links", async ({
  page,
}) => {
  await page.goto("/licensed-states");
  await expect(
    page.getByText("Licensed in multiple states", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/23 states|33 states/)).toHaveCount(0);
  await expect(page.locator(".states-grid")).toHaveCount(0);
  await page.goto("/contact#referral-help");
  const referral = page.locator("#referral-help");
  await expect(referral).toContainText("not Medicare-licensed");
  await expect(referral).toContainText("Matt Jubie and Gary Morazzano");
  await expect(referral.locator("iframe, form")).toHaveCount(0);
  const help = page.locator("#existing-client-help");
  await expect(
    help.getByRole("link", { name: /MyUSHG member portal/ }),
  ).toHaveAttribute("href", "https://myushg.ushealthgroup.com/");
  await expect(
    help.getByRole("link", { name: /USHEALTH Group Member Services/ }),
  ).toHaveAttribute("href", "https://www.ushealthgroup.com/member-services");
  await page.goto("/reviews");
  await expect(
    page.getByRole("link", { name: /Leave a review on Google/ }),
  ).toHaveAttribute("href", "https://g.page/r/CUm5ik5bKFWHEBM/review");
});

import { test, expect, type Page } from "@playwright/test";
import path from "node:path";
import { services } from "../../src/content/services";
import { articles } from "../../src/content/articles";
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
  ...services.map((s) => `/${s.slug}`),
  ...articles.map((a) => `/resources/${a.slug}`),
];
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
    "/new-page": "/licensed-states",
    "/texas": "/texas-health-insurance",
  };
  for (const [from, to] of Object.entries(redirects)) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
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
async function fillReview(page: Page) {
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("First name").fill("Test");
  await page.getByLabel("Last name").fill("Visitor");
  await page
    .getByLabel("Email", { exact: false })
    .first()
    .fill("test@example.com");
  await page.getByLabel("Phone", { exact: false }).first().fill("9035550100");
  await page.getByLabel("ZIP code").fill("75702");
  await page.getByLabel("Desired coverage start date").fill("2026-10-01");
}
test("review validates, preserves values on failure and confirms a successful response", async ({
  page,
}) => {
  await page.goto("/coverage-review");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Please enter your name.").first()).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await fillReview(page);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByLabel(/Optional: I agree/)).not.toBeChecked();
  await page
    .getByRole("button", { name: "Request my coverage review" })
    .click();
  await expect(
    page.getByText("Please agree to contact permission"),
  ).toBeVisible();
  await page.getByLabel(/^I agree that/).check();
  let payload: Record<string, unknown> = {};
  await page.route("**/api/leads", (route) => {
    payload = route.request().postDataJSON();
    return route.fulfill({
      status: 503,
      json: { error: "Provider unavailable. Please retry." },
    });
  });
  await page
    .getByRole("button", { name: "Request my coverage review" })
    .click();
  await expect(
    page.getByText("Provider unavailable. Please retry."),
  ).toBeVisible();
  expect(page.url()).not.toContain("test@example");
  await expect(
    page.getByText("test@example.com", { exact: true }),
  ).toBeVisible();
  expect(payload.smsConsent).toBe(false);
  await page.unroute("**/api/leads");
  await page.route("**/api/leads", (route) =>
    route.fulfill({ status: 200, json: { ok: true, status: "delivered" } }),
  );
  await page
    .getByRole("button", { name: "Request my coverage review" })
    .click();
  await expect(page).toHaveURL(/thank-you/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Thank you",
  );
});
test("small business and Medicare paths", async ({ page }) => {
  await page.goto("/coverage-review?need=Small%20business");
  await fillReview(page);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Enter the business name.")).toBeVisible();
  await page.getByLabel("Business name").fill("Example business");
  await page.getByLabel("Approximate eligible employees").fill("5");
  await page
    .getByLabel("Current group coverage status")
    .selectOption("Not currently offered");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Ready for a personal conversation?" }),
  ).toBeVisible();
  await page.goto("/coverage-review?need=Medicare%20referral");
  await expect(page.getByText("Steve can refer you")).toBeVisible();
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

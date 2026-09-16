import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { articles } from "@/content/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "about-steven-rybacki",
    "reviews",
    "health-insurance-faq",
    "resources",
    "licensed-states",
    "contact",
    "coverage-review",
    "privacy-policy",
    "terms",
    "accessibility",
    ...services.map((s) => s.slug),
    ...articles.map((a) => `resources/${a.slug}`),
  ].map((path) => ({
    url: `${site.url}/${path}`,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}

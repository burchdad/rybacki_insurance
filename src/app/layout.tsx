import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnalyticsPreferences } from "@/components/analytics";
import { JsonLd } from "@/components/ui";
import { agencySchema } from "@/lib/seo";
import { site } from "@/content/site";
import localFont from "next/font/local";
import "./globals.css";
import "./coastal.css";
const sans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
const serif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/libre-baskerville/files/libre-baskerville-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/libre-baskerville/files/libre-baskerville-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Rybacki Insurance Agency | Health Coverage Guidance in Tyler, TX",
    template: "%s | Rybacki Insurance Agency",
  },
  description:
    "Personal health coverage guidance for Texas families, self-employed professionals and small businesses. Talk with Steven Rybacki in Tyler.",
  openGraph: { images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnalyticsPreferences />
        <JsonLd data={agencySchema} />
      </body>
    </html>
  );
}

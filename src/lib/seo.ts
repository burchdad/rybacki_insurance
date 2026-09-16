import type { Metadata } from "next";
import { site } from "@/content/site";
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
export const agencySchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "@id": `${site.url}/#agency`,
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    ...site.addressParts,
  },
  founder: { "@type": "Person", name: site.agent },
};

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { site } from "@/content/site";

export function MobileActions() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const hero = document.querySelector(".ocean-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  const hidden =
    [
      "/coverage-review",
      "/contact",
      "/thank-you",
      "/contact-thank-you",
    ].includes(pathname) ||
    (pathname === "/" && !pastHero);
  return (
    <div
      className="mobile-actions"
      aria-label="Quick contact actions"
      hidden={hidden}
    >
      <a href={site.phoneHref}>
        <Phone size={17} />
        Call us
      </a>
      <Link href="/coverage-review" data-event="primary_cta_click">
        Start My Coverage Review
        <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}

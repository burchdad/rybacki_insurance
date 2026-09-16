import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileActions } from "./mobile-actions";
import { Brand } from "./header";
import { site, navigation } from "@/content/site";
import { services } from "@/content/services";
export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p>
                Clear health coverage guidance
                <br />
                without the pressure.
              </p>
              <address>
                <a href={site.map} target="_blank" rel="noopener noreferrer">
                  {site.address}
                  <span className="sr-only"> (opens map in a new tab)</span>
                </a>
              </address>
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div>
              <h2>Find your coverage path</h2>
              {services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`}>
                  {s.short}
                </Link>
              ))}
            </div>
            <div>
              <h2>A little more clarity</h2>
              {navigation.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
              <Link href="/licensed-states">Licensed states</Link>
            </div>
            <div>
              <h2>Let’s talk</h2>
              {site.hours.map((h) => (
                <p key={h}>{h}</p>
              ))}
              <p>{site.timezone}</p>
              <a
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Schedule a conversation <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <p className="footer-disclaimer">{site.disclaimer}</p>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <div>
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>
      <MobileActions />
    </>
  );
}

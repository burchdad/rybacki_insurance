"use client";
import Link from "next/link";
import { useRef } from "react";
import { Menu, X, ArrowUpRight, Phone, ChevronDown } from "lucide-react";
import { navigation, site } from "@/content/site";
import { services } from "@/content/services";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Rybacki Insurance Agency home">
      <span className="brand-mark" aria-hidden="true">
        R<span>.</span>
      </span>
      <span>
        RYBACKI<small>INSURANCE AGENCY</small>
      </span>
    </Link>
  );
}
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => {
    dialog.current?.close();
    trigger.current?.focus();
  };
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>Personal guidance. Right here in Tyler, Texas.</span>
          <a href={site.phoneHref}>
            <Phone size={13} />
            {site.phone}
          </a>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            <details className="nav-dropdown">
              <summary>
                Coverage options <ChevronDown size={14} />
              </summary>
              <div>
                {services.slice(0, 4).map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`}>
                    {s.short}
                  </Link>
                ))}
              </div>
            </details>
            {navigation.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            className="button header-cta"
            data-event="primary_cta_click"
            href="/coverage-review"
          >
            Start my review <ArrowUpRight size={16} />
          </Link>
          <button
            ref={trigger}
            className="menu-trigger icon-button"
            aria-label="Open navigation"
            onClick={() => dialog.current?.showModal()}
          >
            <Menu />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="mobile-dialog"
        aria-label="Site navigation"
        onKeyDown={(e) => {
          if (e.key !== "Tab") return;
          const focusable = Array.from(
            e.currentTarget.querySelectorAll<HTMLElement>(
              "a[href],button:not([disabled])",
            ),
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="mobile-dialog-inner">
          <div className="split">
            <strong>Explore Rybacki</strong>
            <button
              className="icon-button"
              aria-label="Close navigation"
              onClick={close}
            >
              <X />
            </button>
          </div>
          <nav
            aria-label="Mobile navigation"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) close();
            }}
          >
            {services.slice(0, 4).map((s) => (
              <Link key={s.slug} href={`/${s.slug}`}>
                {s.short}
              </Link>
            ))}
            {navigation.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            <Link className="button" href="/coverage-review">
              Start My Coverage Review
            </Link>
          </nav>
        </div>
      </dialog>
    </>
  );
}

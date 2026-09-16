"use client";
import { useEffect, useSyncExternalStore } from "react";
import { Analytics, track } from "@vercel/analytics/react";
import { site } from "@/content/site";
export type EventName =
  | "primary_cta_click"
  | "phone_click"
  | "email_click"
  | "coverage_review_start"
  | "coverage_type_selected"
  | "step_completion"
  | "form_completion"
  | "form_error"
  | "calendar_opened"
  | "appointment_booking_confirmation"
  | "resource_cta_click";
export function event(name: EventName, category?: string) {
  if (!site.analyticsEnabled) return;
  try {
    if (localStorage.getItem("analytics-consent") === "yes")
      track(name, category ? { category } : undefined);
  } catch {
    /* A denied storage preference means no analytics. */
  }
}
const subscribe = (callback: () => void) => {
  window.addEventListener("analytics-choice", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("analytics-choice", callback);
    window.removeEventListener("storage", callback);
  };
};
const snapshot = () => {
  try {
    return localStorage.getItem("analytics-consent") || "unset";
  } catch {
    return "no";
  }
};
export function AnalyticsPreferences() {
  const consent = useSyncExternalStore(subscribe, snapshot, () => "server");
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a");
      if (!a) return;
      if (a.closest("[data-resource-cta]")) event("resource_cta_click");
      if (a.href.startsWith("tel:")) event("phone_click");
      else if (a.href.startsWith("mailto:")) event("email_click");
      else if (a.href.includes("calendly.com")) event("calendar_opened");
      else if (a.dataset.event) event(a.dataset.event as EventName);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  if (!site.analyticsEnabled || consent === "server") return null;
  function choose(value: string) {
    try {
      localStorage.setItem("analytics-consent", value);
    } catch {}
    window.dispatchEvent(new Event("analytics-choice"));
  }
  return (
    <>
      {consent === "yes" && (
        <Analytics
          beforeSend={(e) =>
            snapshot() === "yes"
              ? { ...e, url: e.url.split("?")[0].split("#")[0] }
              : null
          }
        />
      )}
      <div className="analytics-choice">
        {consent === "unset" ? (
          <>
            <p>
              Allow optional, privacy-conscious usage analytics? Form details
              are never included.
            </p>
            <button onClick={() => choose("yes")}>Allow analytics</button>
            <button onClick={() => choose("no")}>Decline</button>
          </>
        ) : (
          <button onClick={() => choose(consent === "yes" ? "no" : "yes")}>
            {consent === "yes" ? "Disable" : "Enable"} optional analytics
          </button>
        )}
      </div>
    </>
  );
}

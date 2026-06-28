import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue>;

export type SiteAnalyticsEvent =
  | "home_view_work_click"
  | "home_project_click"
  | "work_filter_click"
  | "work_project_click"
  | "work_contact_click"
  | "contact_submit_success";

export function trackSiteEvent(event: SiteAnalyticsEvent, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  track(event, properties);
}

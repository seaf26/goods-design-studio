import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null;
type AnalyticsProperties = Record<string, AnalyticsValue>;
type AiSource = "chatgpt" | "perplexity" | "gemini" | "copilot" | "claude";
type AiAttribution = { source: AiSource; startedAt: number };

const AI_SOURCE_KEY = "traffodata:ai-referral-source";
const AI_ATTRIBUTION_WINDOW_MS = 30 * 60 * 1000;
const AI_SOURCE_HOSTS: Record<string, AiSource> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "claude.ai": "claude",
};
const AI_SOURCES = new Set<AiSource>(["chatgpt", "perplexity", "gemini", "copilot", "claude"]);

export type SiteAnalyticsEvent =
  | "home_view_work_click"
  | "home_project_click"
  | "work_filter_click"
  | "work_project_click"
  | "work_contact_click"
  | "contact_submit_success"
  | "ai_referral_visit";

export function classifyAiSource(referrer: string, search = ""): AiSource | null {
  const campaignSource = new URLSearchParams(search).get("utm_source")?.toLowerCase().trim();
  if (campaignSource && AI_SOURCES.has(campaignSource as AiSource)) {
    return campaignSource as AiSource;
  }

  try {
    const hostname = new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
    return AI_SOURCE_HOSTS[hostname] ?? null;
  } catch {
    return null;
  }
}

function isCurrentAttribution(value: unknown, now: number): value is AiAttribution {
  if (!value || typeof value !== "object") return false;
  const { source, startedAt } = value as Partial<AiAttribution>;
  return (
    typeof source === "string" &&
    AI_SOURCES.has(source as AiSource) &&
    typeof startedAt === "number" &&
    Number.isFinite(startedAt) &&
    startedAt <= now &&
    now - startedAt < AI_ATTRIBUTION_WINDOW_MS
  );
}

function storedAttribution(now: number): AiAttribution | null {
  try {
    const raw = window.sessionStorage.getItem(AI_SOURCE_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    return isCurrentAttribution(value, now) ? value : null;
  } catch {
    return null;
  }
}

export function resolveAiAttribution(
  previous: AiAttribution | null,
  referrer: string,
  search: string,
  now: number,
  siteOrigin: string,
): { attribution: AiAttribution | null; isNewVisit: boolean } {
  const source = classifyAiSource(referrer, search);
  if (source) {
    return { attribution: { source, startedAt: now }, isNewVisit: true };
  }

  try {
    if (new URL(referrer).origin === siteOrigin && isCurrentAttribution(previous, now)) {
      return { attribution: previous, isNewVisit: false };
    }
  } catch {
    // A direct entry or malformed referrer begins a new unattributed visit.
  }
  return { attribution: null, isNewVisit: false };
}

export function getAiReferralSource(): AiSource | null {
  if (typeof window === "undefined") return null;
  return storedAttribution(Date.now())?.source ?? null;
}

export function trackAiReferralVisit() {
  if (typeof window === "undefined") return;

  const now = Date.now();
  const { attribution, isNewVisit } = resolveAiAttribution(
    storedAttribution(now),
    document.referrer,
    window.location.search,
    now,
    window.location.origin,
  );
  try {
    if (attribution) {
      window.sessionStorage.setItem(AI_SOURCE_KEY, JSON.stringify(attribution));
    } else {
      window.sessionStorage.removeItem(AI_SOURCE_KEY);
    }
  } catch {
    // Analytics remains best-effort when storage is unavailable.
  }

  if (isNewVisit && attribution) {
    trackSiteEvent("ai_referral_visit", {
      source: attribution.source,
      landing_path: window.location.pathname,
    });
  }
}

export function trackSiteEvent(event: SiteAnalyticsEvent, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  track(event, properties);
}

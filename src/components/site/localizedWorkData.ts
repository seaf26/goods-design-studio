import type { WorkItem, WorkSection } from "./workData";

type TranslateWithFallback = (key: string, fallback: string) => string;

function arrayWithFallback(
  t: TranslateWithFallback,
  slug: string,
  field: string,
  values: string[],
) {
  return values.map((value, index) => t(`work.item.${slug}.${field}.${index}`, value));
}

function detailSectionsWithFallback(
  t: TranslateWithFallback,
  slug: string,
  sections: WorkSection[],
) {
  return sections.map((section, index) => ({
    title: t(`work.item.${slug}.detailSections.${index}.title`, section.title),
    text: t(`work.item.${slug}.detailSections.${index}.text`, section.text),
  }));
}

function timelineWithFallback(
  t: TranslateWithFallback,
  slug: string,
  sections: { label: string; text: string }[],
) {
  return sections.map((section, index) => ({
    label: t(`work.item.${slug}.timeline.${index}.label`, section.label),
    text: t(`work.item.${slug}.timeline.${index}.text`, section.text),
  }));
}

export function localizeWorkItem(item: WorkItem, t: TranslateWithFallback): WorkItem {
  const slug = item.slug;

  return {
    ...item,
    title: t(`work.item.${item.slug}.title`, item.title),
    client: t(`work.item.${item.slug}.client`, item.client),
    type: t(`work.item.${item.slug}.type`, item.type),
    description: t(`work.item.${item.slug}.description`, item.description),
    summary: t(`work.item.${item.slug}.summary`, item.summary),
    scope: t(`work.item.${item.slug}.scope`, item.scope),
    outcome: t(`work.item.${item.slug}.outcome`, item.outcome),
    year: t(`work.item.${item.slug}.year`, item.year),
    duration: t(`work.item.${item.slug}.duration`, item.duration),
    team: t(`work.item.${item.slug}.team`, item.team),
    headline: t(`work.item.${item.slug}.headline`, item.headline),
    detailIntro: t(`work.item.${item.slug}.detailIntro`, item.detailIntro),
    challenge: t(`work.item.${item.slug}.challenge`, item.challenge),
    build: t(`work.item.${item.slug}.build`, item.build),
    impact: t(`work.item.${item.slug}.impact`, item.impact),
    stats: arrayWithFallback(t, slug, "stats", item.stats),
    modules: arrayWithFallback(t, slug, "modules", item.modules),
    outcomes: arrayWithFallback(t, slug, "outcomes", item.outcomes),
    stack: arrayWithFallback(t, slug, "stack", item.stack),
    timeline: timelineWithFallback(t, slug, item.timeline),
    detailSections: detailSectionsWithFallback(t, slug, item.detailSections),
  };
}

export function localizeWorkItems(items: WorkItem[], t: TranslateWithFallback): WorkItem[] {
  return items.map((item) => localizeWorkItem(item, t));
}

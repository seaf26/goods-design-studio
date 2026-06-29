# Work Funnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the measurable path from Home to Work to Case Study to Contact while strengthening `/work` SEO and preserving TRAFFODATA's premium visual language.

**Architecture:** Add a tiny analytics wrapper, wire intent events into existing CTA/card/filter interactions, reframe the Work page around business outcomes, and extend the SEO helper with Work collection structured data. Keep changes inside the existing site components and avoid broad refactors.

**Tech Stack:** React 19, TanStack Router/Start, Vercel Analytics, Tailwind CSS v4 classes, existing `workData` model, schema.org JSON-LD.

---

## File Structure

- Create `src/lib/siteAnalytics.ts`: small client-safe wrapper around `@vercel/analytics`.
- Modify `src/components/site/Landing.tsx`: add homepage proof CTA, homepage Work/project tracking, and stronger links to `/work`.
- Modify `src/components/site/WorkPage.tsx`: add business-need filters, project-card tracking, stronger card proof details, and Work-to-Contact CTA.
- Modify `src/components/site/seo.ts`: add data-parameterized Work collection JSON-LD and stronger Work metadata.
- Modify `src/components/site/ContactPage.tsx`: track successful lead submission.
- Modify `src/routes/work.tsx`: pass `workItems` into `workSeo` so global SEO helpers do not import the whole portfolio dataset.
- Verify existing sitemap changes with `npm run sitemap` if sitemap files remain modified in the worktree.

## Task 1: Analytics Helper

**Files:**
- Create: `src/lib/siteAnalytics.ts`

- [ ] **Step 1: Create the analytics helper**

```ts
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
```

- [ ] **Step 2: Run focused lint**

Run: `npx eslint src/lib/siteAnalytics.ts`

Expected: no lint errors for the new helper.

## Task 2: Homepage Proof Routing

**Files:**
- Modify: `src/components/site/Landing.tsx`

- [ ] **Step 1: Import analytics helper**

Add:

```ts
import { trackSiteEvent } from "@/lib/siteAnalytics";
```

- [ ] **Step 2: Extend `MagneticButton` with an optional click callback**

Update the props:

```ts
function MagneticButton({
  children,
  href = "#",
  variant = "primary",
  className = "",
  onIntent,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  onIntent?: () => void;
}) {
```

Update the anchor click handler:

```tsx
onClick={(event) => {
  onIntent?.();
  handleSectionLinkClick(event, href);
}}
```

- [ ] **Step 3: Change the hero secondary CTA to Work**

Replace the current `Explore platform` ghost CTA with:

```tsx
<MagneticButton
  variant="ghost"
  href="/work"
  onIntent={() => trackSiteEvent("home_view_work_click", { location: "hero" })}
  className="bg-[#0c0e21]/28 text-white ring-1 ring-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md hover:bg-[#0c0e21]/36 hover:text-[#aebcff]"
>
  View selected work
  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
</MagneticButton>
```

- [ ] **Step 4: Track the Featured Projects "View all case studies" link**

Update the `/work` link in `Projects`:

```tsx
<a
  href="/work"
  onClick={() => trackSiteEvent("home_view_work_click", { location: "featured_projects" })}
  className="group inline-flex items-center gap-1.5 text-[13px] font-medium"
>
```

- [ ] **Step 5: Track featured project card clicks**

Update each featured project link:

```tsx
<a
  href={`/work/${p.slug}`}
  onClick={() =>
    trackSiteEvent("home_project_click", {
      location: "featured_projects",
      project_slug: p.slug,
    })
  }
  className="group block w-[88vw] max-w-[520px] shrink-0"
>
```

- [ ] **Step 6: Run focused lint**

Run: `npx eslint src/components/site/Landing.tsx`

Expected: no new lint errors in `Landing.tsx`.

## Task 3: Work Page Filters, Proof Cards, And Conversion CTA

**Files:**
- Modify: `src/components/site/WorkPage.tsx`

- [ ] **Step 1: Import analytics helper and extra icon**

Update imports:

```ts
import { ArrowRight, Boxes, ImageIcon, MessageCircle } from "lucide-react";
import { trackSiteEvent } from "@/lib/siteAnalytics";
```

- [ ] **Step 2: Replace filter model with business-intent filters**

Add:

```ts
type WorkFilter = "all" | "operations" | "commerce" | "dashboards" | "mobile" | "web";

const workFilters: { value: WorkFilter; label: string; matches: (item: WorkItem) => boolean }[] = [
  { value: "all", label: "All", matches: () => true },
  {
    value: "operations",
    label: "Operations",
    matches: (item) =>
      [
        item.title,
        item.type,
        item.summary,
        item.scope,
        item.stack.join(" "),
        item.modules.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .match(/erp|inventory|warehouse|pos|accounting|crm|backend|api|delivery|operations/) !==
      null,
  },
  {
    value: "commerce",
    label: "Commerce",
    matches: (item) =>
      [item.title, item.type, item.summary, item.stack.join(" "), item.modules.join(" ")]
        .join(" ")
        .toLowerCase()
        .match(/commerce|ecommerce|checkout|vendor|cart|payment|delivery|store/) !== null,
  },
  {
    value: "dashboards",
    label: "Dashboards",
    matches: (item) =>
      [item.title, item.type, item.summary, item.stack.join(" "), item.modules.join(" ")]
        .join(" ")
        .toLowerCase()
        .match(/dashboard|admin|report|analytics|finance|accounting/) !== null,
  },
  {
    value: "mobile",
    label: "Mobile",
    matches: (item) =>
      item.category === "mobile-app" || /mobile|ios|android|app/.test(searchableWorkText(item)),
  },
  {
    value: "web",
    label: "Web",
    matches: (item) => item.category === "website" || item.category === "figma-design",
  },
];
```

- [ ] **Step 3: Update visible items calculation**

Replace:

```ts
const visibleWorkItems =
  activeFilter === "all" ? workItems : workItems.filter((item) => item.category === activeFilter);
```

With:

```ts
const activeFilterConfig = workFilters.find((filter) => filter.value === activeFilter);
const visibleWorkItems = workItems.filter((item) => activeFilterConfig?.matches(item) ?? true);
```

- [ ] **Step 4: Track filter clicks**

Update filter buttons:

```tsx
onClick={() => {
  setActiveFilter(filter.value);
  trackSiteEvent("work_filter_click", { filter: filter.value });
}}
```

- [ ] **Step 5: Track project card clicks**

Update `ProjectTile` anchor:

```tsx
onClick={() =>
  trackSiteEvent("work_project_click", {
    project_slug: item.slug,
    location: "work_grid",
    filter,
  })
}
```

- [ ] **Step 6: Add stronger proof text to each project card**

Inside the card footer chip area, keep existing scope/outcome chips and add:

```tsx
<span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-medium text-white/76 ring-1 ring-white/12 backdrop-blur-sm">
  {item.type}
</span>
```

- [ ] **Step 7: Reframe Work page intro copy**

Update the hero paragraph text to:

```tsx
text="Case studies for ERP, inventory, ecommerce, dashboards, backend platforms, and operational systems built around real business pressure."
```

- [ ] **Step 8: Add Work-to-Contact CTA below the grid**

Insert after the project grid section and before the process section:

```tsx
<section className="pb-24 md:pb-32">
  <div className="mx-auto max-w-[92rem] px-5 sm:px-6">
    <Reveal>
      <div className="grid gap-6 rounded-[1.5rem] bg-[var(--ink)] p-6 text-white ring-1 ring-black/10 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[12px] font-medium text-white/58">
            <MessageCircle className="h-4 w-4 text-primary" />
            Have a workflow like this?
          </div>
          <BlurText
            as="h2"
            text="Bring us the operating problem. We will map the first useful system."
            className="mt-4 max-w-3xl font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.05em] text-balance"
          />
        </div>
        <a
          href="/contact"
          onClick={() => trackSiteEvent("work_contact_click", { location: "work_cta" })}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-primary hover:text-white active:scale-[0.98]"
        >
          Start a project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </Reveal>
  </div>
</section>
```

- [ ] **Step 9: Add a no-results state for filters**

Inside the project grid, after the mapped tiles:

```tsx
{visibleWorkItems.length === 0 ? (
  <Reveal className="lg:col-span-12">
    <div className="rounded-[1.25rem] bg-[var(--surface)] p-8 text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)]">
      No case studies match this filter yet. View all work to scan the full archive.
    </div>
  </Reveal>
) : null}
```

- [ ] **Step 10: Run focused lint**

Run: `npx eslint src/components/site/WorkPage.tsx`

Expected: no new lint errors in `WorkPage.tsx`.

## Task 4: Work SEO Structured Data

**Files:**
- Modify: `src/components/site/seo.ts`
- Modify: `src/routes/work.tsx`

- [ ] **Step 1: Keep SEO helper data-free**

Use a type-only import in `seo.ts`:

```ts
import type { WorkItem } from "./workData";
```

- [ ] **Step 2: Add Work collection JSON-LD helper**

Add before `workSeo()`:

```ts
function workCollectionJsonLd(items: WorkItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TRAFFODATA case studies",
    description:
      "Case studies for ERP, inventory, warehouse, POS, accounting, CRM, ecommerce, dashboards, backend platforms, and custom operational software.",
    url: absoluteUrl("/work"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/work/${item.slug}`),
        name: item.title,
        description: item.summary || item.description,
      })),
    },
  };
}
```

- [ ] **Step 3: Strengthen `workSeo()` metadata**

Replace `workSeo()` with:

```ts
export function workSeo(items: WorkItem[] = []) {
  return seoHead({
    title: "Case Studies - ERP, Ecommerce, Dashboards and Backend Systems | TRAFFODATA",
    description:
      "Explore TRAFFODATA case studies for ERP, inventory, warehouse, POS, accounting, CRM, ecommerce, dashboards, backend platforms, mobile apps, and operational software.",
    path: "/work",
    jsonLd: items.length > 0 ? [workCollectionJsonLd(items)] : [],
  });
}
```

- [ ] **Step 4: Pass work items from the Work route**

Update `src/routes/work.tsx`:

```ts
import { createFileRoute } from "@tanstack/react-router";

import { WorkPage } from "@/components/site/WorkPage";
import { workSeo } from "@/components/site/seo";
import { workItems } from "@/components/site/workData";

export const Route = createFileRoute("/work")({
  head: () => workSeo(workItems),
  component: WorkPage,
});
```

- [ ] **Step 5: Run focused lint**

Run: `npx eslint src/components/site/seo.ts src/routes/work.tsx`

Expected: no new lint errors in `seo.ts` or `work.tsx`.

## Task 5: Contact Success Measurement

**Files:**
- Modify: `src/components/site/ContactPage.tsx`

- [ ] **Step 1: Import analytics helper**

Add:

```ts
import { trackSiteEvent } from "@/lib/siteAnalytics";
```

- [ ] **Step 2: Track successful submission**

Inside the `if (result.ok)` block, before `clearForm()`:

```ts
trackSiteEvent("contact_submit_success", {
  services_count: selectedServices.length,
  has_company: Boolean(company.trim()),
});
```

- [ ] **Step 3: Run focused lint**

Run: `npx eslint src/components/site/ContactPage.tsx`

Expected: no new lint errors in `ContactPage.tsx`.

## Task 6: Verification And Commit

**Files:**
- Verify all changed files from Tasks 1-5.

- [ ] **Step 1: Run focused lint**

Run:

```bash
npx eslint src/lib/siteAnalytics.ts src/components/site/Landing.tsx src/components/site/WorkPage.tsx src/components/site/seo.ts src/components/site/ContactPage.tsx src/routes/work.tsx
```

Expected: no lint errors for changed files.

- [ ] **Step 2: Run sitemap generation if sitemap files are still modified**

Run:

```bash
npm run sitemap
```

Expected: `Wrote public/sitemap.xml with 47 URLs.`

- [ ] **Step 3: Run production build**

Run:

```bash
npm run build
```

Expected: build completes successfully. Existing large-chunk warnings are acceptable if unchanged.

- [ ] **Step 4: Review diffs**

Run:

```bash
git diff -- src/lib/siteAnalytics.ts src/components/site/Landing.tsx src/components/site/WorkPage.tsx src/components/site/seo.ts src/components/site/ContactPage.tsx src/routes/work.tsx docs/superpowers/plans/2026-06-29-work-funnel.md
git diff --check
```

Expected: diffs match the approved funnel design and no whitespace errors appear.

- [ ] **Step 5: Stage only funnel implementation files**

Run:

```bash
git add src/lib/siteAnalytics.ts src/components/site/Landing.tsx src/components/site/WorkPage.tsx src/components/site/seo.ts src/components/site/ContactPage.tsx src/routes/work.tsx docs/superpowers/plans/2026-06-29-work-funnel.md
```

If the already-modified sitemap files should ship with this work, also stage:

```bash
git add public/sitemap.xml scripts/generate-sitemap.mjs src/routes/__root.tsx src/routes/blog.tsx src/routes/contact.tsx
```

- [ ] **Step 6: Commit**

Run:

```bash
git commit -m "Improve work funnel discovery and tracking"
```

Expected: commit succeeds.

# Arabic SEO Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make TRAFFODATA's existing Arabic translations crawlable through stable `/ar` routes with localized metadata, language alternates, and an Arabic sitemap.

**Architecture:** Reuse the existing page components and translation catalog. Add Arabic route counterparts that set the initial locale from the route, make SEO helpers locale-aware, and generate English/Arabic URL alternates without duplicating page content.

**Tech Stack:** TanStack Router/Start, React, TypeScript, Node test scripts, XML sitemap generation.

**Spec:** `/Volumes/M2/Projects/traffodata/SEO-GEO-AEO-PLAN.md`

## Global Constraints

- Preserve existing English URLs and behavior.
- Do not add a new dependency.
- Do not edit generated `src/routeTree.gen.ts` by hand.
- Do not push or deploy.
- Arabic routes must render Arabic on the server, not only after `localStorage` hydration.

## Review Focus

- Canonicals and alternates must point to the same logical page in both locales.
- Arabic route rendering must not depend on browser storage.
- Existing English SEO tests and sitemap output must remain valid.
- Dynamic blog and work slugs must continue resolving under `/ar`.
- Internal navigation from Arabic pages must not silently switch back to English pages.

### Task 1: Locale-aware SEO primitives

**Files:**
- Modify: `src/components/site/seo.ts`
- Test: `scripts/seo-structured-data.test.mjs`

- [ ] Add failing assertions for Arabic title/description, `/ar` canonical URLs, `hreflang` links, and localized navigation JSON-LD.
- [ ] Implement locale-aware URL helpers and `seoHead` alternates while preserving English defaults.
- [ ] Run `npm run test:seo` and confirm the new assertions pass.

### Task 2: Server-selected locale and Arabic route counterparts

**Files:**
- Modify: `src/lib/i18n.tsx`, `src/routes/__root.tsx`
- Create: `src/routes/ar/index.tsx`, `src/routes/ar/work.tsx`, `src/routes/ar/blog.tsx`, `src/routes/ar/contact.tsx`, `src/routes/ar/blog_.$slug.tsx`, `src/routes/ar/work_.$slug.tsx`
- Modify: shared page navigation components as needed
- Test: `scripts/i18n-theme.test.mjs` and `scripts/seo-structured-data.test.mjs`

- [ ] Add failing coverage for route-derived Arabic locale initialization.
- [ ] Implement route-aware initial locale and Arabic route files reusing existing components/data.
- [ ] Make shared navigation preserve the `/ar` prefix when the active locale is Arabic.
- [ ] Run the focused tests and build.

### Task 3: Arabic sitemap and verification

**Files:**
- Modify: `scripts/generate-sitemap.mjs`
- Test: `scripts/seo-structured-data.test.mjs` or a focused sitemap assertion
- Generate: `public/sitemap.xml`

- [ ] Add failing assertions for Arabic core, blog, and work URLs.
- [ ] Generate localized URLs alongside existing English URLs with stable last-modified behavior.
- [ ] Run `npm test`, `npm run test:seo`, `npm run build`, and `npm run sitemap`.

### Task 4: Final review

- [ ] Review the complete diff for locale leaks, duplicate URLs, and generated-file consistency.
- [ ] Run the full verification commands and record any limitation.

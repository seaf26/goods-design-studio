# SEO Metadata Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add production-ready SEO metadata, social previews, logo assets, JSON-LD, robots rules, and a static sitemap for `https://traffodata.com`.

**Architecture:** Keep TanStack route-level `head()` functions, but move shared metadata values into `src/components/site/seo.ts`. Use copied public logo derivatives from `public/brand/` for favicon, app icons, organization schema logo, and default social images, and use project images for project detail previews.

**Tech Stack:** Vite, TanStack Start/Router, React 19, TypeScript, Node.js scripts, static public assets.

---

## File Map

- Create: `src/components/site/seo.ts` for canonical URL helpers, route SEO builders, icon links, and JSON-LD objects.
- Modify: `src/routes/__root.tsx` to use global SEO defaults, app stylesheet, brand icons, and organization/website JSON-LD.
- Modify: `src/routes/index.tsx` to use home-page SEO metadata.
- Modify: `src/routes/work.tsx` to use work-index SEO metadata.
- Modify: `src/routes/work_.$slug.tsx` to use project-specific SEO metadata.
- Create: `scripts/generate-sitemap.mjs` to generate `public/sitemap.xml` from current work slugs.
- Modify: `package.json` to add `npm run sitemap`.
- Create: `public/robots.txt`.
- Create/update generated assets under `public/brand/`.
- Generate: `public/sitemap.xml`.

## Task 1: Copy Logo Derivatives Into Public Assets

**Files:**

- Create: `public/brand/traffodata-logo-wide.png`
- Create: `public/brand/traffodata-logo-mark.png`
- Create: `public/brand/traffodata-og-logo.png`
- Create: `public/brand/traffodata-icon-512.png`
- Create: `public/brand/traffodata-icon-192.png`
- Create: `public/brand/apple-touch-icon.png`
- Create: `public/favicon.png`

- [ ] **Step 1: Verify source logo files exist**

Run:

```bash
test -f /Users/seafgamel/Desktop/traffodata/ChatGPT_Image_Jun_20__2026__12_02_29_AM-removebg-preview.png
test -f /Users/seafgamel/Desktop/traffodata/ChatGPT_Image_Jun_20__2026__12_08_00_AM-removebg-preview.png
```

Expected: both commands exit with status `0`.

- [ ] **Step 2: Copy original public logo sources**

Run:

```bash
cp /Users/seafgamel/Desktop/traffodata/ChatGPT_Image_Jun_20__2026__12_02_29_AM-removebg-preview.png public/brand/traffodata-logo-wide.png
cp /Users/seafgamel/Desktop/traffodata/ChatGPT_Image_Jun_20__2026__12_08_00_AM-removebg-preview.png public/brand/traffodata-logo-mark.png
```

Expected: the two files exist under `public/brand/`.

- [ ] **Step 3: Generate favicon, app icon, and social preview derivatives**

Run:

```bash
sips -Z 1200 public/brand/traffodata-logo-wide.png --out public/brand/traffodata-og-logo.png
sips -z 512 512 public/brand/traffodata-logo-mark.png --out public/brand/traffodata-icon-512.png
sips -z 192 192 public/brand/traffodata-logo-mark.png --out public/brand/traffodata-icon-192.png
sips -z 180 180 public/brand/traffodata-logo-mark.png --out public/brand/apple-touch-icon.png
sips -z 48 48 public/brand/traffodata-logo-mark.png --out public/favicon.png
```

Expected: `sips` reports each output path, and all five derivative PNGs are present.

- [ ] **Step 4: Inspect generated asset dimensions**

Run:

```bash
sips -g pixelWidth -g pixelHeight public/brand/traffodata-og-logo.png public/brand/traffodata-icon-512.png public/brand/traffodata-icon-192.png public/brand/apple-touch-icon.png public/favicon.png
```

Expected: `traffodata-icon-512.png` is `512 x 512`, `traffodata-icon-192.png` is `192 x 192`, `apple-touch-icon.png` is `180 x 180`, and `favicon.png` is `48 x 48`.

## Task 2: Add Central SEO Helper

**Files:**

- Create: `src/components/site/seo.ts`

- [ ] **Step 1: Create `seo.ts`**

Use `apply_patch` to add this file:

```ts
import type { WorkItem } from "./workData";

export const SITE_URL = "https://traffodata.com";
export const SITE_NAME = "TRAFFODATA Software";
export const DEFAULT_TITLE = "TRAFFODATA - The Operating System for Modern Enterprises";
export const DEFAULT_DESCRIPTION =
  "Premium ERP, inventory, warehouse, POS, accounting, CRM and AI software engineered for modern enterprise operations.";

export const BRAND_ASSETS = {
  mark: "/brand/traffodata-logo-mark.png",
  wide: "/brand/traffodata-logo-wide.png",
  og: "/brand/traffodata-og-logo.png",
  icon512: "/brand/traffodata-icon-512.png",
  icon192: "/brand/traffodata-icon-192.png",
  appleTouch: "/brand/apple-touch-icon.png",
  favicon: "/favicon.png",
};

type JsonLd = Record<string, unknown>;

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  jsonLd?: JsonLd[];
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function assetUrl(path: string) {
  return absoluteUrl(path);
}

export function iconLinks() {
  return [
    { rel: "icon", type: "image/png", href: BRAND_ASSETS.favicon },
    { rel: "apple-touch-icon", sizes: "180x180", href: BRAND_ASSETS.appleTouch },
    { rel: "icon", type: "image/png", sizes: "192x192", href: BRAND_ASSETS.icon192 },
    { rel: "icon", type: "image/png", sizes: "512x512", href: BRAND_ASSETS.icon512 },
  ];
}

export function seoHead({
  title,
  description,
  path = "/",
  type = "website",
  image = BRAND_ASSETS.og,
  imageAlt = "TRAFFODATA Software Solutions logo",
  jsonLd = [],
}: SeoOptions) {
  const canonical = absoluteUrl(path);
  const socialImage = assetUrl(image);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: "TRAFFODATA" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: socialImage },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      ...jsonLd.map((data) => ({ "script:ld+json": data })),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TRAFFODATA",
    url: SITE_URL,
    logo: assetUrl(BRAND_ASSETS.mark),
    description:
      "TRAFFODATA builds ERP, inventory, warehouse, POS, accounting, CRM and AI software for modern enterprise operations.",
    sameAs: [SITE_URL],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: "TRAFFODATA",
      logo: assetUrl(BRAND_ASSETS.mark),
    },
  };
}

export function homeSeo() {
  return seoHead({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  });
}

export function workSeo() {
  return seoHead({
    title: "Work - TRAFFODATA Software",
    description:
      "Explore TRAFFODATA case studies across backend platforms, websites, mobile apps, Figma designs, dashboards, ecommerce systems and operational software.",
    path: "/work",
  });
}

export function projectSeo(project?: WorkItem | null) {
  if (!project) {
    return seoHead({
      title: "Project - TRAFFODATA Software",
      description: "Project details for selected operational software work by TRAFFODATA.",
      path: "/work",
      type: "article",
    });
  }

  const title = `${project.title} - TRAFFODATA Software`;
  const description = project.summary || project.description;
  const image = project.thumbnail || project.images[0] || BRAND_ASSETS.og;
  const path = `/work/${project.slug}`;

  return seoHead({
    title,
    description,
    path,
    type: "article",
    image,
    imageAlt: `${project.title} project preview`,
    jsonLd: [creativeWorkJsonLd(project, path, image)],
  });
}

function creativeWorkJsonLd(project: WorkItem, path: string, image: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.headline,
    description: project.summary || project.description,
    image: assetUrl(image),
    url: absoluteUrl(path),
    keywords: [...project.modules, ...project.stack].join(", "),
    creator: {
      "@type": "Organization",
      name: "TRAFFODATA",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "TRAFFODATA",
      logo: assetUrl(BRAND_ASSETS.mark),
    },
  };
}
```

- [ ] **Step 2: Run TypeScript/build check**

Run:

```bash
npm run build
```

Expected: build completes.

## Task 3: Wire Route Metadata

**Files:**

- Modify: `src/routes/__root.tsx`
- Modify: `src/routes/index.tsx`
- Modify: `src/routes/work.tsx`
- Modify: `src/routes/work_.$slug.tsx`

- [ ] **Step 1: Update root route metadata**

In `src/routes/__root.tsx`, add this import near the existing imports:

```ts
import { homeSeo, iconLinks, organizationJsonLd, websiteJsonLd } from "@/components/site/seo";
```

Replace the existing `head: () => ({ ... })` body with:

```ts
  head: () => {
    const seo = homeSeo();

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        ...seo.meta,
        { "script:ld+json": organizationJsonLd() },
        { "script:ld+json": websiteJsonLd() },
      ],
      links: [{ rel: "stylesheet", href: appCss }, ...iconLinks(), ...seo.links],
    };
  },
```

- [ ] **Step 2: Update home route metadata**

Replace `src/routes/index.tsx` with:

```ts
import { createFileRoute } from "@tanstack/react-router";

import { GoodsLanding } from "@/components/site/Landing";
import { homeSeo } from "@/components/site/seo";

export const Route = createFileRoute("/")({
  head: homeSeo,
  component: GoodsLanding,
});
```

- [ ] **Step 3: Update work route metadata**

Replace `src/routes/work.tsx` with:

```ts
import { createFileRoute } from "@tanstack/react-router";

import { WorkPage } from "@/components/site/WorkPage";
import { workSeo } from "@/components/site/seo";

export const Route = createFileRoute("/work")({
  head: workSeo,
  component: WorkPage,
});
```

- [ ] **Step 4: Update project route metadata**

Replace the `head` function inside `src/routes/work_.$slug.tsx` with:

```ts
  head: ({ params }) => projectSeo(getWorkItem(params.slug)),
```

Add this import:

```ts
import { projectSeo } from "@/components/site/seo";
```

Keep `ProjectDetailPage`, `getWorkItem`, `RouteComponent`, and the route path unchanged.

- [ ] **Step 5: Build after route wiring**

Run:

```bash
npm run build
```

Expected: build completes with no TypeScript or route generation errors.

## Task 4: Add Robots and Sitemap Generation

**Files:**

- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json`
- Create: `public/robots.txt`
- Generate: `public/sitemap.xml`

- [ ] **Step 1: Create sitemap generator**

Use `apply_patch` to add `scripts/generate-sitemap.mjs`:

```js
import { readFileSync, writeFileSync } from "node:fs";

const SITE_URL = "https://traffodata.com";
const LASTMOD = "2026-06-27";
const SOURCE_FILES = [
  "src/components/site/workData.ts",
  "src/components/site/behanceWorkData.generated.ts",
];

const slugs = new Set();
const slugPattern = /^\s+slug:\s+"([^"]+)",/gm;

for (const file of SOURCE_FILES) {
  const source = readFileSync(file, "utf8");
  let match;

  while ((match = slugPattern.exec(source)) !== null) {
    slugs.add(match[1]);
  }
}

const paths = [
  "/",
  "/work",
  ...Array.from(slugs)
    .sort()
    .map((slug) => `/work/${slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/work" ? "0.8" : "0.6"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Wrote public/sitemap.xml with ${paths.length} URLs.`);
```

- [ ] **Step 2: Add npm sitemap script**

In `package.json`, add:

```json
"sitemap": "node scripts/generate-sitemap.mjs"
```

Place it after `"preview": "vite preview",` and keep the existing JSON formatting valid.

- [ ] **Step 3: Add robots file**

Use `apply_patch` to add `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://traffodata.com/sitemap.xml
```

- [ ] **Step 4: Generate sitemap**

Run:

```bash
npm run sitemap
```

Expected: output includes `Wrote public/sitemap.xml with 45 URLs.` unless the work data has changed. The generated file must include `/`, `/work`, and every current `/work/<slug>` URL.

## Task 5: Verification

**Files:**

- Read: `public/sitemap.xml`
- Read: `public/robots.txt`
- Read: `src/components/site/behanceWorkData.generated.ts`
- Read: `dist` output generated by `npm run build`

- [ ] **Step 1: Run production build**

Run:

```bash
npm run build
```

Expected: build completes successfully.

- [ ] **Step 2: Confirm sitemap URL coverage**

Run:

```bash
node - <<'NODE'
import { readFileSync } from "node:fs";

const sitemap = readFileSync("public/sitemap.xml", "utf8");
const source = [
  readFileSync("src/components/site/workData.ts", "utf8"),
  readFileSync("src/components/site/behanceWorkData.generated.ts", "utf8"),
].join("\n");
const slugs = [...source.matchAll(/^\s+slug:\s+"([^"]+)",/gm)].map((match) => match[1]);
const missing = ["/", "/work", ...slugs.map((slug) => `/work/${slug}`)].filter(
  (path) => !sitemap.includes(`https://traffodata.com${path}`),
);

if (missing.length) {
  console.error(`Missing sitemap URLs:\n${missing.join("\n")}`);
  process.exit(1);
}

console.log(`Sitemap includes ${slugs.length + 2} expected URLs.`);
NODE
```

Expected: prints `Sitemap includes 45 expected URLs.` unless the work data has changed.

- [ ] **Step 3: Confirm public metadata does not expose the source designer name**

Run:

```bash
rg -i "rana|salah|ranasalah" src/components/site/behanceWorkData.generated.ts public/sitemap.xml public/robots.txt src/routes src/components/site/seo.ts
```

Expected: no matches.

- [ ] **Step 4: Confirm logo asset references use production URLs**

Run:

```bash
rg "traffodata-logo|traffodata-icon|apple-touch-icon|favicon|og:image|twitter:image|Organization|CreativeWork" src/components/site/seo.ts src/routes public/robots.txt public/sitemap.xml
```

Expected: output shows route SEO helpers and schema values reference `public/brand` asset paths through `https://traffodata.com` helpers, not Desktop file paths.

- [ ] **Step 5: Run git diff review**

Run:

```bash
git diff -- src/components/site/seo.ts src/routes/__root.tsx src/routes/index.tsx src/routes/work.tsx 'src/routes/work_.$slug.tsx' scripts/generate-sitemap.mjs package.json public/robots.txt public/sitemap.xml public/brand public/favicon.png
```

Expected: diff only contains SEO metadata, logo asset additions, robots, sitemap generation, and sitemap output. Existing unrelated changes such as `src/components/site/Landing.tsx` remain unstaged and untouched.

## Task 6: Commit SEO Implementation

**Files:**

- Stage only SEO implementation files and generated public assets.

- [ ] **Step 1: Check worktree before staging**

Run:

```bash
git status --short
```

Expected: `src/components/site/Landing.tsx` may still be modified from prior unrelated work. Do not stage that file for the SEO commit.

- [ ] **Step 2: Stage SEO files**

Run:

```bash
git add src/components/site/seo.ts src/routes/__root.tsx src/routes/index.tsx src/routes/work.tsx 'src/routes/work_.$slug.tsx' scripts/generate-sitemap.mjs package.json public/robots.txt public/sitemap.xml public/brand/traffodata-logo-wide.png public/brand/traffodata-logo-mark.png public/brand/traffodata-og-logo.png public/brand/traffodata-icon-512.png public/brand/traffodata-icon-192.png public/brand/apple-touch-icon.png public/favicon.png
```

Expected: only the SEO and logo files are staged.

- [ ] **Step 3: Commit**

Run:

```bash
git commit -m "Enhance SEO metadata and brand assets"
```

Expected: commit succeeds on `main`.

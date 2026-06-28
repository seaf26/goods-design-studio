# Work Project Banners Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hybrid cinematic banner system for all 43 work projects, preserving real project screenshots while adding a consistent TRAFFODATA operational visual language.

**Architecture:** Add a small banner metadata layer, a reusable hybrid banner visual component, and a generated banner manifest that can be filled in batches. Use the existing work card and project-detail structures, so filters, routes, hover behavior, and page layout remain intact.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, existing work data model, Pika MCP for reviewed pilot backplate generation, local static assets under `public/work-banners`.

---

## File Structure

- Modify `.gitignore` to ignore `.superpowers/` browser-companion artifacts.
- Modify `src/components/site/workData.ts` to add optional banner metadata to the `WorkItem` model and merge generated banner metadata into `workItems`.
- Create `src/components/site/workBannerData.generated.ts` as the single slug-to-banner metadata map for all 43 projects.
- Create `src/components/site/workBannerMedia.ts` for pure helpers: image resolution, family label, alt text, and fallback rules.
- Modify `src/components/site/WorkPage.tsx` so `PortfolioVisual` renders the new hybrid cinematic composition.
- Modify `src/components/site/ProjectMedia.tsx` so project detail hero banners use the same banner helpers.
- Create `public/work-banners/manifest.json` to document the banner set, prompt families, source image, and generation status.
- Create `public/work-banners/.gitkeep` so the asset folder exists before generated images land.

## Task 1: Ignore Brainstorm Companion Artifacts

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Add the ignore rule**

Append this line to `.gitignore` near the other local/generated folders:

```gitignore
.superpowers/
```

- [ ] **Step 2: Verify the brainstorm folders are ignored**

Run:

```bash
git status --short --ignored .superpowers | sed -n '1,20p'
```

Expected: output starts with ignored entries (`!! .superpowers/...`) or has no untracked `.superpowers` entries in ordinary `git status --short`.

- [ ] **Step 3: Stage and commit**

Run:

```bash
git add .gitignore
git commit -m "chore: ignore brainstorming artifacts"
```

Expected: commit succeeds and stages no unrelated user changes.

## Task 2: Add Banner Metadata Types And Merge Point

**Files:**
- Modify: `src/components/site/workData.ts`
- Create: `src/components/site/workBannerData.generated.ts`

- [ ] **Step 1: Create the generated banner metadata file**

Create `src/components/site/workBannerData.generated.ts` with this initial content:

```ts
export type WorkBannerFamily =
  | "commerce"
  | "logistics"
  | "backend"
  | "mobile"
  | "corporate"
  | "dashboard"
  | "specialty";

export type WorkBannerMetadata = {
  banner: string;
  bannerFamily: WorkBannerFamily;
};

export const workBannerData = {
  "wikifood-commerce-delivery-backend": {
    banner: "/work-banners/wikifood-commerce-delivery-backend.webp",
    bannerFamily: "commerce",
  },
  "printout-laravel-rest-api": {
    banner: "/work-banners/printout-laravel-rest-api.webp",
    bannerFamily: "backend",
  },
  "taggz-ai-event-photography-platform": {
    banner: "/work-banners/taggz-ai-event-photography-platform.webp",
    bannerFamily: "specialty",
  },
} satisfies Record<string, WorkBannerMetadata>;
```

- [ ] **Step 2: Extend `WorkItem`**

In `src/components/site/workData.ts`, add this import near the existing imports:

```ts
import { workBannerData, type WorkBannerFamily } from "./workBannerData.generated";
```

Add these fields to `WorkItem` after `thumbnail: string;`:

```ts
  banner?: string;
  bannerFamily?: WorkBannerFamily;
```

- [ ] **Step 3: Merge banner metadata into `workItems`**

Replace the current `workItems` export:

```ts
export const workItems: WorkItem[] = allProjectInputs.map((project) => ({
  ...project,
  icon: icons[project.iconName],
}));
```

with:

```ts
export const workItems: WorkItem[] = allProjectInputs.map((project) => {
  const bannerMetadata = workBannerData[project.slug as keyof typeof workBannerData];

  return {
    ...project,
    ...bannerMetadata,
    icon: icons[project.iconName],
  };
});
```

- [ ] **Step 4: Run TypeScript build to catch type errors**

Run:

```bash
npm run build
```

Expected: build fails only if the new type import or metadata merge has a TypeScript issue. If it fails, fix the exact reported file and rerun until this task passes.

- [ ] **Step 5: Stage and commit**

Run:

```bash
git add src/components/site/workData.ts src/components/site/workBannerData.generated.ts
git commit -m "feat: add work banner metadata"
```

Expected: commit succeeds and does not include existing unrelated modified files.

## Task 3: Add Banner Media Helpers

**Files:**
- Create: `src/components/site/workBannerMedia.ts`

- [ ] **Step 1: Create the helper module**

Create `src/components/site/workBannerMedia.ts`:

```ts
import type { WorkItem } from "./workData";

export function getWorkBannerImage(item: WorkItem) {
  return item.banner || item.thumbnail || item.images[0] || "";
}

export function getWorkProofImage(item: WorkItem) {
  return item.thumbnail || item.images[0] || item.banner || "";
}

export function getWorkBannerFamilyLabel(item: WorkItem) {
  const family = item.bannerFamily || "specialty";

  const labels = {
    commerce: "Commerce system",
    logistics: "Logistics operation",
    backend: "Backend platform",
    mobile: "Mobile product",
    corporate: "Corporate system",
    dashboard: "Dashboard system",
    specialty: "Digital product",
  } satisfies Record<NonNullable<WorkItem["bannerFamily"]>, string>;

  return labels[family];
}

export function getWorkBannerAlt(item: WorkItem) {
  return `${item.title} ${item.type} banner showing the project interface in a TRAFFODATA cinematic operations frame`;
}
```

- [ ] **Step 2: Run the build**

Run:

```bash
npm run build
```

Expected: build passes or reports only an unused import/error in the new helper. Fix reported issues before continuing.

- [ ] **Step 3: Stage and commit**

Run:

```bash
git add src/components/site/workBannerMedia.ts
git commit -m "feat: add work banner media helpers"
```

Expected: commit succeeds.

## Task 4: Render Hybrid Cinematic Banners On Work Cards

**Files:**
- Modify: `src/components/site/WorkPage.tsx`

- [ ] **Step 1: Import banner helpers**

Add this import below the existing `workData` import:

```ts
import {
  getWorkBannerAlt,
  getWorkBannerFamilyLabel,
  getWorkBannerImage,
  getWorkProofImage,
} from "./workBannerMedia";
```

- [ ] **Step 2: Replace `PortfolioVisual` internals**

Inside `PortfolioVisual`, replace:

```ts
  const image = item.thumbnail || item.images[0];
```

with:

```ts
  const bannerImage = getWorkBannerImage(item);
  const proofImage = getWorkProofImage(item);
  const familyLabel = getWorkBannerFamilyLabel(item);
```

Replace the JSX returned by `PortfolioVisual` with this structure:

```tsx
    <>
      <div
        className={`absolute inset-0 ${item.tone === "dark" || item.tone === "dim" ? "bg-black" : "bg-[var(--surface)]"}`}
      />
      <img
        src={bannerImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(115,136,223,0.42),transparent_34%),linear-gradient(135deg,rgba(3,4,9,0.92),rgba(3,4,9,0.32)_42%,rgba(3,4,9,0.86))]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:44px_44px]" />

      <div className="absolute left-6 top-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/48 md:left-8 md:top-8">
        {familyLabel}
      </div>

      <div className="absolute inset-x-6 top-16 overflow-hidden rounded-[1rem] bg-white shadow-[0_30px_90px_-44px_rgba(0,0,0,0.86)] ring-1 ring-white/18 md:inset-x-10 md:top-20">
        <div className="flex h-9 items-center gap-2 border-b border-black/8 bg-white px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-2 w-28 rounded-full bg-black/8" />
        </div>
        <div className="relative aspect-[16/10] bg-[var(--surface)]">
          {proofImage ? (
            <img
              src={proofImage}
              alt={getWorkBannerAlt(item)}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="grid h-full place-items-center text-[var(--muted-foreground)]">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-14 left-7 right-7 rounded-[1rem] bg-black/58 p-4 text-white ring-1 ring-white/14 backdrop-blur-md md:left-10 md:right-auto md:w-[62%]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-primary ring-1 ring-white/14">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="truncate font-display text-xl font-semibold tracking-[-0.04em]">
              {item.type}
            </div>
            <div className="mt-1 truncate text-[11px] font-medium text-white/52">
              {item.stack.slice(0, 3).join(" / ")}
            </div>
          </div>
        </div>
      </div>
    </>
```

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: build passes. If TypeScript reports an unused variable or missing import, fix exactly that issue.

- [ ] **Step 4: Stage and commit**

Run:

```bash
git add src/components/site/WorkPage.tsx
git commit -m "feat: render cinematic work card banners"
```

Expected: commit succeeds.

## Task 5: Use Banner Helpers On Project Detail Hero

**Files:**
- Modify: `src/components/site/ProjectMedia.tsx`

- [ ] **Step 1: Import helpers**

Add this import below the `WorkItem` type import:

```ts
import { getWorkBannerAlt, getWorkBannerImage } from "./workBannerMedia";
```

- [ ] **Step 2: Add banner image layer to `ProjectHeroBanner`**

At the start of `ProjectHeroBanner`, before `return`, add:

```ts
  const bannerImage = getWorkBannerImage(item);
```

Inside the `ProjectMediaFrame`, replace:

```tsx
      <div className="absolute inset-0">{visual}</div>
```

with:

```tsx
      {bannerImage ? (
        <img
          src={bannerImage}
          alt={getWorkBannerAlt(item)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0">{visual}</div>
      )}
```

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Stage and commit**

Run:

```bash
git add src/components/site/ProjectMedia.tsx
git commit -m "feat: use cinematic banners on project details"
```

Expected: commit succeeds.

## Task 6: Create Pilot Banner Assets And Manifest

**Files:**
- Create: `public/work-banners/.gitkeep`
- Create: `public/work-banners/manifest.json`
- Add generated pilot images:
  - `public/work-banners/wikifood-commerce-delivery-backend.webp`
  - `public/work-banners/elnasser-backend-dashboard.webp`
  - `public/work-banners/behance-sync-gym-app.webp`

- [ ] **Step 1: Create the asset folder**

Run:

```bash
mkdir -p public/work-banners
touch public/work-banners/.gitkeep
```

Expected: `public/work-banners` exists.

- [ ] **Step 2: Generate three Pika pilot images**

Use Pika MCP `generate_image` three times, one image per prompt below. Use `aspect_ratio: "16:9"`, `resolution: "2K"`, and `provider: "nano-banana-pro"`.

Prompt for WikiFood:

```text
Hybrid cinematic banner backplate for a multi-vendor commerce and delivery backend. Dark operational software command room, subtle purple-blue TRAFFODATA signal light, route lines, warehouse and order modules, premium B2B infrastructure mood. Leave the center-left area clean for a real product screenshot overlay. No readable text, no logos, no fake UI labels, no people.
```

Prompt for Elnasser:

```text
Hybrid cinematic banner backplate for an enterprise ecommerce logistics engine. Dark logistics control surface, delivery route traces, recursive category system grid, warehouse movement, disciplined purple-blue signal light, precise operational software atmosphere. Leave a large clean area for a real dashboard screenshot overlay. No readable text, no logos, no fake UI labels, no people.
```

Prompt for Sync:

```text
Hybrid cinematic banner backplate for a premium mobile gym app. Dark mobile product launch surface, kinetic training data arcs, device-stage lighting, restrained purple-blue system glow, polished app portfolio atmosphere. Leave a clean central area for real app screenshots. No readable text, no logos, no fake UI labels, no people.
```

- [ ] **Step 3: Save Pika outputs into the asset folder**

Download the three returned image URLs into the exact filenames listed in this task. If the output format is not WebP, convert or rename only after confirming the browser can load the file.

Run:

```bash
file public/work-banners/wikifood-commerce-delivery-backend.webp
file public/work-banners/elnasser-backend-dashboard.webp
file public/work-banners/behance-sync-gym-app.webp
```

Expected: each command reports an image file.

- [ ] **Step 4: Create manifest**

Create `public/work-banners/manifest.json`:

```json
{
  "version": 1,
  "style": "hybrid-cinematic",
  "dimensions": "16:9",
  "pilot": [
    {
      "slug": "wikifood-commerce-delivery-backend",
      "family": "commerce",
      "banner": "/work-banners/wikifood-commerce-delivery-backend.webp",
      "sourceImage": "/work-images/wikifood.webp",
      "status": "generated"
    },
    {
      "slug": "elnasser-backend-dashboard",
      "family": "logistics",
      "banner": "/work-banners/elnasser-backend-dashboard.webp",
      "sourceImage": "/work-images/elnasserback.webp",
      "status": "generated"
    },
    {
      "slug": "behance-sync-gym-app",
      "family": "mobile",
      "banner": "/work-banners/behance-sync-gym-app.webp",
      "sourceImage": "/work-images/behance/behance-sync-gym-app-01-3fa6e2cc.png",
      "status": "generated"
    }
  ]
}
```

- [ ] **Step 5: Stage and commit**

Run:

```bash
git add public/work-banners/.gitkeep public/work-banners/manifest.json public/work-banners/*.webp
git commit -m "feat: add pilot cinematic work banners"
```

Expected: commit succeeds with three image assets and the manifest.

## Task 7: Expand Banner Metadata To All 43 Projects

**Files:**
- Modify: `src/components/site/workBannerData.generated.ts`

- [ ] **Step 1: Replace pilot-only metadata with full mapping**

Replace `workBannerData` with an entry for every slug in the work page. Keep the same object shape:

```ts
export const workBannerData = {
  "wikifood-commerce-delivery-backend": {
    banner: "/work-banners/wikifood-commerce-delivery-backend.webp",
    bannerFamily: "commerce",
  },
  "printout-laravel-rest-api": {
    banner: "/work-banners/printout-laravel-rest-api.webp",
    bannerFamily: "backend",
  },
  "taggz-ai-event-photography-platform": {
    banner: "/work-banners/taggz-ai-event-photography-platform.webp",
    bannerFamily: "specialty",
  },
  "jawad-horse-riding-booking-platform": {
    banner: "/work-banners/jawad-horse-riding-booking-platform.webp",
    bannerFamily: "mobile",
  },
  "elnasser-backend-dashboard": {
    banner: "/work-banners/elnasser-backend-dashboard.webp",
    bannerFamily: "logistics",
  },
  "alnasser-ecommerce": {
    banner: "/work-banners/alnasser-ecommerce.webp",
    bannerFamily: "commerce",
  },
  "igc-influencer-ugc-platform": {
    banner: "/work-banners/igc-influencer-ugc-platform.webp",
    bannerFamily: "commerce",
  },
  "medad-alqemam": {
    banner: "/work-banners/medad-alqemam.webp",
    bannerFamily: "corporate",
  },
  "ar-dish-visuals": {
    banner: "/work-banners/ar-dish-visuals.webp",
    bannerFamily: "specialty",
  },
  "kemedar-real-estate-platform": {
    banner: "/work-banners/kemedar-real-estate-platform.webp",
    bannerFamily: "corporate",
  },
  "dental-osrais": {
    banner: "/work-banners/dental-osrais.webp",
    bannerFamily: "specialty",
  },
  "polrais-marine": {
    banner: "/work-banners/polrais-marine.webp",
    bannerFamily: "specialty",
  },
  "nourtha-tech-v2": {
    banner: "/work-banners/nourtha-tech-v2.webp",
    bannerFamily: "corporate",
  },
  "nourtha-tech": {
    banner: "/work-banners/nourtha-tech.webp",
    bannerFamily: "corporate",
  },
  "fanzvar": {
    banner: "/work-banners/fanzvar.webp",
    bannerFamily: "corporate",
  },
  "inomhub": {
    banner: "/work-banners/inomhub.webp",
    bannerFamily: "corporate",
  },
  "kenz": {
    banner: "/work-banners/kenz.webp",
    bannerFamily: "corporate",
  },
  "cslf": {
    banner: "/work-banners/cslf.webp",
    bannerFamily: "corporate",
  },
  "inovent": {
    banner: "/work-banners/inovent.webp",
    bannerFamily: "corporate",
  },
  "out-seller-landing-page": {
    banner: "/work-banners/out-seller-landing-page.webp",
    bannerFamily: "commerce",
  },
  "inom-techs": {
    banner: "/work-banners/inom-techs.webp",
    bannerFamily: "corporate",
  },
  "out-seller": {
    banner: "/work-banners/out-seller.webp",
    bannerFamily: "commerce",
  },
  "edu-chain": {
    banner: "/work-banners/edu-chain.webp",
    bannerFamily: "specialty",
  },
  "out-seller-2": {
    banner: "/work-banners/out-seller-2.webp",
    bannerFamily: "commerce",
  },
  "hunter": {
    banner: "/work-banners/hunter.webp",
    bannerFamily: "specialty",
  },
  "gameing": {
    banner: "/work-banners/gameing.webp",
    bannerFamily: "specialty",
  },
  "spiro": {
    banner: "/work-banners/spiro.webp",
    bannerFamily: "specialty",
  },
  "halaa-bazaar": {
    banner: "/work-banners/halaa-bazaar.webp",
    bannerFamily: "commerce",
  },
  "shopwise": {
    banner: "/work-banners/shopwise.webp",
    bannerFamily: "commerce",
  },
  "e-commerce-gamel": {
    banner: "/work-banners/e-commerce-gamel.webp",
    bannerFamily: "commerce",
  },
  "kids": {
    banner: "/work-banners/kids.webp",
    bannerFamily: "commerce",
  },
  "behance-sync-gym-app": {
    banner: "/work-banners/behance-sync-gym-app.webp",
    bannerFamily: "mobile",
  },
  "behance-i-grill": {
    banner: "/work-banners/behance-i-grill.webp",
    bannerFamily: "mobile",
  },
  "behance-baqa-app": {
    banner: "/work-banners/behance-baqa-app.webp",
    bannerFamily: "mobile",
  },
  "behance-max-hub-e-commerce": {
    banner: "/work-banners/behance-max-hub-e-commerce.webp",
    bannerFamily: "commerce",
  },
  "behance-naqlty-app": {
    banner: "/work-banners/behance-naqlty-app.webp",
    bannerFamily: "logistics",
  },
  "behance-logistic-platform": {
    banner: "/work-banners/behance-logistic-platform.webp",
    bannerFamily: "logistics",
  },
  "behance-e-coomerce": {
    banner: "/work-banners/behance-e-coomerce.webp",
    bannerFamily: "commerce",
  },
  "behance-inovent": {
    banner: "/work-banners/behance-inovent.webp",
    bannerFamily: "corporate",
  },
  "behance-e-commerce": {
    banner: "/work-banners/behance-e-commerce.webp",
    bannerFamily: "commerce",
  },
  "behance-test-system": {
    banner: "/work-banners/behance-test-system.webp",
    bannerFamily: "dashboard",
  },
  "behance-tawsila-app": {
    banner: "/work-banners/behance-tawsila-app.webp",
    bannerFamily: "logistics",
  },
  "behance-financial-dashboard": {
    banner: "/work-banners/behance-financial-dashboard.webp",
    bannerFamily: "dashboard",
  },
} satisfies Record<string, WorkBannerMetadata>;
```

- [ ] **Step 2: Run a coverage check**

Run:

```bash
node -e 'const fs=require("fs"); const a=fs.readFileSync("src/components/site/workData.ts","utf8")+fs.readFileSync("src/components/site/behanceWorkData.generated.ts","utf8"); const slugs=[...a.matchAll(/\n\s{4}slug:\s*"([^"]+)"/g)].map(m=>m[1]); const b=fs.readFileSync("src/components/site/workBannerData.generated.ts","utf8"); const missing=slugs.filter(s=>!b.includes(`"${s}"`)); console.log({total:slugs.length, missing}); process.exit(missing.length ? 1 : 0);'
```

Expected: `{ total: 43, missing: [] }`.

- [ ] **Step 3: Run build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 4: Stage and commit**

Run:

```bash
git add src/components/site/workBannerData.generated.ts
git commit -m "feat: map banners for all work projects"
```

Expected: commit succeeds.

## Task 8: Generate Remaining Banner Assets In Batches

**Files:**
- Add: `public/work-banners/*.webp`
- Modify: `public/work-banners/manifest.json`
- Create: `docs/work-banners-generation-queue.json`

- [ ] **Step 1: Create a concrete generation queue**

Run this command to create `docs/work-banners-generation-queue.json` from the current project source:

```bash
node <<'NODE'
const fs = require("fs");
const source = fs.readFileSync("src/components/site/workData.ts", "utf8") + "\n" + fs.readFileSync("src/components/site/behanceWorkData.generated.ts", "utf8");
const bannerSource = fs.readFileSync("src/components/site/workBannerData.generated.ts", "utf8");
const projectBlocks = source.split(/\n\s*\},\n\s*\{/);
const projects = projectBlocks.flatMap((block) => {
  const title = block.match(/title:\s*"([^"]+)"/)?.[1];
  const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
  const type = block.match(/type:\s*"([^"]+)"/)?.[1] || "Digital product";
  const summary = block.match(/summary:\s*"([^"]+)"/)?.[1] || block.match(/description:\s*"([^"]+)"/)?.[1] || "Operational software system";
  const thumbnail = block.match(/thumbnail:\s*"([^"]+)"/)?.[1] || "";
  if (!title || !slug) return [];
  const familyMatch = bannerSource.match(new RegExp(`"${slug}": \\\\{[\\\\s\\\\S]*?bannerFamily: "([^"]+)"`));
  const family = familyMatch?.[1] || "specialty";
  return [{
    title,
    slug,
    type,
    family,
    sourceImage: thumbnail,
    banner: `/work-banners/${slug}.webp`,
    prompt: `Hybrid cinematic banner backplate for ${title}, a ${type}. Project family: ${family}. Dark premium TRAFFODATA operational software atmosphere, precise system surfaces, subtle purple-blue signal light, cinematic depth, clean area for real product screenshot overlay. Include abstract cues from this project: ${summary}. No readable text, no logos, no fake UI labels, no people.`
  }];
});
fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/work-banners-generation-queue.json", JSON.stringify(projects, null, 2) + "\n");
console.log({ total: projects.length });
NODE
```

Expected: `{ total: 43 }`.

- [ ] **Step 2: Generate remaining images by family**

Use Pika MCP `generate_image` with `aspect_ratio: "16:9"`, `resolution: "2K"`, and `provider: "nano-banana-pro"`. Generate from the concrete `prompt` values in `docs/work-banners-generation-queue.json`. Generate in batches of 6 so visual quality can be checked between batches.

- [ ] **Step 3: Download each result to its slug filename**

For each generated URL, set `PIKA_OUTPUT_URL` to the returned URL and `slug` to the matching queue entry slug, then run:

```bash
curl -L "$PIKA_OUTPUT_URL" -o "public/work-banners/$slug.webp"
file "public/work-banners/$slug.webp"
```

Expected: `file` reports an image.

- [ ] **Step 4: Update manifest after each batch**

For every generated banner, append the matching queue entry to `public/work-banners/manifest.json` using this shape with concrete values from `docs/work-banners-generation-queue.json`:

```json
{
  "slug": "printout-laravel-rest-api",
  "family": "backend",
  "banner": "/work-banners/printout-laravel-rest-api.webp",
  "sourceImage": "/work-images/printoutt.webp",
  "status": "generated"
}
```

- [ ] **Step 5: Stage and commit each batch**

Run after each batch:

```bash
git add docs/work-banners-generation-queue.json public/work-banners/manifest.json public/work-banners/*.webp
git commit -m "feat: add cinematic work banner batch"
```

Expected: commit succeeds after each reviewed batch.

## Task 9: Browser Verification

**Files:**
- No source edits expected unless verification finds defects.

- [ ] **Step 1: Start the development server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite reports a local URL.

- [ ] **Step 2: Verify work page in browser**

Open `/work` and verify:

- Project cards still render in the same grid.
- Filters still switch between all, website, mobile apps, and Figma designs.
- The card title and summary remain readable.
- At least the three pilot banners show a cinematic backplate and a real screenshot/proof surface.

- [ ] **Step 3: Verify detail page**

Open:

```text
/work/wikifood-commerce-delivery-backend
```

Expected: the detail hero shows the banner image, title overlay remains readable, and gallery content still renders below.

- [ ] **Step 4: Verify mobile width**

Set browser viewport to 390 x 844 and verify `/work`:

- No text overflows card bounds.
- Card overlays remain readable.
- Images crop acceptably.

- [ ] **Step 5: Stop the development server**

Stop the `npm run dev` process with `Ctrl+C`.

## Task 10: Final Verification And Completion Commit

**Files:**
- Source edits only if previous verification found defects.

- [ ] **Step 1: Run final build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 2: Run lint**

Run:

```bash
npm run lint
```

Expected: lint passes or reports pre-existing unrelated warnings. Fix only warnings/errors caused by banner files.

- [ ] **Step 3: Check git status**

Run:

```bash
git status --short
```

Expected: only intentional banner implementation files are modified/staged. Existing unrelated modified files remain unstaged.

- [ ] **Step 4: Commit final fixes**

If verification produced fixes, run:

```bash
git add src/components/site/workData.ts src/components/site/workBannerData.generated.ts src/components/site/workBannerMedia.ts src/components/site/WorkPage.tsx src/components/site/ProjectMedia.tsx public/work-banners
git commit -m "fix: polish work banner integration"
```

Expected: commit succeeds only if there are final fixes to commit.

## Self-Review

Spec coverage:

- All 43 projects: Task 7 maps all 43; Task 8 generates remaining assets.
- Hybrid cinematic style: Tasks 4, 6, and 8 implement the visual system and generated backplates.
- Real screenshots preserved: Task 4 keeps `proofImage` as the foreground product surface.
- Detail page reuse: Task 5 updates `ProjectHeroBanner`.
- Accessibility: Tasks 3, 4, and 5 provide alt text and keep app-rendered text.
- Performance: Tasks 6 and 8 use static assets; Task 10 runs final build/lint.

Placeholder scan:

- The plan contains no unfinished-work markers.
- The remaining 34 slug entries in Task 7 are intentionally generated from the existing `workItems` list during execution and verified by the coverage command.

Type consistency:

- `WorkBannerFamily`, `WorkBannerMetadata`, `banner`, and `bannerFamily` names are consistent across tasks.
- Helper names used in WorkPage and ProjectMedia match the helper module.

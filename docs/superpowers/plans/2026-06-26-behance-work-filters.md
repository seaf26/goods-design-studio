# Behance Work Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add category filtering to the work page and import Rana Salah's Behance projects as rich local Figma design case studies with downloaded images.

**Architecture:** Keep production rendering static by generating a Behance data module and local image assets during development. The app merges existing hand-authored work items with generated Behance items, then filters them client-side on the work page. The project detail route continues to use the existing `WorkItem` structure so imported Behance projects render as first-class case studies.

**Tech Stack:** React 19, TanStack Router, Vite, TypeScript, Node.js scripts, static assets in `public/`.

---

### Task 1: Add Generated Behance Data Boundary

**Files:**

- Create: `src/components/site/behanceWorkData.generated.ts`
- Modify: `src/components/site/workData.ts`

- [ ] **Step 1: Create an empty generated data module**

Create `src/components/site/behanceWorkData.generated.ts` with this content:

```ts
import type { WorkItemInput } from "./workData";

export const behanceWorkItems = [] satisfies WorkItemInput[];
```

- [ ] **Step 2: Extend the work item input type**

In `src/components/site/workData.ts`, add a `WorkCategory` union and a reusable `WorkItemInput` type. Keep `iconName` on the input type because generated records cannot store Lucide component references directly.

```ts
export type WorkCategory = "website" | "mobile-app" | "figma-design";

export type WorkItemInput = Omit<WorkItem, "icon"> & {
  iconName: keyof typeof icons;
};
```

- [ ] **Step 3: Extend `WorkItem`**

In `WorkItem`, add these fields after `type`:

```ts
  category: WorkCategory;
  source?: string;
  sourceUrl?: string;
```

- [ ] **Step 4: Import and merge generated data**

At the top of `workData.ts`, import the generated data:

```ts
import { behanceWorkItems } from "./behanceWorkData.generated";
```

Then change the export to merge local and generated records:

```ts
const allProjectInputs = [...portfolioProjects, ...behanceWorkItems] satisfies WorkItemInput[];

export const workItems: WorkItem[] = allProjectInputs.map((project) => ({
  ...project,
  icon: icons[project.iconName],
}));
```

- [ ] **Step 5: Run TypeScript build**

Run: `npm run build`

Expected: build fails only if existing records do not yet include `category`; that is fixed in Task 2.

### Task 2: Categorize Existing Work Items

**Files:**

- Modify: `src/components/site/workData.ts`

- [ ] **Step 1: Add categories to existing records**

For every existing object in `portfolioProjects`, add exactly one category:

```ts
"category": "mobile-app",
```

Use `mobile-app` when `type` is `Mobile product` or the record clearly describes mobile apps. Use `website` for backend platforms, dashboards, ecommerce websites, web experiences, and Laravel/Next/React web systems.

- [ ] **Step 2: Keep current project behavior unchanged**

Do not change existing slugs, titles, images, `href`, `detailSections`, or `iconName` while adding categories.

- [ ] **Step 3: Run build**

Run: `npm run build`

Expected: build succeeds or reports only issues from later unimplemented tasks.

### Task 3: Add Work Page Filters

**Files:**

- Modify: `src/components/site/WorkPage.tsx`

- [ ] **Step 1: Import the category type**

Change the existing import:

```ts
import { workItems, type WorkCategory, type WorkItem } from "./workData";
```

- [ ] **Step 2: Add filter configuration**

Add this near the top of the file after `processNotes`:

```ts
type WorkFilter = "all" | WorkCategory;

const workFilters: { value: WorkFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "website", label: "Website" },
  { value: "mobile-app", label: "Mobile Apps" },
  { value: "figma-design", label: "Figma Designs" },
];
```

- [ ] **Step 3: Store active filter and derive visible items**

Inside `WorkPage`, before `return`, add:

```ts
const [activeFilter, setActiveFilter] = useState<WorkFilter>("all");
const visibleWorkItems =
  activeFilter === "all" ? workItems : workItems.filter((item) => item.category === activeFilter);
```

- [ ] **Step 4: Render accessible filter buttons**

Add this block below the intro paragraph and before the backdrop title:

```tsx
<div className="mt-8 flex flex-wrap gap-2" aria-label="Work filters">
  {workFilters.map((filter) => {
    const isActive = activeFilter === filter.value;
    return (
      <button
        key={filter.value}
        type="button"
        aria-pressed={isActive}
        onClick={() => setActiveFilter(filter.value)}
        className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-[background-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.97] ${
          isActive
            ? "bg-[var(--ink)] text-white shadow-[0_14px_40px_-28px_rgba(0,0,0,0.8)]"
            : "bg-[var(--surface)] text-[var(--muted-foreground)] ring-1 ring-[var(--hairline)] hover:text-[var(--ink)]"
        }`}
      >
        {filter.label}
      </button>
    );
  })}
</div>
```

- [ ] **Step 5: Render the filtered list**

Change the grid map from:

```tsx
{
  workItems.map((item, index) => <ProjectTile key={item.title} item={item} index={index} />);
}
```

to:

```tsx
{
  visibleWorkItems.map((item, index) => <ProjectTile key={item.slug} item={item} index={index} />);
}
```

- [ ] **Step 6: Run build**

Run: `npm run build`

Expected: build succeeds after generated data and categories compile.

### Task 4: Build Behance Scraper

**Files:**

- Create: `scripts/scrape-behance.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add npm script**

In `package.json`, add:

```json
"scrape:behance": "node scripts/scrape-behance.mjs"
```

- [ ] **Step 2: Create scraper script**

Create `scripts/scrape-behance.mjs` that:

```js
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const profileUrl = "https://www.behance.net/ranasalah23";
const rootDir = process.cwd();
const imageDir = path.join(rootDir, "public/work-images/behance");
const outputFile = path.join(rootDir, "src/components/site/behanceWorkData.generated.ts");

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value) {
  return decodeHtml(
    value
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} for ${url}`);
  }

  return response.text();
}

function extractProjectUrls(html) {
  const urls = [];
  const anchorPattern = /href=["'](https:\/\/www\.behance\.net\/gallery\/[^"']+)["']/g;
  const escapedPattern = /https:\\\/\\\/www\.behance\.net\\\/gallery\\\/[^"\\]+/g;

  for (const match of html.matchAll(anchorPattern)) {
    urls.push(match[1].split("?")[0]);
  }

  for (const match of html.matchAll(escapedPattern)) {
    urls.push(match[0].replaceAll("\\/", "/").split("?")[0]);
  }

  return unique(urls).filter((url) => url.includes("/gallery/"));
}

function extractMeta(html, property) {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return decodeHtml(pattern.exec(html)?.[1] ?? "");
}

function extractTitle(html) {
  return (
    extractMeta(html, "og:title")
      .replace(/\s+on Behance$/i, "")
      .trim() ||
    stripTags(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "").replace(
      /\s+on Behance$/i,
      "",
    )
  );
}

function extractDescription(html) {
  return extractMeta(html, "description") || extractMeta(html, "og:description");
}

function extractTags(html) {
  const tags = [];
  const keywordMeta = extractMeta(html, "keywords");
  tags.push(...keywordMeta.split(",").map((tag) => tag.trim()));

  const tagPattern = /"name"\s*:\s*"([^"]{2,40})"/g;
  for (const match of html.matchAll(tagPattern)) {
    const tag = decodeHtml(match[1]).trim();
    if (/^[\w\s+#./-]+$/.test(tag) && !/behance|adobe/i.test(tag)) {
      tags.push(tag);
    }
  }

  return unique(["Figma", "UI Design", "UX Design", ...tags]).slice(0, 10);
}

function extractBodyText(html) {
  const textBlocks = [];
  const textPattern = /<(?:p|h1|h2|h3|figcaption)[^>]*>([\s\S]*?)<\/(?:p|h1|h2|h3|figcaption)>/gi;

  for (const match of html.matchAll(textPattern)) {
    const text = stripTags(match[1]);
    if (text.length > 40 && !/cookie|privacy|sign up|log in/i.test(text)) {
      textBlocks.push(text);
    }
  }

  return unique(textBlocks).slice(0, 8);
}

function extractImageUrls(html) {
  const urls = [];
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    /https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^"\\\s]+/g,
    /https:\\\/\\\/mir-s3-cdn-cf\.behance\.net\\\/project_modules\\\/[^"\\\s]+/g,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      urls.push(
        decodeHtml(match[1] ?? match[0])
          .replaceAll("\\/", "/")
          .split("?")[0],
      );
    }
  }

  return unique(urls)
    .filter((url) => /\.(jpg|jpeg|png|webp)$/i.test(url))
    .filter((url) => !/\/disp\/|\/source\//i.test(url))
    .slice(0, 8);
}

async function downloadImage(url, slug, index) {
  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    throw new Error(`Image fetch failed ${response.status} for ${url}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const extension = contentType.includes("png")
    ? "png"
    : contentType.includes("webp")
      ? "webp"
      : "jpg";
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);
  const fileName = `${slug}-${String(index + 1).padStart(2, "0")}-${hash}.${extension}`;
  const absolutePath = path.join(imageDir, fileName);
  const publicPath = `/work-images/behance/${fileName}`;
  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.byteLength < 5000) {
    throw new Error(`Skipping tiny image ${url}`);
  }

  await writeFile(absolutePath, buffer);
  return publicPath;
}

function makeSections(title, description, bodyText, tags) {
  const sections = [];
  const overview =
    description ||
    bodyText[0] ||
    `${title} is a UI/UX design project imported from Rana Salah's Behance portfolio.`;
  sections.push({ title: "Project Overview", text: overview });

  const remaining = bodyText.filter((text) => text !== overview);
  remaining.slice(0, 4).forEach((text, index) => {
    sections.push({ title: index === 0 ? "Design Details" : "Project Notes", text });
  });

  sections.push({
    title: "Design System Signals",
    text: `This Figma design work is indexed with ${tags.slice(0, 6).join(", ")} so visitors can understand the product category, visual direction, and UX craft behind the case study.`,
  });

  return sections;
}

function renderRecord(project) {
  return `  {
    title: ${JSON.stringify(project.title)},
    slug: ${JSON.stringify(project.slug)},
    href: ${JSON.stringify(project.href)},
    source: "Behance",
    sourceUrl: ${JSON.stringify(project.href)},
    client: ${JSON.stringify(project.title)},
    type: "Figma Design",
    category: "figma-design",
    description: ${JSON.stringify(project.summary)},
    summary: ${JSON.stringify(project.summary)},
    scope: ${JSON.stringify(project.tags.slice(0, 2).join(", "))},
    outcome: "Design case study",
    visual: "portfolio",
    span: "half",
    tone: "light",
    stats: ${JSON.stringify(["Figma Design", project.tags[0] ?? "UI Design"], null, 6)},
    year: "Behance",
    duration: "Design",
    team: "UI/UX design",
    headline: ${JSON.stringify(project.title)},
    detailIntro: ${JSON.stringify(project.summary)},
    challenge: ${JSON.stringify(project.sections[0]?.text ?? project.summary)},
    build: ${JSON.stringify(project.sections[1]?.text ?? project.summary)},
    impact: ${JSON.stringify(project.sections.at(-1)?.text ?? project.summary)},
    modules: ${JSON.stringify(project.tags.slice(0, 8), null, 6)},
    outcomes: ${JSON.stringify(["Figma design", "UI/UX case study", "Behance source"], null, 6)},
    timeline: ${JSON.stringify(
      project.sections.slice(0, 3).map((section) => ({ label: section.title, text: section.text })),
      null,
      6,
    )},
    thumbnail: ${JSON.stringify(project.images[0] ?? "")},
    images: ${JSON.stringify(project.images, null, 6)},
    stack: ${JSON.stringify(project.tags.slice(0, 8), null, 6)},
    detailSections: ${JSON.stringify(project.sections, null, 6)},
    iconName: "Code2",
  }`;
}

async function main() {
  await mkdir(imageDir, { recursive: true });

  const profileHtml = await fetchText(profileUrl);
  const projectUrls = extractProjectUrls(profileHtml);

  if (projectUrls.length === 0) {
    throw new Error("No Behance project URLs found on profile.");
  }

  const projects = [];

  for (const url of projectUrls) {
    try {
      const html = await fetchText(url);
      const title = extractTitle(html);
      const slug = slugify(`behance-${title || url.split("/").at(-1)}`);
      const description = extractDescription(html);
      const tags = extractTags(html);
      const bodyText = extractBodyText(html);
      const imageUrls = extractImageUrls(html);
      const images = [];

      for (const [index, imageUrl] of imageUrls.entries()) {
        try {
          images.push(await downloadImage(imageUrl, slug, index));
        } catch (error) {
          console.warn(error.message);
        }
      }

      if (!title || images.length === 0) {
        console.warn(`Skipping incomplete project: ${url}`);
        continue;
      }

      const sections = makeSections(title, description, bodyText, tags);
      projects.push({
        title,
        slug,
        href: url,
        summary: description || sections[0].text,
        tags,
        images,
        sections,
      });
    } catch (error) {
      console.warn(`Skipping ${url}: ${error.message}`);
    }
  }

  if (projects.length === 0) {
    throw new Error("No valid Behance projects were generated.");
  }

  const output = `import type { WorkItemInput } from "./workData";

export const behanceWorkItems = [
${projects.map(renderRecord).join(",\n")}
] satisfies WorkItemInput[];
`;

  await writeFile(outputFile, output);
  console.log(`Generated ${projects.length} Behance projects.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
```

- [ ] **Step 3: Run scraper**

Run: `npm run scrape:behance`

Expected: prints `Generated N Behance projects.` and writes local images into `public/work-images/behance/`.

### Task 5: Scraper Output Quality Pass

**Files:**

- Modify if needed: `scripts/scrape-behance.mjs`
- Generated: `src/components/site/behanceWorkData.generated.ts`
- Generated: `public/work-images/behance/*`

- [ ] **Step 1: Inspect generated records**

Run:

```bash
sed -n '1,220p' src/components/site/behanceWorkData.generated.ts
find public/work-images/behance -type f | head -20
```

Expected: each generated record has a title, slug, `category: "figma-design"`, non-empty `images`, and rich `detailSections`.

- [ ] **Step 2: Fix extraction if output is shallow**

If records have only generic text or no meaningful images, update extraction in `scripts/scrape-behance.mjs` by adding another structured-data regex source and rerun `npm run scrape:behance`.

- [ ] **Step 3: Run build**

Run: `npm run build`

Expected: build succeeds and generated data type-checks.

### Task 6: Verify UI Locally

**Files:**

- No planned file changes unless verification finds a problem.

- [ ] **Step 1: Start dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite serves the app on an available local URL.

- [ ] **Step 2: Check work filters**

Open `/work` in a browser and verify:

- `All` shows existing work plus Behance imports.
- `Website` hides mobile-app and Figma-design items.
- `Mobile Apps` shows mobile product records.
- `Figma Designs` shows Behance imports.

- [ ] **Step 3: Check a Behance detail page**

Open one generated `/work/<behance-slug>` page and verify:

- Hero image renders from `/work-images/behance/`.
- Detail text is visible.
- Gallery images render.
- `Open project` points to the Behance project URL.

- [ ] **Step 4: Stop dev server**

Stop the Vite process after verification so no background session is left running.

### Task 7: Final Verification and Commit

**Files:**

- Stage only files changed for this feature.

- [ ] **Step 1: Run final build**

Run: `npm run build`

Expected: build succeeds.

- [ ] **Step 2: Review git diff**

Run:

```bash
git status --short
git diff -- src/components/site/workData.ts src/components/site/WorkPage.tsx scripts/scrape-behance.mjs package.json src/components/site/behanceWorkData.generated.ts
```

Expected: diff contains only category/filter/scraper/generated-data changes for this feature, plus generated Behance image assets.

- [ ] **Step 3: Commit feature**

Run:

```bash
git add src/components/site/workData.ts src/components/site/WorkPage.tsx src/components/site/behanceWorkData.generated.ts scripts/scrape-behance.mjs package.json package-lock.json public/work-images/behance docs/superpowers/plans/2026-06-26-behance-work-filters.md
git commit -m "Add Behance work import filters"
```

Expected: commit succeeds.

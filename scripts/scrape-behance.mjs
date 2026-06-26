import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const profileUrl = "https://www.behance.net/ranasalah23";
const rootDir = process.cwd();
const imageDir = path.join(rootDir, "public/work-images/behance");
const outputFile = path.join(rootDir, "src/components/site/behanceWorkData.generated.ts");
const requestHeaders = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

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
    .replace(/&#039;/g, "'")
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

function unescapeUrl(value) {
  return decodeHtml(value)
    .replaceAll("\\/", "/")
    .replaceAll("\\u002F", "/")
    .replaceAll("\\u0026", "&")
    .replaceAll("\\u003D", "=")
    .replaceAll("\\u003F", "?");
}

async function fetchText(url) {
  const response = await fetch(url, { headers: requestHeaders });

  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} for ${url}`);
  }

  return response.text();
}

function formatDate(timestamp) {
  if (!timestamp) return "Behance portfolio";
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(
    new Date(timestamp * 1000),
  );
}

function extractNumber(context, pattern) {
  const value = pattern.exec(context)?.[1];
  return value ? Number(value) : undefined;
}

function extractProjectEntries(html) {
  const entries = [];
  const plainPattern = /https:\/\/www\.behance\.net\/gallery\/[^"'\s<]+/g;
  const escapedPattern = /https:\\\/\\\/www\.behance\.net\\\/gallery\\\/(?:[^"\\]|\\.)+/g;

  for (const match of html.matchAll(plainPattern)) {
    entries.push({ url: match[0] });
  }

  for (const match of html.matchAll(escapedPattern)) {
    const context = html.slice(match.index ?? 0, (match.index ?? 0) + 9000);
    entries.push({
      url: unescapeUrl(match[0]),
      title: decodeHtml(/"name":"([^"]+)"/.exec(context)?.[1] ?? ""),
      publishedOn: extractNumber(context, /"publishedOn":(\d+)/),
      modifiedOn: extractNumber(context, /"modifiedOn":(\d+)/),
      views: extractNumber(context, /"views":\{"all":(\d+)\}/),
      appreciations: extractNumber(context, /"appreciations":\{"all":(\d+)\}/),
    });
  }

  const byUrl = new Map();

  for (const entry of entries) {
    const url = entry.url.split("?")[0];
    if (
      !/^https:\/\/www\.behance\.net\/gallery\/\d+\/[^/]+/.test(url) ||
      url.includes("/moodboard/")
    ) {
      continue;
    }

    const existing = byUrl.get(url) ?? {};
    byUrl.set(url, { ...existing, ...entry, url });
  }

  return [...byUrl.values()];
}

function extractMeta(html, property) {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  return decodeHtml(pattern.exec(html)?.[1] ?? "").trim();
}

function extractTitle(html, url) {
  const slugTitle = decodeURIComponent(url.split("/").at(-1) ?? "")
    .replace(/[-_]+/g, " ")
    .trim();
  const metaTitle =
    extractMeta(html, "og:title") ||
    stripTags(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "");
  return (
    metaTitle
      .replace(/\s+-\s+Rana Salah$/i, "")
      .replace(/\s+on Behance$/i, "")
      .trim() || slugTitle
  ).trim();
}

function extractDescription(html) {
  const description = extractMeta(html, "description") || extractMeta(html, "og:description");
  return /creative network|discovering creative work/i.test(description) ? "" : description;
}

function extractTags(html) {
  const tags = [];
  const keywordMeta = extractMeta(html, "keywords");
  tags.push(...keywordMeta.split(",").map((tag) => tag.trim()));

  for (const match of html.matchAll(/"name"\s*:\s*"([^"]{2,48})"/g)) {
    const tag = decodeHtml(match[1]).trim();
    if (/^[\w\s+#./&()-]+$/.test(tag) && !/behance|adobe|follow|message|save/i.test(tag)) {
      tags.push(tag);
    }
  }

  return unique(["Figma", "UI Design", "UX Design", ...tags]).slice(0, 12);
}

function extractImageUrls(html) {
  const urls = [];
  const patterns = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/gi,
    /https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^"'\s<]+/g,
    /https:\\\/\\\/mir-s3-cdn-cf\.behance\.net\\\/project_modules\\\/(?:[^"\\]|\\.)+/g,
    /"src"\s*:\s*"(https:\\\/\\\/mir-s3-cdn-cf\.behance\.net\\\/project_modules\\\/(?:[^"\\]|\\.)+)"/g,
  ];

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      urls.push(unescapeUrl(match[1] ?? match[0]).split("?")[0]);
    }
  }

  return unique(urls)
    .filter((url) => /\.(jpg|jpeg|png|webp)$/i.test(url))
    .filter((url) => !/\/(disp|source|fs)\//i.test(url))
    .filter((url) => !/\/user\/|\/avatars\//i.test(url))
    .slice(0, 10);
}

async function downloadImage(url, slug, index) {
  const response = await fetch(url, {
    headers: { "user-agent": requestHeaders["user-agent"] },
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

function makeSummary(title, tags, meta) {
  const tagList = tags.slice(0, 4).join(", ");
  const published = formatDate(meta.publishedOn);
  return `${title} is a Figma UI/UX design case study imported from Behance, published ${published}, with focus areas including ${tagList}.`;
}

function makeSections(title, tags, imagesCount, meta) {
  const published = formatDate(meta.publishedOn);
  const modified = formatDate(meta.modifiedOn);
  const stats = [
    typeof meta.views === "number" ? `${meta.views} Behance views` : "",
    typeof meta.appreciations === "number" ? `${meta.appreciations} appreciations` : "",
  ]
    .filter(Boolean)
    .join(" and ");
  const tagList = tags.slice(0, 8).join(", ");

  return [
    {
      title: "Project Overview",
      text: `${title} is imported from Behance as a Figma design case study. The project is categorized under Figma designs so it can be browsed separately from websites and mobile/backend implementation work.`,
    },
    {
      title: "Design Focus",
      text: `The scraped project tags and tools identify the work around ${tagList}. These tags are preserved as capabilities on the detail page so visitors can quickly understand the product type, UI direction, and design craft involved.`,
    },
    {
      title: "Gallery Assets",
      text: `${imagesCount} Behance-hosted project images were downloaded into the local portfolio asset folder and attached to this case study. The detail page uses those local files for the hero preview and gallery instead of hotlinking remote Behance images.`,
    },
    {
      title: "Behance Details",
      text: `Source: Behance. Published: ${published}. Last updated: ${modified}. ${stats ? `Profile stats at scrape time: ${stats}. ` : ""}Original project URL: ${meta.url}.`,
    },
  ];
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

async function scrapeProject(entry) {
  const html = await fetchText(entry.url);
  const title = (entry.title || extractTitle(html, entry.url)).trim();
  const slug = slugify(`behance-${title || entry.url.split("/").at(-1)}`);
  const tags = extractTags(html);
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
    throw new Error(`Incomplete project data for ${entry.url}`);
  }

  const meta = { ...entry, url: entry.url };
  const sections = makeSections(title, tags, images.length, meta);
  const summary = makeSummary(title, tags, meta);

  return {
    title,
    slug,
    href: entry.url,
    summary,
    tags,
    images,
    sections,
  };
}

async function main() {
  await rm(imageDir, { recursive: true, force: true });
  await mkdir(imageDir, { recursive: true });

  const profileHtml = await fetchText(profileUrl);
  const projectEntries = extractProjectEntries(profileHtml);

  if (projectEntries.length === 0) {
    throw new Error("No Behance project URLs found on profile.");
  }

  const projects = [];

  for (const entry of projectEntries) {
    try {
      projects.push(await scrapeProject(entry));
      console.log(`Scraped ${entry.url}`);
    } catch (error) {
      console.warn(`Skipping ${entry.url}: ${error.message}`);
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

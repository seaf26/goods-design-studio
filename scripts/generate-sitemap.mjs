import { readFileSync, writeFileSync } from "node:fs";

const SITE_URL = "https://traffodata.com";
const LASTMOD = "2026-06-29";
const CONTENT_LASTMOD = "2026-09-26";
const UPDATED_WORK_LASTMOD = "2026-09-24";
const SOLUTION_LASTMOD = "2026-09-26";
const UPDATED_WORK_SLUGS = new Set([
  "forsa-logistics-website",
  "gameing",
  "hunter",
  "nourtha-tech",
  "out-seller-landing-page",
  "taggz-ai-event-photography-platform",
  "taggz-event-photography-website",
]);
const WORK_SOURCE_FILES = [
  "src/components/site/workData.ts",
  "src/components/site/behanceWorkData.generated.ts",
];
const BLOG_SOURCE_FILE = "src/components/site/blogData.ts";

const workSlugs = new Set();
const slugPattern = /^\s+slug:\s+"([^"]+)",/gm;

for (const file of WORK_SOURCE_FILES) {
  const source = readFileSync(file, "utf8");
  let match;

  while ((match = slugPattern.exec(source)) !== null) {
    workSlugs.add(match[1]);
  }
}

const blogSlugs = new Set();
const blogSource = readFileSync(BLOG_SOURCE_FILE, "utf8");
let blogMatch;

while ((blogMatch = slugPattern.exec(blogSource)) !== null) {
  blogSlugs.add(blogMatch[1]);
}

const paths = [
  "/",
  "/work",
  "/blog",
  "/contact",
  "/solutions/egypt",
  "/solutions/gcc",
  ...Array.from(workSlugs)
    .sort()
    .map((slug) => `/work/${slug}`),
  ...Array.from(blogSlugs)
    .filter((slug) =>
      [
        "warehouse-management-software-egypt",
        "digital-storefront-egypt",
        "ecommerce-software-egypt",
        "laravel-rest-api-business-systems",
        "custom-business-software-egypt",
        "custom-software-vs-off-the-shelf-egypt",
        "software-project-timeline-3-15-weeks",
        "post-launch-software-support-ownership",
        "egypt-gulf-software-integrations",
      ].includes(slug),
    )
    .sort()
    .map((slug) => `/blog/${slug}`),
];

const localizedPaths = paths.map((path) => (path === "/" ? "/ar/" : `/ar${path}`));
const sitemapPaths = [...paths, ...localizedPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map((path) => {
    const englishPath = path === "/ar/" ? "/" : path.replace(/^\/ar(?=\/|$)/, "");

    return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${
      englishPath.startsWith("/solutions/")
        ? SOLUTION_LASTMOD
        : englishPath === "/blog" || englishPath.startsWith("/blog/")
          ? CONTENT_LASTMOD
          : englishPath.startsWith("/work/") &&
              UPDATED_WORK_SLUGS.has(englishPath.slice("/work/".length))
            ? UPDATED_WORK_LASTMOD
            : LASTMOD
    }</lastmod>
    <changefreq>${englishPath === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${englishPath === "/" ? "1.0" : englishPath === "/work" ? "0.8" : "0.6"}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Wrote public/sitemap.xml with ${sitemapPaths.length} URLs.`);

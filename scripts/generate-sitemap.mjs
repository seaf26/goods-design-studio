import { readFileSync, writeFileSync } from "node:fs";

const SITE_URL = "https://traffodata.com";
const LASTMOD = "2026-06-29";
const CONTENT_LASTMOD = "2026-09-23";
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
  ...Array.from(workSlugs)
    .sort()
    .map((slug) => `/work/${slug}`),
  ...Array.from(blogSlugs)
    .filter((slug) =>
      ["warehouse-management-software-egypt", "digital-storefront-egypt"].includes(slug),
    )
    .sort()
    .map((slug) => `/blog/${slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${path === "/blog" || path.startsWith("/blog/") ? CONTENT_LASTMOD : LASTMOD}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path === "/work" ? "0.8" : "0.6"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Wrote public/sitemap.xml with ${paths.length} URLs.`);

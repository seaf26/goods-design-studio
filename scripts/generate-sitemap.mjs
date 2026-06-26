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

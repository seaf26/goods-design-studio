import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const indexedSlugs = [
  "warehouse-management-software-egypt",
  "digital-storefront-egypt",
  "ecommerce-software-egypt",
  "laravel-rest-api-business-systems",
  "custom-business-software-egypt",
  "custom-software-vs-off-the-shelf-egypt",
  "software-project-timeline-3-15-weeks",
  "post-launch-software-support-ownership",
  "egypt-gulf-software-integrations",
];

const tempDir = await mkdtemp(join(tmpdir(), "traffodata-geo-aeo-"));

try {
  const entry = join(tempDir, "entry.ts");
  const outfile = join(tempDir, "bundle.mjs");
  await writeFile(
    entry,
    `export { blogArticles } from "${process.cwd()}/src/components/site/blogData.ts";
     export * from "${process.cwd()}/src/components/site/seo.ts";\n`,
  );
  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { blogArticles, solutionSeo } = await import(pathToFileURL(outfile).href);
  for (const slug of indexedSlugs) {
    const article = blogArticles.find((entry) => entry.slug === slug);
    assert(article, `Indexed guide ${slug} should exist.`);
    assert(article.directAnswer?.en?.length > 70, `${slug} needs a useful English direct answer.`);
    assert(article.directAnswer?.ar?.length > 70, `${slug} needs a useful Arabic direct answer.`);
  }

  const sitemap = await readFile("public/sitemap.xml", "utf8");
  for (const path of [
    "/solutions/egypt",
    "/solutions/gcc",
    "/ar/solutions/egypt",
    "/ar/solutions/gcc",
  ]) {
    assert(sitemap.includes(`<loc>https://traffodata.com${path}</loc>`), `Sitemap needs ${path}.`);
  }

  assert.equal(typeof solutionSeo, "function", "Solution pages need localized SEO metadata.");
  for (const market of ["egypt", "gcc"]) {
    for (const locale of ["en", "ar"]) {
      const head = solutionSeo(market, locale);
      const path = `${locale === "ar" ? "/ar" : ""}/solutions/${market}`;
      assert.equal(
        head.links.find((link) => link.rel === "canonical")?.href,
        `https://traffodata.com${path}`,
      );
      assert(head.meta.find((meta) => meta.title)?.title?.length > 20);
      const imageAlt = head.meta.find((meta) => meta.property === "og:image:alt")?.content;
      assert(
        locale === "ar" ? /[\u0600-\u06FF]/.test(imageAlt ?? "") : Boolean(imageAlt),
        `${path} should describe the social image in its page language.`,
      );
      assert(head.scripts.some((script) => script.children.includes('"@type":"BreadcrumbList"')));
    }
  }

  console.log("GEO/AEO content and routes verified");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const tempDir = await mkdtemp(join(tmpdir(), "traffodata-seo-"));
const entry = join(tempDir, "entry.ts");
const outfile = join(tempDir, "seo.mjs");

try {
  await writeFile(
    entry,
    `export {
      breadcrumbJsonLd,
      contactSeo,
      homeSeo,
      navigationJsonLd,
      webPageJsonLd,
      workSeo
    } from "${process.cwd()}/src/components/site/seo.ts";\n`,
  );

  await build({
    entryPoints: [entry],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    external: ["./workData"],
    logLevel: "silent",
  });

  const { breadcrumbJsonLd, contactSeo, homeSeo, navigationJsonLd, webPageJsonLd, workSeo } =
    await import(pathToFileURL(outfile).href);

  const navigation = navigationJsonLd();
  assert.equal(navigation["@type"], "ItemList");
  assert.deepEqual(
    navigation.itemListElement.map((item) => item.name),
    ["TRAFFODATA", "Case Studies", "Blog", "Contact"],
  );
  assert.deepEqual(
    navigation.itemListElement.map((item) => item.url),
    [
      "https://traffodata.com/",
      "https://traffodata.com/work",
      "https://traffodata.com/blog",
      "https://traffodata.com/contact",
    ],
  );

  const home = homeSeo();
  assert.equal(
    home.scripts.some((script) => script.children.includes('"@type":"WebPage"')),
    true,
    "homeSeo should emit WebPage structured data",
  );
  assert.equal(
    home.scripts.some((script) =>
      script.children.includes('"@id":"https://traffodata.com/#webpage"'),
    ),
    true,
    "homeSeo should include a stable WebPage @id",
  );

  const work = workSeo([]);
  assert.equal(
    work.scripts.some((script) => script.children.includes('"@type":"WebPage"')),
    true,
    "workSeo should emit WebPage structured data even without collection items",
  );

  const contact = contactSeo();
  assert.equal(
    contact.scripts.some((script) => script.children.includes('"@type":"ContactPage"')),
    true,
    "contactSeo should emit ContactPage structured data",
  );

  assert.deepEqual(webPageJsonLd({ name: "Blog", description: "Notes", path: "/blog" }), {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://traffodata.com/blog#webpage",
    name: "Blog",
    description: "Notes",
    url: "https://traffodata.com/blog",
    isPartOf: {
      "@id": "https://traffodata.com/#website",
    },
    publisher: {
      "@id": "https://traffodata.com/#organization",
    },
  });

  assert.deepEqual(
    breadcrumbJsonLd([
      { name: "TRAFFODATA", path: "/" },
      { name: "Case Studies", path: "/work" },
      { name: "Al Nasser", path: "/work/alnasser-ecommerce" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "TRAFFODATA",
          item: "https://traffodata.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Case Studies",
          item: "https://traffodata.com/work",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Al Nasser",
          item: "https://traffodata.com/work/alnasser-ecommerce",
        },
      ],
    },
  );

  console.log("SEO structured data verified");
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

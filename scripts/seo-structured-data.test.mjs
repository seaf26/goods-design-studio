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
      blogArticleSeo,
      contactSeo,
      homeSeo,
      navigationJsonLd,
      organizationJsonLd,
      localizedPath,
      webPageJsonLd,
      workSeo
    } from "${process.cwd()}/src/components/site/seo.ts";
    export { localeFromPathname } from "${process.cwd()}/src/lib/i18n.tsx";\n`,
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

  const {
    blogArticleSeo,
    breadcrumbJsonLd,
    contactSeo,
    homeSeo,
    localeFromPathname,
    navigationJsonLd,
    organizationJsonLd,
    localizedPath,
    webPageJsonLd,
    workSeo,
  } = await import(pathToFileURL(outfile).href);

  const arabicHome = homeSeo("ar");
  assert.equal(localeFromPathname("/ar/blog/example"), "ar");
  assert.equal(localeFromPathname("/blog/example"), "en");
  assert.equal(
    localizedPath("/blog/example?topic=seo#notes", "ar"),
    "/ar/blog/example?topic=seo#notes",
  );
  assert.equal(
    localizedPath("/ar/blog/example?topic=seo#notes", "en"),
    "/blog/example?topic=seo#notes",
  );
  assert.equal(localizedPath("/ar/", "en"), "/");
  assert.equal(localizedPath("/", "ar"), "/ar/");
  assert.equal(
    organizationJsonLd("ar").description,
    "تبني TRAFFODATA وتدعم برمجيات تشغيلية مخصصة للشركات في مصر والخليج والأسواق الدولية التي تجاوزت الجداول والأدوات المنفصلة.",
  );
  assert.equal(
    arabicHome.links.find((link) => link.rel === "canonical").href,
    "https://traffodata.com/ar/",
    "Arabic homepage should use an Arabic canonical URL",
  );
  assert.equal(
    arabicHome.meta.find((meta) => meta.title)?.title,
    "TRAFFODATA - برمجيات تشغيلية لمشغلين جادين",
    "Arabic homepage should use translated title metadata",
  );
  assert.deepEqual(
    arabicHome.links
      .filter((link) => link.rel === "alternate")
      .map(({ hrefLang, href }) => [hrefLang, href]),
    [
      ["en", "https://traffodata.com/"],
      ["ar", "https://traffodata.com/ar/"],
      ["x-default", "https://traffodata.com/"],
    ],
    "Arabic homepage should advertise English, Arabic, and x-default alternates",
  );

  const navigation = navigationJsonLd();
  assert.equal(navigation["@type"], "ItemList");
  assert.deepEqual(
    navigation.itemListElement.map((item) => item.name),
    ["TRAFFODATA", "Case Studies", "Blog", "Contact"],
  );

  const arabicNavigation = navigationJsonLd("ar");
  assert.deepEqual(
    arabicNavigation.itemListElement.map((item) => item.url),
    [
      "https://traffodata.com/ar/",
      "https://traffodata.com/ar/work",
      "https://traffodata.com/ar/blog",
      "https://traffodata.com/ar/contact",
    ],
    "Arabic navigation structured data should use Arabic URLs",
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

  const article = blogArticleSeo(
    {
      slug: "warehouse-management-software-egypt",
      title: "How to choose warehouse management software in Egypt",
      deck: "A practical guide.",
      topic: "Warehouse",
      readTime: "8 min read",
      publishedAt: "September 2026",
      audience: "Warehouse, logistics, commerce",
      operatingQuestion: "What matters?",
      directAnswer: {
        en: "Choose the workflow by observing real operations.",
        ar: "اختر تدفق العمل بعد مراقبة التشغيل الفعلي.",
      },
      evidence: [
        {
          label: { en: "Official reference", ar: "مرجع رسمي" },
          href: "https://sdk.invoicing.eta.gov.eg/api/",
        },
      ],
      signals: [{ label: "Priority", value: "Traceability" }],
      visual: "warehouse-flow",
      icon: () => null,
      detailSections: ["operating-question"],
      datePublished: "2026-09-23",
    },
    "ar",
  );
  assert.equal(
    article.scripts.some((script) => script.children.includes('"@type":"BlogPosting"')),
    true,
    "blogArticleSeo should emit BlogPosting structured data",
  );
  const posting = JSON.parse(
    article.scripts.find((script) => script.children.includes('"@type":"BlogPosting"')).children,
  );
  assert.equal(posting.abstract, "اختر تدفق العمل بعد مراقبة التشغيل الفعلي.");
  assert.deepEqual(posting.citation, ["https://sdk.invoicing.eta.gov.eg/api/"]);
  assert.equal(
    article.links[0].href,
    "https://traffodata.com/ar/blog/warehouse-management-software-egypt",
  );
  assert.equal(
    article.meta.find((meta) => meta.title)?.title,
    "برامج المستودعات في مصر: كيف تختار نظاما يستخدمه المشغلون - TRAFFODATA Software",
    "Arabic blog articles should use translated title metadata",
  );
  assert.equal(
    article.links.find((link) => link.rel === "canonical").href,
    "https://traffodata.com/ar/blog/warehouse-management-software-egypt",
    "Arabic blog articles should use Arabic canonical URLs",
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

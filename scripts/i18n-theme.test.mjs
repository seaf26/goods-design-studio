import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function unwrapExpression(node) {
  let current = node;
  while (ts.isSatisfiesExpression(current) || ts.isAsExpression(current)) {
    current = current.expression;
  }
  return current;
}

function literalValue(node, sourceFile) {
  const current = unwrapExpression(node);

  if (ts.isObjectLiteralExpression(current)) {
    const value = {};

    for (const property of current.properties) {
      if (!ts.isPropertyAssignment(property)) continue;

      const name = property.name.getText(sourceFile).replace(/^['"]|['"]$/g, "");
      value[name] = literalValue(property.initializer, sourceFile);
    }

    return value;
  }

  if (ts.isArrayLiteralExpression(current)) {
    return current.elements.map((element) => literalValue(element, sourceFile));
  }

  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) {
    return current.text;
  }

  return undefined;
}

function extractArrayLiteral(relativePath, variableName) {
  const source = read(relativePath);
  const scriptKind = relativePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(relativePath, source, ts.ScriptTarget.Latest, true, scriptKind);
  let arrayExpression;

  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === variableName) {
      const initializer = unwrapExpression(node.initializer);

      if (ts.isArrayLiteralExpression(initializer)) {
        arrayExpression = initializer;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  assert(arrayExpression, `${relativePath} should expose ${variableName} as a static array.`);
  return arrayExpression.elements.map((element) => literalValue(element, sourceFile));
}

function isTranslatedKey(key) {
  return i18n.includes(`"${key}"`);
}

const packageJson = JSON.parse(read("package.json"));

assert(
  packageJson.scripts?.test === "node scripts/i18n-theme.test.mjs",
  "package.json should expose the i18n/theme verifier through npm test.",
);

assert(exists("src/lib/i18n.tsx"), "src/lib/i18n.tsx should define the localization system.");
assert(exists("src/lib/theme.tsx"), "src/lib/theme.tsx should define the theme system.");
assert(
  exists("src/components/site/localizedWorkData.ts"),
  "src/components/site/localizedWorkData.ts should adapt work content through i18n.",
);

const i18n = read("src/lib/i18n.tsx");
const theme = read("src/lib/theme.tsx");
const rootRoute = read("src/routes/__root.tsx");
const localizedWorkData = exists("src/components/site/localizedWorkData.ts")
  ? read("src/components/site/localizedWorkData.ts")
  : "";
const workData = read("src/components/site/workData.ts");
const arabicTranslations = i18n.slice(i18n.indexOf("  ar: {"));

function hasArabicKey(key) {
  return arabicTranslations.includes(`"${key}"`);
}

for (const token of [
  "SUPPORTED_LOCALES",
  "DEFAULT_LOCALE",
  "localeLabels",
  "translations",
  "I18nProvider",
  "useI18n",
  "tWithFallback",
  "localStorage",
  "document.documentElement.lang",
  "document.documentElement.dir",
  "rtl",
]) {
  assert(i18n.includes(token), `i18n system should include ${token}.`);
}

for (const locale of ['"en"', '"ar"']) {
  assert(i18n.includes(locale), `i18n system should support locale ${locale}.`);
}

for (const key of [
  "nav.work",
  "nav.blog",
  "nav.contact",
  "nav.startProject",
  "theme.light",
  "theme.dark",
  "theme.system",
  "language.label",
  "home.hero.titleLine1",
  "home.footer.description",
  "home.footer.backToTop",
  "home.cta.title1",
  "home.process.title1",
  "home.tech.eyebrow",
  "home.platform.scene.inventory.title",
  "home.platform.scene.reports.operator",
  "home.platform.handoff.1.value",
  "home.comparison.row.0.goods",
  "home.comparison.row.7.traditional",
  "home.projects.item.wikifood-commerce-delivery-backend.headline",
  "home.projects.item.elnasser-backend-dashboard.states.2",
  "home.testimonials.quote.2.q",
  "contact.form.send",
  "work.hero.title",
  "work.visual.retail",
  "work.visual.wavePlan",
  "work.visual.skuReservations",
  "blog.hero.title",
  "blog.article.topic.operations",
  "blog.article.before-another-dashboard.title",
  "blog.article.before-another-dashboard.signal.0.label",
  "project.backToWork",
  "project.stack.title",
  "project.media.banner",
  "contact.mailto.subject",
  "contact.mailto.name",
]) {
  assert(i18n.includes(key), `translations should include ${key}.`);
}

for (const token of [
  "ThemeProvider",
  "useTheme",
  "ThemeMode",
  "system",
  "matchMedia",
  "prefers-color-scheme: dark",
  "localStorage",
  "document.documentElement.classList.toggle",
]) {
  assert(theme.includes(token), `theme system should include ${token}.`);
}

for (const token of ["ThemeProvider", "I18nProvider", "data-theme", "data-locale"]) {
  assert(rootRoute.includes(token), `root route should wire ${token}.`);
}

assert(rootRoute.includes("useI18n"), "root route error states should use translated strings.");

assert(
  !rootRoute.includes('<html lang="en">'),
  "root shell should not hard-code html lang to English.",
);

for (const page of [
  "src/components/site/Landing.tsx",
  "src/components/site/WorkPage.tsx",
  "src/components/site/ContactPage.tsx",
  "src/components/site/BlogPage.tsx",
  "src/components/site/ProjectDetailPage.tsx",
  "src/components/site/ProjectMedia.tsx",
]) {
  const source = read(page);
  assert(source.includes("useI18n"), `${page} should read user-facing strings from i18n.`);
}

const landing = read("src/components/site/Landing.tsx");
for (const hardcoded of [
  "Who we are",
  "What we build",
  "Engineering stack",
  "How we work",
  "Start the conversation",
  "Back to top",
  "All rights reserved.",
  "TRAFFODATA Technologies.",
]) {
  assert(
    !landing.includes(hardcoded),
    `Landing shared UI should translate hardcoded string: ${hardcoded}`,
  );
}

for (const token of [
  "localizeFeaturedProjects",
  "home.projects.item.${project.slug}.headline",
  "home.projects.item.${project.slug}.modules.${index}",
]) {
  assert(
    landing.includes(token),
    `Landing featured projects should localize project card data through ${token}.`,
  );
}

const featuredProjectSources = extractArrayLiteral("src/components/site/Landing.tsx", "projects");

for (const project of featuredProjectSources) {
  for (const field of ["t", "c", "tag", "headline", "action"]) {
    assert(
      hasArabicKey(`home.projects.item.${project.slug}.${field}`),
      `Arabic homepage project carousel should include home.projects.item.${project.slug}.${field}.`,
    );
  }

  for (const [index] of project.modules.entries()) {
    assert(
      hasArabicKey(`home.projects.item.${project.slug}.modules.${index}`),
      `Arabic homepage project carousel should include home.projects.item.${project.slug}.modules.${index}.`,
    );
  }

  for (const [index] of project.states.entries()) {
    assert(
      hasArabicKey(`home.projects.item.${project.slug}.states.${index}`),
      `Arabic homepage project carousel should include home.projects.item.${project.slug}.states.${index}.`,
    );
  }
}

for (const disallowed of [
  "rounded-[1.75rem] bg-white ring-1",
  "border-b border-[var(--hairline)] bg-white md:grid",
  "rounded-xl bg-white text-[var(--ink)]",
]) {
  assert(
    !landing.includes(disallowed),
    `Landing comparison/project surfaces should use theme tokens instead of ${disallowed}.`,
  );
}

for (const hardcoded of [
  "Page not found",
  "This page didn't load",
  "Something went wrong on our end.",
]) {
  assert(
    !rootRoute.includes(hardcoded),
    `Root route should translate hardcoded string: ${hardcoded}`,
  );
}

const projectDetail = read("src/components/site/ProjectDetailPage.tsx");
const projectMedia = read("src/components/site/ProjectMedia.tsx");
const workPage = read("src/components/site/WorkPage.tsx");
const blogPage = read("src/components/site/BlogPage.tsx");
const contactPage = read("src/components/site/ContactPage.tsx");
const contactApi = read("src/lib/api/contact.functions.ts");
const errorPage = read("src/lib/error-page.ts");
const seo = read("src/components/site/seo.ts");

for (const hardcoded of [
  "Back to work",
  "Project not found.",
  "Open project",
  "Stack and capabilities.",
  "Build notes and proof.",
  "More systems under pressure.",
]) {
  assert(
    !projectDetail.includes(hardcoded),
    `Project detail chrome should translate hardcoded string: ${hardcoded}`,
  );
}

for (const hardcoded of ["Project banner", "Generated system banner", "Live model"]) {
  assert(
    !projectMedia.includes(hardcoded),
    `Project media chrome should translate hardcoded string: ${hardcoded}`,
  );
}

for (const hardcoded of [
  "TRAFFODATA / RETAIL",
  "WAVE PLAN",
  "picks / hour",
  "CLOSE BOARD",
  "entities reconciled",
  "ROUTE DESK",
  "SKU reservations",
  "item.title} preview",
]) {
  assert(
    !workPage.includes(hardcoded),
    `Work page visual chrome should translate hardcoded string: ${hardcoded}`,
  );
}

for (const hardcoded of ["TRAFFODATA inquiry", "Name:", "Email:", "Company:", "Services:"]) {
  assert(
    !contactPage.includes(hardcoded),
    `Contact mailto copy should translate hardcoded string: ${hardcoded}`,
  );
}

for (const disallowed of ["rounded-full bg-white px-3", "rounded-2xl bg-white p-5"]) {
  assert(
    !blogPage.includes(disallowed),
    `Blog page card/pill surfaces should use theme tokens instead of ${disallowed}.`,
  );
}

for (const required of ["localizeBlogArticle", "useMemo", "blog.article.${article.slug}.title"]) {
  assert(
    blogPage.includes(required),
    `Blog page should localize article data through the central i18n system: ${required}`,
  );
}

for (const disallowed of ["rounded-2xl bg-white p-4", "rounded-[1.5rem] bg-white p-5", "focus:bg-white"]) {
  assert(
    !contactPage.includes(disallowed),
    `Contact page surfaces and focus states should use theme tokens instead of ${disallowed}.`,
  );
}

assert(errorPage.includes("translations"), "Static error page should reuse translation copy.");
assert(
  errorPage.includes("localeFromAcceptLanguage"),
  "Static error page should resolve a locale from Accept-Language.",
);

for (const token of ["localizeWorkItem", "localizeWorkItems", "work.item.${item.slug}.summary"]) {
  assert(
    localizedWorkData.includes(token),
    `localizedWorkData should expose work data through translation keys: ${token}`,
  );
}

assert(
  workPage.includes("localizeWorkItems"),
  "Work page should render localized work item data.",
);

assert(
  workData.includes("sections?: WorkSection[]"),
  "Work item data should type its legacy sections field so localized work pages can typecheck.",
);

const workItemSources = [
  ...extractArrayLiteral("src/components/site/workData.ts", "portfolioProjects"),
  ...extractArrayLiteral("src/components/site/behanceWorkData.generated.ts", "behanceWorkItems"),
];
const listingWorkFields = ["type", "summary", "scope", "outcome", "year", "duration", "team"];
const hasCentralWorkItemFallback =
  i18n.includes("translateWorkItemFallback") && i18n.includes('key.startsWith("work.item.")');
const hasCentralWorkItemScalarFallback =
  hasCentralWorkItemFallback && i18n.includes('key.endsWith(".detailIntro")');

for (const item of workItemSources) {
  assert(item.slug, "Every work item source should include a slug.");

  for (const field of listingWorkFields) {
    assert(
      i18n.includes(`"work.item.${item.slug}.${field}"`),
      `Arabic work listing content should include translation key work.item.${item.slug}.${field}.`,
    );
  }
}

for (const item of workItemSources) {
  for (const field of ["description", "summary", "detailIntro"]) {
    assert(
      i18n.includes(`"work.item.${item.slug}.${field}"`) || hasCentralWorkItemScalarFallback,
      `Project detail scalar copy should include translation key or central Arabic fallback for work.item.${item.slug}.${field}.`,
    );
  }
}

const primaryDetailProject = workItemSources.find(
  (item) => item.slug === "wikifood-commerce-delivery-backend",
);

assert(primaryDetailProject, "Primary verified project should exist in work data.");

for (const field of [
  "description",
  "headline",
  "detailIntro",
  "challenge",
  "build",
  "impact",
]) {
  assert(
    i18n.includes(`"work.item.${primaryDetailProject.slug}.${field}"`),
    `Primary project detail should include translation key work.item.${primaryDetailProject.slug}.${field}.`,
  );
}

for (const item of workItemSources) {
  for (const field of ["stats", "outcomes"]) {
    for (const [index] of item[field].entries()) {
      assert(
        i18n.includes(`"work.item.${item.slug}.${field}.${index}"`) || hasCentralWorkItemFallback,
        `Project detail ${field} should include translation key or central Arabic fallback for work.item.${item.slug}.${field}.${index}.`,
      );
    }
  }

  for (const [index] of item.timeline.entries()) {
    for (const field of ["label", "text"]) {
      assert(
        i18n.includes(`"work.item.${item.slug}.timeline.${index}.${field}"`) ||
          hasCentralWorkItemFallback,
        `Project timeline should include translation key or central Arabic fallback for work.item.${item.slug}.timeline.${index}.${field}.`,
      );
    }
  }

  for (const [index] of item.detailSections.entries()) {
    for (const field of ["title", "text"]) {
      assert(
        i18n.includes(`"work.item.${item.slug}.detailSections.${index}.${field}"`) ||
          hasCentralWorkItemFallback,
        `Project detail section should include translation key or central Arabic fallback for work.item.${item.slug}.detailSections.${index}.${field}.`,
      );
    }
  }
}

assert(
  projectDetail.includes("localizeWorkItem") && projectDetail.includes("localizeWorkItems"),
  "Project detail page should render localized current and related work data.",
);

for (const key of [
  "seo.defaultTitle",
  "seo.defaultDescription",
  "seo.work.title",
  "seo.blog.title",
  "seo.contact.title",
  "contact.inquiry.title",
  "contact.inquiry.message",
]) {
  assert(i18n.includes(key), `translations should include ${key}.`);
}

for (const token of ["translations", "DEFAULT_LOCALE", "type Locale", "seo.defaultTitle"]) {
  assert(seo.includes(token), `SEO metadata should use translated copy through ${token}.`);
}

for (const hardcoded of [
  "Case Studies - Operational Software and Backend Systems | TRAFFODATA",
  "Blog - TRAFFODATA Software",
  "Contact Us - TRAFFODATA Software",
  "Project details for selected operational software work by TRAFFODATA.",
]) {
  assert(!seo.includes(hardcoded), `SEO metadata should translate hardcoded copy: ${hardcoded}`);
}

for (const token of ["locale", "translations", "contact.inquiry.title", "contact.inquiry.message"]) {
  assert(
    contactApi.includes(token),
    `Contact inquiry email should use locale-aware translated copy through ${token}.`,
  );
}

for (const hardcoded of ["New TRAFFODATA inquiry", "Company: Not provided", ">Message<"]) {
  assert(
    !contactApi.includes(hardcoded),
    `Contact inquiry email should translate hardcoded string: ${hardcoded}`,
  );
}

console.log("i18n/theme structural checks passed");

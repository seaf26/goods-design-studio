import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

for (const route of [
  "src/routes/ar/index.tsx",
  "src/routes/ar/work.tsx",
  "src/routes/ar/blog.tsx",
  "src/routes/ar/contact.tsx",
  "src/routes/ar/blog_.$slug.tsx",
  "src/routes/ar/work_.$slug.tsx",
]) {
  assert(exists(route), `${route} should exist as a crawlable Arabic route.`);
}

const i18n = read("src/lib/i18n.tsx");
assert(i18n.includes("localeFromPathname"), "i18n should expose route-derived locale detection.");
assert(i18n.includes("initialLocale"), "I18nProvider should accept an initial route locale.");

const rootRoute = read("src/routes/__root.tsx");
assert(
  rootRoute.includes("useRouterState"),
  "root route should derive locale from the current route.",
);
assert(
  rootRoute.includes("localeFromPathname"),
  "root route should initialize locale from the URL.",
);
assert(
  rootRoute.includes("shellLocale"),
  "root shell should render the route locale in html metadata.",
);

const landing = read("src/components/site/Landing.tsx");
assert(
  landing.includes("localizedPath"),
  "shared navigation should preserve the Arabic route prefix.",
);

const sitemap = read("public/sitemap.xml");
assert(
  sitemap.includes("https://traffodata.com/ar/"),
  "sitemap should include the Arabic homepage.",
);
assert(
  sitemap.includes("https://traffodata.com/ar/blog/warehouse-management-software-egypt"),
  "sitemap should include Arabic blog URLs.",
);
assert(
  sitemap.includes("https://traffodata.com/ar/work/wikifood-commerce-delivery-backend"),
  "sitemap should include Arabic work URLs.",
);

console.log("Arabic route structure verified");

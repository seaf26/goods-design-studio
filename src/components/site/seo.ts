import { DEFAULT_LOCALE, localizedPath, translations, type Locale } from "@/lib/i18n";

export { localizedPath } from "@/lib/i18n";

import type { WorkItem } from "./workData";
import type { BlogArticle } from "./blogData";
import { solutionPages, type SolutionMarket } from "./solutionData";
import type {
  DetailedHTMLProps,
  LinkHTMLAttributes,
  MetaHTMLAttributes,
  ScriptHTMLAttributes,
} from "react";

export const SITE_URL = "https://traffodata.com";
export const SITE_NAME = "TRAFFODATA Software";
export const DEFAULT_TITLE = translations[DEFAULT_LOCALE]["seo.defaultTitle"];
export const DEFAULT_DESCRIPTION = translations[DEFAULT_LOCALE]["seo.defaultDescription"];
export const FAVICON_VERSION = "20260629";

export const BRAND_ASSETS = {
  mark: "/brand/traffodata-logo-mark.png",
  wide: "/brand/traffodata-logo-wide.png",
  og: "/brand/traffodata-og-cairo-light.png",
  ogCairoLight: "/brand/traffodata-og-cairo-light.png",
  ogCairoDark: "/brand/traffodata-og-cairo-dark.png",
  icon512: `/brand/traffodata-icon-512.png?v=${FAVICON_VERSION}`,
  icon192: `/brand/traffodata-icon-192.png?v=${FAVICON_VERSION}`,
  appleTouch: `/brand/apple-touch-icon.png?v=${FAVICON_VERSION}`,
  favicon: `/favicon.png?v=${FAVICON_VERSION}`,
  faviconIco: `/favicon.ico?v=${FAVICON_VERSION}`,
};

type JsonLd = Record<string, unknown>;

type SeoHead = {
  meta: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];
  links: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>[];
  scripts: DetailedHTMLProps<ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>[];
};

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  jsonLd?: JsonLd[];
  locale?: Locale;
};

type WebPageJsonLdOptions = {
  name: string;
  description: string;
  path: string;
  pageType?: "WebPage" | "ContactPage";
  locale?: Locale;
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

function seoCopy(key: string, locale: Locale = DEFAULT_LOCALE) {
  return translations[locale][key] ?? translations[DEFAULT_LOCALE][key] ?? key;
}

function seoCopyWithFallback(key: string, fallback: string, locale: Locale = DEFAULT_LOCALE) {
  return translations[locale][key] ?? fallback;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function alternateLinks(path: string) {
  const englishPath = localizedPath(path, "en");
  return [
    { rel: "alternate", hrefLang: "en", href: absoluteUrl(englishPath) },
    { rel: "alternate", hrefLang: "ar", href: absoluteUrl(localizedPath(englishPath, "ar")) },
    { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(englishPath) },
  ];
}

export function assetUrl(path: string) {
  return absoluteUrl(path);
}

export function getCairoOgImage(date = new Date()) {
  const cairoHour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Cairo",
      hour: "numeric",
      hour12: false,
    }).format(date),
  );

  return cairoHour >= 7 && cairoHour < 18 ? BRAND_ASSETS.ogCairoLight : BRAND_ASSETS.ogCairoDark;
}

export function iconLinks() {
  return [
    { rel: "icon", type: "image/x-icon", sizes: "any", href: BRAND_ASSETS.faviconIco },
    { rel: "shortcut icon", type: "image/x-icon", href: BRAND_ASSETS.faviconIco },
    { rel: "icon", type: "image/png", sizes: "48x48", href: BRAND_ASSETS.favicon },
    { rel: "apple-touch-icon", sizes: "180x180", href: BRAND_ASSETS.appleTouch },
    { rel: "icon", type: "image/png", sizes: "192x192", href: BRAND_ASSETS.icon192 },
    { rel: "icon", type: "image/png", sizes: "512x512", href: BRAND_ASSETS.icon512 },
  ];
}

export function seoHead({
  title,
  description,
  path = "/",
  type = "website",
  image = getCairoOgImage(),
  imageAlt,
  jsonLd = [],
  locale = DEFAULT_LOCALE,
}: SeoOptions): SeoHead {
  const canonical = absoluteUrl(localizedPath(path, locale));
  const socialImage = assetUrl(image);
  const socialImageAlt = imageAlt ?? seoCopy("seo.imageAlt.logo", locale);
  const localeCode = locale === "ar" ? "ar_EG" : "en_US";
  const alternateLocaleCode = locale === "ar" ? "en_US" : "ar_EG";

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "author", content: "TRAFFODATA" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: localeCode },
      { property: "og:locale:alternate", content: alternateLocaleCode },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: socialImage },
      { property: "og:image:alt", content: socialImageAlt },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: socialImageAlt },
    ],
    links: [{ rel: "canonical", href: canonical }, ...alternateLinks(path)],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

export function organizationJsonLd(locale: Locale = DEFAULT_LOCALE): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TRAFFODATA",
    url: SITE_URL,
    logo: assetUrl(BRAND_ASSETS.mark),
    description: seoCopy("seo.organization.description", locale),
    sameAs: [SITE_URL],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function navigationJsonLd(locale: Locale = DEFAULT_LOCALE): JsonLd {
  const items = [
    {
      name: seoCopy("brand.name", locale),
      description: seoCopy("seo.defaultDescription", locale),
      path: "/",
    },
    {
      name: seoCopy("seo.navigation.work", locale),
      description: seoCopy("seo.work.description", locale),
      path: "/work",
    },
    {
      name: seoCopy("seo.navigation.blog", locale),
      description: seoCopy("seo.blog.description", locale),
      path: "/blog",
    },
    {
      name: seoCopy("seo.navigation.contact", locale),
      description: seoCopy("seo.contact.description", locale),
      path: "/contact",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#site-navigation`,
    name: seoCopy("seo.navigation.name", locale),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(localizedPath(item.path, locale)),
    })),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  pageType = "WebPage",
  locale = DEFAULT_LOCALE,
}: WebPageJsonLdOptions): JsonLd {
  const url = absoluteUrl(localizedPath(path, locale));

  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[], locale: Locale = DEFAULT_LOCALE): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(item.path, locale)),
    })),
  };
}

export function homeSeo(locale: Locale = DEFAULT_LOCALE) {
  const title = seoCopy("seo.defaultTitle", locale);
  const description = seoCopy("seo.defaultDescription", locale);

  return seoHead({
    title,
    description,
    path: "/",
    imageAlt: seoCopy("seo.imageAlt.home", locale),
    locale,
    jsonLd: [
      webPageJsonLd({
        name: seoCopy("brand.name", locale),
        description,
        path: "/",
        locale,
      }),
    ],
  });
}

function workCollectionJsonLd(items: WorkItem[], locale: Locale = DEFAULT_LOCALE): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: seoCopy("seo.work.collectionName", locale),
    description: seoCopy("seo.work.collectionDescription", locale),
    url: absoluteUrl(localizedPath("/work", locale)),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(localizedPath(`/work/${item.slug}`, locale)),
        name: seoCopyWithFallback(`work.item.${item.slug}.title`, item.title, locale),
        description: seoCopyWithFallback(
          `work.item.${item.slug}.summary`,
          item.summary || item.description,
          locale,
        ),
      })),
    },
  };
}

export function workSeo(items: WorkItem[] = [], locale: Locale = DEFAULT_LOCALE) {
  const title = seoCopy("seo.work.title", locale);
  const description = seoCopy("seo.work.description", locale);
  const jsonLd = [
    webPageJsonLd({
      name: seoCopy("seo.navigation.work", locale),
      description,
      path: "/work",
      locale,
    }),
  ];

  if (items.length > 0) {
    jsonLd.push(workCollectionJsonLd(items, locale));
  }

  return seoHead({
    title,
    description,
    path: "/work",
    locale,
    jsonLd,
  });
}

export function blogSeo(locale: Locale = DEFAULT_LOCALE) {
  const title = seoCopy("seo.blog.title", locale);
  const description = seoCopy("seo.blog.description", locale);

  return seoHead({
    title,
    description,
    path: "/blog",
    locale,
    jsonLd: [
      webPageJsonLd({
        name: seoCopy("seo.navigation.blog", locale),
        description,
        path: "/blog",
        locale,
      }),
    ],
  });
}

export function blogArticleSeo(article?: BlogArticle | null, locale: Locale = DEFAULT_LOCALE) {
  if (!article) {
    return blogSeo(locale);
  }

  const path = `/blog/${article.slug}`;
  const articleTitle = seoCopyWithFallback(
    `blog.article.${article.slug}.title`,
    article.title,
    locale,
  );
  const articleDescription = seoCopyWithFallback(
    `blog.article.${article.slug}.deck`,
    article.deck,
    locale,
  );
  const articleTopic = seoCopyWithFallback(
    `blog.article.${article.slug}.topic`,
    article.topic,
    locale,
  );
  const title = `${articleTitle} - TRAFFODATA Software`;

  return seoHead({
    title,
    description: articleDescription,
    path,
    type: "article",
    imageAlt: `${articleTitle} ${seoCopy("seo.project.imageAltSuffix", locale)}`,
    locale,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: articleTitle,
        description: articleDescription,
        url: absoluteUrl(localizedPath(path, locale)),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${absoluteUrl(localizedPath(path, locale))}#webpage`,
        },
        author: {
          "@type": "Organization",
          name: "TRAFFODATA",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "TRAFFODATA",
          logo: { "@type": "ImageObject", url: assetUrl(BRAND_ASSETS.mark) },
        },
        ...(article.datePublished ? { datePublished: article.datePublished } : {}),
        ...(article.dateModified ? { dateModified: article.dateModified } : {}),
        ...(article.directAnswer ? { abstract: article.directAnswer[locale] } : {}),
        ...(article.evidence?.length
          ? {
              citation: article.evidence.map((source) =>
                source.href.startsWith("/")
                  ? absoluteUrl(localizedPath(source.href, locale))
                  : source.href,
              ),
            }
          : {}),
        articleSection: articleTopic,
        keywords: [articleTopic, ...article.signals.map((signal) => signal.value)].join(", "),
      },
      breadcrumbJsonLd(
        [
          { name: seoCopy("brand.name", locale), path: "/" },
          { name: seoCopy("seo.navigation.blog", locale), path: "/blog" },
          { name: articleTitle, path },
        ],
        locale,
      ),
    ],
  });
}

export function contactSeo(locale: Locale = DEFAULT_LOCALE) {
  const title = seoCopy("seo.contact.title", locale);
  const description = seoCopy("seo.contact.description", locale);

  return seoHead({
    title,
    description,
    path: "/contact",
    locale,
    jsonLd: [
      webPageJsonLd({
        name: seoCopy("seo.navigation.contact", locale),
        description,
        path: "/contact",
        pageType: "ContactPage",
        locale,
      }),
    ],
  });
}

export function solutionSeo(market: SolutionMarket, locale: Locale = DEFAULT_LOCALE) {
  const page = solutionPages[market];
  const copy = page.copy[locale];

  return seoHead({
    title: copy.title,
    description: copy.description,
    path: page.path,
    locale,
    jsonLd: [
      webPageJsonLd({
        name: copy.title,
        description: copy.description,
        path: page.path,
        locale,
      }),
      breadcrumbJsonLd(
        [
          { name: seoCopy("brand.name", locale), path: "/" },
          { name: copy.eyebrow, path: page.path },
        ],
        locale,
      ),
    ],
  });
}

export function projectSeo(project?: WorkItem | null, locale: Locale = DEFAULT_LOCALE) {
  if (!project) {
    return seoHead({
      title: seoCopy("seo.project.title", locale),
      description: seoCopy("seo.project.description", locale),
      path: "/work",
      type: "article",
      locale,
    });
  }

  const projectTitle = seoCopyWithFallback(
    `work.item.${project.slug}.title`,
    project.title,
    locale,
  );
  const description = seoCopyWithFallback(
    `work.item.${project.slug}.summary`,
    project.summary || project.description,
    locale,
  );
  const title = `${projectTitle} - TRAFFODATA Software`;
  const image = project.thumbnail || project.images[0] || BRAND_ASSETS.og;
  const path = `/work/${project.slug}`;

  return seoHead({
    title,
    description,
    path,
    type: "article",
    image,
    imageAlt: `${projectTitle} ${seoCopy("seo.project.imageAltSuffix", locale)}`,
    locale,
    jsonLd: [
      creativeWorkJsonLd(project, path, image, locale),
      breadcrumbJsonLd(
        [
          { name: seoCopy("brand.name", locale), path: "/" },
          { name: seoCopy("seo.navigation.work", locale), path: "/work" },
          { name: projectTitle, path },
        ],
        locale,
      ),
    ],
  });
}

function creativeWorkJsonLd(
  project: WorkItem,
  path: string,
  image: string,
  locale: Locale = DEFAULT_LOCALE,
): JsonLd {
  const projectTitle = seoCopyWithFallback(
    `work.item.${project.slug}.title`,
    project.title,
    locale,
  );
  const projectHeadline = seoCopyWithFallback(
    `work.item.${project.slug}.headline`,
    project.headline,
    locale,
  );
  const projectDescription = seoCopyWithFallback(
    `work.item.${project.slug}.summary`,
    project.summary || project.description,
    locale,
  );

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectTitle,
    headline: projectHeadline,
    description: projectDescription,
    image: assetUrl(image),
    url: absoluteUrl(localizedPath(path, locale)),
    keywords: [...project.modules, ...project.stack].join(", "),
    creator: {
      "@type": "Organization",
      name: "TRAFFODATA",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "TRAFFODATA",
      logo: assetUrl(BRAND_ASSETS.mark),
    },
  };
}

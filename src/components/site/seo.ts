import { DEFAULT_LOCALE, translations, type Locale } from "@/lib/i18n";

import type { WorkItem } from "./workData";
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
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

function seoCopy(key: string, locale: Locale = DEFAULT_LOCALE) {
  return translations[locale][key] ?? translations[DEFAULT_LOCALE][key] ?? key;
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
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
  imageAlt = seoCopy("seo.imageAlt.logo"),
  jsonLd = [],
}: SeoOptions): SeoHead {
  const canonical = absoluteUrl(path);
  const socialImage = assetUrl(image);

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
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: socialImage },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: socialImage },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: canonical }],
    scripts: jsonLd.map((data) => ({
      type: "application/ld+json",
      children: JSON.stringify(data),
    })),
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "TRAFFODATA",
    url: SITE_URL,
    logo: assetUrl(BRAND_ASSETS.mark),
    description: seoCopy("seo.organization.description"),
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
      url: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
  pageType = "WebPage",
}: WebPageJsonLdOptions): JsonLd {
  const url = absoluteUrl(path);

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

export function breadcrumbJsonLd(items: BreadcrumbItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function homeSeo() {
  const title = seoCopy("seo.defaultTitle");
  const description = seoCopy("seo.defaultDescription");

  return seoHead({
    title,
    description,
    path: "/",
    imageAlt: seoCopy("seo.imageAlt.home"),
    jsonLd: [
      webPageJsonLd({
        name: seoCopy("brand.name"),
        description,
        path: "/",
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
    url: absoluteUrl("/work"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/work/${item.slug}`),
        name: item.title,
        description: item.summary || item.description,
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
    }),
  ];

  if (items.length > 0) {
    jsonLd.push(workCollectionJsonLd(items, locale));
  }

  return seoHead({
    title,
    description,
    path: "/work",
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
    jsonLd: [
      webPageJsonLd({
        name: seoCopy("seo.navigation.blog", locale),
        description,
        path: "/blog",
      }),
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
    jsonLd: [
      webPageJsonLd({
        name: seoCopy("seo.navigation.contact", locale),
        description,
        path: "/contact",
        pageType: "ContactPage",
      }),
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
    });
  }

  const title = `${project.title} - TRAFFODATA Software`;
  const description = project.summary || project.description;
  const image = project.thumbnail || project.images[0] || BRAND_ASSETS.og;
  const path = `/work/${project.slug}`;

  return seoHead({
    title,
    description,
    path,
    type: "article",
    image,
    imageAlt: `${project.title} ${seoCopy("seo.project.imageAltSuffix", locale)}`,
    jsonLd: [
      creativeWorkJsonLd(project, path, image),
      breadcrumbJsonLd([
        { name: seoCopy("brand.name", locale), path: "/" },
        { name: seoCopy("seo.navigation.work", locale), path: "/work" },
        { name: project.title, path },
      ]),
    ],
  });
}

function creativeWorkJsonLd(project: WorkItem, path: string, image: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.headline,
    description: project.summary || project.description,
    image: assetUrl(image),
    url: absoluteUrl(path),
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

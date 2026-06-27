import type { WorkItem } from "./workData";

export const SITE_URL = "https://traffodata.com";
export const SITE_NAME = "TRAFFODATA Software";
export const DEFAULT_TITLE = "TRAFFODATA - The Operating System for Modern Enterprises";
export const DEFAULT_DESCRIPTION =
  "Premium ERP, inventory, warehouse, POS, accounting, CRM and AI software engineered for modern enterprise operations.";

export const BRAND_ASSETS = {
  mark: "/brand/traffodata-logo-mark.png",
  wide: "/brand/traffodata-logo-wide.png",
  og: "/brand/traffodata-og-cairo-light.png",
  ogCairoLight: "/brand/traffodata-og-cairo-light.png",
  ogCairoDark: "/brand/traffodata-og-cairo-dark.png",
  icon512: "/brand/traffodata-icon-512.png",
  icon192: "/brand/traffodata-icon-192.png",
  appleTouch: "/brand/apple-touch-icon.png",
  favicon: "/favicon.png",
};

type JsonLd = Record<string, unknown>;

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  jsonLd?: JsonLd[];
};

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
    { rel: "icon", type: "image/png", href: BRAND_ASSETS.favicon },
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
  imageAlt = "TRAFFODATA Software Solutions logo",
  jsonLd = [],
}: SeoOptions) {
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
      ...jsonLd.map((data) => ({ "script:ld+json": data })),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TRAFFODATA",
    url: SITE_URL,
    logo: assetUrl(BRAND_ASSETS.mark),
    description:
      "TRAFFODATA builds ERP, inventory, warehouse, POS, accounting, CRM and AI software for modern enterprise operations.",
    sameAs: [SITE_URL],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    publisher: {
      "@type": "Organization",
      name: "TRAFFODATA",
      logo: assetUrl(BRAND_ASSETS.mark),
    },
  };
}

export function homeSeo() {
  return seoHead({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
    imageAlt: "TRAFFODATA enterprise operations software preview",
  });
}

export function workSeo() {
  return seoHead({
    title: "Work - TRAFFODATA Software",
    description:
      "Explore TRAFFODATA case studies across backend platforms, websites, mobile apps, Figma designs, dashboards, ecommerce systems and operational software.",
    path: "/work",
  });
}

export function projectSeo(project?: WorkItem | null) {
  if (!project) {
    return seoHead({
      title: "Project - TRAFFODATA Software",
      description: "Project details for selected operational software work by TRAFFODATA.",
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
    imageAlt: `${project.title} project preview`,
    jsonLd: [creativeWorkJsonLd(project, path, image)],
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

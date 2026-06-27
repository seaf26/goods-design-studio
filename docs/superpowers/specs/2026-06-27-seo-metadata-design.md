# SEO Metadata Design

Date: 2026-06-27

## Goal

Improve TRAFFODATA's search and social metadata across the website using `https://traffodata.com` as the canonical production origin. The site should expose clear page titles, descriptions, canonical URLs, Open Graph/Twitter previews, structured data, robots rules, and a sitemap.

## Scope

- Add a central SEO helper for shared metadata values and route-specific helpers.
- Keep existing route-level `head()` behavior, but replace repeated hand-written metadata with helper output.
- Use `https://traffodata.com` as the canonical base URL.
- Improve metadata for home, work index, and individual project detail pages.
- Use project thumbnails or first gallery images for project Open Graph/Twitter images.
- Add JSON-LD structured data for the organization, website, and project detail pages.
- Add static `robots.txt` and `sitemap.xml` files under `public/`.
- Include all current project URLs in the sitemap.
- Use the provided TRAFFODATA logo assets for favicon/app icons, organization schema logo, and default social preview branding.
- Keep generated Figma/Behance public metadata neutral and avoid naming the source designer in public page copy.

## Out of Scope

- Search Console setup.
- Analytics, conversion tracking, or tag manager installation.
- Dynamic sitemap generation at request time.
- Changing visible page layout or content.
- Production deployment.

## Architecture

Create `src/components/site/seo.ts` as the single SEO utility module. It will hold the canonical site URL, default title/description, default social image path, metadata builders, URL helpers, image URL helpers, and JSON-LD object builders.

Use the provided logo source files during implementation:

- `/Users/seafgamel/Desktop/traffodata/ChatGPT_Image_Jun_20__2026__12_02_29_AM-removebg-preview.png` is the wide logo source for default Open Graph/Twitter preview branding.
- `/Users/seafgamel/Desktop/traffodata/ChatGPT_Image_Jun_20__2026__12_08_00_AM-removebg-preview.png` is the square monogram source for favicon, app icon, and organization schema logo.

Copy optimized derivatives into `public/brand/` instead of referencing Desktop paths from route metadata.

Routes continue to own their own `head()` functions:

- `src/routes/__root.tsx` uses global defaults and organization/website JSON-LD.
- `src/routes/index.tsx` uses home-page SEO.
- `src/routes/work.tsx` uses portfolio index SEO.
- `src/routes/work_.$slug.tsx` uses project-specific SEO based on `getWorkItem(slug)`.

Static crawl helpers live in:

- `public/robots.txt`
- `public/sitemap.xml`

## Metadata Requirements

Every route should include:

- HTML title.
- Meta description.
- Canonical link.
- `robots` index/follow directive.
- Open Graph title, description, type, URL, site name, image, and image alt.
- Twitter card, title, description, and image.
- Brand logo links for icon/apple-touch-icon where supported by the route head API.

Home page should emphasize:

- ERP, inventory, warehouse, POS, accounting, CRM, and AI software.
- Premium operational software for modern enterprises.

Work page should emphasize:

- Backend platforms, websites, mobile apps, Figma designs, dashboards, ecommerce systems, and operational software case studies.

Project pages should use:

- Project title with `TRAFFODATA Software`.
- Project summary as description.
- Project detail route canonical URL.
- Project thumbnail or first image as social image.
- `article` Open Graph type for portfolio/project pages.

## Structured Data

Add JSON-LD using script tags in the relevant `head()` output:

- `Organization` on root/default metadata with TRAFFODATA name, URL, logo, and service description.
- `WebSite` on root/default metadata with site name and URL.
- `CreativeWork` on project detail pages with title, description, image, URL, creator/publisher as TRAFFODATA, and keywords from project modules/stack.

The `Organization.logo` value should use the square public logo URL, and social preview metadata should use the wide public logo URL when a page does not have a stronger project image.

## Sitemap

Generate a static `public/sitemap.xml` with:

- `/`
- `/work`
- `/work/<slug>` for all current `workItems`

Use absolute URLs under `https://traffodata.com`. Use the current date `2026-06-27` for `lastmod`.

## Robots

Add `public/robots.txt`:

- Allow all crawlers.
- Point to `https://traffodata.com/sitemap.xml`.

## Validation

- Run `npm run build`.
- Render or fetch `/`, `/work`, and one project route to confirm expected meta tags are present.
- Confirm `public/sitemap.xml` includes all current project slugs.
- Confirm generated public metadata does not mention the source designer name.
- Confirm copied logo assets are present under `public/brand/` and are referenced by metadata using absolute production URLs.

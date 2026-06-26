# Behance Work Filters Design

Date: 2026-06-26

## Goal

The work page should let visitors browse portfolio items by clear categories: all work, websites, mobile apps, and Figma designs. Rana Salah's Behance profile at <https://www.behance.net/ranasalah23> is the source for the Figma design category. Imported Behance projects must have real gallery images and meaningful case-study content on their detail pages, not just outbound links.

## Scope

- Add a `category` field to work items with values `website`, `mobile-app`, or `figma-design`.
- Add filter buttons to the work page for `All`, `Website`, `Mobile Apps`, and `Figma Designs`.
- Preserve the existing project card and detail page visual language.
- Import every available project from Rana Salah's Behance profile as Figma design work.
- Download Behance project images into the local `public/work-images/behance/` directory so project pages do not depend on hotlinked Behance image URLs.
- Generate rich `WorkItem` records for Behance projects with title, slug, source URL, thumbnail, gallery images, stack/tags, summary, detail sections, timeline, and outcomes.
- Add a repeatable scraper command for refreshing Behance data during development.

## Out of Scope

- Runtime scraping in production.
- A public admin dashboard for managing portfolio imports.
- Manual production file copying or direct server edits.
- Rewriting the existing case-study layout.

## Recommended Approach

Use a static scraped import pipeline. A local script fetches the Behance profile, discovers project links, fetches each project page, extracts project metadata and images, downloads images locally, and writes a generated data module that the main `workData` module imports. This keeps the live site fast, predictable, and deployable through Git.

Runtime scraping was rejected because Behance markup and rate limits can change without warning. Manual entry was rejected because the request specifically calls for web scraping and full image/detail ingestion.

## Data Model

Extend `WorkItem` with:

- `category`: one of `website`, `mobile-app`, or `figma-design`.
- `source`: optional source label such as `Behance`.
- `sourceUrl`: optional canonical external URL.

Existing projects will be classified from their current `type`, `href`, and stack:

- Mobile products and app-backed systems become `mobile-app`.
- Web experiences, ecommerce sites, dashboards, and backend/web platforms become `website`.
- Behance imports become `figma-design`.

The generated Behance records will use the existing `portfolio` visual, image gallery support, and detail section structure. Figma-specific values should include `Figma`, `UI Design`, `UX Design`, and any scraped project tags when available.

## Scraper Behavior

Create a script such as `scripts/scrape-behance.mjs`.

The script will:

1. Fetch Rana Salah's Behance profile page.
2. Extract project URLs from page data and normalized anchors.
3. Fetch every discovered project page.
4. Extract title, description/body text, tags/tools where available, publish/update metadata where available, and image URLs from structured JSON, meta tags, or page markup.
5. Download each usable image into `public/work-images/behance/` with stable slug-based filenames.
6. Write generated records to a source file, for example `src/components/site/behanceWorkData.generated.ts`.
7. Fail clearly if no projects or no images are found.

The script should prefer structured page data when present and fall back to conservative HTML parsing. It should remove duplicate images, skip tiny icons or avatars, and keep enough images for the detail gallery.

## Work Page UX

Add a compact filter row below the work-page intro and above the project grid.

The filters are buttons:

- `All`
- `Website`
- `Mobile Apps`
- `Figma Designs`

Selecting a filter updates the visible grid in place. The active button should be visually distinct, keyboard accessible, and use the existing restrained site style. The project grid should preserve the current masonry-like spans and reveal behavior for the filtered list.

## Detail Page UX

The existing single project detail page remains the canonical destination for every project. Behance projects should render like first-class work items:

- Hero card uses the downloaded Behance thumbnail or first gallery image.
- Intro copy summarizes the project instead of showing only an external link.
- Detail sections use scraped project text/tags and generated fallback sections only when Behance does not provide enough written content.
- Gallery uses downloaded Behance images.
- External button opens the original Behance project.

## Error Handling

- If the scraper cannot fetch the Behance profile, it should exit nonzero with a clear message.
- If a single project fails, the script should report the failed URL and continue only when at least one valid project remains.
- If an image download fails, the project should still be generated if it has at least one successful image or useful metadata.
- The app should keep rendering existing work if generated Behance data is empty.

## Testing

- Run TypeScript/build validation after implementation.
- Run the scraper once and confirm it writes generated records and local images.
- Verify `/work` shows all filters and that each filter changes the visible project set.
- Verify at least one imported Behance project detail page shows downloaded images, detail text, tags/capabilities, and the Behance source link.
- Inspect mobile and desktop layouts for button wrapping, text overflow, and image cropping.

## Deployment Notes

Changes will be deployed through Git only: commit locally, push to the remote, then update the server with Git. No direct production copying or bulk overwrite is part of this design.

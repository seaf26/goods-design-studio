# TRAFFODATA Work Funnel Design

Date: 2026-06-29

## Goal

Increase qualified visits to the important proof pages, especially `/work`, and make the route from first visit to contact measurable.

The funnel to improve is:

`Home -> Work -> Case study detail -> Contact`

This is not a redesign from scratch. The TRAFFODATA site should keep its premium, calm, animated identity. The work is to make proof easier to discover, easier to enter from the homepage, easier to understand on `/work`, and easier to measure.

## Current Signal

The Vercel Analytics screenshot shows a strong gap between homepage and proof-page attention:

- `/`: 27 visitors
- `/work`: 3 visitors
- `/contact`: 2 visitors
- `/blog`: 1 visitor
- Individual work detail pages: 1-2 visitors each
- Referrers: no data for the selected period

This points to three related issues:

- Homepage visitors are not entering `/work` often enough.
- Search and external discovery are not yet creating meaningful direct visits to `/work`.
- The site does not yet have enough custom analytics events to show where the funnel leaks.

## Scope

This design covers:

- Homepage proof routing into `/work`
- `/work` page positioning and conversion flow
- Case-study discovery and internal linking
- SEO signals for `/work`, `/blog`, `/contact`, and work detail pages
- Lightweight analytics events using Vercel Analytics

This design does not cover:

- Paid acquisition campaigns
- A full visual rebrand
- Removing the liquid hero animation
- Replacing the current navigation model
- Production deployment steps

## Design Principles

- Keep the site premium and restrained.
- Make proof visible earlier without adding noisy banners.
- Make `/work` feel like the natural next step after understanding TRAFFODATA.
- Use business-problem language, not only asset-type language.
- Measure intent, not vanity interactions.
- Keep accessibility exceptions intact for reduced-motion users.

## Homepage Changes

The homepage should create clearer routes into `/work`.

Recommended changes:

- Add a stronger proof route near the hero, such as a secondary CTA: `View selected work`.
- Keep the primary CTA focused on `Start a project`.
- Make the featured-project area easier to discover from earlier on the page.
- Preserve the current brand motion, liquid visual system, and premium spacing.
- Avoid generic marketing blocks, popups, or busy proof strips.

The homepage should answer:

- What does TRAFFODATA build?
- Why should I trust it?
- Where can I see proof?
- How do I start a conversation?

## Work Page Changes

`/work` should become the proof hub.

Recommended changes:

- Reframe the intro around operational outcomes: ERP, inventory, ecommerce, dashboards, backend platforms, and internal systems.
- Make filters useful by business need, not only deliverable type.
- Update filter language toward categories like `Operations`, `Commerce`, `Dashboards`, `Mobile`, and `Web`.
- Strengthen project cards so each card quickly communicates problem, system type, result, and relevance.
- Add a post-grid CTA that routes qualified visitors to `/contact`.

The work page should answer:

- What kinds of systems has TRAFFODATA shipped?
- Which case studies match my problem?
- What did the work improve?
- What should I do next?

## Case Study Changes

Case-study pages should support both users and search crawlers.

Recommended changes:

- Ensure every case study has specific title and description metadata.
- Strengthen internal links from `/work` into case studies.
- Add links from case studies back to `/work` and forward to `/contact`.
- Use consistent proof language: problem, system, result, stack or scope, and next-step CTA.

The case-study pages should answer:

- What was built?
- What operational problem did it solve?
- What was the outcome?
- How can a similar conversation start?

## SEO Changes

The search strategy should reinforce the same proof funnel.

Recommended changes:

- Add structured data for `/work` as a case-study collection.
- Add `ItemList` or equivalent structured data that references visible case-study URLs.
- Keep canonical URLs specific per route.
- Keep `/work`, `/blog`, and `/contact` in the sitemap.
- Improve internal links from Home, Blog, Contact, and Footer into `/work` and high-value case studies.
- Use page descriptions that mention TRAFFODATA's real domains: ERP, inventory, warehouse, POS, accounting, CRM, dashboards, ecommerce, backend platforms, and custom operational software.

SEO success is not instant. The first implementation should make the site clearer and crawlable, then Search Console can be used to validate indexing later.

## Analytics Events

Add lightweight Vercel Analytics events to reveal the funnel path.

Recommended events:

- `home_view_work_click`: homepage visitors entering `/work`
- `home_project_click`: featured project clicks from the homepage
- `work_filter_click`: filter usage on `/work`
- `work_project_click`: project-card clicks from `/work`
- `work_contact_click`: CTA clicks from `/work` to `/contact`
- `contact_submit_success`: successful lead form submissions

Events should include small, useful properties where appropriate:

- `location`: `hero`, `featured_projects`, `work_grid`, `work_cta`, or similar
- `project_slug`: for project-card clicks
- `filter`: for work filter clicks

Do not track sensitive contact-form content.

## Acceptance Criteria

Analytics:

- `/work` visitor share increases compared with homepage traffic.
- There is a visible measured path from Home to Work.
- There is a visible measured path from Work to Contact.
- Project-card clicks are measurable.

SEO:

- `/work`, `/blog`, `/contact`, and work detail pages have specific canonical URLs and metadata.
- Sitemap includes important public routes.
- `/work` exposes structured data for the case-study collection.
- Internal links point crawlers and users toward `/work` and important case studies.

UX:

- The normal desktop and laptop experience keeps the premium motion and interactivity.
- The homepage does not become noisy or generic.
- `/work` is easier to scan by business problem.
- Case-study cards make the value of each project clearer before click.
- Contact remains the clear final conversion step.

## Implementation Notes

Likely code areas:

- `src/components/site/Landing.tsx`
- `src/components/site/WorkPage.tsx`
- `src/components/site/seo.ts`
- `src/routes/work.tsx`
- `src/routes/work_.$slug.tsx`
- `public/sitemap.xml`
- `scripts/generate-sitemap.mjs`

The implementation should be staged carefully because the worktree currently contains unrelated local changes. Stage only files that belong to this funnel task.

## Validation Plan

Run:

- `npm run build`
- Focused lint checks for changed files where practical
- Sitemap generation if sitemap logic changes

Manual checks:

- Homepage has an obvious route to `/work`.
- `/work` still looks premium and is easier to scan.
- Project cards link correctly.
- Work-to-contact CTA works.
- Vercel Analytics events fire only for meaningful intent actions.
- Reduced-motion behavior is not regressed.

Post-deploy checks:

- Review Vercel Analytics after enough visits.
- Confirm `home_view_work_click`, `work_project_click`, and `work_contact_click` appear.
- Use Search Console to inspect `/work`, `/blog`, `/contact`, and representative work detail pages.

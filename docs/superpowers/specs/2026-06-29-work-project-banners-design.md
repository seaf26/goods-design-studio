# Work Project Banners Design

Date: 2026-06-29
Status: Approved for implementation planning
Surface: Work index cards and project detail hero banners

## Approved Direction

Create banners for all 43 projects on the work page using a hybrid cinematic system.

The banner system must keep each real project surface visible and recognizable. AI-generated media is used as atmosphere, lighting, environment, and operational context around the screenshot, not as a replacement for proof of work. The visual result should feel like TRAFFODATA: precise, composed, system-minded, dark-tech, and operationally fluent.

## Goals

- Give every work item a strong, coherent banner.
- Make the work page feel like one premium portfolio system instead of a mixed thumbnail archive.
- Preserve visible evidence of the shipped project through real screenshots or existing project media.
- Use generated atmosphere to make project families feel cinematic without becoming generic AI art.
- Keep card text readable at all breakpoints and avoid layout shift.
- Reuse the banners on project detail pages where appropriate.

## Non-Goals

- Do not redesign the full work page layout.
- Do not replace project screenshots with fully invented visuals.
- Do not bake project titles or long text into generated images; React should render real accessible text.
- Do not change project copy, routing, filters, SEO, or sitemap behavior unless implementation requires a small supporting field.
- Do not generate videos for this pass.

## Considered Approaches

### Screenshot Command Deck

This approach frames each existing screenshot as a command-center style object. It is the safest and most literal, but less cinematic than the approved direction.

### Pure Generated Cinematic

This approach gives each project a bespoke generated world. It has the strongest mood, but weakens proof because visitors may not immediately see the actual work.

### Hybrid Cinematic

This is the approved approach. Each banner combines real project media with generated atmosphere and lightweight system overlays. It balances proof, polish, and visual memorability.

## Visual System

Each banner should follow the same hierarchy:

1. Background atmosphere: generated or composed backplate based on the project family.
2. Product surface: existing screenshot/media placed as the primary object.
3. Operational overlay: subtle lines, route traces, module blocks, scan fields, or data shapes.
4. App-rendered text: project title, client, category, scope, and CTA remain HTML.

The product surface should occupy roughly 45-70 percent of the banner's visual attention. The generated atmosphere should support the screenshot, not compete with it.

Use a dark base for most banners, with restrained deviations for brands that already have light or warm project media. Purple-blue accent light may appear as signal, focus, or system glow, but it must not become the entire concept.

## Project Families

Group the 43 projects into reusable prompt families so the set stays coherent:

- Commerce and marketplaces: WikiFood, Al Nasser, Max Hub, ShopWise, Halaa-Bazaar, E-commerce projects, seller platforms.
- Logistics and field operations: Elnasser, Naqlty, Tawsila, transport/logistics platforms.
- Backend and API platforms: Printout, WikiFood backend, Taggz backend, Laravel systems.
- Mobile products: JAWAD, BAQA, Sync, Our Kids, gym and booking apps.
- Corporate and real estate web experiences: Medad, Kemedar, Nourtha-Tech, Inovent, Inomhub.
- Dashboards and finance systems: Financial Dashboard, Test System, ERP-like admin systems.
- Specialty/immersive systems: AR Dish, 3Dentix, gaming, marine, event photography.

Each family can share composition rules, but each project still needs its own banner file.

## Asset Strategy

Add a banner asset field to the work data model, for example `banner: string`, while keeping `thumbnail` unchanged as a fallback.

Recommended storage:

- Generated/composited banners: `public/work-banners/<slug>.webp`
- Optional source notes or prompt manifest: `public/work-banners/manifest.json` or `docs/work-banners-manifest.md`

Banner dimensions should be large enough for cards and detail hero use:

- Source export: 2400 x 1350, 16:9
- Runtime display: object-cover inside existing card/detail containers
- Format: WebP, optimized for web

If a project lacks good media, the banner should still include at least one existing project image when available. Only use a generated substitute when no usable image exists, and make that exception explicit in the manifest.

## Component Integration

Extend `WorkItem` with an optional `banner` field.

Update the portfolio visual rendering so it prefers:

1. `item.banner`
2. `item.thumbnail`
3. `item.images[0]`

The existing generated UI-style visuals for `retail`, `warehouse`, `finance`, and `distribution` can remain as fallbacks unless those items also receive banners.

On the work index, banners should render inside the current project card system without changing card sizing, hover behavior, or filter behavior.

On detail pages, `ProjectHeroBanner` should use the banner asset when present, while preserving the existing hero structure and accessible text.

## Accessibility

- Every banner image needs useful alt text derived from the project title and project type.
- Do not rely on text inside image assets for meaning.
- Maintain card overlay contrast for title, summary, scope, and CTA.
- Respect existing reduced-motion behavior.
- Keep clickable target sizes and focus rings intact.

## Performance

- Use optimized WebP files.
- Keep individual banner sizes reasonable for a portfolio grid.
- Preserve lazy loading on below-the-fold images.
- Avoid introducing client-side generation, heavy canvas work, or runtime image processing.
- Verify the work page remains responsive and does not shift while images load.

## Generation Workflow

1. Generate a small pilot set of 3 banners from different families to confirm the prompt system.
2. Review the pilot visually in the localhost app.
3. Generate the remaining 40 banners in batches by family.
4. Optimize files to WebP.
5. Add `banner` paths to the project data.
6. Update rendering logic to prefer banners.
7. Verify desktop and mobile work page screenshots.

The pilot examples should include:

- One commerce/backend project.
- One logistics or operational system.
- One mobile or Behance design project.

## Testing And Verification

Run:

- TypeScript/build verification via the project build command.
- Lint if practical for touched files.
- Browser verification of `/work` on desktop and mobile widths.
- At least one project detail page with a banner.
- Filter interaction verification to ensure banners persist across categories.

Manual visual checks:

- No banner text clashes with card title overlays.
- No broken image paths.
- No banner hides the real project surface.
- No project looks like generic unrelated AI art.
- All 43 projects have either a banner or an intentional fallback.

## Open Implementation Notes

The next step is an implementation plan. It should decide whether the pilot banners are generated with Pika MCP directly, composed locally from screenshots plus generated backgrounds, or produced through a hybrid of both. The implementation plan should also define exact batch size, file naming, and the prompt manifest format before assets are generated.

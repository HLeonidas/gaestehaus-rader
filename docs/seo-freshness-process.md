# SEO freshness process

This site is statically built, so sitemap freshness must reflect **real content changes**, not just deploy time.

## How `lastmod` works

- The sitemap reads page-level freshness metadata from `src/lib/content-freshness.ts`.
- Each German canonical path has one explicit `lastModified` date.
- The English equivalent inherits the same date.
- Dynamic accommodation and booking detail pages are generated from the accommodation slugs.
- Build-time validation fails if a sitemap path is missing a freshness entry or a date is invalid.

## When to update `lastModified`

Update the relevant entry only when the page content actually changed, for example:

- pricing, accommodation details, amenities, gallery content
- summer or winter activity copy
- Guest Card benefits, usage rules, or partner references
- event/festival guidance or seasonal highlights
- trust content such as facts, contact, or about copy
- legal page text changes

Do **not** change `lastModified` just because of a deploy, refactor without visible content impact, or formatting-only edits.

## Seasonal review groups

Use these groups when planning or reviewing updates:

- `summer` → summer positioning, lakes, hiking, warm-season activity copy
- `winter` → ski, ice, snow, winter positioning
- `guestcard` → Guest Card teaser, FAQ, benefits references
- `activities` → experiences hub and cross-season activity framing
- `events` → village festivals, culinary festivals, customs, regional happenings
- `core` / `trust` / `accommodations` / `legal` → supporting site areas

## Lightweight recurring workflow

### Spring / early summer review

- Check homepage summer framing
- Check `/erlebnisse` and `/erlebnisse/sommer`
- Check Guest Card wording and external overview link
- Check lake, hiking, cable car, pool, and cycling references
- Update `lastModified` for changed pages

### Autumn / early winter review

- Check homepage winter framing
- Check `/erlebnisse` and `/erlebnisse/winter`
- Check Guest Card wording if benefits or transport wording changed
- Check ski, cross-country, sledding, ice, and winter family references
- Update `lastModified` for changed pages

### Event / festival review

- Re-check festival wording before summer and autumn
- Keep copy evergreen unless concrete dates are verified
- Prefer phrasing like "season-dependent" when dates are not confirmed
- Update `lastModified` if event guidance changes materially

## Pages to review first

- `src/routes/+page.svelte`
- `src/routes/erlebnisse/[[season]]/+page.svelte`
- `src/routes/faq/+page.svelte`
- `src/routes/fakten/+page.svelte`
- `src/lib/data/experience.ts`
- `src/lib/i18n.ts`
- `src/lib/data/accommodations.ts`
- `src/routes/sitemap.xml/+server.ts`

## Release checklist

1. Update content
2. Adjust matching entries in `src/lib/content-freshness.ts`
3. Run `npm run check`
4. Run `npm run build`
5. Spot-check generated `build/sitemap.xml`

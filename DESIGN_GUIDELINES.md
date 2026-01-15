# Design Guidelines

## Overall Visual Language
- Warm, alpine, light background (`#faf9f6`); avoid harsh contrast.
- Brand color is the single accent color. Do not introduce alternate oranges or purples.
- Rounded corners and soft shadows for cards.

## Typography
- Headings: serif, bold, slightly condensed look.
- Standard heading pattern:
  - Kicker: `text-xs font-semibold uppercase tracking-[0.35em] text-brand`
  - Title: `font-serif text-3xl/4xl` (page titles can be `text-5xl/6xl`)
  - Divider: `h-[3px] w-12/14 bg-brand`
- Body: `text-sm` to `text-base`, `text-slate-600` for readability.

## Layout
- Max content width: `max-w-6xl` (default pages), `max-w-4xl` for dense content.
- Use `space-y-*` for vertical rhythm.
- Prefer grid layout over freeform stacking when content is structured.

## Components
- Cards: `rounded-2xl/3xl`, `border border-slate-200`, `shadow-sm`.
- Buttons: brand pill for primary, neutral outlined/white for secondary.
- Icons: use `lucide-svelte` only; no inline SVGs.

## Links & Navigation
- Internal links should use `withBase()` to support GitHub Pages base path.
- Hover states should darken text on light backgrounds or increase opacity on dark backgrounds.

## Imagery
- Use `static/images` assets.
- Hero or feature images should use `object-cover`.
- Keep image sizes consistent inside grids.


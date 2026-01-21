# Project Overview

This repository contains a SvelteKit site for Gästehaus Rader. The UI is built with Tailwind CSS and uses `lucide-svelte` for icons. Content is mostly hard-coded in Svelte pages with some shared translation strings in `src/lib/i18n.ts`. The site is deployed as a static build via GitHub Pages.

## Tech Stack
- SvelteKit (Svelte 5 syntax, `$state`, `$derived`)
- Vite
- Tailwind CSS
- lucide-svelte for icons
- Static assets in `static/images`

## Project Structure
- Pages live in `src/routes/**/+page.svelte`
- Layout in `src/routes/+layout.svelte`
- Translations in `src/lib/i18n.ts`
- Static assets in `static/`

## How to Work
- Prefer updating existing sections instead of introducing new layout patterns.
- Keep headings consistent across pages: brand kicker, serif headline, brand divider.
- Use `withBase()` for internal links and static assets for GitHub Pages.
- Avoid inline SVGs; use `lucide-svelte` icons.
- For small tiles/feature labels, ensure long translations wrap cleanly; for slash-separated labels (e.g. power/heating), force a predictable line break instead of relying on auto wrapping.
- Use tabs for indentation.

## Quick Checks
- `npm run check` for Svelte/type diagnostics.
- Ensure new pages are fully static/prerender friendly.

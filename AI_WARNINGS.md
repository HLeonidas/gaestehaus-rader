# AI Agent Warnings

Known warnings and pitfalls to avoid when editing this codebase.

## Svelte Events

- Do not use `on:click`. The event directive is deprecated.
- Use the attribute `onclick` instead.
- Reference: https://svelte.dev/e/event_directive_deprecated

## Markup Hygiene

- Always close `<div>` elements.

## SvelteKit Deprecations

- `base` from `$app/paths` is deprecated. Use `resolve()` for routes.
- `page` from `$app/stores` is deprecated. Use `page` from `$app/state`.
- `assets` from `$app/paths` is deprecated. Use `asset()` for static files.

### Route Links (preferred)

```svelte
<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<a href={resolve('/erlebnisse')}>Erlebnisse</a>
<a href={resolve('/agb')}>AGB</a>
<a href={resolve('/datenschutz')}>Datenschutz</a>
```

### Static Assets (preferred)

```svelte
<script lang="ts">
	import { asset } from '$app/paths';
	const withAsset = (path: string) => asset(path);
</script>

<img src={withAsset('/images/summer-hike.jpg')} alt="" />
```

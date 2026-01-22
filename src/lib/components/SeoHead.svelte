<script lang="ts">
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from '$lib/seo';

	let {
		titleKey = null,
		descriptionKey = null,
		title = null,
		description = null,
		image = null,
	} = $props<{
		titleKey?: string | null;
		descriptionKey?: string | null;
		title?: string | null;
		description?: string | null;
		image?: string | null;
	}>();

	const defaultTitleKey = 'seo.default.title';
	const defaultDescriptionKey = 'seo.default.description';

	const canonicalUrl = $derived.by(() => new URL(page.url.pathname, SITE_ORIGIN).toString());

	const resolveTranslation = (key: string | null, fallbackKey: string) => {
		if (!key) return $t(fallbackKey);
		const value = $t(key);
		return value === key ? $t(fallbackKey) : value;
	};

	const resolvedTitle = $derived.by(() =>
		title ?? resolveTranslation(titleKey, defaultTitleKey)
	);
	const resolvedDescription = $derived.by(() =>
		description ?? resolveTranslation(descriptionKey, defaultDescriptionKey)
	);

	const resolvedImageUrl = $derived.by(() => {
		const candidate = image ?? DEFAULT_OG_IMAGE;
		if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
			return candidate;
		}
		const assetPath = candidate.startsWith('/') ? asset(candidate) : asset(`/${candidate}`);
		return new URL(assetPath, SITE_ORIGIN).toString();
	});
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<link rel="canonical" href={canonicalUrl} />
	<meta name="description" content={resolvedDescription} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={resolvedImageUrl} />
	<meta property="og:site_name" content={$t('brand.name')} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={resolvedImageUrl} />
</svelte:head>

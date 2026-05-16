<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { asset } from '$app/paths';
	import { page } from '$app/state';
	import { t } from '$lib/i18n';
	import { translatePathname } from '$lib/routing';
	import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from '$lib/seo';

	let {
		titleKey = null,
		descriptionKey = null,
		title = null,
		description = null,
		image = null,
		noindex = false,
		nofollow = false,
	} = $props<{
		titleKey?: string | null;
		descriptionKey?: string | null;
		title?: string | null;
		description?: string | null;
		image?: string | null;
		noindex?: boolean;
		nofollow?: boolean;
	}>();

	const defaultTitleKey = 'seo.default.title';
	const defaultDescriptionKey = 'seo.default.description';
	const isPreview = env.PUBLIC_IS_PREVIEW === 'true';

	const canonicalUrl = $derived.by(() => new URL(page.url.pathname, SITE_ORIGIN).toString());
	const germanUrl = $derived.by(() => new URL(translatePathname(page.url.pathname, 'de'), SITE_ORIGIN).toString());
	const englishUrl = $derived.by(() => new URL(translatePathname(page.url.pathname, 'en'), SITE_ORIGIN).toString());

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
	const shouldNoindex = $derived(isPreview || noindex);
	const shouldNofollow = $derived(isPreview || nofollow);
	const robotsContent = $derived(
		`${shouldNoindex ? 'noindex' : 'index'}, ${shouldNofollow ? 'nofollow' : 'follow'}`
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
	<link rel="alternate" hreflang="de-AT" href={germanUrl} />
	<link rel="alternate" hreflang="en" href={englishUrl} />
	<link rel="alternate" hreflang="x-default" href={germanUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDescription} />
	<meta name="twitter:image" content={resolvedImageUrl} />
	{#if shouldNoindex || shouldNofollow}
		<meta name="robots" content={robotsContent} />
	{/if}
</svelte:head>

<script lang="ts">
	import { t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';

	const withAsset = (path: string) => asset(path);
	const bookingHref = resolve('/buchen');
</script>

<svelte:head>
	<title>{$t('landing.weissbriach.title')} - {$t('brand.name')}</title>
	<meta name="description" content={$t('landing.weissbriach.subtitle')} />
	<meta property="og:title" content={$t('landing.weissbriach.title')} />
	<meta property="og:description" content={$t('landing.weissbriach.subtitle')} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
			{$t('landing.weissbriach.kicker')}
		</p>
		<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
			{$t('landing.weissbriach.title')}
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>

		<div class="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
			<p>{$t('landing.weissbriach.body1')}</p>
			<p>{$t('landing.weissbriach.body2')}</p>
			<p>{$t('landing.weissbriach.body3')}</p>
		</div>

		<div class="mt-8 grid gap-6 lg:grid-cols-2">
			<div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
				<img
					src={withAsset('/images/house/haus-sommer.jpg')}
					alt={$t('home.gallery.imageAlt.sommer')}
					class="h-72 w-full object-cover sm:h-80"
					loading="lazy"
				/>
			</div>
			<div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
				<img
					src={withAsset('/images/house/winter-balkon_ausblick-1.jpg')}
					alt={$t('home.gallery.imageAlt.winterBalkon')}
					class="h-72 w-full object-cover sm:h-80"
					loading="lazy"
				/>
			</div>
		</div>

		<div class="mt-8 flex flex-wrap items-center gap-4">
			<a
				href={bookingHref}
				class="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40"
			>
				{$t('landing.weissbriach.cta')}
			</a>
			<a
				href={resolve('/unterkuenfte-preise')}
				class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand/30"
			>
				{$t('nav.roomsShort')}
			</a>
		</div>
	</section>
</div>

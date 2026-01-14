<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>Gästehaus Rader</title>
</svelte:head>

<section class="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]"></div>
	<div class="absolute inset-0 opacity-70">
		<div class="h-full w-full bg-gradient-to-br from-slate-900 via-slate-900/60 to-slate-950"></div>
	</div>
	<div class="relative grid gap-10 px-8 py-14 lg:grid-cols-[1.2fr,0.8fr] lg:px-14">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-brand">{$t('hero.kicker')}</p>
			<h1 class="mt-6 text-4xl font-heading lg:text-5xl">{$t('hero.title')}</h1>
			<p class="mt-4 max-w-xl text-base text-slate-200">{$t('hero.subtitle')}</p>
			<div class="mt-8 flex flex-wrap gap-4">
				<a
					href="/buchen"
					class="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
				>
					{$t('hero.cta.primary')}
				</a>
				<a
					href="/unterkuenfte-preise"
					class="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand"
				>
					{$t('hero.cta.secondary')}
				</a>
			</div>
		</div>
		<div class="relative">
			<div
				class="h-full min-h-[240px] rounded-2xl border border-white/10 bg-gradient-to-br from-brand/30 via-white/10 to-transparent p-6"
			>
				<div class="flex h-full flex-col justify-between">
					<div>
						<p class="text-xs uppercase tracking-[0.3em] text-slate-300">Signature</p>
						<p class="mt-3 text-2xl font-heading">Gästehaus Rader</p>
						<p class="mt-2 text-sm text-slate-300">
							Weißbriach · Gitschtal · Kärnten
						</p>
					</div>
					<div class="rounded-xl bg-white/10 p-4 text-sm text-slate-100">
						<p>3 Appartements · Sauna · Garten</p>
						<p class="mt-1 text-xs text-slate-300">Sommer & Winter geöffnet</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="mt-14">
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-slate-500">USP</p>
			<h2 class="mt-3 text-3xl">{$t('usp.title')}</h2>
		</div>
		<a
			href="/ueber-uns"
			class="text-sm font-semibold text-brand transition hover:text-brand/80"
		>
			{$t('nav.about')}
		</a>
	</div>
	<div class="mt-8 grid gap-6 md:grid-cols-3">
		{#each [1, 2, 3] as index}
			<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
				<p class="text-xs uppercase tracking-[0.3em] text-slate-400">0{index}</p>
				<h3 class="mt-4 text-xl">{$t(`usp.${index}.title`)}</h3>
				<p class="mt-3 text-sm text-slate-600">{$t(`usp.${index}.body`)}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mt-16 rounded-3xl border border-slate-200 bg-slate-50 p-8 lg:p-12">
	<div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="text-xs uppercase tracking-[0.3em] text-slate-500">Rooms</p>
			<h2 class="mt-3 text-3xl">{$t('rooms.preview.title')}</h2>
			<p class="mt-3 text-sm text-slate-600">{$t('rooms.preview.subtitle')}</p>
		</div>
		<a
			href="/unterkuenfte-preise"
			class="text-sm font-semibold text-brand transition hover:text-brand/80"
		>
			{$t('hero.cta.secondary')}
		</a>
	</div>
	<div class="mt-8 grid gap-6 lg:grid-cols-3">
		{#each [1, 2, 3] as index}
			<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
				<div class="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-white"></div>
				<h3 class="mt-4 text-xl">{$t(`rooms.card.${index}.title`)}</h3>
				<p class="mt-2 text-sm text-slate-600">{$t(`rooms.card.${index}.body`)}</p>
				<p class="mt-4 text-sm font-semibold text-brand">{$t('price.from')}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mt-16 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
	<div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
		<p class="text-xs uppercase tracking-[0.3em] text-slate-500">Experience</p>
		<h2 class="mt-3 text-3xl">{$t('experiences.title')}</h2>
		<p class="mt-3 text-sm text-slate-600">{$t('experiences.body')}</p>
		<div class="mt-6 grid gap-4 sm:grid-cols-2">
			{#each [1, 2, 3, 4] as index}
				<div class="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
					<p class="font-semibold text-slate-800">{$t(`experiences.card.${index}.title`)}</p>
					<p class="mt-1">{$t(`experiences.card.${index}.body`)}</p>
				</div>
			{/each}
		</div>
	</div>
	<div class="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
		<p class="text-xs uppercase tracking-[0.3em] text-brand">Booking</p>
		<h2 class="mt-3 text-3xl">{$t('cta.title')}</h2>
		<p class="mt-3 text-sm text-slate-200">{$t('cta.body')}</p>
		<div class="mt-6 grid gap-4">
			<a
				href="/buchen"
				class="rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand/90"
			>
				{$t('hero.cta.primary')}
			</a>
			<a
				href="/kontakt"
				class="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-brand hover:text-brand"
			>
				{$t('nav.contact')}
			</a>
		</div>
	</div>
</section>

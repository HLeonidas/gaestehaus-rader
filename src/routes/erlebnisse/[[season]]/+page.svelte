<script lang="ts">
	import { lang, t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { ComponentType } from 'svelte';
	import {
		ArrowRight,
		BadgeCheck,
		Bike,
		BusFront,
		CableCar,
		Check,
		Clock,
		Footprints,
		Info,
		Mountain,
		Snowflake,
		Sparkles,
		Sun,
		Ticket,
		Utensils,
		Users,
		Waves,
	} from 'lucide-svelte';

	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type SeasonKey = 'summer' | 'winter';
	type ExperienceEvent = {
		id: string;
		season: SeasonKey;
		icon: ComponentType;
		kickerKey: string;
		titleKey: string;
		descriptionKey?: string;
		image: string;
		className?: string;
		badgeKey?: string;
		titleSize?: string;
		layout?: string;
	};

	const withAsset = (path: string) => asset(path);
	const guestCardOverviewUrl = $derived.by(() =>
		$lang === 'en'
			? 'https://www.nassfeld.at/en/Accommodation/Plan-your-trip/PREMIUM-cards/GuestCard-basic'
			: 'https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic'
	);

	// get active tab from url param (default: summer)
	const seasonFromUrl = $derived.by(() => {
		const season = page.params.season;
		if (season === 'winter') return 'winter';
		if (season === 'sommer' || season === 'summer') return 'summer';
		return 'summer';
	});

	const seasonToParam = (season: SeasonKey) => (season === 'winter' ? 'winter' : 'sommer');

	let activeTab = $state<SeasonKey>('summer');

	$effect(() => {
		if (activeTab !== seasonFromUrl) {
			activeTab = seasonFromUrl;
		}
	});

	function setSeason(season: SeasonKey) {
		if (activeTab === season) return;
		activeTab = season;
		void goto(resolve(`/erlebnisse/${seasonToParam(season)}`), {
			keepFocus: true,
			noScroll: true,
		});
	}

	const events: ExperienceEvent[] = [
		{
			id: 'summer-hike',
			season: 'summer',
			icon: Mountain,
			kickerKey: 'experiences.event.summer.hike.kicker',
			titleKey: 'experiences.event.summer.hike.title',
			descriptionKey: 'experiences.event.summer.hike.description',
			image: '/images/experiences/summer-hike.jpg',
			layout: 'summer',
			className: 'c1',
			titleSize: 'text-2xl',
		},
		{
			id: 'summer-lake',
			season: 'summer',
			icon: Waves,
			kickerKey: 'experiences.event.summer.lake.kicker',
			titleKey: 'experiences.event.summer.lake.title',
			image: '/images/experiences/summer-lake.png',
			layout: 'summer',
			className: 'c2',
			titleSize: 'text-xl',
		},
		{
			id: 'summer-bike',
			season: 'summer',
			icon: Bike,
			kickerKey: 'experiences.event.summer.bike.kicker',
			titleKey: 'experiences.event.summer.bike.title',
			image: '/images/experiences/summer-bike.jpg',
			layout: 'summer',
			className: 'c3',
			titleSize: 'text-xl',
		},
		{
			id: 'summer-lift',
			season: 'summer',
			icon: CableCar,
			kickerKey: 'experiences.event.summer.lift.kicker',
			titleKey: 'experiences.event.summer.lift.title',
			descriptionKey: 'experiences.event.summer.lift.description',
			image: '/images/experiences/summer-lift.png',
			layout: 'summer',
			className: 'c4',
			// badgeKey: 'experiences.badge.includedCard',
			titleSize: 'text-2xl',
		},
		{
			id: 'winter-ski',
			season: 'winter',
			icon: Snowflake,
			kickerKey: 'experiences.event.winter.ski.kicker',
			titleKey: 'experiences.event.winter.ski.title',
			descriptionKey: 'experiences.event.winter.ski.description',
			image: '/images/experiences/winter-ski.jpg',
			layout: 'winter',
			className: 'c1',
			titleSize: 'text-2xl',
		},
		{
			id: 'winter-ice',
			season: 'winter',
			icon: Snowflake,
			kickerKey: 'experiences.event.winter.ice.kicker',
			titleKey: 'experiences.event.winter.ice.title',
			image: '/images/experiences/winter-ice.jpg',
			layout: 'winter',
			className: 'c2',
			badgeKey: 'experiences.badge.popular',
			titleSize: 'text-xl',
		},
		{
			id: 'winter-hike',
			season: 'winter',
			icon: Footprints,
			kickerKey: 'experiences.event.winter.hike.kicker',
			titleKey: 'experiences.event.winter.hike.title',
			image: '/images/experiences/winter-hike.jpg',
			layout: 'winter',
			className: 'c3',
			titleSize: 'text-xl',
		},
		{
			id: 'winter-crosscountry',
			season: 'winter',
			icon: Mountain,
			kickerKey: 'experiences.event.winter.crosscountry.kicker',
			titleKey: 'experiences.event.winter.crosscountry.title',
			descriptionKey: 'experiences.event.winter.crosscountry.description',
			image: '/images/experiences/winter-crosscountry.jpg',
			layout: 'winter',
			className: 'c4',
			titleSize: 'text-2xl',
		},
	];

	const summerEvents = events.filter((event) => event.season === 'summer');
	const winterEvents = events.filter((event) => event.season === 'winter');
	const currentEvents = $derived(activeTab === 'summer' ? summerEvents : winterEvents);

	const content: Record<
		SeasonKey,
		{ kickerKey: string; titleKey: string; subtitleKey: string; bg: string }
	> =
		{
			summer: {
				kickerKey: 'experiences.season.summer.kicker',
				titleKey: 'experiences.season.summer.title',
				subtitleKey: 'experiences.season.summer.subtitle',
				bg: '/images/other/house-summer.jpg',
			},
			winter: {
				kickerKey: 'experiences.season.winter.kicker',
				titleKey: 'experiences.season.winter.title',
				subtitleKey: 'experiences.season.winter.subtitle',
				bg: '/images/other/house-winter.jpg',
			},
		};
	const currentContent = $derived(content[activeTab]);
</script>

<svelte:head>
	<title>{$t('experiences.title')} - {$t('brand.name')}</title>
</svelte:head>

<!-- ERLEBNISSE PAGE (Tailwind) -->
<!-- Requirements: Tailwind + your bg-brand/text-brand utilities available -->

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- HERO -->
		<section class="px-6 sm:px-10">
			<div class="flex justify-center">
				<div class="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
							activeTab === 'summer'
								? 'is-active bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
						}`}
						onclick={() => setSeason('summer')}
					>
						<Sun
							class={`h-4 w-4 transition-transform duration-300 ${
								activeTab === 'summer' ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
							}`}
						/>
						{$t('experiences.tabs.summer')}
					</button>

					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
							activeTab === 'winter'
								? 'is-active bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
						}`}
						onclick={() => setSeason('winter')}
					>
						<Snowflake
							class={`h-4 w-4 transition-transform duration-300 ${
								activeTab === 'winter' ? '-rotate-12 scale-110' : 'rotate-0 scale-100'
							}`}
						/>
						{$t('experiences.tabs.winter')}
					</button>
				</div>
			</div>
		</section>

		<!-- CONTENT WRAPPER -->
		<div class="mt-5 space-y-12" id="aktivitaeten">
			<section class="sm:p-10">
				<div class="space-y-4">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						{$t(currentContent.kickerKey)}
					</p>
					<h1 class="font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
						{$t(currentContent.titleKey)}
					</h1>
					<div class="h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="max-w-2xl text-base leading-relaxed text-slate-600">
						{$t(currentContent.subtitleKey)}
					</p>
				</div>

				{#key activeTab}
					<div class="experience-grid mt-8 gap-6" in:fly={{ y: 26, duration: 520, easing: cubicOut }}>
							{#each currentEvents as event, i (event.id)}
								<article
									class={`experience-card group relative overflow-hidden rounded-3xl ${event.className ?? ''}`}
								>
								<img
									src={withAsset(event.image)}
									alt=""
									class="h-full w-full object-cover"
									loading="lazy"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
								></div>

								{#if event.badgeKey}
									<span
										class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
									>
										{$t(event.badgeKey)}
									</span>
								{/if}

								<div class="absolute bottom-0 left-0 right-0 p-6">
									<p
										class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
									>
										<event.icon class="h-4 w-4 text-brand" aria-hidden="true" />
										{$t(event.kickerKey)}
									</p>
									<h3 class={`mt-2 font-semibold text-white ${event.titleSize ?? 'text-xl'}`}>
										{$t(event.titleKey)}
									</h3>
									{#if event.descriptionKey}
										<p class="mt-2 max-w-xl text-sm text-white/85">
											{$t(event.descriptionKey)}
										</p>
									{/if}
								</div>
							</article>
							{/each}
						</div>
				{/key}
			</section>

			<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10" id="gaestecard">
				<div class="space-y-4">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						{$t('guestcard.page.kicker')}
					</p>
					<h2 class="font-serif text-3xl leading-[0.95] text-slate-900 sm:text-4xl">
						{$t('guestcard.page.title')}
					</h2>
					<div class="h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="max-w-3xl text-base leading-relaxed text-slate-600">
						{$t('guestcard.page.subtitle')}
					</p>
				</div>

				<div class="mt-8 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
					<div class="space-y-6">
						<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div class="flex items-start gap-4">
								<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
									<Ticket class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-slate-900">
										{$t('guestcard.page.what.title')}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-slate-600">
										{$t('guestcard.page.what.body')}
									</p>
								</div>
							</div>
						</div>

						<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div class="flex items-start gap-4">
								<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
									<Users class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-slate-900">
										{$t('guestcard.page.who.title')}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-slate-600">
										{$t('guestcard.page.who.body')}
									</p>
								</div>
							</div>
						</div>

						<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div class="flex items-start gap-4">
								<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
									<Clock class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-slate-900">
										{$t('guestcard.page.validity.title')}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-slate-600">
										{$t('guestcard.page.validity.body')}
									</p>
								</div>
							</div>
						</div>
					</div>

					<aside class="space-y-6">
						<div class="rounded-3xl border border-brand/20 bg-brand/5 p-6 shadow-sm">
							<div class="flex items-start gap-4">
								<div class="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand shadow-sm">
									<BadgeCheck class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
										{$t('guestcard.page.quick.title')}
									</p>
									<ul class="mt-3 space-y-2 text-sm text-slate-600">
										<li class="flex items-start gap-2">
											<Check class="mt-0.5 h-4 w-4 text-brand" aria-hidden="true" />
											<span>{$t('guestcard.page.quick.item1')}</span>
										</li>
										<li class="flex items-start gap-2">
											<Check class="mt-0.5 h-4 w-4 text-brand" aria-hidden="true" />
											<span>{$t('guestcard.page.quick.item2')}</span>
										</li>
										<li class="flex items-start gap-2">
											<Check class="mt-0.5 h-4 w-4 text-brand" aria-hidden="true" />
											<span>{$t('guestcard.page.quick.item3')}</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
							<div class="flex items-start gap-4">
								<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
									<Info class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-slate-900">
										{$t('guestcard.page.rules.title')}
									</h3>
									<p class="mt-2 text-sm leading-relaxed text-slate-600">
										{$t('guestcard.page.rules.body')}
									</p>
								</div>
							</div>
						</div>
					</aside>
				</div>

				<div class="mt-10">
					<div class="flex items-center gap-4">
						<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Sparkles class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
								{$t('guestcard.page.categories.kicker')}
							</p>
							<h3 class="mt-2 text-2xl font-serif font-medium leading-[0.95] text-slate-900 sm:text-3xl">
								{$t('guestcard.page.categories.title')}
							</h3>
							<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
						</div>
					</div>

					<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<div class="flex items-start gap-3">
								<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
									<BusFront class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.page.category.transport.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.page.category.transport.body')}
									</p>
								</div>
							</div>
						</div>

						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<div class="flex items-start gap-3">
								<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
									<Waves class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.page.category.wellness.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.page.category.wellness.body')}
									</p>
								</div>
							</div>
						</div>

						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<div class="flex items-start gap-3">
								<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
									<Mountain class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.page.category.outdoor.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.page.category.outdoor.body')}
									</p>
								</div>
							</div>
						</div>

						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<div class="flex items-start gap-3">
								<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
									<Utensils class="h-5 w-5" aria-hidden="true" />
								</div>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.page.category.food.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.page.category.food.body')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
						<div class="max-w-2xl">
							<h3 class="text-xl font-semibold text-slate-900">
								{$t('guestcard.page.overview.title')}
							</h3>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">
								{$t('guestcard.page.overview.body')}
							</p>
						</div>
						<a
							href={guestCardOverviewUrl}
							class="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
							target="_blank"
							rel="noreferrer"
						>
							{$t('guestcard.page.overview.cta')}
							<ArrowRight class="h-4 w-4" aria-hidden="true" />
						</a>
					</div>
				</div>

				<div class="mt-10 rounded-3xl bg-brand px-6 py-8 text-white sm:px-10 sm:py-10">
					<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
								{$t('brand.name')}
							</p>
							<h3 class="mt-3 font-serif text-3xl leading-[0.95] text-white sm:text-4xl">
								{$t('guestcard.page.cta.title')}
							</h3>
							<p class="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
								{$t('guestcard.page.cta.body')}
							</p>
						</div>
						<div class="flex flex-wrap gap-3">
							<a
								href={resolve('/buchen')}
								class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white/90"
							>
								{$t('guestcard.page.cta.primary')}
							</a>
							<a
								href={`${resolve('/faq')}#gaestecard`}
								class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/95 transition hover:bg-white/10"
							>
								{$t('guestcard.page.cta.secondary')}
							</a>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	.experience-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem; /* gap-6 */
	}

	/* ---- SUMMER GRID (like screenshot) ---- */
	@media (min-width: 768px) {
		.experience-grid {
			/* 12-col grid for 8/4 + 4/8 layout */
			grid-template-columns: repeat(12, minmax(0, 1fr));
			grid-template-rows: 320px 300px; /* adjust if you want */
		}

		/* Row 1 */
		.c1 {
			grid-column: 1 / span 8; /* 8/12 */
			grid-row: 1;
		}
		.c2 {
			grid-column: 9 / span 4; /* 4/12 */
			grid-row: 1;
		}

		/* Row 2 */
		.c3 {
			grid-column: 1 / span 4; /* 4/12 */
			grid-row: 2;
		}
		.c4 {
			grid-column: 5 / span 8; /* 8/12 */
			grid-row: 2;
		}
	}

	/* cards fill their grid cell */
	.experience-card {
		height: 100%;
	}

	.tab-btn {
		position: relative;
	}
	.tab-btn.is-active::after {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 9999px;
		filter: blur(10px);
		opacity: 0.35;
		background: radial-gradient(circle, rgba(255, 180, 0, 0.6), transparent 60%);
	}
</style>

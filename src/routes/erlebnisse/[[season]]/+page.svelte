<script lang="ts">
	import { t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { trackEvent } from '$lib/analytics/plausible';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import type { ComponentType } from 'svelte';
	import {
		ArrowRight,
		Bike,
		BusFront,
		CableCar,
		CalendarDays,
		ChevronDown,
		Footprints,
		Landmark,
		Mountain,
		Snowflake,
		Sun,
		TrainFront,
		Utensils,
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
		void trackEvent('Filter: Season Change', { season });
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
	const seo = $derived.by(() => {
		const isWinter = seasonFromUrl === 'winter';

		return {
			titleKey: isWinter ? 'experiences.seo.winter.title' : 'experiences.seo.summer.title',
			descriptionKey: isWinter
				? 'experiences.seo.winter.description'
				: 'experiences.seo.summer.description',
		};
	});
</script>

<SeoHead titleKey={seo.titleKey} descriptionKey={seo.descriptionKey} image={currentContent.bg} />

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
							{#each currentEvents as event (event.id)}
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

			<section class="mt-12 sm:p-10" id="gaestecard">
				<div class="mx-auto max-w-3xl text-center">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						{$t('guestcard.experiences.freeNote')}
					</p>
					<h2 class="mt-3 font-serif text-3xl leading-[0.95] text-slate-900 sm:text-4xl">
						{$t('guestcard.experiences.title')}
					</h2>
					<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
						{$t('guestcard.experiences.subtitle')}
					</p>
					<a
						href="https://www.nassfeld.at/PDFs/NPS/Gaestekarten/BasisCard_Broschuere.pdf"
						class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand"
						target="_blank"
						rel="noreferrer"
					>
						{$t('guestcard.experiences.brochure.cta')}
						<ArrowRight class="h-4 w-4" aria-hidden="true" />
					</a>
				</div>

				<div class="mt-10 space-y-10">
					<div>
						<div class="flex items-center gap-3">
							<span class="h-[2px] w-6 rounded-full bg-brand"></span>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('guestcard.experiences.transport.title')}
							</h3>
						</div>

						<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
									<BusFront class="h-5 w-5" aria-hidden="true" />
								</div>
								<h4 class="mt-4 text-sm font-semibold text-slate-900">
									{$t('guestcard.experiences.transport.bus.title')}
								</h4>
								<p class="mt-2 text-xs leading-relaxed text-slate-500">
									{$t('guestcard.experiences.transport.bus.body')}
								</p>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
									<TrainFront class="h-5 w-5" aria-hidden="true" />
								</div>
								<h4 class="mt-4 text-sm font-semibold text-slate-900">
									{$t('guestcard.experiences.transport.sbahn.title')}
								</h4>
								<p class="mt-2 text-xs leading-relaxed text-slate-500">
									{$t('guestcard.experiences.transport.sbahn.body')}
								</p>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
									<CalendarDays class="h-5 w-5" aria-hidden="true" />
								</div>
								<h4 class="mt-4 text-sm font-semibold text-slate-900">
									{$t('guestcard.experiences.transport.arrival.title')}
								</h4>
								<p class="mt-2 text-xs leading-relaxed text-slate-500">
									{$t('guestcard.experiences.transport.arrival.body')}
								</p>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center gap-3">
							<span class="h-[2px] w-6 rounded-full bg-brand"></span>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('guestcard.experiences.wellness.title')}
							</h3>
						</div>

						<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
								<img
									src={withAsset('/images/experiences/freibad.png')}
									alt={$t('guestcard.experiences.wellness.card1.alt')}
									class="h-44 w-full object-cover sm:h-40 lg:h-44"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
								<div class="absolute bottom-0 left-0 right-0 p-4">
									<p class="text-sm font-semibold text-white">
										{$t('guestcard.experiences.wellness.card1.title')}
									</p>
									<p class="mt-1 text-xs text-white/85">
										{$t('guestcard.experiences.wellness.card1.body')}
									</p>
								</div>
							</article>

							<article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
								<img
									src={withAsset('/images/experiences/summer-lake.png')}
									alt={$t('guestcard.experiences.wellness.card2.alt')}
									class="h-44 w-full object-cover sm:h-40 lg:h-44"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
								<div class="absolute bottom-0 left-0 right-0 p-4">
									<p class="text-sm font-semibold text-white">
										{$t('guestcard.experiences.wellness.card2.title')}
									</p>
									<p class="mt-1 text-xs text-white/85">
										{$t('guestcard.experiences.wellness.card2.body')}
									</p>
								</div>
							</article>

							<article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
								<img
									src={withAsset('/images/experiences/sauna.png')}
									alt={$t('guestcard.experiences.wellness.card3.alt')}
									class="h-44 w-full object-cover sm:h-40 lg:h-44"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
								<div class="absolute bottom-0 left-0 right-0 p-4">
									<p class="text-sm font-semibold text-white">
										{$t('guestcard.experiences.wellness.card3.title')}
									</p>
									<p class="mt-1 text-xs text-white/85">
										{$t('guestcard.experiences.wellness.card3.body')}
									</p>
								</div>
							</article>
						</div>
					</div>

					<div>
						<div class="flex items-center gap-3">
							<span class="h-[2px] w-6 rounded-full bg-brand"></span>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('guestcard.experiences.outdoor.title')}
							</h3>
						</div>

						<div class="mt-4 grid gap-4 lg:grid-cols-4">
							<div class="rounded-2xl border border-brand/20 bg-[#fff4e6] p-6 shadow-sm lg:col-span-2">
								<div class="grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
									<Footprints class="h-5 w-5" aria-hidden="true" />
								</div>
								<p class="mt-4 text-sm font-semibold text-slate-900">
									{$t('guestcard.experiences.outdoor.feature.title')}
								</p>
								<p class="mt-2 text-xs leading-relaxed text-slate-600">
									{$t('guestcard.experiences.outdoor.feature.body')}
								</p>
								<!-- <a
									href={`${resolve('/erlebnisse/sommer')}#aktivitaeten`}
									class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand"
								>
									{$t('guestcard.experiences.outdoor.feature.cta')}
									<ArrowRight class="h-4 w-4" aria-hidden="true" />
								</a> -->
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
								<div class="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
									<Bike class="h-5 w-5" aria-hidden="true" />
								</div>
								<p class="mt-3 text-sm font-semibold text-slate-900">
									{$t('guestcard.experiences.outdoor.bike.title')}
								</p>
								<p class="mt-2 text-xs text-slate-500">
									{$t('guestcard.experiences.outdoor.bike.body')}
								</p>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
								<div class="mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand/10 text-brand">
									<Mountain class="h-5 w-5" aria-hidden="true" />
								</div>
								<p class="mt-3 text-sm font-semibold text-slate-900">
									{$t('guestcard.experiences.outdoor.adventure.title')}
								</p>
								<p class="mt-2 text-xs text-slate-500">
									{$t('guestcard.experiences.outdoor.adventure.body')}
								</p>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center gap-3">
							<span class="h-[2px] w-6 rounded-full bg-brand"></span>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('guestcard.experiences.food.title')}
							</h3>
						</div>

						<div class="mt-4">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
										<Utensils class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('guestcard.experiences.food.card.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('guestcard.experiences.food.card.body')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div>
						<div class="flex items-center gap-3">
							<span class="h-[2px] w-6 rounded-full bg-brand"></span>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('guestcard.experiences.culture.title')}
							</h3>
						</div>

						<div class="mt-4">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
										<Landmark class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('guestcard.experiences.culture.card.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('guestcard.experiences.culture.card.body')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-12 border-t border-slate-200/70 pt-10">
					<h3 class="text-center font-serif text-2xl text-slate-900 sm:text-3xl">
						{$t('guestcard.experiences.faq.title')}
					</h3>
					<div class="mx-auto mt-6 max-w-3xl space-y-3">
						<details class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" open>
							<summary class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
								{$t('faq.guestcard.q2')}
								<ChevronDown
									class="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"
									aria-hidden="true"
								/>
							</summary>
							<p class="mt-3 text-sm leading-relaxed text-slate-600">
								{$t('faq.guestcard.a2')}
							</p>
						</details>

						<details class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<summary class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
								{$t('faq.guestcard.q3')}
								<ChevronDown
									class="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"
									aria-hidden="true"
								/>
							</summary>
							<p class="mt-3 text-sm leading-relaxed text-slate-600">
								{$t('faq.guestcard.a3')}
							</p>
						</details>

						<!-- <details class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
							<summary class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
								{$t('faq.guestcard.q5')}
								<ChevronDown
									class="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"
									aria-hidden="true"
								/>
							</summary>
							<p class="mt-3 text-sm leading-relaxed text-slate-600">
								{$t('faq.guestcard.a5')}
							</p>
						</details> -->
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

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
		Users,
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
		metaKeys?: string[];
	};
	type DestinationCard = {
		id: string;
		icon: ComponentType;
		kickerKey: string;
		titleKey: string;
		bodyKey: string;
		tagsBySeason: Record<SeasonKey, string[]>;
	};
	type InterestLink = {
		id: string;
		icon: ComponentType;
		labelKey: string;
		href: string;
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
			metaKeys: ['experiences.event.summer.hike.meta1', 'experiences.event.summer.hike.meta2'],
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
			metaKeys: ['experiences.event.summer.lake.meta1', 'experiences.event.summer.lake.meta2'],
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
			metaKeys: ['experiences.event.summer.bike.meta1', 'experiences.event.summer.bike.meta2'],
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
			metaKeys: ['experiences.event.summer.lift.meta1', 'experiences.event.summer.lift.meta2'],
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
			metaKeys: ['experiences.event.winter.ski.meta1', 'experiences.event.winter.ski.meta2'],
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
			metaKeys: ['experiences.event.winter.ice.meta1', 'experiences.event.winter.ice.meta2'],
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
			metaKeys: ['experiences.event.winter.hike.meta1', 'experiences.event.winter.hike.meta2'],
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
			metaKeys: [
				'experiences.event.winter.crosscountry.meta1',
				'experiences.event.winter.crosscountry.meta2',
			],
		},
	];

	const summerEvents = events.filter((event) => event.season === 'summer');
	const winterEvents = events.filter((event) => event.season === 'winter');
	const currentEvents = $derived(activeTab === 'summer' ? summerEvents : winterEvents);
	const featuredEvent = $derived(currentEvents[0]);
	const secondaryEvents = $derived(currentEvents.slice(1));

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

	const destinationCards: DestinationCard[] = [
		{
			id: 'nassfeld',
			icon: Mountain,
			kickerKey: 'experiences.destinations.nassfeld.kicker',
			titleKey: 'experiences.destinations.nassfeld.title',
			bodyKey: 'experiences.destinations.nassfeld.body',
			tagsBySeason: {
				summer: [
					'experiences.destinations.tags.summer',
					'experiences.destinations.tags.hiking',
					'experiences.destinations.tags.panorama',
				],
				winter: [
					'experiences.destinations.tags.winter',
					'experiences.destinations.tags.ski',
					'experiences.destinations.tags.panorama',
				],
			},
		},
		{
			id: 'weissensee',
			icon: Waves,
			kickerKey: 'experiences.destinations.weissensee.kicker',
			titleKey: 'experiences.destinations.weissensee.title',
			bodyKey: 'experiences.destinations.weissensee.body',
			tagsBySeason: {
				summer: [
					'experiences.destinations.tags.nature',
					'experiences.destinations.tags.swim',
					'experiences.destinations.tags.summer',
				],
				winter: [
					'experiences.destinations.tags.nature',
					'experiences.destinations.tags.ice',
					'experiences.destinations.tags.winter',
				],
			},
		},
		{
			id: 'gitschtal',
			icon: Footprints,
			kickerKey: 'experiences.destinations.gitschtal.kicker',
			titleKey: 'experiences.destinations.gitschtal.title',
			bodyKey: 'experiences.destinations.gitschtal.body',
			tagsBySeason: {
				summer: [
					'experiences.destinations.tags.hiking',
					'experiences.destinations.tags.nature',
					'experiences.destinations.tags.family',
				],
				winter: [
					'experiences.destinations.tags.nature',
					'experiences.destinations.tags.calm',
					'experiences.destinations.tags.family',
				],
			},
		},
		{
			id: 'genussregion',
			icon: Utensils,
			kickerKey: 'experiences.destinations.genussregion.kicker',
			titleKey: 'experiences.destinations.genussregion.title',
			bodyKey: 'experiences.destinations.genussregion.body',
			tagsBySeason: {
				summer: [
					'experiences.destinations.tags.enjoy',
					'experiences.destinations.tags.regional',
					'experiences.destinations.tags.slowfood',
				],
				winter: [
					'experiences.destinations.tags.culture',
					'experiences.destinations.tags.regional',
					'experiences.destinations.tags.enjoy',
				],
			},
		},
	];

	const interestLinks: InterestLink[] = [
		{
			id: 'hiking',
			icon: Mountain,
			labelKey: 'experiences.interests.hiking',
			href: '#highlights',
		},
		{
			id: 'active',
			icon: Bike,
			labelKey: 'experiences.interests.active',
			href: '#highlights',
		},
		{
			id: 'family',
			icon: Users,
			labelKey: 'experiences.interests.family',
			href: '#ausflugsideen',
		},
		{
			id: 'lakes',
			icon: Waves,
			labelKey: 'experiences.interests.lakes',
			href: '#highlights',
		},
		{
			id: 'culture',
			icon: Utensils,
			labelKey: 'experiences.interests.culture',
			href: '#ausflugsideen',
		},
		{
			id: 'winter',
			icon: Snowflake,
			labelKey: 'experiences.interests.winter',
			href: '#highlights',
		},
	];

	const guestCardLinks = {
		benefitsOverview:
			'https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic',
		brochure: 'https://www.nassfeld.at/PDFs/NPS/Gaestekarten/BasisCard_Broschuere.pdf',
	};
</script>

<SeoHead titleKey={seo.titleKey} descriptionKey={seo.descriptionKey} image={currentContent.bg} />

<!-- ERLEBNISSE PAGE (Tailwind) -->
<!-- Requirements: Tailwind + your bg-brand/text-brand utilities available -->

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- CONTENT WRAPPER -->
		<div class="space-y-14" id="aktivitaeten">
			<section class="sm:p-10">
				<div class="mx-auto max-w-6xl text-center">
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
					<p class="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-brand sm:mt-10">
						{$t('experiences.destinations.kicker')}
					</p>
					<h1 class="mt-3 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
						{$t('experiences.destinations.title')}
					</h1>
					<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
						{$t('experiences.destinations.subtitle')}
					</p>
				</div>

				<div class="anchor-target mt-10" id="interessen">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
						{$t('experiences.interests.title')}
					</p>
					<div class="mt-4 flex flex-wrap gap-3">
						{#each interestLinks as interest}
							<a
								href={interest.href}
								class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm transition duration-300 hover:scale-[1.02] hover:border-brand/30 hover:text-slate-900"
							>
								<interest.icon class="h-4 w-4 text-brand" aria-hidden="true" />
								{$t(interest.labelKey)}
							</a>
						{/each}
					</div>
				</div>

				<div class="anchor-target mt-10" id="highlights">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
						{$t('experiences.destinations.topHighlights')}
					</p>

					{#key activeTab}
						<div class="mt-4 space-y-6" in:fly={{ y: 26, duration: 520, easing: cubicOut }}>
							{#if featuredEvent}
								<article
									class="group relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/10]"
								>
									<img
										src={withAsset(featuredEvent.image)}
										alt={`${$t(featuredEvent.titleKey)} – ${$t(featuredEvent.kickerKey)}`}
										class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
										loading="lazy"
									/>
									<div
										class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
									></div>

									{#if featuredEvent.badgeKey}
										<span
											class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
										>
											{$t(featuredEvent.badgeKey)}
										</span>
									{/if}

									<div class="absolute inset-x-0 bottom-0 p-4 sm:p-6">
										<div
											class="relative max-w-2xl rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur-sm max-h-[48%] overflow-hidden sm:max-h-none sm:p-6"
										>
											<div
												class="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/60 to-transparent sm:hidden"
												aria-hidden="true"
											></div>
											<div class="overflow-auto pr-1 sm:overflow-visible sm:pr-0">
												<p
													class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
												>
													<featuredEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
													{$t(featuredEvent.kickerKey)}
												</p>
												<h3 class={`mt-2 font-semibold text-white ${featuredEvent.titleSize ?? 'text-xl'}`}>
													{$t(featuredEvent.titleKey)}
												</h3>
												{#if featuredEvent.descriptionKey}
													<p class="mt-2 hidden max-w-xl text-sm text-white/85 sm:block">
														{$t(featuredEvent.descriptionKey)}
													</p>
												{/if}
												{#if featuredEvent.metaKeys?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each featuredEvent.metaKeys as metaKey}
															<span class="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white sm:px-3 sm:text-xs">
																{$t(metaKey)}
															</span>
														{/each}
													</div>
												{/if}
											</div>
										</div>
									</div>
								</article>
							{/if}

							<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:pb-0">
								{#each secondaryEvents as event, index (event.id)}
									<article
										class={`experience-card group relative aspect-[4/3] w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl md:h-[290px] md:w-auto md:shrink md:aspect-auto ${
											index === 0 ? 'md:col-span-6' : 'md:col-span-3'
										}`}
									>
										<img
											src={withAsset(event.image)}
											alt={`${$t(event.titleKey)} – ${$t(event.kickerKey)}`}
											class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
										/>
										<div
											class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
										></div>
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
											{#if event.metaKeys?.length}
												<div class="mt-3 flex flex-wrap gap-2">
													{#each event.metaKeys as metaKey}
														<span class="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
															{$t(metaKey)}
														</span>
													{/each}
												</div>
											{/if}
										</div>
									</article>
								{/each}
							</div>
						</div>
					{/key}
				</div>

				<div class="mt-10 rounded-2xl border border-brand/15 bg-[#fdf8f2] p-6 shadow-sm">
					<div class="grid gap-6 md:grid-cols-[1.5fr,auto] md:items-center">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
								{$t('experiences.base.kicker')}
							</p>
							<h3 class="mt-2 text-2xl font-semibold text-slate-900">
								{$t('experiences.base.title')}
							</h3>
							<p class="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
								{$t('experiences.base.body')}
							</p>
						</div>
						<div class="flex flex-wrap gap-3 md:flex-col md:justify-center">
							<a
								href={resolve('/unterkuenfte-preise')}
								class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
							>
								{$t('experiences.base.cta.rooms')}
							</a>
							<a
								href={resolve('/buchen')}
								class="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90"
							>
								{$t('experiences.base.cta.booking')}
							</a>
						</div>
					</div>
				</div>

				<div class="anchor-target mt-10 pt-16" id="ausflugsideen">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
						{$t('experiences.destinations.popular')}
					</p>
					<div class="mt-4 grid gap-4 sm:grid-cols-2">
						{#each destinationCards as card}
							<article class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg">
								<div class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
									<card.icon class="h-4 w-4" aria-hidden="true" />
									{$t(card.kickerKey)}
								</div>
								<h3 class="mt-2 text-xl font-semibold leading-tight text-slate-900">
									{$t(card.titleKey)}
								</h3>
								<p class="mt-2 text-sm leading-relaxed text-slate-600">
									{$t(card.bodyKey)}
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									{#each card.tagsBySeason[activeTab] as tag}
										<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
											{$t(tag)}
										</span>
									{/each}
								</div>
							</article>
						{/each}
					</div>
				</div>
			</section>

			<section class="anchor-target mt-12 sm:p-10" id="gaestecard">
				<div class="mx-auto max-w-3xl">
					<div class="rounded-2xl border border-slate-200 bg-white/70 p-5 text-left sm:border-0 sm:bg-transparent sm:p-0 sm:text-center">
						<p class="text-xs font-semibold uppercase tracking-[0.28em] text-brand sm:tracking-[0.35em]">
							{$t('guestcard.experiences.freeNote')}
						</p>
						<h2 class="mt-2 font-serif text-[2rem] leading-[0.98] text-slate-900 sm:mt-3 sm:text-4xl sm:leading-[0.95]">
							{$t('guestcard.experiences.title')}
						</h2>
						<div class="mt-3 h-[3px] w-14 rounded-full bg-brand sm:mx-auto"></div>
						<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
							{$t('guestcard.experiences.subtitle')}
						</p>
						<a
							href={guestCardLinks.benefitsOverview}
							class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-brand sm:mt-2"
							target="_blank"
							rel="noreferrer"
						>
							{$t('guestcard.experiences.benefitsOverviewCta')}
							<ArrowRight class="h-4 w-4" aria-hidden="true" />
						</a>
					</div>
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
							<div class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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

							<div class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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

							<div class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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
							<article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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

							<article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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

							<article class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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
							<div class="group rounded-2xl border border-brand/20 bg-[#fff4e6] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md lg:col-span-2">
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

							<div class="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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

							<div class="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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
							<div class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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
							<div class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
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
	.anchor-target {
		scroll-margin-top: 7rem;
		border-radius: 1rem;
		transition:
			background-color 240ms ease,
			box-shadow 240ms ease;
	}

	.anchor-target:target {
		background-color: rgba(247, 171, 0, 0.05);
		box-shadow:
			0 0 0 1px rgba(247, 171, 0, 0.22),
			0 0 0 12px rgba(247, 171, 0, 0.07),
			0 12px 28px -22px rgba(247, 171, 0, 0.45);
		animation: anchorTargetPulse 800ms ease-out 1;
	}

	@keyframes anchorTargetPulse {
		0% {
			background-color: rgba(247, 171, 0, 0.13);
			box-shadow:
				0 0 0 1px rgba(247, 171, 0, 0.3),
				0 0 0 16px rgba(247, 171, 0, 0.1),
				0 14px 30px -22px rgba(247, 171, 0, 0.5);
		}
		100% {
			background-color: rgba(247, 171, 0, 0.05);
			box-shadow:
				0 0 0 1px rgba(247, 171, 0, 0.22),
				0 0 0 12px rgba(247, 171, 0, 0.07),
				0 12px 28px -22px rgba(247, 171, 0, 0.45);
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

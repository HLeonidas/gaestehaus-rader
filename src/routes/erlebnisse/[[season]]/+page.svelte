<script lang="ts">
	import { t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import {
		activityFilters,
		destinationCards,
		experienceEvents as events,
		experienceSeasonContent as content,
		experienceSectionLinks as sectionLinks,
		experienceSectionTrackingLinks as sectionTrackingLinks,
		type ActivityFilterKey,
		type SeasonKey,
		type SectionLink,
	} from '$lib/data/experience';
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import {
		ArrowRight,
		Bike,
		BusFront,
		CalendarDays,
		ChevronRight,
		Footprints,
		Landmark,
		List,
		Mountain,
		SlidersHorizontal,
		TrainFront,
		Utensils,
		X,
	} from 'lucide-svelte';

	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type NavMode = 'compact' | 'peek';

	const withAsset = (path: string) => asset(path);

	// get active tab from url param (default: summer)
	const seasonFromUrl = $derived.by(() => {
		const season = page.params.season;
		if (season === 'winter') return 'winter';
		if (season === 'sommer' || season === 'summer') return 'summer';
		return 'summer';
	});

	let activeTab = $state<SeasonKey>('summer');
	let activeHighlightsSeason = $state<SeasonKey>('summer');
	let selectedActivity = $state<ActivityFilterKey | null>(null);
	let showAllSeasons = $state(true);
	let activeSectionId = $state('aktivitaeten');
	let isMobileFilterOpen = $state(false);
	let navMode = $state<NavMode>('peek');
	let navListEl = $state<HTMLDivElement | null>(null);
	const btnEls = new Map<string, HTMLButtonElement>();
	const indicatorTop = tweened(0, { duration: 420, easing: cubicOut });
	const indicatorHeight = tweened(40, { duration: 420, easing: cubicOut });
	let indicatorVisible = $state(false);
	let scrollCollapseTimer: number | null = null;
	let highlightObserver: IntersectionObserver | null = null;
	let manualTabUntil = 0;

	const isPeek = $derived(navMode === 'peek');
	const isCompact = $derived(navMode === 'compact');

	$effect(() => {
		if (activeTab !== seasonFromUrl) {
			activeTab = seasonFromUrl;
		}
	});

	const summerEvents = events.filter((event) => event.season === 'summer');
	const winterEvents = events.filter((event) => event.season === 'winter');
	const filteredSummerEvents = $derived.by(() => {
		const activity = selectedActivity;
		if (!activity) return summerEvents;
		const matches = summerEvents.filter((event) => event.activities.includes(activity));
		return matches.length ? matches : summerEvents;
	});
	const filteredWinterEvents = $derived.by(() => {
		const activity = selectedActivity;
		if (!activity) return winterEvents;
		const matches = winterEvents.filter((event) => event.activities.includes(activity));
		return matches.length ? matches : winterEvents;
	});
	const summerFeaturedEvent = $derived(filteredSummerEvents[0]);
	const summerSecondaryEvents = $derived(filteredSummerEvents.slice(1));
	const winterFeaturedEvent = $derived(filteredWinterEvents[0]);
	const winterSecondaryEvents = $derived(filteredWinterEvents.slice(1));

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

	const navActiveSectionId = $derived(activeSectionId === 'highlights' ? '' : activeSectionId);

	const activeSectionLabelKey = $derived.by(() => {
		const match = sectionTrackingLinks.find((section) => section.id === activeSectionId);
		return match?.labelKey ?? 'experiences.nav.title';
	});

	const filteredDestinationCards = $derived.by(() => {
		const activity = selectedActivity;
		if (!activity) return destinationCards;
		const matches = destinationCards.filter((card) => card.activities.includes(activity));
		return matches.length ? matches : destinationCards;
	});

	const guestCardLinks = {
		benefitsOverview:
			'https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic',
		brochure: 'https://www.nassfeld.at/PDFs/NPS/Gaestekarten/BasisCard_Broschuere.pdf',
	};

	let isNassfeldModalOpen = $state(false);

	const nassfeldFacts = [
		'Kärntens größtes Skigebiet mit rund 110 Pistenkilometern.',
		'Breites Angebot für Familien, Genießer und sportliche Fahrer.',
		'Viele Hütten, Panorama-Spots und moderne Liftanlagen.',
	];

	const nassfeldTips = [
		'Anfahrt ab Gästehaus: ca. 20-25 Minuten (Auto) oder gratis mit dem Shuttlebus zum Nassfeld.',
		'Ideal als Tagesausflug im Winter und in der Übergangszeit.',
		'Tipp: Früh starten für entspanntes Parken und ruhige erste Abfahrten.',
	];

	function openNassfeldModal() {
		isNassfeldModalOpen = true;
	}

	function closeNassfeldModal() {
		isNassfeldModalOpen = false;
	}

	function onNassfeldBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeNassfeldModal();
		}
	}

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isNassfeldModalOpen) {
			closeNassfeldModal();
		}
		if (event.key === 'Escape' && isMobileFilterOpen) {
			isMobileFilterOpen = false;
		}
	}

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function scrollToSeasonHighlightsFromUrl() {
		const targetId = seasonFromUrl === 'winter' ? 'highlights-winter' : 'highlights-summer';
		const target = document.getElementById(targetId);
		if (!target) return;
		target.scrollIntoView({ behavior: 'auto', block: 'start' });
	}

	function setActiveTabManual(next: SeasonKey) {
		activeTab = next;
		manualTabUntil = Date.now() + 1500;
	}

	function setNavMode(next: NavMode) {
		navMode = next;
	}

	function onNavEnter() {
		setNavMode('peek');
	}

	function onNavLeave() {
		setNavMode('peek');
	}

	function onNavFocusIn() {
		setNavMode('peek');
	}

	function onNavFocusOut() {
		setNavMode('peek');
	}

	function onWindowScroll() {
		updateActiveSectionFromViewport();
		setNavMode('peek');
	}

	function updateActiveSectionFromViewport() {
		const marker = window.innerHeight * 0.33;
		let current = sectionTrackingLinks[0]?.id ?? 'aktivitaeten';
		for (const section of sectionTrackingLinks) {
			const el = document.getElementById(section.id);
			if (!el) continue;
			if (el.getBoundingClientRect().top <= marker) {
				current = section.id;
			} else {
				break;
			}
		}
		activeSectionId = current;

		const summerHighlightsEl = document.getElementById('highlights-summer');
		const winterHighlightsEl = document.getElementById('highlights-winter');
		if (summerHighlightsEl && winterHighlightsEl) {
			const summerTop = summerHighlightsEl.getBoundingClientRect().top;
			const winterTop = winterHighlightsEl.getBoundingClientRect().top;
			if (winterTop <= marker) {
				activeHighlightsSeason = 'winter';
			} else if (summerTop <= marker) {
				activeHighlightsSeason = 'summer';
			}
		}
	}

	function sectionBtn(node: HTMLButtonElement, id: string) {
		btnEls.set(id, node);
		queueMicrotask(updateIndicator);
		return {
			update(nextId: string) {
				if (nextId === id) return;
				btnEls.delete(id);
				id = nextId;
				btnEls.set(id, node);
			},
			destroy() {
				btnEls.delete(id);
			},
		};
	}

	function updateIndicator() {
		if (!navListEl) return;
		const el = btnEls.get(navActiveSectionId);
		if (!el) {
			indicatorVisible = false;
			return;
		}
		const parentRect = navListEl.getBoundingClientRect();
		const rect = el.getBoundingClientRect();
		indicatorTop.set(rect.top - parentRect.top);
		indicatorHeight.set(rect.height);
		indicatorVisible = true;
	}

	function enableHighlightSeasonAuto() {
		highlightObserver?.disconnect();
		highlightObserver = null;
		const container = document.getElementById('highlights');
		if (!container) return;
		const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-season]'));
		if (!cards.length) return;
		highlightObserver = new IntersectionObserver(
			(entries) => {
				if (activeSectionId !== 'highlights') return;
				if (!showAllSeasons) return;
				if (Date.now() < manualTabUntil) return;
				const best = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
				const seasonAttr = best?.target?.getAttribute('data-season');
				const season =
					seasonAttr === 'summer' || seasonAttr === 'winter' ? (seasonAttr as SeasonKey) : null;
				if (season && season !== activeTab) activeTab = season;
			},
			{
				root: null,
				threshold: [0.25, 0.4, 0.55, 0.7],
				rootMargin: '-20% 0px -55% 0px',
			}
		);
		cards.forEach((card) => highlightObserver?.observe(card));
	}

	$effect(() => {
		if (!isNassfeldModalOpen) return;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});

	$effect(() => {
		if (isCompact) {
			indicatorVisible = false;
			return;
		}
		navActiveSectionId;
		queueMicrotask(updateIndicator);
	});

	$effect(() => {
		filteredSummerEvents.length;
		filteredWinterEvents.length;
		showAllSeasons;
		queueMicrotask(enableHighlightSeasonAuto);
	});

	$effect(() => {
		seasonFromUrl;
		queueMicrotask(scrollToSeasonHighlightsFromUrl);
	});

	onMount(() => {
		updateActiveSectionFromViewport();
		window.addEventListener('scroll', onWindowScroll, { passive: true });
		window.addEventListener('resize', updateActiveSectionFromViewport);
		queueMicrotask(scrollToSeasonHighlightsFromUrl);
		return () => {
			window.removeEventListener('scroll', onWindowScroll);
			window.removeEventListener('resize', updateActiveSectionFromViewport);
		};
	});

	onMount(() => {
		enableHighlightSeasonAuto();
		return () => {
			highlightObserver?.disconnect();
			highlightObserver = null;
		};
	});

	onDestroy(() => {
		highlightObserver?.disconnect();
		if (scrollCollapseTimer) window.clearTimeout(scrollCollapseTimer);
	});
</script>

<svelte:window onkeydown={onWindowKeydown} />

<SeoHead titleKey={seo.titleKey} descriptionKey={seo.descriptionKey} image={currentContent.bg} />

<aside class="hidden lg:block">
	<div class="pointer-events-none fixed left-6 top-24 z-40">
		<div
			class={`pointer-events-auto origin-top-left transition-all duration-300 ease-out ${
				isPeek ? 'w-[240px]' : 'w-[150px]'
			}`}
			role="group"
			aria-label={$t('experiences.nav.title')}
			onmouseenter={onNavEnter}
			onmouseleave={onNavLeave}
			onfocusin={onNavFocusIn}
			onfocusout={onNavFocusOut}
		>
			<div
				class={`relative overflow-hidden rounded-3xl border shadow-[0_12px_34px_rgba(15,23,42,0.10)] backdrop-blur-xl ring-1 ring-white/30 ${
					isPeek ? 'border-white/30 bg-white/22' : 'border-white/25 bg-white/18'
				}`}
			>
				<div class="pointer-events-none absolute inset-0">
					<div class="nav-glass-sheen"></div>
				</div>
				<div class={`relative flex items-center gap-2 ${isPeek ? 'px-4 pt-4' : 'px-3 pt-3'}`}>
					<div
						class={`grid place-items-center rounded-2xl bg-brand/10 text-brand ${
							isPeek ? 'h-9 w-9' : 'h-10 w-10'
						}`}
					>
						<List class="h-4 w-4" aria-hidden="true" />
					</div>
					{#if isPeek}
						<div>
							<p class="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
								{$t('experiences.nav.kicker')}
							</p>
							<p class="text-[13px] font-semibold text-slate-900">
								{$t('experiences.nav.title')}
							</p>
						</div>
					{/if}
				</div>
				{#if isCompact}
					<div class="relative px-3 pb-3 pt-2">
						<div class="rounded-2xl border border-white/30 bg-white/20 px-2.5 py-3">
							<div class="flex items-center justify-center gap-2">
								{#each sectionTrackingLinks as section}
									<button
										type="button"
										class="group relative grid h-5 w-5 place-items-center rounded-full"
										onclick={() => scrollToSection(section.id)}
										aria-label={$t(section.labelKey)}
										title={$t(section.labelKey)}
									>
										<span
											class={`h-2 w-2 rounded-full transition ${
												activeSectionId === section.id
													? 'bg-brand'
													: 'bg-slate-300 group-hover:bg-slate-400'
											}`}
										></span>
									</button>
								{/each}
							</div>
						</div>
					</div>
				{/if}
				{#if isPeek}
					<nav class="relative mt-3 px-2 pb-2">
						<div bind:this={navListEl} class="relative">
							{#if indicatorVisible}
								<div
									class="nav-indicator"
									style={`transform: translateY(${$indicatorTop}px); height: ${$indicatorHeight}px;`}
									aria-hidden="true"
								></div>
							{/if}
							{#each sectionLinks as section}
								<div class="relative z-10">
									<button
										use:sectionBtn={section.id}
										type="button"
										class={`group flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[13px] font-semibold transition ${
											navActiveSectionId === section.id
												? 'text-slate-900'
												: 'text-slate-700 hover:bg-white/18'
										}`}
										onclick={() => scrollToSection(section.id)}
									>
										<span class="flex items-center gap-2">
										<span
											class={`h-1.5 w-1.5 rounded-full ${
												navActiveSectionId === section.id
													? 'bg-brand'
													: 'bg-slate-300 group-hover:bg-slate-400'
											}`}
											></span>
											{$t(section.labelKey)}
										</span>
										<ChevronRight
											class="h-4 w-4 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5"
											aria-hidden="true"
										/>
									</button>
									{#if section.id === 'aktivitaeten'}
										<div class="mt-0.5 mb-1 pl-3 pr-0">
											<button
												type="button"
												class={`group flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[13px] font-semibold transition ${
													activeSectionId === 'highlights' && activeHighlightsSeason === 'summer'
														? 'border border-white/28 bg-white/38 text-slate-900 shadow-[0_10px_26px_rgba(15,23,42,0.10)] backdrop-blur-[14px]'
														: 'text-slate-700 hover:bg-white/18'
												}`}
												onclick={() => scrollToSection('highlights-summer')}
											>
												<span class="flex items-center gap-2">
													<span
														class={`h-1.5 w-1.5 rounded-full ${
															activeSectionId === 'highlights' &&
															activeHighlightsSeason === 'summer'
																? 'bg-brand'
																: 'bg-slate-300 group-hover:bg-slate-400'
														}`}
													></span>
													{$t('experiences.nav.summer')}
												</span>
												<ChevronRight
													class="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5"
													aria-hidden="true"
												/>
											</button>
											<button
												type="button"
												class={`group mt-0.5 flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-[13px] font-semibold transition ${
													activeSectionId === 'highlights' && activeHighlightsSeason === 'winter'
														? 'border border-white/28 bg-white/38 text-slate-900 shadow-[0_10px_26px_rgba(15,23,42,0.10)] backdrop-blur-[14px]'
														: 'text-slate-700 hover:bg-white/18'
												}`}
												onclick={() => scrollToSection('highlights-winter')}
											>
												<span class="flex items-center gap-2">
													<span
														class={`h-1.5 w-1.5 rounded-full ${
															activeSectionId === 'highlights' &&
															activeHighlightsSeason === 'winter'
																? 'bg-brand'
																: 'bg-slate-300 group-hover:bg-slate-400'
														}`}
													></span>
													{$t('experiences.nav.winter')}
												</span>
												<ChevronRight
													class="h-4 w-4 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5"
													aria-hidden="true"
												/>
											</button>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</nav>
					<div class="relative border-t border-white/35 px-4 py-4">
						<div class="flex items-center justify-between">
							<p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
								{$t('experiences.nav.filters')}
							</p>
							{#if selectedActivity}
								<button
									type="button"
									class="text-[11px] font-semibold text-slate-600 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
									onclick={() => (selectedActivity = null)}
								>
									{$t('experiences.nav.reset')}
								</button>
							{/if}
						</div>
						<div class="mt-2 flex flex-wrap gap-1.5">
							{#each activityFilters as filter}
								<button
									type="button"
									class={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition ${
										selectedActivity === filter.id
											? 'bg-brand text-white shadow-sm'
											: 'border border-white/35 bg-white/25 text-slate-700 hover:bg-white/35'
									}`}
									onclick={() => (selectedActivity = selectedActivity === filter.id ? null : filter.id)}
									aria-pressed={selectedActivity === filter.id}
								>
									<filter.icon class="h-3.5 w-3.5" aria-hidden="true" />
									{$t(filter.labelKey)}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</aside>

<!-- ERLEBNISSE PAGE (Tailwind) -->
<!-- Requirements: Tailwind + your bg-brand/text-brand utilities available -->

<main class="min-h-dvh bg-[#fbfaf7] pb-24 lg:pb-0">
	<div class="mx-auto w-full max-w-none px-4 sm:px-8 lg:px-10">
		<!-- CONTENT WRAPPER -->
		<div class="space-y-14 lg:space-y-20" id="aktivitaeten">
			<section class="pt-4 sm:pt-6 sm:px-10">
				<div class="mx-auto max-w-6xl text-center">
					<p class="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand sm:mt-7">
						{$t('experiences.destinations.kicker')}
					</p>
					<h1 class="mt-3 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl lg:text-6xl">
						{$t('experiences.destinations.title')}
					</h1>
					<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
						{$t('experiences.destinations.subtitle')}
					</p>
				</div>
				<!-- <div class="anchor-target mt-10" id="interessen">
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
				</div> -->

				<div class="anchor-target mt-8 sm:mt-9" id="highlights">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
						{$t('experiences.destinations.topHighlights')}
					</p>

					{#if showAllSeasons || activeTab === 'summer'}
						<div
							class="mt-4 space-y-6"
							id="highlights-summer"
							in:fly={{ y: 26, duration: 520, easing: cubicOut }}
						>
							<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
								{$t('experiences.nav.summer')}
							</p>
							{#if summerFeaturedEvent}
								<div class="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-4 sm:px-8 lg:px-10">
									<article
										data-season={summerFeaturedEvent.season}
										class="group relative overflow-hidden rounded-3xl min-h-[420px] lg:h-[calc(100dvh-180px)] lg:min-h-[640px]"
									>
										<img
											src={withAsset(summerFeaturedEvent.image)}
											alt={`${$t(summerFeaturedEvent.titleKey)} – ${$t(summerFeaturedEvent.kickerKey)}`}
											class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
										/>
										<div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/22 to-transparent"></div>

										{#if summerFeaturedEvent.badgeKey}
											<span
												class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
											>
												{$t(summerFeaturedEvent.badgeKey)}
											</span>
										{/if}

										<div class="absolute inset-x-0 bottom-0 p-4 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:pb-4 sm:pt-6 sm:group-hover:pb-6 sm:group-focus-within:pb-6">
											<div class="relative max-w-2xl rounded-2xl border border-white/25 bg-white/16 p-4 backdrop-blur-md max-h-[48%] overflow-hidden transition-[background-color,border-color,backdrop-filter,box-shadow,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-none sm:border-transparent sm:bg-transparent sm:backdrop-blur-0 sm:shadow-none sm:px-5 sm:pb-1 sm:pt-4 sm:group-hover:border-white/25 sm:group-hover:bg-white/16 sm:group-hover:backdrop-blur-md sm:group-hover:shadow-[0_10px_26px_rgba(15,23,42,0.16)] sm:group-hover:p-6 sm:group-focus-within:border-white/25 sm:group-focus-within:bg-white/16 sm:group-focus-within:backdrop-blur-md sm:group-focus-within:shadow-[0_10px_26px_rgba(15,23,42,0.16)] sm:group-focus-within:p-6">
												<div class="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/60 to-transparent sm:hidden" aria-hidden="true"></div>
												<div class="overflow-auto pr-1 sm:overflow-visible sm:pr-0">
													<p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
														<summerFeaturedEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
														{$t(summerFeaturedEvent.kickerKey)}
													</p>
													<h3 class={`mt-2 font-semibold text-white ${summerFeaturedEvent.titleSize ?? 'text-xl'}`}>
														{$t(summerFeaturedEvent.titleKey)}
													</h3>
													{#if summerFeaturedEvent.descriptionKey}
														<p class="mt-2 max-w-xl text-sm text-white/85 transition-[max-height,opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-0 sm:translate-y-1 sm:overflow-hidden sm:opacity-0 sm:blur-[2px] sm:group-hover:max-h-28 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-hover:blur-0 sm:group-focus-within:max-h-28 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-focus-within:blur-0">
															{$t(summerFeaturedEvent.descriptionKey)}
														</p>
													{/if}
													{#if summerFeaturedEvent.metaKeys?.length}
														<div class="mt-3 flex flex-wrap gap-2 transition-[max-height,opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-0 sm:translate-y-1 sm:overflow-hidden sm:opacity-0 sm:blur-[2px] sm:delay-100 sm:group-hover:max-h-20 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-hover:blur-0 sm:group-focus-within:max-h-20 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-focus-within:blur-0">
															{#each summerFeaturedEvent.metaKeys as metaKey}
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
								</div>
							{/if}
							<div class="mt-6">
								<div class="divide-y divide-slate-200/70">
									{#each summerSecondaryEvents as event, i (event.id)}
										<article
											data-season={event.season}
											class="group grid gap-6 py-8 sm:grid-cols-[240px,1fr] lg:grid-cols-[320px,1fr] lg:items-center"
										>
											<div
												class={`relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] ${
													i % 2 === 1 ? 'sm:order-2' : ''
												}`}
											>
												<img
													src={withAsset(event.image)}
													alt={`${$t(event.titleKey)} – ${$t(event.kickerKey)}`}
													class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
													loading="lazy"
												/>
												<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0"></div>
												{#if event.badgeKey}
													<span class="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
														{$t(event.badgeKey)}
													</span>
												{/if}
											</div>

											<div class={`min-w-0 ${i % 2 === 1 ? 'sm:pr-6' : 'sm:pl-6'}`}>
												<p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
													<event.icon class="h-4 w-4" aria-hidden="true" />
													{$t(event.kickerKey)}
												</p>

												<h3 class="mt-1 text-xl font-semibold leading-tight text-slate-900">
													<span class="bg-gradient-to-r from-slate-900 to-slate-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
														{$t(event.titleKey)}
													</span>
												</h3>

												{#if event.descriptionKey}
													<p class="mt-2 text-sm leading-relaxed text-slate-600">
														{$t(event.descriptionKey)}
													</p>
												{/if}

												{#if event.metaKeys?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each event.metaKeys as metaKey}
															<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
																{$t(metaKey)}
															</span>
														{/each}
													</div>
												{/if}

												<div class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
													Mehr erfahren
													<span class="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition group-hover:translate-x-0.5">
														<ArrowRight class="h-4 w-4" aria-hidden="true" />
													</span>
												</div>
											</div>
										</article>
									{/each}
								</div>
							</div>
						</div>
					{/if}

					{#if showAllSeasons || activeTab === 'winter'}
						<div
							class="mt-10 space-y-6"
							id="highlights-winter"
							in:fly={{ y: 26, duration: 520, easing: cubicOut }}
						>
							<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
								{$t('experiences.nav.winter')}
							</p>
							{#if winterFeaturedEvent}
								<div class="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-4 sm:px-8 lg:px-10">
									<article
										data-season={winterFeaturedEvent.season}
										class={`group relative overflow-hidden rounded-3xl min-h-[420px] lg:h-[calc(100dvh-180px)] lg:min-h-[640px] ${
											winterFeaturedEvent.id === 'winter-ski' ? 'cursor-pointer' : ''
										}`}
									>
										<img
											src={withAsset(winterFeaturedEvent.image)}
											alt={`${$t(winterFeaturedEvent.titleKey)} – ${$t(winterFeaturedEvent.kickerKey)}`}
											class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
										/>
										<div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/22 to-transparent"></div>

										{#if winterFeaturedEvent.id === 'winter-ski'}
											<button
												type="button"
												class="absolute inset-0 z-10"
												aria-label="Nassfeld Informationen öffnen"
												onclick={openNassfeldModal}
											></button>
										{/if}

										{#if winterFeaturedEvent.badgeKey}
											<span
												class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
											>
												{$t(winterFeaturedEvent.badgeKey)}
											</span>
										{/if}

										<div class="absolute inset-x-0 bottom-0 p-4 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:pb-4 sm:pt-6 sm:group-hover:pb-6 sm:group-focus-within:pb-6">
											<div class="relative max-w-2xl rounded-2xl border border-white/25 bg-white/16 p-4 backdrop-blur-md max-h-[48%] overflow-hidden transition-[background-color,border-color,backdrop-filter,box-shadow,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-none sm:border-transparent sm:bg-transparent sm:backdrop-blur-0 sm:shadow-none sm:px-5 sm:pb-1 sm:pt-4 sm:group-hover:border-white/25 sm:group-hover:bg-white/16 sm:group-hover:backdrop-blur-md sm:group-hover:shadow-[0_10px_26px_rgba(15,23,42,0.16)] sm:group-hover:p-6 sm:group-focus-within:border-white/25 sm:group-focus-within:bg-white/16 sm:group-focus-within:backdrop-blur-md sm:group-focus-within:shadow-[0_10px_26px_rgba(15,23,42,0.16)] sm:group-focus-within:p-6">
												<div class="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/60 to-transparent sm:hidden" aria-hidden="true"></div>
												<div class="overflow-auto pr-1 sm:overflow-visible sm:pr-0">
													<p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
														<winterFeaturedEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
														{$t(winterFeaturedEvent.kickerKey)}
													</p>
													<h3 class={`mt-2 font-semibold text-white ${winterFeaturedEvent.titleSize ?? 'text-xl'}`}>
														{$t(winterFeaturedEvent.titleKey)}
													</h3>
													{#if winterFeaturedEvent.descriptionKey}
														<p class="mt-2 max-w-xl text-sm text-white/85 transition-[max-height,opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-0 sm:translate-y-1 sm:overflow-hidden sm:opacity-0 sm:blur-[2px] sm:group-hover:max-h-28 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-hover:blur-0 sm:group-focus-within:max-h-28 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-focus-within:blur-0">
															{$t(winterFeaturedEvent.descriptionKey)}
														</p>
													{/if}
													{#if winterFeaturedEvent.metaKeys?.length}
														<div class="mt-3 flex flex-wrap gap-2 transition-[max-height,opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-0 sm:translate-y-1 sm:overflow-hidden sm:opacity-0 sm:blur-[2px] sm:delay-100 sm:group-hover:max-h-20 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-hover:blur-0 sm:group-focus-within:max-h-20 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 sm:group-focus-within:blur-0">
															{#each winterFeaturedEvent.metaKeys as metaKey}
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
								</div>
							{/if}
							<div class="mt-6">
								<div class="divide-y divide-slate-200/70">
									{#each winterSecondaryEvents as event, i (event.id)}
										<article
											data-season={event.season}
											class="group grid gap-6 py-8 sm:grid-cols-[240px,1fr] lg:grid-cols-[320px,1fr] lg:items-center"
										>
											<div
												class={`relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] ${
													i % 2 === 1 ? 'sm:order-2' : ''
												}`}
											>
												<img
													src={withAsset(event.image)}
													alt={`${$t(event.titleKey)} – ${$t(event.kickerKey)}`}
													class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
													loading="lazy"
												/>
												<div class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0"></div>
												{#if event.badgeKey}
													<span class="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
														{$t(event.badgeKey)}
													</span>
												{/if}
											</div>

											<div class={`min-w-0 ${i % 2 === 1 ? 'sm:pr-6' : 'sm:pl-6'}`}>
												<p class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
													<event.icon class="h-4 w-4" aria-hidden="true" />
													{$t(event.kickerKey)}
												</p>

												<h3 class="mt-1 text-xl font-semibold leading-tight text-slate-900">
													<span class="bg-gradient-to-r from-slate-900 to-slate-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
														{$t(event.titleKey)}
													</span>
												</h3>

												{#if event.descriptionKey}
													<p class="mt-2 text-sm leading-relaxed text-slate-600">
														{$t(event.descriptionKey)}
													</p>
												{/if}

												{#if event.metaKeys?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each event.metaKeys as metaKey}
															<span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
																{$t(metaKey)}
															</span>
														{/each}
													</div>
												{/if}

												<div class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
													Mehr erfahren
													<span class="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition group-hover:translate-x-0.5">
														<ArrowRight class="h-4 w-4" aria-hidden="true" />
													</span>
												</div>
											</div>
										</article>
									{/each}
								</div>
							</div>
						</div>
					{/if}
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
					<div class="mx-auto max-w-3xl text-center">
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('experiences.destinations.kicker')}
						</p>
						<h2 class="mt-2 font-serif text-[2rem] leading-[0.98] text-slate-900 sm:text-4xl sm:leading-[0.95]">
							{$t('experiences.destinations.popular')}
						</h2>
						<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					</div>
					<div class="mt-8 grid gap-4 sm:grid-cols-2">
						{#each filteredDestinationCards as card}
							{#if card.id === 'nassfeld'}
								<button
									type="button"
									class="destination-card group text-left"
									onclick={openNassfeldModal}
									aria-haspopup="dialog"
									aria-expanded={isNassfeldModalOpen}
								>
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
									<div class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
										Mehr zu Nassfeld
										<ArrowRight class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
									</div>
								</button>
							{:else}
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
							{/if}
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
									src={withAsset('/images/Umgebung/freibad.png')}
									alt={$t('guestcard.experiences.wellness.card1.alt')}
									class="h-44 w-full object-cover sm:h-40 lg:h-44"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/58 via-black/16 to-transparent"></div>
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
									src={withAsset('/images/Umgebung/summer-lake.png')}
									alt={$t('guestcard.experiences.wellness.card2.alt')}
									class="h-44 w-full object-cover sm:h-40 lg:h-44"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/58 via-black/16 to-transparent"></div>
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
									src={withAsset('/images/Umgebung/sauna.png')}
									alt={$t('guestcard.experiences.wellness.card3.alt')}
									class="h-44 w-full object-cover sm:h-40 lg:h-44"
									loading="lazy"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/58 via-black/16 to-transparent"></div>
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

			</section>
		</div>
	</div>

	<div class="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden">
		<div class="rounded-2xl border border-white/40 bg-white/75 shadow-[0_18px_50px_rgba(15,23,42,0.22)] backdrop-blur-xl ring-1 ring-slate-200/60">
			<div class="flex items-center justify-between px-3 py-2">
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white/70"
					onclick={() => scrollToSection(activeSectionId)}
				>
					<List class="h-4 w-4 text-brand" aria-hidden="true" />
					<span class="max-w-[55vw] truncate">{$t(activeSectionLabelKey)}</span>
				</button>
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
					onclick={() => (isMobileFilterOpen = true)}
				>
					<SlidersHorizontal class="h-4 w-4" aria-hidden="true" />
					{$t('experiences.nav.filters')}
					{#if selectedActivity}
						<span class="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">1</span>
					{/if}
				</button>
			</div>
		</div>
	</div>

	{#if isMobileFilterOpen}
		<button
			type="button"
			class="fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-[2px]"
			onclick={() => (isMobileFilterOpen = false)}
			aria-label="Filter schließen"
		></button>
		<div
			class="fixed inset-x-0 bottom-0 z-[100] rounded-t-3xl border border-white/20 bg-white p-4 shadow-2xl"
		>
			<div class="flex items-center justify-between">
				<p class="text-sm font-semibold text-slate-900">{$t('experiences.nav.filters')}</p>
				<button
					type="button"
					class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600"
					onclick={() => (isMobileFilterOpen = false)}
					aria-label="Filter schließen"
				>
					<X class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>

			<div class="mt-3 flex flex-wrap gap-2">
				{#each activityFilters as filter}
					<button
						type="button"
						class={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
							selectedActivity === filter.id
								? 'bg-brand text-white'
								: 'border border-slate-200 bg-white text-slate-700'
						}`}
						onclick={() => (selectedActivity = selectedActivity === filter.id ? null : filter.id)}
						aria-pressed={selectedActivity === filter.id}
					>
						<filter.icon class="h-4 w-4" aria-hidden="true" />
						{$t(filter.labelKey)}
					</button>
				{/each}
			</div>

			<div class="mt-4 flex gap-2">
				<button
					type="button"
					class="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800"
					onclick={() => (selectedActivity = null)}
				>
					{$t('experiences.nav.reset')}
				</button>
				<button
					type="button"
					class="flex-1 rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white"
					onclick={() => (isMobileFilterOpen = false)}
				>
					{$t('experiences.nav.apply')}
				</button>
			</div>
		</div>
	{/if}

	{#if isNassfeldModalOpen}
		<div
			class="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/65 p-2 backdrop-blur-[2px] sm:items-center sm:p-6"
			role="presentation"
			onclick={onNassfeldBackdropClick}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="nassfeld-modal-title"
				class="w-full max-w-4xl max-h-[95dvh] overflow-y-auto overscroll-contain rounded-2xl border border-white/20 bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl"
			>
				<div class="grid grid-rows-[auto,1fr] md:grid-cols-[1.05fr,0.95fr] md:grid-rows-1">
					<div class="relative min-h-[210px] max-h-[34dvh] md:min-h-full md:max-h-none">
						<img
							src={withAsset('/images/Umgebung/ski_nassfeld.jpg')}
							alt="Skifahren am Nassfeld"
							class="h-full w-full object-cover object-center"
						/>
						<div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4 text-white sm:p-5">
							<p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Winter Highlight</p>
							<h3 class="mt-1 text-xl font-semibold sm:text-2xl">Nassfeld: Sun Ski World</h3>
						</div>
					</div>

					<div class="flex min-h-0 flex-col p-4 sm:p-7">
						<div
							class="sticky top-0 z-10 -mx-4 -mt-1 mb-2 flex items-start justify-between gap-3 border-b border-slate-100 bg-white/95 px-4 py-2 backdrop-blur-sm sm:static sm:m-0 sm:border-0 sm:bg-transparent sm:p-0"
						>
							<div>
								<p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Skigebiet</p>
								<h2 id="nassfeld-modal-title" class="mt-1 text-2xl font-semibold leading-tight text-slate-900">
									Nassfeld Informationen
								</h2>
							</div>
							<button
								type="button"
								class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:h-10 sm:w-10"
								onclick={closeNassfeldModal}
								aria-label="Modal schließen"
							>
								<X class="h-5 w-5" aria-hidden="true" />
							</button>
						</div>

						<p class="mt-3 text-[15px] leading-relaxed text-slate-600 sm:mt-4 sm:text-sm">
							Perfekt für einen aktiven Tag im Schnee: kurze Anfahrt, viele Pisten und starke Infrastruktur direkt im Grenzgebiet Kärnten/Tirol.
						</p>

						<div class="mt-4 space-y-4 sm:mt-5">
							<div>
								<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Highlights</p>
								<ul class="mt-2 space-y-1.5 text-[15px] leading-7 text-slate-700 sm:text-sm sm:leading-relaxed">
									{#each nassfeldFacts as fact}
										<li>• {fact}</li>
									{/each}
								</ul>
							</div>

							<div>
								<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Gut zu wissen</p>
								<ul class="mt-2 space-y-1.5 text-[15px] leading-7 text-slate-700 sm:text-sm sm:leading-relaxed">
									{#each nassfeldTips as tip}
										<li>• {tip}</li>
									{/each}
								</ul>
							</div>
						</div>

						<div class="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
							<a
								href="https://www.nassfeld.at/"
								target="_blank"
								rel="noreferrer"
								class="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 sm:justify-start"
							>
								Nassfeld Website
								<ArrowRight class="h-4 w-4" aria-hidden="true" />
							</a>
							<a
								href={resolve('/buchen')}
								class="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 sm:justify-start"
							>
								Unterkunft buchen
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	.nav-glass-sheen {
		position: absolute;
		inset: -40% -30%;
		background:
			radial-gradient(600px 380px at 20% 10%, rgba(255, 255, 255, 0.55), transparent 60%),
			radial-gradient(520px 360px at 90% 30%, rgba(255, 255, 255, 0.25), transparent 55%);
		transform: rotate(8deg);
		opacity: 0.55;
	}

	.nav-indicator {
		position: absolute;
		left: 0;
		right: 0;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.28);
		border: 1px solid rgba(255, 255, 255, 0.28);
		box-shadow: 0 10px 26px rgba(15, 23, 42, 0.1);
		backdrop-filter: blur(14px);
	}

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

	.destination-card {
		width: 100%;
		border-radius: 1rem;
		border: 1px solid rgb(226 232 240);
		background: white;
		padding: 1.25rem;
		box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.08);
		transition:
			transform 300ms,
			box-shadow 300ms,
			border-color 300ms;
	}

	.destination-card:hover {
		transform: translateY(-0.25rem);
		border-color: rgba(247, 171, 0, 0.35);
		box-shadow: 0 14px 28px -18px rgba(15, 23, 42, 0.34);
	}
</style>

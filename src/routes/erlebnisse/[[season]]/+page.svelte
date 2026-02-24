<script lang="ts">
	import { lang, t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import {
		activityFilters,
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
		BusFront,
		List,
		Menu,
		Mountain,
		PartyPopper,
		Snowflake,
		Sparkles,
		SlidersHorizontal,
		Sun,
		Ticket,
		Waves,
		X,
	} from 'lucide-svelte';

	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	type NavMode = 'compact' | 'peek';
	type LocalizedText = { de: string; en: string };

	const withAsset = (path: string) => asset(path);
	const localize = (value?: LocalizedText) => (value ? value[$lang] : '');

	// get active tab from url param (default: summer)
	const seoSeasonFromUrl = $derived.by(() => {
		const season = page.params.season;
		if (season === 'winter') return 'winter';
		if (season === 'sommer' || season === 'summer') return 'summer';
		return null;
	});

	const seasonFromUrl = $derived.by(() => {
		const season = seoSeasonFromUrl;
		if (season) return season;
		return 'summer';
	});

	let activeTab = $state<SeasonKey>('summer');
	let activeHighlightsSeason = $state<SeasonKey>('summer');
	let selectedActivity = $state<ActivityFilterKey | null>(null);
	let showAllSeasons = $state(true);
	let activeSectionId = $state('aktivitaeten');
	let isMobileFilterOpen = $state(false);
	let isMobileNavOpen = $state(false);
	let navMode = $state<NavMode>('compact');
	let navListEl = $state<HTMLDivElement | null>(null);
	const btnEls = new Map<string, HTMLButtonElement>();
	const indicatorTop = tweened(0, { duration: 420, easing: cubicOut });
	const indicatorHeight = tweened(40, { duration: 420, easing: cubicOut });
	let indicatorVisible = $state(false);
	let scrollCollapseTimer: number | null = null;
	let highlightObserver: IntersectionObserver | null = null;
	let lastMobileNavPointerAt = 0;
	let manualTabUntil = 0;
	const ICON_SLOT = 'h-11 w-11 rounded-2xl grid place-items-center shrink-0';
	const ICON_SIZE = 'h-5 w-5';
	const ROW_BASE = 'w-full rounded-2xl transition duration-200';
	const ROW_PEEK = 'min-h-[48px] px-3 py-2 flex items-center gap-3';
	const ROW_COMPACT = 'mt-3 h-12 w-12 grid place-items-center';

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
		if (!seoSeasonFromUrl) {
			return {
				titleKey: 'experiences.seo.title',
				descriptionKey: 'experiences.seo.description',
			};
		}

		const isWinter = seoSeasonFromUrl === 'winter';

		return {
			titleKey: isWinter ? 'experiences.seo.winter.title' : 'experiences.seo.summer.title',
			descriptionKey: isWinter
				? 'experiences.seo.winter.description'
				: 'experiences.seo.summer.description',
		};
	});

	const navActiveSectionId = $derived(activeSectionId === 'highlights' ? '' : activeSectionId);

	const activeSectionLabelKey = $derived.by(() => {
		if (activeSectionId === 'highlights') {
			return activeHighlightsSeason === 'winter' ? 'experiences.nav.winter' : 'experiences.nav.summer';
		}
		const match = sectionTrackingLinks.find((section) => section.id === activeSectionId);
		return match?.labelKey ?? 'experiences.nav.title';
	});

	const guestCardLinks = {
		benefitsOverview:
			'https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic',
		brochure: 'https://www.nassfeld.at/PDFs/NPS/Gaestekarten/BasisCard_Broschuere.pdf',
	};
	const guestCardVisual = $derived.by(() =>
		activeTab === 'winter'
			? {
					src: '/images/Umgebung/nassfeld-lift.jpg',
					altKey: 'experiences.guestcard.imageAlt.winter',
				}
			: {
					src: '/images/Umgebung/ski_nassfeld.jpg',
					altKey: 'experiences.guestcard.imageAlt.summer',
				}
	);

	const sectionIconById: Record<string, any> = {
		aktivitaeten: Mountain,
		highlights: Sparkles,
		'traditionelle-feste': PartyPopper,
		gaestecard: Ticket,
	};

	function onWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			if (isMobileFilterOpen) isMobileFilterOpen = false;
			if (isMobileNavOpen) isMobileNavOpen = false;
		}
	}

	function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
		const scrollNow = () => {
			const el = document.getElementById(id);
			if (!el) return false;
			const topOffset = window.innerWidth < 1024 ? 92 : 28;
			const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - topOffset);
			window.scrollTo({ top: y, behavior });
			return true;
		};

		if (scrollNow()) return true;
		window.setTimeout(() => {
			scrollNow();
		}, 120);
		return false;
	}

	function openMobileNav() {
		isMobileFilterOpen = false;
		isMobileNavOpen = true;
	}

	function closeMobileNav() {
		isMobileNavOpen = false;
	}

	function onMobileNavSelect(id: string) {
		scrollToSection(id);
		closeMobileNav();
		window.setTimeout(() => {
			scrollToSection(id);
		}, 120);
	}

	function onMobileNavPointerUp(event: PointerEvent, id: string) {
		event.preventDefault();
		event.stopPropagation();
		lastMobileNavPointerAt = Date.now();
		onMobileNavSelect(id);
	}

	function onMobileNavClick(event: MouseEvent, id: string) {
		if (Date.now() - lastMobileNavPointerAt < 350) return;
		event.stopPropagation();
		onMobileNavSelect(id);
	}

	function scrollToSeasonHighlightsFromUrl() {
		const targetId = seasonFromUrl === 'winter' ? 'highlights-winter' : 'highlights-summer';
		scrollToSection(targetId, 'auto');
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
		setNavMode('compact');
	}

	function onNavFocusIn() {
		setNavMode('peek');
	}

	function onNavFocusOut() {
		setNavMode('compact');
	}

	function onWindowScroll() {
		updateActiveSectionFromViewport();
		setNavMode('compact');
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

	function reveal(node: HTMLElement, opts?: { once?: boolean; rootMargin?: string }) {
		const once = opts?.once ?? true;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.classList.add('is-revealed');
					if (once) io.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: opts?.rootMargin ?? '0px 0px -10% 0px' }
		);
		io.observe(node);
		return {
			destroy() {
				io.disconnect();
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
	<div class="pointer-events-none fixed left-6 top-36 z-40">
		<div
			class={`pointer-events-auto origin-top-left transition-all duration-300 ease-out ${
				isPeek ? 'w-[240px]' : 'w-[60px]'
			}`}
			role="group"
			aria-label={$t('experiences.nav.title')}
			onmouseenter={onNavEnter}
			onmouseleave={onNavLeave}
			onfocusin={onNavFocusIn}
			onfocusout={onNavFocusOut}
		>
			<div
				class="relative rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-slate-200/70 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-shadow duration-300 hover:shadow-[0_16px_38px_rgba(15,23,42,0.14)]"
			>
				<div class={`flex items-center ${isPeek ? 'gap-2 px-3 py-3' : 'justify-center px-3 py-3'}`}>
					<button
						type="button"
						class={`group relative grid ${isPeek ? 'h-12 w-12' : ROW_COMPACT} place-items-center leading-none rounded-2xl transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
							isPeek
								? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm hover:shadow-md'
								: 'bg-white/80 text-slate-800 ring-1 ring-slate-200/80 hover:bg-white hover:shadow-sm'
						}`}
						aria-label={isPeek ? 'Navigation schließen' : 'Navigation öffnen'}
						aria-expanded={isPeek}
						onclick={() => setNavMode(isPeek ? 'compact' : 'peek')}
					>
						{#if isPeek}
							<span class="pointer-events-none absolute inset-0 rounded-2xl bg-brand/10"></span>
						{/if}
						{#if isPeek}
							<X class="relative h-5 w-5" aria-hidden="true" />
						{:else}
							<Menu class="relative h-5 w-5" aria-hidden="true" />
						{/if}
					</button>
					<div
						class={`min-w-0 transition-all duration-300 ease-out ${
							isPeek
								? 'translate-x-0 opacity-100'
								: 'pointer-events-none w-0 -translate-x-1 overflow-hidden opacity-0'
						}`}
					>
						<p class="truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
							{$t('experiences.nav.kicker')}
						</p>
						<p class="truncate text-[13px] font-semibold text-slate-900">
							{$t('experiences.nav.title')}
						</p>
					</div>
				</div>

				<nav class="relative mt-3 px-2 pb-2">
					<div bind:this={navListEl} class={`relative ${isPeek ? 'pl-3' : ''}`}>
						{#if indicatorVisible && isPeek}
							<div
								class="nav-indicator"
								style={`transform: translateY(${$indicatorTop}px); height: ${$indicatorHeight}px;`}
								aria-hidden="true"
							></div>
						{/if}
						{#each sectionLinks as section}
							{@const SectionIcon = sectionIconById[section.id] ?? List}
							<div class="relative z-10">
								<button
									use:sectionBtn={section.id}
									type="button"
									class={`group ${ROW_BASE} ${isPeek ? ROW_PEEK : ROW_COMPACT} ${
										isPeek
											? navActiveSectionId === section.id
												? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm'
												: 'text-slate-700 hover:bg-white/70'
											: navActiveSectionId === section.id
												? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm'
												: 'bg-transparent text-slate-700 hover:bg-white/60'
									}`}
									onclick={() => scrollToSection(section.id)}
									aria-label={$t(section.labelKey)}
									aria-current={navActiveSectionId === section.id ? 'page' : undefined}
									title={$t(section.labelKey)}
								>
									<span
										class={`${ICON_SLOT} ${
											navActiveSectionId === section.id
												? 'bg-brand/12 text-brand ring-1 ring-brand/25 shadow-[0_6px_16px_rgba(15,23,42,0.10)]'
												: 'bg-white/70 text-slate-700 ring-1 ring-slate-200/70 group-hover:bg-white'
										}`}
									>
										<SectionIcon class={ICON_SIZE} aria-hidden="true" />
									</span>

									{#if isPeek}
										<span class="truncate text-[13px] font-semibold">
											{$t(section.labelKey)}
										</span>
									{/if}
								</button>

								{#if section.id === 'aktivitaeten'}
									<div class={`${isPeek ? 'pl-6 mt-1 space-y-2' : 'mt-1'}`}>
										<button
											type="button"
											class={`group ${ROW_BASE} ${isPeek ? ROW_PEEK : ROW_COMPACT} ${
												isPeek
													? activeSectionId === 'highlights' && activeHighlightsSeason === 'summer'
														? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm'
														: 'text-slate-700 hover:bg-white/70'
													: activeSectionId === 'highlights' && activeHighlightsSeason === 'summer'
														? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm'
														: 'bg-transparent text-slate-700 hover:bg-white/60'
											}`}
											onclick={() => scrollToSection('highlights-summer')}
											aria-label={$t('experiences.nav.summer')}
											title={$t('experiences.nav.summer')}
										>
											<span
												class={`${ICON_SLOT} ${
													activeSectionId === 'highlights' && activeHighlightsSeason === 'summer'
														? 'bg-brand/12 text-brand ring-1 ring-brand/25 shadow-[0_6px_16px_rgba(15,23,42,0.10)]'
														: 'bg-white/70 text-slate-700 ring-1 ring-slate-200/70 group-hover:bg-white'
												}`}
											>
												<Sun class={`${ICON_SIZE} shrink-0`} aria-hidden="true" />
											</span>
											{#if isPeek}
												<span class="truncate text-[13px] font-semibold">{$t('experiences.nav.summer')}</span>
											{/if}
										</button>
										<button
											type="button"
											class={`group ${ROW_BASE} ${isPeek ? ROW_PEEK : ROW_COMPACT} ${
												isPeek
													? activeSectionId === 'highlights' && activeHighlightsSeason === 'winter'
														? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm'
														: 'text-slate-700 hover:bg-white/70'
													: activeSectionId === 'highlights' && activeHighlightsSeason === 'winter'
														? 'bg-white text-slate-900 ring-1 ring-brand/20 shadow-sm'
														: 'bg-transparent text-slate-700 hover:bg-white/60'
											}`}
											onclick={() => scrollToSection('highlights-winter')}
											aria-label={$t('experiences.nav.winter')}
											title={$t('experiences.nav.winter')}
										>
											<span
												class={`${ICON_SLOT} ${
													activeSectionId === 'highlights' && activeHighlightsSeason === 'winter'
														? 'bg-brand/12 text-brand ring-1 ring-brand/25 shadow-[0_6px_16px_rgba(15,23,42,0.10)]'
														: 'bg-white/70 text-slate-700 ring-1 ring-slate-200/70 group-hover:bg-white'
												}`}
											>
												<Snowflake class={`${ICON_SIZE} shrink-0`} aria-hidden="true" />
											</span>
											{#if isPeek}
												<span class="truncate text-[13px] font-semibold">{$t('experiences.nav.winter')}</span>
											{/if}
										</button>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</nav>

				{#if isPeek}
					<div class="border-t border-black/5 px-4 py-4">
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
						<div class="mt-2 grid grid-cols-1 justify-items-start gap-1.5">
							{#each activityFilters as filter}
								<button
									type="button"
									class={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold transition duration-200 hover:-translate-y-0.5 ${
										selectedActivity === filter.id
											? 'border-brand bg-brand text-white shadow-sm'
											: 'border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-50 hover:border-brand/30 hover:shadow-sm'
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
					<h1 class="mt-3 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
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
								<div class="mx-auto w-full max-w-6xl px-0 sm:px-0 lg:px-0">
									<article
										data-season={summerFeaturedEvent.season}
										class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
									>
										<div class="relative aspect-[16/10] sm:min-h-[420px] lg:h-[min(65dvh,650px)]">
											<img
												src={withAsset(summerFeaturedEvent.image)}
												alt={`${localize(summerFeaturedEvent.title)} – ${localize(summerFeaturedEvent.kicker)}`}
												class={`absolute inset-0 block h-full w-full object-cover transition-transform duration-700 will-change-transform} object-left scale-[1.12] group-hover:scale-[1.14]`}
												loading="lazy"
											/>											

											{#if summerFeaturedEvent.badge}
												<span
													class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
												>
													{localize(summerFeaturedEvent.badge)}
												</span>
											{/if}

											<div
												class="hidden sm:absolute sm:inset-x-0 sm:bottom-0 sm:block sm:px-6 sm:pb-6 sm:pt-6"
											>
												<div
													class="relative max-w-[86%] rounded-2xl border border-white/25 bg-white/16 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-md sm:max-w-2xl sm:p-6"
												>
													<div class="overflow-visible pr-0 sm:overflow-visible sm:pr-0">
														<p
															class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
														>
															<summerFeaturedEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
															{localize(summerFeaturedEvent.kicker)}
														</p>
														<h3
															class={`mt-2 font-semibold text-white ${summerFeaturedEvent.titleSize ?? 'text-xl'}`}
														>
															{localize(summerFeaturedEvent.title)}
														</h3>
														{#if summerFeaturedEvent.description}
															<p class="mt-2 max-w-xl text-sm text-white/85">
																{localize(summerFeaturedEvent.description)}
															</p>
														{/if}
														{#if summerFeaturedEvent.meta?.length}
															<div class="mt-3 flex flex-wrap gap-2">
																{#each summerFeaturedEvent.meta as meta}
																	<span
																		class="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white sm:px-3 sm:text-xs"
																	>
																		{localize(meta)}
																	</span>
																{/each}
															</div>
														{/if}
													</div>
												</div>
											</div>
										</div>
										<div class="p-3 sm:hidden">
											<div class="max-w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
												<p
													class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
												>
													<summerFeaturedEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
													{localize(summerFeaturedEvent.kicker)}
												</p>
												<h3
													class={`mt-2 font-semibold text-slate-900 ${summerFeaturedEvent.titleSize ?? 'text-xl'}`}
												>
													{localize(summerFeaturedEvent.title)}
												</h3>
												{#if summerFeaturedEvent.description}
													<p class="mt-2 max-w-xl text-sm text-slate-600">
														{localize(summerFeaturedEvent.description)}
													</p>
												{/if}
												{#if summerFeaturedEvent.meta?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each summerFeaturedEvent.meta as meta}
															<span
																class="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
															>
																{localize(meta)}
															</span>
														{/each}
													</div>
												{/if}
											</div>
										</div>
									</article>
								</div>
							{/if}
							<div class="mt-6">
								<div class="divide-y divide-slate-200/70">
									{#each summerSecondaryEvents as event, i (event.id)}
										<article
											use:reveal
											data-season={event.season}
											class="reveal group grid gap-6 py-8 transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_18px_30px_rgba(15,23,42,0.10)] sm:grid-cols-[240px,1fr] lg:grid-cols-[320px,1fr] lg:items-center"
											style={`--reveal-delay: ${i * 70}ms;`}
										>
											<div
												class={`relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] ${
													i % 2 === 1 ? 'sm:order-2' : ''
												}`}
											>
												<img
													src={withAsset(event.image)}
													alt={`${localize(event.title)} – ${localize(event.kicker)}`}
													class={`h-full w-full object-center transition duration-700 will-change-transform object-cover group-hover:scale-[1.03] group-hover:saturate-[1.06]`}
													loading="lazy"
												/>

												{#if event.badge}
													<span
														class="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur"
													>
														{localize(event.badge)}
													</span>
												{/if}
											</div>

											<div class={`min-w-0 ${i % 2 === 1 ? 'sm:pr-6' : 'sm:pl-6'}`}>
												<p
													class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
												>
													<event.icon class="h-4 w-4" aria-hidden="true" />
													{localize(event.kicker)}
												</p>

												<h3 class="mt-1 text-xl font-semibold leading-tight text-slate-900">
													<span
														class="bg-gradient-to-r from-slate-900 to-slate-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]"
													>
														{localize(event.title)}
													</span>
												</h3>

												{#if event.description}
													<p class="mt-2 text-sm leading-relaxed text-slate-600">
														{localize(event.description)}
													</p>
												{/if}

												{#if event.meta?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each event.meta as meta}
															<span
																class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
															>
																{localize(meta)}
															</span>
														{/each}
													</div>
												{/if}

												<div class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
													Mehr erfahren
													<span
														class="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition group-hover:translate-x-1 group-hover:shadow-md"
													>
														<ArrowRight
															class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
															aria-hidden="true"
														/>
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
								<div class="mx-auto w-full max-w-6xl px-0 sm:px-0 lg:px-0">
									<article
										data-season={winterFeaturedEvent.season}
										class={`group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${
											winterFeaturedEvent.id === 'winter-ski' ? 'cursor-pointer' : ''
										}`}
									>
										<div class="relative aspect-[16/10] sm:min-h-[420px] lg:h-[min(72dvh,720px)]">
											<img
												src={withAsset(winterFeaturedEvent.image)}
												alt={`${localize(winterFeaturedEvent.title)} – ${localize(winterFeaturedEvent.kicker)}`}
												class="absolute inset-0 h-full w-full scale-[1.05] object-cover object-center transition-transform duration-700 will-change-transform group-hover:scale-[1.07]"
												loading="lazy"
											/>

											{#if winterFeaturedEvent.badge}
												<span
													class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
												>
													{localize(winterFeaturedEvent.badge)}
												</span>
											{/if}

											<div
												class="hidden sm:absolute sm:inset-x-0 sm:bottom-0 sm:block sm:px-6 sm:pb-6 sm:pt-6"
											>
												<div
													class="relative max-w-[86%] rounded-2xl border border-white/25 bg-white/16 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.16)] backdrop-blur-md sm:max-w-2xl sm:p-6"
												>
													<div class="overflow-visible pr-0 sm:overflow-visible sm:pr-0">
														<p
															class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
														>
															<winterFeaturedEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
															{localize(winterFeaturedEvent.kicker)}
														</p>
														<h3
															class={`mt-2 font-semibold text-white ${winterFeaturedEvent.titleSize ?? 'text-xl'}`}
														>
															{localize(winterFeaturedEvent.title)}
														</h3>
														{#if winterFeaturedEvent.description}
															<p class="mt-2 max-w-xl text-sm text-white/85">
																{localize(winterFeaturedEvent.description)}
															</p>
														{/if}
														{#if winterFeaturedEvent.meta?.length}
															<div class="mt-3 flex flex-wrap gap-2">
																{#each winterFeaturedEvent.meta as meta}
																	<span
																		class="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white sm:px-3 sm:text-xs"
																	>
																		{localize(meta)}
																	</span>
																{/each}
															</div>
														{/if}
													</div>
												</div>
											</div>
										</div>
										<div class="p-3 sm:hidden">
											<div class="max-w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
												<p
													class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
												>
													<winterFeaturedEvent.icon class="h-4 w-4 text-brand" aria-hidden="true" />
													{localize(winterFeaturedEvent.kicker)}
												</p>
												<h3
													class={`mt-2 font-semibold text-slate-900 ${winterFeaturedEvent.titleSize ?? 'text-xl'}`}
												>
													{localize(winterFeaturedEvent.title)}
												</h3>
												{#if winterFeaturedEvent.description}
													<p class="mt-2 max-w-xl text-sm text-slate-600">
														{localize(winterFeaturedEvent.description)}
													</p>
												{/if}
												{#if winterFeaturedEvent.meta?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each winterFeaturedEvent.meta as meta}
															<span
																class="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
															>
																{localize(meta)}
															</span>
														{/each}
													</div>
												{/if}
											</div>
										</div>
									</article>
								</div>
							{/if}
							<div class="mt-6">
								<div class="divide-y divide-slate-200/70">
									{#each winterSecondaryEvents as event, i (event.id)}
										<article
											use:reveal
											data-season={event.season}
											class="reveal group grid gap-6 py-8 transition duration-300 hover:-translate-y-0.5 hover:drop-shadow-[0_18px_30px_rgba(15,23,42,0.10)] sm:grid-cols-[240px,1fr] lg:grid-cols-[320px,1fr] lg:items-center"
											style={`--reveal-delay: ${i * 70}ms;`}
										>
											<div
												class={`relative w-full overflow-hidden rounded-2xl bg-slate-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10] ${
													i % 2 === 1 ? 'sm:order-2' : ''
												}`}
											>
												<img
													src={withAsset(event.image)}
													alt={`${localize(event.title)} – ${localize(event.kicker)}`}
													class={`h-full w-full object-center transition duration-700 will-change-transform ${
														event.id === 'winter-hike'
															? 'object-cover object-[center_58%] group-hover:scale-[1.02] group-hover:saturate-[1.06]'
															: 'object-cover group-hover:scale-[1.03] group-hover:saturate-[1.06]'
													}`}
													loading="lazy"
												/>
												{#if event.badge}
													<span
														class="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-800 backdrop-blur"
													>
														{localize(event.badge)}
													</span>
												{/if}
											</div>

											<div class={`min-w-0 ${i % 2 === 1 ? 'sm:pr-6' : 'sm:pl-6'}`}>
												<p
													class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand"
												>
													<event.icon class="h-4 w-4" aria-hidden="true" />
													{localize(event.kicker)}
												</p>

												<h3 class="mt-1 text-xl font-semibold leading-tight text-slate-900">
													<span
														class="bg-gradient-to-r from-slate-900 to-slate-700 bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]"
													>
														{localize(event.title)}
													</span>
												</h3>

												{#if event.description}
													<p class="mt-2 text-sm leading-relaxed text-slate-600">
														{localize(event.description)}
													</p>
												{/if}

												{#if event.meta?.length}
													<div class="mt-3 flex flex-wrap gap-2">
														{#each event.meta as meta}
															<span
																class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
															>
																{localize(meta)}
															</span>
														{/each}
													</div>
												{/if}

												<div class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
													Mehr erfahren
													<span
														class="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition group-hover:translate-x-1 group-hover:shadow-md"
													>
														<ArrowRight
															class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
															aria-hidden="true"
														/>
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

				<section class="anchor-target bg-[#fbfaf7] py-14 sm:py-16" id="traditionelle-feste">
					<div class="mx-auto w-full max-w-6xl px-4 sm:px-6">
						<div class="mx-auto max-w-3xl text-center">
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Lokale Empfehlung</p>
							<h2 class="mt-3 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
								Traditionelle Feste im Gitschtal
							</h2>
							<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
							<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
								Erleben Sie, was vor Ort wirklich gelebt wird: echte Begegnungen, regionale Küche und
								gelebtes Brauchtum im Jahreslauf.
							</p>
						</div>

						<div class="mt-10 grid gap-4 md:grid-cols-3">
							<article
								use:reveal
								class="reveal group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
								style="--reveal-delay: 0ms;"
							>
								<div
									class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								>
									<div class="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-brand/10 blur-2xl"></div>
									<div
										class="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-amber-200/30 blur-2xl"
									></div>
								</div>

								<p class="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
									Dorffeste
								</p>

								<div class="relative mt-3 flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
										<span class="text-lg" aria-hidden="true">🎉</span>
									</div>
									<div class="min-w-0">
										<h3 class="text-xl font-semibold leading-tight text-slate-900">Dorffeste</h3>
										<p class="mt-2 text-sm leading-relaxed text-slate-600">
											Kleine Feste mit Musik, Begegnungen und echter Dorfatmosphäre - ideal, um das Gitschtal
											abseits klassischer Ausflüge kennenzulernen.
										</p>
									</div>
								</div>

								<ul class="relative mt-5 space-y-2 text-sm text-slate-700">
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Kuhfladentombola (Weißbriach) - Kult & Schmäh
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Feuerwehrfest / Zeltfest - Musik & Stimmung
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Frühschoppen - gemütlich, regional, echt
									</li>
								</ul>

								<div
									class="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800"
								>
									Tipp: ideal im Sommer
									<span
										class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
									>
										Juni-August
									</span>
								</div>
							</article>

							<article
								use:reveal
								class="reveal group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
								style="--reveal-delay: 90ms;"
							>
								<div
									class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								>
									<div
										class="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-emerald-200/30 blur-2xl"
									></div>
									<div
										class="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-brand/10 blur-2xl"
									></div>
								</div>

								<p class="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
									Kulinarische Feste
								</p>

								<div class="relative mt-3 flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
										<span class="text-lg" aria-hidden="true">🥬</span>
									</div>
									<div class="min-w-0">
										<h3 class="text-xl font-semibold leading-tight text-slate-900">Kulinarische Feste</h3>
										<p class="mt-2 text-sm leading-relaxed text-slate-600">
											Regionale Spezialitäten, Produzenten aus der Umgebung und saisonale Genussmomente - vom
											Markt bis zur Festtafel.
										</p>
									</div>
								</div>

								<ul class="relative mt-5 space-y-2 text-sm text-slate-700">
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Krautfest (Weißbriach) - regional & herzhaft
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Bauern- & Handwerksstände - echte Produkte
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Herbstgenuss - perfekt für Wanderer & Genießer
									</li>
								</ul>

								<div
									class="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800"
								>
									Tipp: ideal im Herbst
									<span
										class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
									>
										Sep-Okt
									</span>
								</div>
							</article>

							<article
								use:reveal
								class="reveal group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
								style="--reveal-delay: 180ms;"
							>
								<div
									class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								>
									<div
										class="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-indigo-200/25 blur-2xl"
									></div>
									<div
										class="absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-brand/10 blur-2xl"
									></div>
								</div>

								<p class="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-brand">
									Tradition & Brauchtum
								</p>

								<div class="relative mt-3 flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
										<span class="text-lg" aria-hidden="true">🎺</span>
									</div>
									<div class="min-w-0">
										<h3 class="text-xl font-semibold leading-tight text-slate-900">Tradition & Brauchtum</h3>
										<p class="mt-2 text-sm leading-relaxed text-slate-600">
											Alte Bräuche, Musik und gelebte Kultur machen den Aufenthalt besonders - und geben einen
											echten Einblick in die Region.
										</p>
									</div>
								</div>

								<ul class="relative mt-5 space-y-2 text-sm text-slate-700">
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Kirchtag (Weißbriach) - Tracht, Musik & Tanz
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Alm- & Almkirchtage - klein, urig, wunderschön
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Advent im Tal - ruhig, stimmungsvoll, regional
									</li>
								</ul>

								<div
									class="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800"
								>
									Tipp: das ganze Jahr
									<span
										class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
									>
										Saisonabhängig
									</span>
								</div>
							</article>
						</div>
					</div>
				</section>

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
			</section>

			<div class="mx-auto mt-10 w-full max-w-6xl px-1 sm:mt-14">
				<div class="h-px w-full bg-gradient-to-r from-transparent via-brand/45 to-transparent"></div>
			</div>

			<section class="anchor-target mt-12 sm:p-10" id="gaestecard">
				<div class="mx-auto max-w-3xl text-center">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						INKLUSIVE FÜR ÜBERNACHTUNGSGÄSTE
					</p>
					<h2 class="mt-3 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
						Urlaub genießen.<br />Mobil bleiben.<br />Alles inklusive.
					</h2>
					<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
						Mit der GästeCard Basic nutzen Sie Bus & Bahn kostenlos und entdecken die Region flexibel -
						ganz ohne Auto.
					</p>
				</div>

				<div class="mx-auto mt-10 max-w-6xl space-y-14">
					<div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
						<div class="grid lg:grid-cols-[0.45fr_0.55fr]">
							<div class="h-full">
								<img
									src={withAsset(guestCardVisual.src)}
									alt={$t(guestCardVisual.altKey)}
									class="aspect-[16/10] w-full rounded-none object-cover sm:aspect-[4/3] lg:h-full lg:aspect-auto"
									loading="lazy"
								/>
							</div>

							<div class="p-8 sm:p-10 lg:p-12">
								<p class="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
									GästeCard Basic inklusive
								</p>
								<h2 class="mt-4 font-serif text-3xl leading-[1.02] text-slate-900 sm:text-4xl">
									Ihre Vorteile auf einen Blick
								</h2>

								<div class="mt-5 flex flex-wrap gap-2">
									<span
										class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
									>
										Bus & Bahn gratis
									</span>
									<span
										class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
									>
										Vorteile ab 1. Nacht
									</span>
								</div>

								<p class="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
									Bei Ihrer Übernachtung im Gästehaus Rader ist die GästeCard Basic inklusive. Sie starten
									direkt in Mobilität, Erholung und Naturerlebnisse - ohne zusätzliche Planung.
								</p>

								<ul class="mt-7 space-y-2 text-sm text-slate-700">
									<li class="flex items-start gap-2">
										<span class="mt-2 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Bus & Bahn in Kärnten gratis nutzen
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-2 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Viele Freizeitvorteile ab der ersten Nacht
									</li>
									<li class="flex items-start gap-2">
										<span class="mt-2 h-1.5 w-1.5 rounded-full bg-brand"></span>
										Mehr Zeit für Urlaub statt Organisation
									</li>
								</ul>

								<div class="mt-6 flex flex-wrap items-center gap-3">
									<a
										href={guestCardLinks.benefitsOverview}
										target="_blank"
										rel="noreferrer"
										class="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
									>
										Alle Vorteile ansehen
										<ArrowRight class="h-4 w-4" aria-hidden="true" />
									</a>
									<a
										href={guestCardLinks.brochure}
										target="_blank"
										rel="noreferrer"
										class="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
									>
										Aktuelle Leistungsübersicht
									</a>
								</div>
							</div>
						</div>
					</div>

					<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
						<article
							use:reveal
							class="reveal group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
							style="--reveal-delay: 0ms;"
						>
							<img
								src={withAsset('/images/Umgebung/freibad.png')}
								alt="Bus und Bahn als flexible Mobilität ohne Auto"
								class="h-44 w-full object-cover"
								loading="lazy"
							/>
							<div class="flex flex-1 flex-col p-5">
								<div class="flex items-center gap-2">
									<BusFront class="h-4 w-4 text-brand" aria-hidden="true" />
									<h3 class="text-lg font-semibold text-slate-900">Flexibel unterwegs</h3>
								</div>
								<p class="mt-2 text-sm leading-relaxed text-slate-600">
									Kostenfreie Bus- und Bahnverbindungen bringen Sie bequem durch Kärnten - ideal für Ausflüge
									ohne Auto.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
										>Bus & Bahn gratis</span
									>
									<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
										>Ohne Parkplatzsuche</span
									>
								</div>
								<a
									href={guestCardLinks.benefitsOverview}
									target="_blank"
									rel="noreferrer"
									class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
								>
									Mehr erfahren
									<ArrowRight
										class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
										aria-hidden="true"
									/>
								</a>
							</div>
						</article>

						<article
							use:reveal
							class="reveal group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
							style="--reveal-delay: 90ms;"
						>
							<img
								src={withAsset('/images/Umgebung/sauna.png')}
								alt="Baden und Wellness mit Gästekarte-Vorteilen"
								class="h-44 w-full object-cover"
								loading="lazy"
							/>
							<div class="flex flex-1 flex-col p-5">
								<div class="flex items-center gap-2">
									<Waves class="h-4 w-4 text-brand" aria-hidden="true" />
									<h3 class="text-lg font-semibold text-slate-900">Baden & Wellness</h3>
								</div>
								<p class="mt-2 text-sm leading-relaxed text-slate-600">
									Freibäder, Seen und ausgewählte Wellness-Angebote machen aus jedem Urlaubstag einen
									entspannten Genießertag.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
										>Freibäder & Seen</span
									>
									<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
										>Sauna-Vorteile</span
									>
								</div>
								<a
									href={guestCardLinks.benefitsOverview}
									target="_blank"
									rel="noreferrer"
									class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
								>
									Mehr erfahren
									<ArrowRight
										class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
										aria-hidden="true"
									/>
								</a>
							</div>
						</article>

						<article
							use:reveal
							class="reveal group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none"
							style="--reveal-delay: 180ms;"
						>
							<img
								src={withAsset('/images/Umgebung/aussicht-vom-golz.jpg')}
								alt="Aktiv in der Natur am Nassfeld und im Gailtal"
								class="h-44 w-full object-cover"
								loading="lazy"
							/>
							<div class="flex flex-1 flex-col p-5">
								<div class="flex items-center gap-2">
									<Mountain class="h-4 w-4 text-brand" aria-hidden="true" />
									<h3 class="text-lg font-semibold text-slate-900">Aktiv & Natur</h3>
								</div>
								<p class="mt-2 text-sm leading-relaxed text-slate-600">
									Von Nassfeld bis Gailtal: Radwege, Bergmomente und geführte Naturerlebnisse für aktive
									Urlaubstage.
								</p>
								<div class="mt-4 flex flex-wrap gap-2">
									<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
										>Nassfeld Highlights</span
									>
									<span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
										>Naturprogramme</span
									>
								</div>
								<a
									href={guestCardLinks.benefitsOverview}
									target="_blank"
									rel="noreferrer"
									class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
								>
									Mehr erfahren
									<ArrowRight
										class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
										aria-hidden="true"
									/>
								</a>
							</div>
						</article>
					</div>

					<details class="group rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
						<summary
							class="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
						>
							<span>Alle Leistungen im Überblick</span>
							<ArrowRight
								class="h-4 w-4 transition-transform duration-300 group-open:rotate-90 motion-reduce:transition-none"
								aria-hidden="true"
							/>
						</summary>
						<div class="mt-4 grid gap-4 border-t border-slate-200 pt-4 sm:grid-cols-2">
							<div>
								<h3 class="text-sm font-semibold text-slate-900">Mobilität</h3>
								<ul class="mt-2 space-y-1.5 text-sm text-slate-600">
									<li>Regionale Buslinien im Gültigkeitsbereich inklusive</li>
									<li>ÖBB S-Bahn in Kärnten kostenfrei nutzbar</li>
									<li>Auch am An- und Abreisetag gültig</li>
								</ul>
							</div>
							<div>
								<h3 class="text-sm font-semibold text-slate-900">Wellness</h3>
								<ul class="mt-2 space-y-1.5 text-sm text-slate-600">
									<li>Ermäßigungen bei Freibädern in der Region</li>
									<li>Vorteile bei ausgewählten Saunen</li>
									<li>Seen und Naturbadeplätze schnell erreichbar</li>
								</ul>
							</div>
							<div>
								<h3 class="text-sm font-semibold text-slate-900">Draußen</h3>
								<ul class="mt-2 space-y-1.5 text-sm text-slate-600">
									<li>Vergünstigungen bei Berg- und Naturangeboten</li>
									<li>Geführte Naturerlebnisse saisonal verfügbar</li>
									<li>Rad- und Wandererlebnisse rund ums Gailtal</li>
								</ul>
							</div>
							<div>
								<h3 class="text-sm font-semibold text-slate-900">Kulinarik</h3>
								<ul class="mt-2 space-y-1.5 text-sm text-slate-600">
									<li>Vorteile bei regionalen Genuss-Partnern</li>
									<li>Ausgewählte Produzenten und Hofläden entdecken</li>
								</ul>
							</div>
						</div>
					</details>
				</div>
			</section>
		</div>
	</div>

	<div class="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden">
		<div
			class="rounded-2xl border border-white/40 bg-white/75 shadow-[0_18px_50px_rgba(15,23,42,0.22)] backdrop-blur-xl ring-1 ring-slate-200/60"
		>
			<div class="flex items-center justify-between px-3 py-2">
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white/70"
					onclick={openMobileNav}
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

	{#if isMobileNavOpen}
		<button
			type="button"
			class="fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-[2px]"
			onclick={closeMobileNav}
			aria-label="Navigation schließen"
		></button>
		<div
			class="fixed inset-x-0 bottom-0 z-[100] rounded-t-3xl border border-white/20 bg-white p-4 shadow-2xl"
		>
			<div class="flex items-center justify-between">
				<p class="text-sm font-semibold text-slate-900">{$t('experiences.nav.title')}</p>
				<button
					type="button"
					class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600"
					onclick={closeMobileNav}
					aria-label="Navigation schließen"
				>
					<X class="h-5 w-5" aria-hidden="true" />
				</button>
			</div>

			<div class="mt-3 space-y-2">
				{#each sectionLinks as section}
					{@const SectionIcon = sectionIconById[section.id] ?? List}
					<button
						type="button"
						class={`touch-manipulation flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${
							navActiveSectionId === section.id
								? 'bg-brand/10 text-slate-900 ring-1 ring-brand/25'
								: 'bg-slate-50 text-slate-700 hover:bg-white'
						}`}
						onpointerup={(event) => onMobileNavPointerUp(event, section.id)}
						onclick={(event) => onMobileNavClick(event, section.id)}
					>
						<span class="grid h-9 w-9 place-items-center rounded-xl bg-white ring-1 ring-slate-200">
							<SectionIcon class="h-4 w-4 text-brand" aria-hidden="true" />
						</span>
						{$t(section.labelKey)}
					</button>

					{#if section.id === 'aktivitaeten'}
						<div class="space-y-2 pl-4">
							<button
								type="button"
								class={`touch-manipulation flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
									activeSectionId === 'highlights' && activeHighlightsSeason === 'summer'
										? 'bg-brand/10 text-slate-900 ring-1 ring-brand/25'
										: 'bg-slate-50 text-slate-700 hover:bg-white'
								}`}
								onpointerup={(event) => onMobileNavPointerUp(event, 'highlights-summer')}
								onclick={(event) => onMobileNavClick(event, 'highlights-summer')}
							>
								<Sun class="h-4 w-4 text-brand" aria-hidden="true" />
								{$t('experiences.nav.summer')}
							</button>
							<button
								type="button"
								class={`touch-manipulation flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
									activeSectionId === 'highlights' && activeHighlightsSeason === 'winter'
										? 'bg-brand/10 text-slate-900 ring-1 ring-brand/25'
										: 'bg-slate-50 text-slate-700 hover:bg-white'
								}`}
								onpointerup={(event) => onMobileNavPointerUp(event, 'highlights-winter')}
								onclick={(event) => onMobileNavClick(event, 'highlights-winter')}
							>
								<Snowflake class="h-4 w-4 text-brand" aria-hidden="true" />
								{$t('experiences.nav.winter')}
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	{/if}

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
</main>

<style>
	.nav-indicator {
		position: absolute;
		left: 10px;
		width: 3px;
		border-radius: 999px;
		background: rgba(247, 171, 0, 0.9);
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

	.reveal {
		opacity: 0;
		transform: translateY(12px);
		filter: blur(2px);
		transition:
			opacity 600ms ease,
			transform 600ms ease,
			filter 600ms ease;
		transition-delay: var(--reveal-delay, 0ms);
		will-change: opacity, transform, filter;
	}

	.reveal.is-revealed {
		opacity: 1;
		transform: translateY(0);
		filter: blur(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal,
		.reveal.is-revealed {
			transition: none;
			transform: none;
			filter: none;
			opacity: 1;
		}
	}
</style>

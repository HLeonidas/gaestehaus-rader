<script lang="ts">
	import { browser } from '$app/environment';
	import { asset, resolve } from '$app/paths';
	import { lang, t } from '$lib/i18n';
	import {
		ArrowLeft,
		Bath,
		Coffee,
		Copy,
		Heart,
		MapPin,
		Mountain,
		Ruler,
		Refrigerator,
		Building2,
		MountainSnow,
		CookingPot,
		Sofa,
		Tv,
		Users,
		Share2,
		SquareParking,
		Star,
		Sun,
		Utensils,
		Wifi,
		Microwave,
	} from 'lucide-svelte';

	let { data } = $props();
	const accommodation = $derived.by(() => data.accommodation);

	const withAsset = (path: string) => asset(path);
	const siteUrl = 'https://rader-gitschtal.at';

	const amenityIcons = {
		wifi: Wifi,
		balcony: Sun,
		balkon: Sun,
		mountain: Mountain,
		coffee: Coffee,
		kitchen: Utensils,
		kueche: Utensils,
		kuehlschrank: Refrigerator,
		mikrowelle: Microwave,
		herd: CookingPot,
		fernseher: Tv,
		ausziehcouch: Sofa,
		badezimmer: Bath,
		parking: SquareParking,
	} as const;

	const galleryImages = $derived.by(() => [
		accommodation.images.main,
		...(accommodation.images.gallery ?? []),
	]);
	const roomUrl = $derived.by(() =>
		new URL(`${resolve('/unterkuenfte-preise')}/${accommodation.slug}`, siteUrl).toString()
	);
	const ogImage = $derived.by(() =>
		new URL(withAsset(accommodation.images.main), siteUrl).toString()
	);
	const amenityLabels = $derived.by(() =>
		accommodation.amenities.map((amenity) => $t(`amenity.${amenity}`))
	);
	const roomJsonLd = $derived.by(() =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'HotelRoom',
			name: accommodation.title,
			description: accommodation.detailBody[$lang],
			image: ogImage,
			url: roomUrl,
			offers: {
				'@type': 'Offer',
				price: accommodation.pricePerNightBase,
				priceCurrency: 'EUR',
				url: roomUrl,
				availability: 'https://schema.org/InStock',
			},
			amenityFeature: amenityLabels.map((name) => ({
				'@type': 'LocationFeatureSpecification',
				name,
				value: true,
			})),
		})
	);

	// helper for "+X Bilder" overlay
	const galleryCount = $derived.by(() => accommodation?.images?.gallery?.length ?? 0);
	const overlayMore = $derived.by(() => Math.max(0, galleryCount - 2));

	// reviews carousel UI-only
	let reviewIndex = $state(0);
	const visibleReviews = 3; // like screenshot
	const canPrev = $derived.by(() => reviewIndex > 0);
	const canNext = $derived.by(
		() => reviewIndex + visibleReviews < (accommodation?.reviews?.length ?? 0)
	);

	let galleryOpen = $state(false);
	let galleryIndex = $state(0);
	const canGalleryPrev = $derived.by(() => galleryIndex > 0);
	const canGalleryNext = $derived.by(() => galleryIndex < galleryImages.length - 1);
	let shareStatus = $state<'idle' | 'copied' | 'error'>('idle');

	const openGallery = (index: number) => {
		galleryIndex = index;
		galleryOpen = true;
	};

	const closeGallery = () => {
		galleryOpen = false;
	};

	const shareRoom = async () => {
		if (!browser) return;

		const shareUrl = roomUrl;
		const shareTitle = accommodation.title;
		const shareText = accommodation.subtitle[$lang];

		if (navigator.share) {
			try {
				await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
				return;
			} catch {
				shareStatus = 'error';
				return;
			}
		}

		if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(shareUrl);
				shareStatus = 'copied';
				setTimeout(() => {
					shareStatus = 'idle';
				}, 2000);
			} catch {
				shareStatus = 'error';
			}
		}
	};
</script>

<svelte:head>
	<title>{accommodation.title} - {$t('brand.name')}</title>
	<meta name="description" content={accommodation.subtitle[$lang]} />
	<meta property="og:title" content={accommodation.title} />
	<meta property="og:description" content={accommodation.subtitle[$lang]} />
	<meta property="og:type" content="product" />
	<meta property="og:url" content={roomUrl} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<script type="application/ld+json">
{roomJsonLd}
	</script>
</svelte:head>

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
		<section class="rounded-3xl bg-transparent">
			<!-- Back -->
			<a
				href={resolve('/unterkuenfte-preise')}
				class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand hover:opacity-90"
			>
				<ArrowLeft class="h-4 w-4" />{$t('room.detail.back')}</a>

			<!-- GALLERY -->
			<div class="mt-5 grid gap-4 lg:grid-cols-[1fr,340px]">
				<!-- Left big -->
				<button
					type="button"
					class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
					onclick={() => openGallery(0)}
				>
					<img
						src={withAsset(accommodation.images.main)}
						alt=""
						class="h-[220px] w-full object-cover sm:h-[320px] lg:h-[420px]"
						loading="lazy"
					/>
				</button>

				<!-- Right stack -->
				<div class="grid gap-4 grid-cols-2 lg:grid-cols-1">
					<button
						type="button"
						class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
						onclick={() => openGallery(1)}
					>
						<img
							src={withAsset(accommodation.images.gallery?.[0] ?? accommodation.images.main)}
							alt=""
							class="h-[120px] w-full object-cover sm:h-[160px] lg:h-[200px]"
							loading="lazy"
						/>
					</button>

					<button
						type="button"
						class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
						onclick={() => openGallery(2)}
					>
						<img
							src={withAsset(accommodation.images.gallery?.[1] ?? accommodation.images.main)}
							alt=""
							class="h-[120px] w-full object-cover sm:h-[160px] lg:h-[200px]"
							loading="lazy"
						/>

						{#if overlayMore > 0}
							<div class="absolute inset-0 bg-black/35"></div>
							<div class="absolute inset-0 grid place-items-center">
								<span
									class="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur"
								>
									+{overlayMore} {$t('room.detail.gallery.more')}
								</span>
							</div>
						{/if}
					</button>
				</div>
			</div>

			<!-- HEADER + SHARE -->
			<div class="mt-7 flex items-start justify-between gap-6">
				<div class="min-w-0">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand pb-3">{$t('brand.name')}</p>
					<h1 class="font-serif text-3xl leading-[0.95] text-slate-900 sm:text-5xl">
						{accommodation.title}
					</h1>
					<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
						{accommodation.subtitle[$lang]}
					</p>
				</div>

				<button
					type="button"
					class="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
					onclick={shareRoom}
					aria-live="polite"
				>
					<Share2 class="h-4 w-4" />
					{#if shareStatus === 'copied'}
						{$t('room.detail.shareCopied')}
					{:else}
						{$t('room.detail.share')}
					{/if}
				</button>
			</div>

			<!-- INFO CARDS (4) -->
			<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<div class="flex items-center gap-3">
						<span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Ruler class="h-5 w-5" />
						</span>
						<div>
							<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{$t('room.detail.info.size')}</p>
							<p class="mt-1 text-sm font-semibold text-slate-900">{accommodation.attributes.size}</p>
						</div>
					</div>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<div class="flex items-center gap-3">
						<span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Building2 class="h-5 w-5" />
						</span>
						<div>
							<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{$t('room.detail.info.floor')}</p>
							<p class="mt-1 text-sm font-semibold text-slate-900">{accommodation.attributes.floor}</p>
						</div>
					</div>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<div class="flex items-center gap-3">
						<span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<MountainSnow class="h-5 w-5" />
						</span>
						<div>
							<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{$t('room.detail.info.view')}</p>
							<p class="mt-1 text-sm font-semibold text-slate-900">
								{accommodation.attributes.view[$lang]}
							</p>
						</div>
					</div>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<div class="flex items-center gap-3">
						<span class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Users class="h-5 w-5" />
						</span>
						<div>
							<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">{$t('room.detail.info.guests')}</p>
							<p class="mt-1 text-sm font-semibold text-slate-900">
								{accommodation.attributes.guests[$lang]}
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- MAIN CONTENT + BOOKING CARD -->
			<div class="mt-8 grid gap-10 lg:grid-cols-[1fr,360px] lg:items-start">
				<!-- LEFT CONTENT -->
				<div class="space-y-12">
					<!-- Description -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">{$t('room.detail.sections.homeTitle')}</h2>
						<div class="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
							{#each accommodation.description[$lang] as paragraph}
								<p>{paragraph}</p>
							{/each}
						</div>
					</section>

					<!-- Amenities -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">{$t('room.detail.sections.amenities')}</h2>
						<div class="mt-5 grid gap-x-10 gap-y-4 text-sm text-slate-700 sm:grid-cols-2">
							{#each accommodation.amenities as amenity}
								{#if amenityIcons[amenity as keyof typeof amenityIcons]}
									{@const Icon = amenityIcons[amenity as keyof typeof amenityIcons]}
									<div class="flex items-center gap-3">
										<span class="grid h-8 w-8 place-items-center rounded-xl bg-brand/10 text-brand">
											<Icon class="h-4 w-4" />
										</span>
										<span>{$t(`amenity.${amenity}`)}</span>
									</div>
								{/if}
							{/each}
						</div>
					</section>

					<!-- Floorplan -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">{$t('room.detail.sections.floorplan')}</h2>
						<div
							class="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
						>
							<img
								src={withAsset(accommodation.floorplanImage)}
								alt=""
								class="h-72 w-full object-contain sm:h-80"
								loading="lazy"
							/>
						</div>
					</section>

					<!-- Prices & Details TABLE -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">{$t('room.detail.sections.prices')}</h2>

						<div
							class="mt-5 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
						>
							<table class="hidden w-full text-left text-sm sm:table">
								<thead
									class="bg-[#fbf3e8] text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600"
								>
									<tr>
										<th class="px-4 py-3">{$t('room.detail.prices.season')}</th>
										<!-- <th class="px-4 py-3">Zeitraum</th> -->
										<th class="px-4 py-3">{$t('room.detail.prices.priceNight')}</th>
										<th class="px-4 py-3">{$t('room.detail.prices.extraPerson')}</th>
										<th class="px-4 py-3">{$t('room.detail.prices.minStay')}</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-slate-100">
									{#each accommodation.priceMatrix as row}
										<tr class="text-slate-700">
											<td class="px-4 py-3 font-semibold text-slate-900">{row.season[$lang]}</td>
											<!-- <td class="px-4 py-3 text-slate-600">{row.period}</td> -->
											<td class="px-4 py-3 font-semibold text-brand">{row.pricePerNight}</td>
											<td class="px-4 py-3 font-semibold text-slate-900">
												{row.extraPerson[$lang]}
											</td>
											<td class="px-4 py-3 font-semibold text-slate-900">{row.minStay[$lang]}</td>
										</tr>
									{/each}
								</tbody>
							</table>
							<div class="divide-y divide-slate-100 text-sm sm:hidden">
								{#each accommodation.priceMatrix as row}
									<div class="space-y-3 p-4 text-slate-700">
										<div class="flex items-baseline justify-between gap-3">
											<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
												{$t('room.detail.prices.season')}
											</p>
											<p class="text-right font-semibold text-slate-900">{row.season[$lang]}</p>
										</div>
										<div class="flex items-baseline justify-between gap-3">
											<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
												{$t('room.detail.prices.priceNight')}
											</p>
											<p class="text-right font-semibold text-brand">{row.pricePerNight}</p>
										</div>
										<div class="flex items-baseline justify-between gap-3">
											<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
												{$t('room.detail.prices.extraPersonShort')}
											</p>
											<p class="text-right font-semibold text-slate-900">{row.extraPerson[$lang]}</p>
										</div>
										<div class="flex items-baseline justify-between gap-3">
											<p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
												{$t('room.detail.card.facts.minStayLabel')}
											</p>
											<p class="text-right font-semibold text-slate-900">{row.minStay[$lang]}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<p class="mt-3 text-xs text-slate-500">{$t('room.detail.prices.note')}</p>
					</section>

					<!-- Reviews carousel -->
					<section>
						<div class="flex items-center justify-between gap-4">
							<h2 class="text-2xl font-serif text-slate-900">{$t('room.detail.sections.reviews')}</h2>

							<div class="flex items-center gap-2">
								<button
									type="button"
									class={`grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 ${
										!canPrev ? 'opacity-40 pointer-events-none' : ''
									}`}
									onclick={() => (reviewIndex = Math.max(0, reviewIndex - 1))}
									aria-label="{$t('room.detail.reviews.prev')}"
								>
									‹
								</button>
								<button
									type="button"
									class={`grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 ${
										!canNext ? 'opacity-40 pointer-events-none' : ''
									}`}
									onclick={() =>
										(reviewIndex = Math.min(
											(accommodation.reviews.length ?? 0) - visibleReviews,
											reviewIndex + 1
										))}
									aria-label="{$t('room.detail.reviews.next')}"
								>
									›
								</button>
							</div>
						</div>

						<div class="mt-5 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
							{#each accommodation.reviews.slice(reviewIndex, reviewIndex + visibleReviews) as review}
								<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
									<p class="mt-3 text-sm leading-relaxed text-slate-600">“{review.text}”</p>

									<div class="mt-4 flex items-center gap-3">
										<div
											class="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-xs font-semibold text-brand"
										>
											{review.name?.slice(0, 2)?.toUpperCase()}
										</div>
										<div class="min-w-0">
											<p class="text-xs font-semibold text-slate-900">{review.name}</p>
											<p class="text-[11px] text-slate-500">{review.date ?? ''}</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>
				</div>

				<!-- RIGHT BOOKING CARD (sticky) -->
				<aside class="lg:sticky booking-card">
					<div
						class="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] backdrop-blur sm:p-6"
					>
						<!-- Header -->
						<div class="flex items-start justify-between gap-4">
							<div>
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
									{$t('room.detail.card.priceFrom')}
								</p>
								<p class="mt-1 text-slate-900">
									<span class="text-3xl font-semibold tracking-tight"
										>{accommodation.pricePerNightBase}&euro;</span
									>
									<span class="ml-1 text-xs text-slate-500">/ {$t('price.night')}</span>
								</p>
								<p class="mt-2 text-xs text-slate-500">{$t('room.detail.card.vatNote')}</p>
							</div>
						</div>

						<!-- Separator -->
						<div class="my-5 h-px bg-slate-200/70"></div>

						<!-- Fakten -->
						<div class="rounded-2xl border border-slate-200/60 bg-slate-50/70 p-4">
							<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
								{$t('room.detail.card.facts.title')}
							</p>

							<div class="mt-3 space-y-3 text-sm">
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.facts.checkinLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.facts.checkinValue')}
									</span>
								</div>
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.facts.checkoutLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.facts.checkoutValue')}
									</span>
								</div>
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.facts.minStayLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.facts.minStayValue')}
									</span>
								</div>
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.facts.cancelLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.facts.cancelValue')}
									</span>
								</div>
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.facts.petsLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.facts.petsValue')}
									</span>
								</div>
							</div>
						</div>

						<!-- Aufschlsselung -->
						<div class="mt-4 rounded-2xl border border-slate-200/60 bg-white p-4">
							<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
								{$t('room.detail.card.breakdown.title')}
							</p>

							<div class="mt-3 space-y-2 text-sm text-slate-700">
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.breakdown.nightLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.breakdown.nightFrom')} {accommodation.pricePerNightBase}&euro; /
										{$t('price.night')}
									</span>
								</div>
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.breakdown.cleaningLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.breakdown.cleaningValue')}
									</span>
								</div>
								<div class="flex items-center justify-between gap-4">
									<span class="text-slate-600">{$t('room.detail.card.breakdown.taxLabel')}</span>
									<span class="font-semibold text-slate-900">
										{$t('room.detail.card.breakdown.taxValue')}
									</span>
								</div>
							</div>

							<div
								class="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-200/60"
							>
								{$t('room.detail.card.breakdown.tip')}
							</div>
						</div>

						<!-- CTA -->
						<a
							href={resolve('/buchen')}
							class="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-brand/25"
						>
							{$t('room.detail.card.cta')}
						</a>

						<!-- Secondary line -->
						<p class="mt-3 text-center text-[11px] text-slate-500">
							{$t('room.detail.card.note')}
						</p>
					</div>
				</aside>
			</div>
		</section>
	</div>
</main>

{#if galleryOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-6"
		role="dialog"
		aria-modal="true"
	>
		<div class="relative w-full max-w-5xl">
			<button
				type="button"
				class="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm sm:-top-10 sm:right-0"
				onclick={closeGallery}
				aria-label="{$t('room.detail.gallery.close')}"
			>{$t('room.detail.gallery.close')}</button>

			<div class="overflow-hidden rounded-3xl bg-white shadow-xl">
				<img
					src={withAsset(galleryImages[galleryIndex])}
					alt=""
					class="h-[60vh] max-h-[520px] w-full object-cover"
				/>
			</div>

			<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<button
					type="button"
					class={`rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ${
						!canGalleryPrev ? 'opacity-40 pointer-events-none' : ''
					}`}
					onclick={() => (galleryIndex = Math.max(0, galleryIndex - 1))}
				>
					‹ {$t('room.detail.gallery.prev')}
				</button>
				<div class="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
					{#each galleryImages as img, i}
						<button
							type="button"
							class={`h-12 w-16 overflow-hidden rounded-xl border ${
								i === galleryIndex ? 'border-brand' : 'border-transparent'
							}`}
							onclick={() => (galleryIndex = i)}
						>
							<img src={withAsset(img)} alt="" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
				<button
					type="button"
					class={`rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ${
						!canGalleryNext ? 'opacity-40 pointer-events-none' : ''
					}`}
					onclick={() => (galleryIndex = Math.min(galleryImages.length - 1, galleryIndex + 1))}
				>
					{$t('room.detail.gallery.next')} >
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.booking-card {
		top: 9rem;
	}
</style>





























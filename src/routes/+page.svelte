<script lang="ts">
	/* eslint-disable */
	import { lang, t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { browser } from '$app/environment';
	import { accommodations } from '$lib/data/accommodations';
	import { homeTrustReviews } from '$lib/data/reviews';
	import { trackEvent } from '$lib/analytics/plausible';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { SITE_ORIGIN } from '$lib/seo';
	import { onMount } from 'svelte';
	import {
		Mountain,
		HeartHandshake,
		Snowflake,
		Check,
		ArrowRight,
		ChevronLeft,
		ChevronRight,
		Leaf,
		Sun,
		Flame,
		Sparkles,
		BusFront,
		CalendarDays,
		Info,
		BedDouble,
		Bed,
		ShowerHead,
		Microwave,
		Refrigerator,
		CookingPot,
		Coffee,
		CupSoda,
		Utensils,
		Sandwich,
		House,
		Wifi,
		SquareParking,
		Tv,
		Sofa,
		Bath,
		Star,
		BadgeCheck,
		Home,
		Building2,
	} from 'lucide-svelte';

	const usps = [
		{ key: 1, icon: House },
		{ key: 2, icon: Mountain },
		{ key: 3, icon: HeartHandshake },
		{ key: 4, icon: Snowflake },
	];

	const withAsset = (path: string) => asset(path);
	const currentMonth = new Date().getMonth();
	const heroImagePath =
		currentMonth >= 4 && currentMonth <= 8
			? '/images/house/gallery/balkon-ausblick-1440.jpg'
			: '/images/other/winter-balkon_ausblick-1-hero.jpg';
	const heroImage = withAsset(heroImagePath);

	const rooms = accommodations;
	const accommodationsBase = resolve('/unterkuenfte-preise');
	const siteUrl = SITE_ORIGIN;
	const lodgingImages = [
		new URL(withAsset('/images/house/haus-sommer.jpg'), siteUrl).toString(),
		new URL(withAsset('/images/house/winter-balkon_ausblick-1.jpg'), siteUrl).toString(),
		new URL(withAsset('/images/house/balkon-ausblick.jpg'), siteUrl).toString(),
		new URL(withAsset('/images/house/IMG_0580.jpeg'), siteUrl).toString(),
	];
	const amenityFeatures = $derived.by(() => {
		const amenities = Array.from(new Set(rooms.flatMap((room) => room.amenities ?? [])));

		const baseFeatures = amenities.map((amenity) => ({
			'@type': 'LocationFeatureSpecification',
			name: $t(`amenity.${amenity}`),
			value: true,
		}));
		const extraFeatures = [
			{
				'@type': 'LocationFeatureSpecification',
				name: 'High-speed Wi-Fi (fiber)',
				value: true,
			},
			{
				'@type': 'LocationFeatureSpecification',
				name: 'Parking',
				value: true,
			},
			{
				'@type': 'LocationFeatureSpecification',
				name: 'Ski room',
				value: true,
			},
		];

		return [...baseFeatures, ...extraFeatures];
	});
	const geoCoordinates = {
		'@type': 'GeoCoordinates',
		latitude: 46.688407,
		longitude: 13.2549914,
	} as const;
	const fallbackVacationImagePaths = [
		'/images/house/haus-sommer.jpg',
		'/images/house/winter-balkon_ausblick-1.jpg',
		'/images/house/balkon-ausblick.jpg',
		'/images/house/IMG_0580.jpeg',
		'/images/house/kirche.jpg',
		'/images/house/pavillon.jpg',
		'/images/house/slider-4-winter.jpg',
		'/images/house/tischtennis.jpg',
		'/images/house/Haus-Winter-2.png',
	];
	const parseGuestCapacity = (guestText: string) => {
		const rangeMatch = guestText.match(/(\d+)\s*-\s*(\d+)/);
		if (rangeMatch) {
			return {
				minValue: Number.parseInt(rangeMatch[1], 10),
				maxValue: Number.parseInt(rangeMatch[2], 10),
			};
		}
		const singleMatch = guestText.match(/(\d+)/);
		if (singleMatch) {
			const value = Number.parseInt(singleMatch[1], 10);
			return { minValue: value, maxValue: value };
		}
		return null;
	};
	const isIsoDate = (value: string | undefined) => Boolean(value?.match(/^\d{4}-\d{2}-\d{2}$/));
	const buildVacationImages = (paths: string[]) => {
		const allPaths = [...paths, ...fallbackVacationImagePaths];
		const absoluteImages = Array.from(
			new Set(allPaths.map((path) => new URL(withAsset(path), siteUrl).toString()))
		);
		const minImages = 8;
		if (absoluteImages.length >= minImages) return absoluteImages.slice(0, minImages);
		while (absoluteImages.length < minImages && absoluteImages.length > 0) {
			absoluteImages.push(absoluteImages[absoluteImages.length - 1]);
		}
		return absoluteImages;
	};
	const buildAggregateRating = (ratings: number[]) => {
		if (!ratings.length) return undefined;
		const ratingValue = Number(
			(ratings.reduce((sum, value) => sum + value, 0) / ratings.length).toFixed(1)
		);
		return {
			'@type': 'AggregateRating',
			ratingValue,
			reviewCount: ratings.length,
		};
	};
	const buildReviews = (
		reviews: Array<{ name: string; rating: number; text: string; date?: string }>
	) =>
		reviews
			.filter((review) => isIsoDate(review.date))
			.map((review) => ({
				'@type': 'Review',
				reviewBody: review.text,
				author: {
					'@type': 'Person',
					name: review.name,
				},
				reviewRating: {
					'@type': 'Rating',
					ratingValue: review.rating,
					bestRating: 5,
					worstRating: 1,
				},
				datePublished: review.date,
			}));
	const lodgingId = `${siteUrl}/#lodging`;
	const hotelId = `${siteUrl}/#hotel`;
	const destinationId = `${siteUrl}/#destination-gitschtal`;
	const businessSameAs = [
		'https://maps.app.goo.gl/cXgd5iJbYPmSx2ad9',
		'https://www.booking.com/Share-deqca7p',
		'https://www.airbnb.at/users/profile/1470215552721931790',
		'https://nlw.at/de/Unterkunft-finden/Reise-planen/Unterkuenfte/unterkuenfte/KTN/ee29ea3d-3203-4fc3-8e2a-2b996f9f66a1/gaestehaus-rader---fam--herold-hueber',
	];
	const containsPlaces = $derived.by(() =>
		rooms.map((room) => {
			const maxGuests = parseGuestCapacity(room.attributes.guests[$lang]);
			const reviewsWithDate = room.reviews.filter((review) => isIsoDate(review.date));
			const reviewRatings = reviewsWithDate.map((review) => review.rating);
			const roomUrl = new URL(`${resolve('/unterkuenfte-preise')}/${room.slug}`, siteUrl).toString();
			const roomId = `${roomUrl}#vacation-rental`;
			return {
				'@type': 'VacationRental',
				'@id': roomId,
				name: room.title,
				description: room.subtitle[$lang],
				url: roomUrl,
				identifier: room.slug,
				image: buildVacationImages([room.images.main, ...(room.images.gallery ?? [])]),
				geo: geoCoordinates,
				containsPlace: {
					'@type': 'Accommodation',
					name: room.title,
					accommodationCategory: 'Apartment',
					floorLevel: room.attributes.floor,
					occupancy: maxGuests
						? {
								'@type': 'QuantitativeValue',
								value: maxGuests.maxValue,
							}
						: undefined,
					amenityFeature: (room.amenities ?? []).map((amenity) => ({
						'@type': 'LocationFeatureSpecification',
						name: $t(`amenity.${amenity}`),
						value: true,
					})),
					floorSize: {
						'@type': 'QuantitativeValue',
						value: Number.parseFloat(room.attributes.size.replace(',', '.')),
						unitCode: 'MTK',
					},
				},
				aggregateRating: buildAggregateRating(reviewRatings),
				review: buildReviews(reviewsWithDate),
				amenityFeature: (room.amenities ?? []).map((amenity) => ({
					'@type': 'LocationFeatureSpecification',
					name: $t(`amenity.${amenity}`),
					value: true,
				})),
			};
		})
	);
	const lodgingOffers = $derived.by(() =>
		rooms.map((room) => {
			const roomUrl = new URL(`${resolve('/unterkuenfte-preise')}/${room.slug}`, siteUrl).toString();
			const roomId = `${roomUrl}#vacation-rental`;
			return {
				'@type': 'Offer',
				priceCurrency: 'EUR',
				url: roomUrl,
				itemOffered: {
					'@id': roomId,
				},
			};
		})
	);
	const homeJsonLd = $derived.by(() =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'LodgingBusiness',
					'@id': lodgingId,
					name: 'Gästehaus Rader',
					url: siteUrl,
					additionalType: 'https://schema.org/Hotel',
					image: lodgingImages,
					description: $t('home.seo.description'),
					priceRange: '€€',
					address: {
						'@type': 'PostalAddress',
						streetAddress: 'Weißbriach 92',
						postalCode: '9622',
						addressLocality: 'Weißbriach',
						addressRegion: 'Kärnten',
						addressCountry: 'AT',
					},
					geo: geoCoordinates,
					sameAs: businessSameAs,
					hasMap: 'https://maps.app.goo.gl/cXgd5iJbYPmSx2ad9',
					amenityFeature: amenityFeatures,
					containsPlace: containsPlaces,
					makesOffer: lodgingOffers,
					telephone: ['+43 676 6246826', '+43 4286 222'],
					email: 'info@rader-gitschtal.at',
				},
				{
					'@type': 'Hotel',
					'@id': hotelId,
					name: 'Gästehaus Rader',
					url: siteUrl,
					description: $t('home.seo.description'),
					image: lodgingImages,
					parentOrganization: {
						'@id': lodgingId,
					},
					address: {
						'@type': 'PostalAddress',
						streetAddress: 'Weißbriach 92',
						postalCode: '9622',
						addressLocality: 'Weißbriach',
						addressRegion: 'Kärnten',
						addressCountry: 'AT',
					},
					geo: geoCoordinates,
					telephone: ['+43 676 6246826', '+43 4286 222'],
					email: 'info@rader-gitschtal.at',
					sameAs: businessSameAs,
					amenityFeature: amenityFeatures,
					offers: {
						'@type': 'Offer',
						priceCurrency: 'EUR',
						url: new URL(resolve('/unterkuenfte-preise'), siteUrl).toString(),
					},
				},
				{
					'@type': 'TouristDestination',
					'@id': destinationId,
					name: 'Gitschtal',
					containsPlace: {
						'@id': hotelId,
					},
				},
			],
		})
	);

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
	type AmenityKey = keyof typeof amenityIcons;

	const galleryImageSizes = '(min-width: 640px) 360px, 260px';
	const destinationImages = [
		// 2) Ankommen / Haus: das Objekt zeigen
		{ base: 'haus-sommer', altKey: 'home.gallery.imageAlt.sommer' },
				// 4) Außenbereich / Garten-Feeling
		{ base: 'pavillon', altKey: 'home.gallery.imageAlt.pavillon' },
				// 3) Wohlfühl-Detail / Innen- oder Detailshot (wenn IMG_0580 das ist)
		{ base: 'IMG_0580', altKey: 'home.gallery.imageAlt.view' },
		// 1) Hero / USP: Ausblick (macht sofort Lust)
		{ base: 'balkon-ausblick', altKey: 'home.gallery.imageAlt.balkon' },

		// 5) Aktivität / Feature (locker, menschlich)
		{ base: 'tischtennis', altKey: 'home.gallery.imageAlt.tischtennis' },

		// 6) Umgebung / Ort (context)
		{ base: 'kirche', altKey: 'home.gallery.imageAlt.kirche' },

		// 7) Winter-Teaser: einmal „wow“ Winter
		{ base: 'Haus-Winter-2', altKey: 'home.gallery.imageAlt.winter' },

		// 8) Winter-Atmosphäre (weitere Variation)
		{ base: 'winter-balkon_ausblick-1', altKey: 'home.gallery.imageAlt.winterBalkon' },

		// 9) Optional/zusätzliches Winterbild ans Ende (wenn’s eher „B-Roll“ ist)
		{ base: 'slider-4-winter', altKey: 'home.gallery.imageAlt.sliderWinter' },
	];

	const galleryImages = destinationImages;
	let heroHeaderOffset = $state('113px');
	let isGalleryOpen = $state(false);
	let activeGalleryIndex = $state(0);

	const getHeroOffsetFallback = () =>
		browser && window.matchMedia('(min-width: 640px)').matches ? 112 : 141;

	const updateHeroHeaderOffset = () => {
		if (!browser) return;
		const header = document.getElementById('site-header');
		const headerHeight = header?.getBoundingClientRect().height ?? getHeroOffsetFallback();
		heroHeaderOffset = `${Math.round(headerHeight)}px`;
	};

	const openGallery = (index: number) => {
		activeGalleryIndex = index;
		isGalleryOpen = true;
	};

	const closeGallery = () => {
		isGalleryOpen = false;
	};

	const showPrevGalleryImage = () => {
		if (!galleryImages.length) return;
		activeGalleryIndex = (activeGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
	};

	const showNextGalleryImage = () => {
		if (!galleryImages.length) return;
		activeGalleryIndex = (activeGalleryIndex + 1) % galleryImages.length;
	};

	const handleGalleryKeydown = (event: KeyboardEvent) => {
		if (!isGalleryOpen) return;
		if (event.key === 'Escape') {
			closeGallery();
		}
		if (event.key === 'ArrowLeft') {
			showPrevGalleryImage();
		}
		if (event.key === 'ArrowRight') {
			showNextGalleryImage();
		}
	};

	onMount(() => {
		if (!browser) return;
		updateHeroHeaderOffset();

		const header = document.getElementById('site-header');
		const resizeObserver = header ? new ResizeObserver(updateHeroHeaderOffset) : null;
		if (header && resizeObserver) {
			resizeObserver.observe(header);
		}

		window.addEventListener('resize', updateHeroHeaderOffset);
		window.addEventListener('keydown', handleGalleryKeydown);

		return () => {
			resizeObserver?.disconnect();
			window.removeEventListener('resize', updateHeroHeaderOffset);
			window.removeEventListener('keydown', handleGalleryKeydown);
		};
	});

	let galleryTrack: HTMLDivElement | null = null;
	const scrollGallery = (direction: 'prev' | 'next') => {
		if (!galleryTrack) return;
		const amount = galleryTrack.clientWidth * 0.8;
		galleryTrack.scrollBy({
			left: direction === 'prev' ? -amount : amount,
			behavior: 'smooth',
		});
	};

	const trustStars = Array.from({ length: 5 });
	const googleProfileUrl = 'https://maps.app.goo.gl/cXgd5iJbYPmSx2ad9';
	const displayedTrustReviews = homeTrustReviews.filter((review) => [1, 2, 5].includes(review.id));
	const formatReviewAge = (value: string | undefined, currentLang: 'de' | 'en') => {
		if (!value) return '';
		const parsed = new Date(value);
		if (Number.isNaN(parsed.getTime())) return '';
		const now = new Date();
		let months =
			(now.getFullYear() - parsed.getFullYear()) * 12 + (now.getMonth() - parsed.getMonth());
		if (now.getDate() < parsed.getDate()) months -= 1;
		if (months <= 1) return currentLang === 'de' ? 'vor einem Monat' : 'one month ago';
		if (months < 12) return currentLang === 'de' ? `vor ${months} Monaten` : `${months} months ago`;
		return currentLang === 'de' ? 'vor einem Jahr' : 'one year ago';
	};

	type RevealOptions = {
		threshold?: number;
		rootMargin?: string;
		distance?: number;
		duration?: number;
		delay?: number;
	};

	const prefersReducedMotion = () =>
		browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function revealOnScroll(node: HTMLElement, options: RevealOptions = {}) {
		return {};
	}
</script>

<SeoHead
	titleKey="home.seo.title"
	descriptionKey="home.seo.description"
	image="/images/other/house-summer.jpg"
/>

<svelte:head>
	{@html `<script type="application/ld+json">${homeJsonLd}</script>`}
</svelte:head>

<div class="space-y-16 pb-16">
	<section
		class="relative min-h-[calc(100lvh-var(--hero-header-offset,141px))]"
		style={`--hero-header-offset: ${heroHeaderOffset};`}
	>
		<div class="absolute inset-0">
			<div
				class="h-full w-full bg-cover bg-center"
				style={`background-image: url('${heroImage}');`}
				aria-hidden="true"
			></div>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15"
				aria-hidden="true"
			></div>
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]"
				aria-hidden="true"
			></div>
		</div>

		<div
			class="relative flex min-h-[calc(100svh-var(--hero-header-offset,141px))] flex-col items-center justify-center px-6 pt-20 text-center text-white sm:px-10"
		>
			<h1 class="mx-auto max-w-3xl font-serif text-4xl font-semibold leading-[0.95] sm:text-6xl">
				{$t('hero.title')}
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
				{$t('hero.subtitle')}
			</p>

			<div class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
				<a
					href={resolve('/unterkuenfte-preise')}
					class="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/60"
				>
					{$t('hero.cta.primary')}
				</a>
				<a
					href={resolve('/erlebnisse')}
					class="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
				>
					{$t('hero.cta.secondary')}
				</a>
			</div>
		</div>

		<!-- <div class="absolute inset-x-0 -bottom-10 px-4 sm:px-6">
			<div class="mx-auto max-w-5xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200 sm:p-5">
				<div class="grid gap-4 md:grid-cols-[1fr,1fr,1fr,auto] md:items-end">
					<label class="grid gap-2">
						<span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							{$t('booking.bar.checkin')}
						</span>
						<div class="relative">
							<input
								type="date"
								class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
							/>
							<Calendar
								class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
							/>
						</div>
					</label>

					<label class="grid gap-2">
						<span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							{$t('booking.bar.checkout')}
						</span>
						<div class="relative">
							<input
								type="date"
								class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
							/>
							<Calendar
								class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
							/>
						</div>
					</label>

					<label class="grid gap-2">
						<span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
							{$t('booking.bar.guests')}
						</span>
						<div class="relative">
							<select
								class="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/20"
							>
								<option>2 Erwachsene</option>
								<option>1 Erwachsener</option>
								<option>3 Erwachsene</option>
								<option>4 Erwachsene</option>
							</select>
							<Users
								class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
							/>
						</div>
					</label>

					<button
						type="button"
						class="h-[46px] w-full rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30 md:w-auto"
					>
						{$t('booking.bar.cta')}
					</button>
				</div>
			</div>
		</div> -->
	</section>

	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-20">
			<section
				class="-mx-4 mt-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-pl-0 sm:scroll-pr-0 lg:grid-cols-4"
			>
				{#each usps as item}
					<div
						class="group w-[84vw] max-w-[320px] shrink-0 snap-start rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md sm:w-auto sm:max-w-none sm:p-6"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white"
						>
							<item.icon class="h-5 w-5" aria-hidden="true" />
						</div>
						<h3 class="mt-4 text-base font-semibold text-slate-900">
							{$t(`usp.${item.key}.title`)}
						</h3>
						<div class="mt-3 h-[2px] w-8 bg-brand/40 transition-all duration-300 group-hover:w-12"></div>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							{$t(`usp.${item.key}.body`)}
						</p>
					</div>
				{/each}
			</section>

			<!-- ROOMS -->
			<section class="mt-4 pt-2 sm:mt-0 sm:pt-4">
				<div class="flex flex-wrap items-end justify-between gap-3 sm:gap-6">
					<div class="pb-2 sm:pb-10">
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
							{$t('rooms.section.kicker')}
						</p>
						<h2 class="mt-3 text-4xl font-serif font-medium leading-[0.95] text-slate-900">
							{$t('rooms.section.title')}
						</h2>
						<div class="mt-4 h-[3px] w-16 rounded-full bg-brand"></div>
					</div>

					<a
						href={resolve('/unterkuenfte-preise')}
						class="ml-auto inline-flex w-full items-center justify-end gap-2 pt-0 text-sm font-semibold text-brand/80 transition hover:text-brand sm:w-auto sm:pt-2"
					>
						{$t('rooms.section.cta')}
						<ArrowRight class="h-4 w-4" aria-hidden="true" />
					</a>
				</div>

				<div class="mt-8">
					<div
						class="-mx-4 mt-2 flex snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-3 pt-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 sm:mx-0 sm:px-0 sm:scroll-pl-0 sm:scroll-pr-0"
					>
						{#each rooms as r}
							<a
								href={`${accommodationsBase}/${r.slug}`}
								class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg sm:w-[340px] sm:hover:-translate-y-1"
								onclick={() => trackEvent('Content: Room Card Click', { source: 'home', room: r.slug })}
							>
								<!-- Image -->
								<div class="relative aspect-[4/3] overflow-hidden">
									<img
										src={withAsset(r.images.main)}
										alt={`${$t('home.rooms.card.imageAltPrefix')} ${r.title}`}
										class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
										loading="lazy"
									/>

									<!-- Price pill -->
									<!-- <span
                    class="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
                  >
                    {$t("price.from")} €{$t(`rooms.card.${r.key}.price`)} / {$t(
                      "price.night"
                    )}
                  </span> -->
								</div>

								<!-- Content -->
								<div class="px-6 pb-5 pt-5">
									<h3 class="text-base font-semibold tracking-tight text-slate-900">
										{r.title}
									</h3>
									<div class="mt-1 flex items-baseline gap-2">
										<p class="text-sm font-semibold text-slate-500">
											{$t('price.from')} <span class="text-slate-500">{r.pricePerNightBase}</span>
										</p>
										<span class="text-xs text-slate-500">/ {$t('price.night')}</span>
									</div>

									<!-- Meta line (small, muted) -->
									<p class="mt-2 text-xs text-slate-500">
										{r.cardMeta[$lang]}
									</p>

									<!-- Amenities (optional) -->
									{#if r.amenities?.length}
										<div class="mt-4 flex items-center gap-3 text-slate-500">
											{#each r.amenities as a}
												<!-- Use any icon you like; here are tiny placeholders as circles -->
												{@const Icon = amenityIcons[a as AmenityKey]}
												{#if Icon}
													<span
														class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100"
														title={$t(`amenity.${a}`)}
														aria-label={$t(`amenity.${a}`)}
													>
														<Icon class="h-4 w-4 text-slate-500" aria-hidden="true" />
													</span>
												{/if}
											{/each}
										</div>
									{:else}
										<!-- Keep spacing similar to screenshot even without amenities -->
										<div class="mt-4 h-7"></div>
									{/if}
								</div>

								<!-- Hover ring -->
								<div
									class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/25"
								></div>
							</a>
						{/each}
					</div>
				</div>
			</section>

			<!-- TRUST -->
			<section class="py-2 sm:py-4">
				<!-- Header row -->
				<div class="flex flex-wrap items-start justify-between gap-3 sm:gap-6">
					<div class="max-w-2xl">
						<p class="text-[11px] font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('trust.kicker')}
						</p>
						<h2 class="mt-3 text-4xl font-serif font-medium leading-[0.95] text-slate-900">
							{$t('trust.title')}
						</h2>
						<div class="mt-4 h-[3px] w-16 rounded-full bg-brand"></div>
					</div>

					<div class="mt-2 flex items-center gap-2 text-sm font-medium text-slate-500 sm:mt-10">
						<BadgeCheck class="h-4 w-4 text-brand" aria-hidden="true" />
						{$t('trust.verified')}
					</div>
				</div>

				<!-- Cards row (4 columns like screenshot) -->
				<div
					class={`mt-6 -mx-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 sm:mt-10 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0 ${
						displayedTrustReviews.length > 3 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
					}`}
				>
					<!-- Rating card (Google) -->
					<a
						href={googleProfileUrl}
						target="_blank"
						rel="noreferrer"
						class="group relative flex h-full w-[280px] min-h-[330px] shrink-0 snap-start flex-col rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg sm:hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none lg:min-h-0 lg:w-auto lg:shrink"
					>
						<span
							class="pointer-events-none absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:bg-brand/10 group-hover:text-brand"
							aria-hidden="true"
						>
							↗
						</span>
						<div
							class="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400"
						>
							<span class="transition group-hover:text-slate-500 group-hover:underline">Google</span>
						</div>

						<div class="mt-5 inline-flex items-end gap-2">
							<span class="text-5xl font-semibold leading-none text-slate-900 group-hover:underline">
								{$t('trust.ratingValue')}
							</span>
							<span class="pb-1 text-sm font-semibold text-slate-400 group-hover:underline">/ 5</span>
						</div>

						<div class="mt-3 flex items-center gap-1 text-amber-500">
							{#each trustStars as _}
								<Star class="h-4 w-4 fill-current" aria-hidden="true" />
							{/each}
						</div>

						<p class="mt-6 text-xs font-medium text-slate-400">
							{$t('trust.ratingMeta')}
						</p>

						<!-- Small “platform score” tile (bottom) -->
						<div class="mt-6 rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
							<div class="flex items-center gap-3">
								<span
									class="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white"
								>
									{$t('trust.booking.scoreCompact')}
								</span>
								<div class="leading-tight">
									<p class="text-xs font-semibold text-slate-900">
										{$t('trust.booking.label')}
									</p>
									<p class="text-[11px] text-slate-400">
										{$t('trust.booking.meta')}
									</p>
								</div>
							</div>
						</div>
						<div
							class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-brand/20"
						></div>
					</a>

					<!-- Review cards -->
					{#each displayedTrustReviews as review}
						<a
							href={review.url}
							target="_blank"
							rel="noreferrer"
							class="group relative flex h-full w-[280px] min-h-[330px] shrink-0 snap-start flex-col rounded-3xl border border-slate-200/70 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-lg sm:hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none lg:min-h-0 lg:w-auto lg:shrink"
							onclick={() => trackEvent('Trust: Review Click', { source: 'home', index: review.id })}
						>
							<span
								class="pointer-events-none absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:bg-brand/10 group-hover:text-brand"
								aria-hidden="true"
							>
								↗
							</span>

							<div class="flex items-center gap-1 text-amber-500">
								{#each trustStars as _}
									<Star class="h-4 w-4 fill-current" aria-hidden="true" />
								{/each}
							</div>

							<p
								class="mt-5 text-sm italic leading-relaxed text-slate-600 transition group-hover:text-slate-700"
							>
								"{review.quote[$lang]}"
							</p>

							<div class="mt-auto border-t border-slate-200/70 pt-4">
								<div class="flex items-center gap-3">
									<!-- Avatar -->
									<div
										class="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-slate-100 text-xs font-semibold text-slate-700"
									>
										{review.initials}
									</div>

									<div class="leading-tight">
										<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900">
											{review.name}
										</p>
										<p class="text-[11px] text-slate-400">
											{review.date ? formatReviewAge(review.date, $lang) : review.meta[$lang]}
										</p>
									</div>
								</div>
							</div>

							<div
								class="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-transparent transition group-hover:ring-brand/20"
							></div>
						</a>
					{/each}
				</div>

				<!-- Bottom platform row (like screenshot) -->
				<div
					class="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 sm:mt-10 sm:gap-8"
				>
					<a
						href="https://www.airbnb.at/users/profile/1470215552721931790"
						target="_blank"
						rel="noreferrer"
						class="group inline-flex items-center gap-2 rounded-full border border-transparent px-2.5 py-1.5 transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
					>
						<Home
							class="h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-800"
							aria-hidden="true"
						/>
						<span
							class="text-slate-500 transition-colors group-hover:text-slate-800 group-hover:underline"
							>Airbnb</span
						>
						<span
							class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 transition-all duration-200 group-hover:bg-brand/10 group-hover:text-brand group-hover:ring-1 group-hover:ring-brand/20"
						>
							{$t('trust.airbnb.score')}
						</span>
						<span
							class="ml-0.5 text-slate-400 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:text-slate-600"
							aria-hidden="true"
						>
							↗
						</span>
					</a>
					<span class="h-4 w-px bg-slate-200"></span>
					<a
						href="https://www.booking.com/Share-deqca7p"
						target="_blank"
						rel="noreferrer"
						class="group inline-flex items-center gap-2 rounded-full border border-transparent px-2.5 py-1.5 transition-all duration-200 hover:-translate-y-[1px] hover:border-slate-200 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2"
					>
						<Building2
							class="h-4 w-4 text-slate-500 transition-colors group-hover:text-slate-800"
							aria-hidden="true"
						/>
						<span
							class="text-slate-500 transition-colors group-hover:text-slate-800 group-hover:underline"
							>Booking.com</span
						>
						<span
							class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 transition-all duration-200 group-hover:bg-brand/10 group-hover:text-brand group-hover:ring-1 group-hover:ring-brand/20"
						>
							{$t('trust.booking.score')}
						</span>
						<span
							class="ml-0.5 text-slate-400 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 group-hover:text-slate-600"
							aria-hidden="true"
						>
							↗
						</span>
					</a>
				</div>
			</section>

			<!-- Gallery -->
			<section class="py-2 lg:py-8">
				<div class="flex items-start gap-4">
					<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
						<Sun class="h-5 w-5" aria-hidden="true" />
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('home.gallery.kicker')}
						</p>
						<h2 class="mt-2 text-4xl font-serif font-medium leading-[0.98] text-slate-900">
							{$t('home.gallery.title')}
						</h2>
						<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					</div>
				</div>

				<p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
					{$t('home.gallery.subtitle')}
				</p>

				<div class="mt-6 flex items-center justify-end gap-2">
					<button
						type="button"
						class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
						onclick={() => scrollGallery('prev')}
						aria-label={$t('room.detail.gallery.prev')}
					>
						<ChevronLeft class="h-5 w-5" />
					</button>
					<button
						type="button"
						class="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
						onclick={() => scrollGallery('next')}
						aria-label={$t('room.detail.gallery.next')}
					>
						<ChevronRight class="h-5 w-5" />
					</button>
				</div>

				<div
					class="mt-4 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [scrollbar-width:thin] [scrollbar-color:theme(colors.slate.300)_transparent] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 sm:mx-0 sm:px-0 sm:scroll-pl-0 sm:scroll-pr-0 lg:grid lg:auto-cols-[420px] lg:grid-flow-col lg:grid-rows-2"
					bind:this={galleryTrack}
				>
					{#each galleryImages as image, index}
						<button
							type="button"
							class="group relative aspect-[4/3] w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:aspect-[16/10] sm:w-[380px] lg:w-auto"
							onclick={() => openGallery(index)}
							aria-label={`${$t('home.gallery.kicker')}: ${$t(image.altKey)}`}
						>
							<img
								src={withAsset(`/images/house/gallery/${image.base}-720.jpg`)}
								srcset={`${withAsset(`/images/house/gallery/${image.base}-720.jpg`)} 720w, ${withAsset(`/images/house/gallery/${image.base}-1080.jpg`)} 1080w, ${withAsset(`/images/house/gallery/${image.base}-1440.jpg`)} 1440w`}
								sizes={galleryImageSizes}
								alt={$t(image.altKey)}
								class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
								loading="lazy"
								decoding="async"
							/>
							<div
								class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
							></div>
							<div class="pointer-events-none absolute bottom-4 left-4 right-4">
								<p class="text-sm font-semibold text-white">{$t(image.altKey)}</p>
								<p class="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
									{$t('home.gallery.locationTag')}
								</p>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/20"
							></div>
						</button>
					{/each}
				</div>
			</section>

			{#if isGalleryOpen}
				<div
					class="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
					role="dialog"
					aria-modal="true"
					aria-label={$t('home.gallery.title')}
					tabindex="-1"
				>
					<button
						type="button"
						class="absolute inset-0"
						onclick={closeGallery}
						aria-label="Close gallery"
					></button>
					<div class="relative z-10 w-full max-w-6xl">
						<button
							type="button"
							class="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
							onclick={closeGallery}
							aria-label="Close gallery"
						>
							<span class="text-xl leading-none">×</span>
						</button>

						<button
							type="button"
							class="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
							onclick={showPrevGalleryImage}
							aria-label={$t('room.detail.gallery.prev')}
						>
							<ChevronLeft class="h-5 w-5" />
						</button>

						<button
							type="button"
							class="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm transition hover:bg-white"
							onclick={showNextGalleryImage}
							aria-label={$t('room.detail.gallery.next')}
						>
							<ChevronRight class="h-5 w-5" />
						</button>

						<div class="overflow-hidden rounded-3xl bg-white">
							<img
								src={withAsset(`/images/house/gallery/${galleryImages[activeGalleryIndex].base}-1440.jpg`)}
								alt={$t(galleryImages[activeGalleryIndex].altKey)}
								class="h-auto max-h-[78vh] w-full object-contain"
							/>
							<div
								class="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-3 text-sm text-slate-600"
							>
								<p class="font-medium text-slate-800">{$t(galleryImages[activeGalleryIndex].altKey)}</p>
								<p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
									{activeGalleryIndex + 1} / {galleryImages.length}
								</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<div
				class="mx-auto my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent sm:my-16"
			></div>

			<!-- GUEST CARD -->
			<section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
				<div class="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
					<div class="order-2 relative h-[260px] sm:h-[320px] lg:order-1 lg:h-auto lg:min-h-full">
						<img
							src={withAsset('/images/experiences/train.png')}
							alt={$t('guestcard.landing.imageAlt')}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent"
						></div>
					</div>

					<div class="order-1 space-y-5 px-6 py-7 sm:px-10 sm:py-10 lg:order-2">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
								{$t('guestcard.landing.kicker')}
							</p>
							<h2 class="mt-2 text-3xl font-serif font-medium leading-[0.95] text-slate-900 sm:text-4xl">
								{$t('guestcard.landing.title')}
							</h2>
							<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
							<p class="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
								{$t('guestcard.landing.body')}
							</p>
						</div>

						<ul class="space-y-4 text-sm text-slate-600 sm:text-base">
							<li class="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 p-3">
								<span
									class="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/15 text-brand"
								>
									<BusFront class="h-5 w-5" aria-hidden="true" />
								</span>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.landing.item1.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.landing.item1.body')}
									</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<span
									class="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
								>
									<Sparkles class="h-6 w-6" aria-hidden="true" />
								</span>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.landing.item2.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.landing.item2.body')}
									</p>
								</div>
							</li>
							<li class="flex items-start gap-3">
								<span
									class="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand/10 text-brand"
								>
									<CalendarDays class="h-6 w-6" aria-hidden="true" />
								</span>
								<div>
									<p class="text-sm font-semibold text-slate-900">
										{$t('guestcard.landing.item3.title')}
									</p>
									<p class="mt-1 text-xs leading-relaxed text-slate-500">
										{$t('guestcard.landing.item3.body')}
									</p>
								</div>
							</li>
						</ul>

						<div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
							<a
								href="https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic"
								class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 sm:w-auto"
								target="_blank"
								rel="noreferrer"
							>
								<Info class="h-4 w-4" aria-hidden="true" />
								{$t('guestcard.cta.moreInfo')}
							</a>
						</div>
					</div>
				</div>
			</section>

			<div
				class="mx-auto my-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent sm:my-16"
			></div>
		</div>
	</div>

	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-16">
			<!-- AUSSTATTUNG -->
			<section class="rounded-3xl px-0 py-0 sm:px-10 sm:py-14">
				<div class="flex items-center gap-4">
					<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
						<Sparkles class="h-5 w-5" aria-hidden="true" />
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('home.amenities.kicker')}
						</p>
						<h2 class="mt-3 text-4xl font-serif font-medium leading-[0.95] text-slate-900">
							{$t('home.amenities.title')}
						</h2>
						<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					</div>
				</div>

				<p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
					{$t('home.amenities.subtitle')}
				</p>

				<div class="mt-8 space-y-6 sm:mt-10 sm:space-y-12">
					<!-- Mobile accordion -->
					<div class="space-y-4 sm:hidden">
						<details
							class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition open:border-brand/30 open:shadow-md"
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 transition group-open:bg-white"
							>
								<div class="flex min-w-0 items-center gap-3">
									<div
										class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f7efe4] text-brand transition group-open:rounded-full group-open:bg-brand group-open:text-white"
									>
										<BedDouble class="h-5 w-5" aria-hidden="true" />
									</div>
									<div class="min-w-0">
										<div class="flex items-center gap-2">
											<p class="truncate text-sm font-semibold text-slate-900">
												{$t('home.amenities.basic.title')}
											</p>
											<span
												class="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 transition group-open:bg-brand/10 group-open:text-brand"
												>3</span
											>
										</div>
										<div class="mt-1 flex items-center gap-1.5 text-slate-400">
											<Bed class="h-3.5 w-3.5" aria-hidden="true" />
											<ShowerHead class="h-3.5 w-3.5" aria-hidden="true" />
											<Leaf class="h-3.5 w-3.5" aria-hidden="true" />
										</div>
									</div>
								</div>
								<span
									class="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:bg-[#f7efe4] group-open:text-brand"
								>
									<ChevronRight class="h-4 w-4 transition group-open:-rotate-90" />
								</span>
							</summary>
							<div class="border-t border-slate-200 bg-white">
								<ul class="divide-y divide-slate-200/70 bg-white">
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Bed class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.basic.bedding.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.basic.bedding.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<ShowerHead class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.basic.towels.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.basic.towels.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Leaf class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.basic.care.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.basic.care.body')}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</details>

						<details
							class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition open:border-brand/30 open:shadow-md"
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 transition group-open:bg-white"
							>
								<div class="flex min-w-0 items-center gap-3">
									<div
										class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f7efe4] text-brand transition group-open:rounded-full group-open:bg-brand group-open:text-white"
									>
										<Microwave class="h-5 w-5" aria-hidden="true" />
									</div>
									<div class="min-w-0">
										<div class="flex items-center gap-2">
											<p class="truncate text-sm font-semibold text-slate-900">
												{$t('home.amenities.kitchen.title')}
											</p>
											<span
												class="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 transition group-open:bg-brand/10 group-open:text-brand"
												>5</span
											>
										</div>
										<div class="mt-1 flex items-center gap-1.5 text-slate-400">
											<Microwave class="h-3.5 w-3.5" aria-hidden="true" />
											<Coffee class="h-3.5 w-3.5" aria-hidden="true" />
											<CupSoda class="h-3.5 w-3.5" aria-hidden="true" />
											<Utensils class="h-3.5 w-3.5" aria-hidden="true" />
											<Sandwich class="h-3.5 w-3.5" aria-hidden="true" />
										</div>
									</div>
								</div>
								<span
									class="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:bg-[#f7efe4] group-open:text-brand"
								>
									<ChevronRight class="h-4 w-4 transition group-open:-rotate-90" />
								</span>
							</summary>
							<div class="border-t border-slate-200 bg-white">
								<ul class="divide-y divide-slate-200/70 bg-white">
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Microwave class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.kitchenette.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.kitchen.kitchenette.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Coffee class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.espresso.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.kitchen.espresso.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<CupSoda class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.kettle.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.kitchen.kettle.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Utensils class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.dishes.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.kitchen.dishes.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Sandwich class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.toaster.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.kitchen.toaster.body')}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</details>

						<details
							class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition open:border-brand/30 open:shadow-md"
						>
							<summary
								class="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 transition group-open:bg-white"
							>
								<div class="flex min-w-0 items-center gap-3">
									<div
										class="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f7efe4] text-brand transition group-open:rounded-full group-open:bg-brand group-open:text-white"
									>
										<House class="h-5 w-5" aria-hidden="true" />
									</div>
									<div class="min-w-0">
										<div class="flex items-center gap-2">
											<p class="truncate text-sm font-semibold text-slate-900">
												{$t('home.amenities.house.title')}
											</p>
											<span
												class="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 transition group-open:bg-brand/10 group-open:text-brand"
												>3</span
											>
										</div>
										<div class="mt-1 flex items-center gap-1.5 text-slate-400">
											<Wifi class="h-3.5 w-3.5" aria-hidden="true" />
											<SquareParking class="h-3.5 w-3.5" aria-hidden="true" />
											<Snowflake class="h-3.5 w-3.5" aria-hidden="true" />
										</div>
									</div>
								</div>
								<span
									class="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:bg-[#f7efe4] group-open:text-brand"
								>
									<ChevronRight class="h-4 w-4 transition group-open:-rotate-90" />
								</span>
							</summary>
							<div class="border-t border-slate-200 bg-white">
								<ul class="divide-y divide-slate-200/70 bg-white">
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Wifi class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.house.wifi.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.house.wifi.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<SquareParking class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.house.parking.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.house.parking.body')}
											</p>
										</div>
									</li>
									<li class="flex gap-3 p-4">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Snowflake class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.house.ski.title')}
											</p>
											<p class="mt-1 text-[13px] leading-snug text-slate-600">
												{$t('home.amenities.house.ski.body')}
											</p>
										</div>
									</li>
								</ul>
							</div>
						</details>
					</div>

					<!-- Desktop lists -->
					<div class="hidden space-y-12 sm:block">
						<!-- Basis-Komfort -->
						<div class="space-y-4">
							<div class="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
								<div class="flex items-center gap-2">
									<div class="text-brand">
										<BedDouble class="h-5 w-5" aria-hidden="true" />
									</div>
									<h3 class="text-base font-semibold text-slate-900">
										{$t('home.amenities.basic.title')}
									</h3>
								</div>
							</div>

							<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Bed class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.basic.bedding.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.basic.bedding.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<ShowerHead class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.basic.towels.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.basic.towels.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Leaf class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.basic.care.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.basic.care.body')}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Küche -->
						<div class="space-y-4">
							<div class="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
								<div class="flex items-center gap-2">
									<div class="text-brand">
										<Microwave class="h-5 w-5" aria-hidden="true" />
									</div>
									<h3 class="text-base font-semibold text-slate-900">
										{$t('home.amenities.kitchen.title')}
									</h3>
								</div>
							</div>

							<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Microwave class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.kitchenette.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.kitchen.kitchenette.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Coffee class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.espresso.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.kitchen.espresso.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<CupSoda class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.kettle.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.kitchen.kettle.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Utensils class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.dishes.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.kitchen.dishes.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Sandwich class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.kitchen.toaster.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.kitchen.toaster.body')}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Haus-Ausstattung -->
						<div class="space-y-4">
							<div class="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
								<div class="flex items-center gap-2">
									<div class="text-brand">
										<House class="h-5 w-5" aria-hidden="true" />
									</div>
									<h3 class="text-base font-semibold text-slate-900">
										{$t('home.amenities.house.title')}
									</h3>
								</div>
							</div>

							<div class="grid gap-4 sm:grid-cols-2">
								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Wifi class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.house.wifi.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.house.wifi.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<SquareParking class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.house.parking.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.house.parking.body')}
											</p>
										</div>
									</div>
								</div>

								<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
									<div class="flex items-start gap-3">
										<div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
											<Snowflake class="h-5 w-5" aria-hidden="true" />
										</div>
										<div class="min-w-0">
											<p class="text-sm font-semibold leading-snug text-slate-900">
												{$t('home.amenities.house.ski.title')}
											</p>
											<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
												{$t('home.amenities.house.ski.body')}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<!-- SEASONS -->
			<section class="relative py-10 sm:py-12">
				<div class="text-center">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						{$t('seasons.kicker')}
					</p>
					<h2 class="mt-3 text-3xl font-serif font-semibold leading-[0.95] text-slate-900 sm:text-4xl">
						{$t('seasons.title')}
					</h2>
					<div class="mx-auto mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
						{$t('seasons.subtitle')}
					</p>
				</div>

				<div class="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
					<a
						href={resolve('/erlebnisse/sommer')}
						class="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 ring-1 ring-black/5 shadow-none transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
					>
						<img
							src={withAsset('/images/other/house-summer.jpg')}
							alt={$t('home.seasons.summer.imageAlt')}
							class="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[420px]"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-colors duration-500 group-hover:from-black/80 group-hover:via-black/50"
						></div>
						<div class="absolute bottom-0 left-0 right-0 p-6">
							<h3 class="text-2xl font-semibold text-white sm:text-3xl">
								{$t('seasons.summer.title')}
							</h3>
							<p class="mt-2 max-w-[34ch] text-sm text-white/90 sm:text-base">
								{$t('seasons.summer.body')}
							</p>
							<span
								class="mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm transition group-hover:bg-white group-hover:shadow-md"
							>
								{$t('seasons.summer.cta')}
								<ArrowRight
									class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</span>
						</div>
					</a>

					<a
						href={resolve('/erlebnisse/winter')}
						class="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 ring-1 ring-black/5 shadow-none transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
					>
						<img
							src={withAsset('/images/other/house-winter.jpg')}
							alt={$t('home.seasons.winter.imageAlt')}
							class="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[420px]"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent transition-colors duration-500 group-hover:from-black/80 group-hover:via-black/50"
						></div>
						<div class="absolute bottom-0 left-0 right-0 p-6">
							<h3 class="text-2xl font-semibold text-white sm:text-3xl">
								{$t('seasons.winter.title')}
							</h3>
							<p class="mt-2 max-w-[34ch] text-sm text-white/90 sm:text-base">
								{$t('seasons.winter.body')}
							</p>
							<span
								class="mt-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-sm transition group-hover:bg-white group-hover:shadow-md"
							>
								{$t('seasons.winter.cta')}
								<ArrowRight
									class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
									aria-hidden="true"
								/>
							</span>
						</div>
					</a>
				</div>
			</section>
		</div>
	</div>

	<!-- SUSTAINABILITY -->
	<div class="w-full bg-[#f1eee7]">
		<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
			<div class="rounded-3xl bg-white/35 p-8 ring-1 ring-black/5 sm:p-10">
				<div class="grid items-center gap-10 lg:grid-cols-2">
					<!-- Left: image card -->
					<div class="relative">
						<div class="relative overflow-hidden rounded-3xl">
							<img
								src={withAsset('/images/other/solar.png')}
								alt={$t('home.sustainability.imageAlt')}
								class="h-[320px] w-full object-cover sm:h-[380px]"
								loading="lazy"
							/>
							<div
								class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent"
							></div>
						</div>

						<!-- Floating icon tile (top-left) -->
						<div class="absolute left-5 top-5">
							<div
								class="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-600 text-white shadow-md ring-1 ring-black/5"
							>
								<Sun class="h-6 w-6" aria-hidden="true" />
							</div>
						</div>
					</div>

					<!-- Right: content -->
					<div class="space-y-5">
						<div
							class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700"
						>
							<Leaf class="h-4 w-4" aria-hidden="true" />
							{$t('home.sustainability.badge')}
						</div>
						<h2 class="text-3xl font-serif font-semibold leading-[0.95] text-slate-900 sm:text-4xl">
							{$t('home.sustainability.title.line1')}<br />{$t('home.sustainability.title.line2')}
						</h2>

						<p class="text-base font-medium text-slate-700">
							{$t('home.sustainability.lead')}
						</p>

						<ul class="space-y-2 text-sm leading-relaxed text-slate-600">
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
								<span>{$t('home.sustainability.bullet.solar')}</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
								<span>{$t('home.sustainability.bullet.heating')}</span>
							</li>
						</ul>

						<div class="mt-6 grid gap-4 sm:grid-cols-2">
							<!-- Solar / Photovoltaik -->
							<div class="rounded-2xl bg-white/60 p-4 ring-1 ring-black/5">
								<div class="flex items-start gap-3">
									<div
										class="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
									>
										<Sun class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.sustainability.solar.title')}
										</p>
										<p class="mt-1 text-xs text-slate-500">
											{$t('home.sustainability.solar.body')}
										</p>
									</div>
								</div>
							</div>

							<!-- Fernwärme -->
							<div class="rounded-2xl bg-white/60 p-4 ring-1 ring-black/5">
								<div class="flex items-start gap-3">
									<div
										class="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
									>
										<Flame class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.sustainability.heating.title')}
										</p>
										<p class="mt-1 text-xs text-slate-500">
											{$t('home.sustainability.heating.body')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>

	<section class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl bg-brand px-6 py-10 text-white sm:px-10 sm:py-12">
			<p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
				{$t('brand.name')}
			</p>
			<h2 class="mt-3 font-serif text-3xl leading-[0.95] text-white sm:text-4xl">
				{$t('cta.title')}
			</h2>
			<div class="mt-3 h-[3px] w-14 rounded-full bg-white/70"></div>
			<p class="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
				{$t('cta.body')}
			</p>

			<div class="mt-6 flex flex-wrap gap-3">
				<a
					href={resolve('/buchen')}
					class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white/90"
					onclick={() => trackEvent('Booking: Jetzt buchen', { source: 'home-cta' })}
				>
					{$t('cta.primary')}
				</a>
				<a
					href={resolve('/unterkuenfte-preise')}
					class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/95 transition hover:bg-white/10"
				>
					{$t('cta.secondary')}
				</a>
			</div>

			<div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/80">
				<span class="font-semibold text-white/90">{$t('contact.direct.title')}</span>
				<a
					class="hover:text-white"
					href="tel:+436766246826"
					onclick={() => trackEvent('Contact: Phone Click', { source: 'home', line: 'mobile' })}
				>
					+43 676 6246826
				</a>
				<span class="text-white/50">•</span>
				<a
					class="hover:text-white"
					href="tel:+434286222"
					onclick={() => trackEvent('Contact: Phone Click', { source: 'home', line: 'landline' })}
				>
					+43 4286 222
				</a>
				<span class="text-white/50">•</span>
				<a
					class="hover:text-white"
					href="mailto:info@rader-gitschtal.at"
					onclick={() => trackEvent('Contact: Email Click', { source: 'home' })}
				>
					info@rader-gitschtal.at
				</a>
			</div>
		</div>
	</section>
</div>

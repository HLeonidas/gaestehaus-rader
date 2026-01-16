<script lang="ts">
	import { lang, t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { accommodations } from '$lib/data/accommodations';
	import {
		Lightbulb,
		Wifi,
		Tv,
		Mountain,
		Coffee,
		Sun,
		Flame,
		ShowerHead,
		Bath,
		Baby,
		Sofa,
		SquareParking,
		Utensils,
		ArrowRight,
		Gavel,
		CreditCard,
		CigaretteOff,
		Clock,
	} from 'lucide-svelte';

	const amenityIcons: Record<string, typeof Wifi> = {
		wifi: Wifi,
		balcony: Sun,
		balkon: Sun,
		mountain: Mountain,
		coffee: Coffee,
		sauna: Flame,
		fireplace: Flame,
		shower: ShowerHead,
		bath: Bath,
		kitchen: Utensils,
		kueche: Utensils,
		badezimmer: Bath,
		fernseher: Tv,
		ausziehcouch: Sofa,
		parking: SquareParking,
	};

	const withAsset = (path: string) => asset(path);

	const rooms = accommodations;
	const accommodationsBase = resolve('/unterkuenfte-preise');
	const siteUrl = 'https://www.rader-gitschtal.at';
	const ogImage = $derived.by(() =>
		new URL(withAsset(rooms[0]?.images?.main ?? '/images/1/main.jpg'), siteUrl).toString()
	);
	const roomsJsonLd = $derived.by(() =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			itemListElement: rooms.map((room, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: room.title,
				url: new URL(`${accommodationsBase}/${room.slug}`, siteUrl).toString()
			}))
		})
	);

	function badgeClasses(badgeLabel: string) {
		if (badgeLabel === 'Exklusiv') {
			return 'bg-brand text-white';
		}
		return 'bg-slate-800/90 text-white';
	}
</script>

<svelte:head>
	<title>{$t('rooms.page.title')} · Gästehaus Rader</title>
	<meta name="description" content={$t('rooms.page.subtitle')} />
	<meta property="og:title" content={$t('rooms.page.title')} />
	<meta property="og:description" content={$t('rooms.page.subtitle')} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={new URL(accommodationsBase, siteUrl).toString()} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<script type="application/ld+json">{roomsJsonLd}</script>
</svelte:head>

<div class="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
	<div class="space-y-10">
		<!-- Header / breadcrumb -->
		<section class="space-y-4">
			<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
				{$t('rooms.page.breadcrumb')}
			</p>

			<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
				{$t('rooms.page.title')}
			</h1>
			<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
			<p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
				{$t('rooms.page.subtitle')}
			</p>
		</section>

		<!-- Content grid -->
		<section>
			<!-- Filter -->
			<!-- removed -->

			<!-- Room list -->
			<div class="space-y-10">
				{#each rooms as room}
					<article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
						<!-- Image -->
						<div class="relative">
							<a href={`${accommodationsBase}/${room.slug}`}>
								<img
									src={withAsset(room.images.main)}
									alt=""
									class="h-auto w-full object-cover sm:h-72"
									loading="lazy"
								/>
							</a>
							{#if room.badgeLabel}
								<span
									class={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm ${badgeClasses(
										room.badgeLabel
									)}`}
								>
									{room.badgeLabel}
								</span>
							{/if}
						</div>

						<!-- Content (split like screenshot) -->
						<div class="grid gap-8 p-6 md:grid-cols-[1.6fr,0.9fr] md:gap-0">
							<!-- Left -->
							<div class="md:pr-10">
								<h2 class="text-lg font-semibold text-slate-900 sm:text-xl">
									<a href={`${accommodationsBase}/${room.slug}`} class="hover:opacity-90">
										{room.title}
									</a>
								</h2>
								<p class="text-sm text-slate-700">{room.typeLabel[$lang]}</p>

								<div class="mt-2 text-xs text-slate-500">{room.detailMeta[$lang]}</div>

								<!-- <p class="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
									{room.detailBody}
								</p> -->

								<!-- Amenities row -->
								<div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-600">
									{#each room.amenities as amenity}
										<span class="inline-flex items-center gap-2">
											{#if amenityIcons[amenity]}
												{@const Icon = amenityIcons[amenity]}
												<Icon class="h-4 w-4 text-slate-400" />
											{/if}
											{$t(`amenity.${amenity}`)}
										</span>
									{/each}
								</div>
							</div>

							<!-- Right (divider + price + button) -->
							<div
								class="flex flex-col items-end justify-between md:border-l md:border-slate-200 md:pl-10"
							>
								<div class="text-right">
									<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
										{$t('rooms.page.from')}
									</p>
									<div class="mt-2 flex items-end justify-end gap-2">
										<p class="text-2xl font-semibold text-brand">€{room.pricePerNightBase}</p>
										<span class="pb-1 text-xs text-slate-500">/ {$t('price.night')}</span>
									</div>
								</div>

								<div class="mt-6 flex flex-wrap items-center justify-end gap-3">
									<a
										href={`${accommodationsBase}/${room.slug}`}
										class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand/30"
									>
										See details
									</a>
									<a
										href={resolve('/buchen')}
										class="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30"
									>
										{$t('rooms.page.cta')}
										<ArrowRight class="h-4 w-4" />
									</a>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- Bottom section -->
		<section class="space-y-10">
			<div class="text-center space-y-3 pt-15">
				<p class="text-xs font-semibold tracking-[0.35em] uppercase text-brand">
					{$t('rooms.page.inclusive.kicker')}
				</p>

				<h2 class="font-serif text-3xl sm:text-4xl text-slate-900">
					{$t('rooms.page.inclusive.title')}
				</h2>

				<div class="mx-auto h-[2px] w-10 rounded-full bg-brand"></div>
			</div>

			<!-- Inclusive services tiles -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<Lightbulb class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">
						{$t('rooms.page.inclusive.power')}
					</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
						{$t('rooms.page.inclusive.free')}
					</p>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<Wifi class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">
						{$t('rooms.page.inclusive.wifi')}
					</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
						{$t('rooms.page.inclusive.free')}
					</p>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<Baby class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">
						{$t('rooms.page.inclusive.kids')}
					</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
						{$t('rooms.page.inclusive.free')}
					</p>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<SquareParking class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">
						{$t('rooms.page.inclusive.parking')}
					</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
						{$t('rooms.page.inclusive.free')}
					</p>
				</div>
			</div>

			<!-- Price info card -->
			<div class="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-8">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div class="min-w-0">
						<h2 class="text-2xl font-medium tracking-tight text-slate-900 sm:text-2xl">
							{$t('rooms.page.pricing.title')}
						</h2>
						<p class="mt-2 text-sm text-slate-500">
							{$t('rooms.page.pricing.subtitle')}
						</p>
					</div>

					<span
						class="inline-flex items-center rounded-full border border-brand/15 bg-brand/10 px-4 py-2 text-xs font-semibold text-brand"
					>
						{$t('rooms.page.pricing.kids')}
					</span>
				</div>

				<div class="mt-6 divide-y divide-slate-100">
					<div class="flex items-center justify-between gap-6 py-5">
						<p class="text-sm text-slate-700">
							{$t('rooms.page.pricing.extraPrefix')}
							<span class="font-semibold text-slate-900">{$t('rooms.page.pricing.extraHighlight')}</span>
							{$t('rooms.page.pricing.extraSuffix')}
						</p>
						<span class="whitespace-nowrap text-sm font-semibold text-slate-900">
							{$t('rooms.page.pricing.extraPrice')}
						</span>
					</div>

					<div class="flex items-center justify-between gap-6 py-5">
						<div>
							<p class="text-sm text-slate-700">{$t('rooms.page.pricing.tax')}</p>
							<p class="mt-1 text-xs text-slate-400">
								{$t('rooms.page.pricing.tax.note')}
							</p>
						</div>
						<span class="whitespace-nowrap text-sm font-semibold text-slate-900">
							{$t('rooms.page.pricing.tax.price')}
						</span>
					</div>

					<div class="flex items-center justify-between gap-6 py-5">
						<p class="text-sm font-semibold text-slate-800">{$t('rooms.page.pricing.cleaning')}</p>
						<span class="whitespace-nowrap text-sm font-semibold text-slate-900">
							{$t('rooms.page.pricing.cleaningPrice')}
						</span>
					</div>
				</div>

				<p class="mt-5 inline-flex items-center gap-2 text-xs italic text-slate-400">
					<span aria-hidden="true">🐾</span>
					{$t('rooms.page.pricing.petsNote')}
				</p>
			</div>

			<!-- Info blocks (with icons like design) -->
			<div class="grid gap-10 pt-2 md:grid-cols-2">
				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<CreditCard class="h-5 w-5" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-slate-900">
							{$t('rooms.page.info.payment.title')}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							{$t('rooms.page.info.payment.prefix')}
							<span class="font-semibold text-slate-900">
								{$t('rooms.page.info.payment.highlightCash')}
							</span>
							{$t('rooms.page.info.payment.middle')}
							<span class="font-semibold text-slate-900">
								{$t('rooms.page.info.payment.highlightTransfer')}
							</span>
							{$t('rooms.page.info.payment.suffix')}
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<Clock class="h-5 w-5" />
					</div>
					<div class="w-full">
						<h3 class="text-lg font-semibold text-slate-900">
							{$t('rooms.page.info.arrival.title')}
						</h3>

						<div class="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
							<div class="flex items-center justify-between px-4 py-3 text-sm">
								<span class="font-semibold text-slate-900">
									{$t('rooms.page.info.arrival.checkin')}
								</span>
								<span class="text-slate-600">{$t('rooms.page.info.arrival.checkinTime')}</span>
							</div>
							<div class="flex items-center justify-between px-4 py-3 text-sm">
								<span class="font-semibold text-slate-900">
									{$t('rooms.page.info.arrival.checkout')}
								</span>
								<span class="text-slate-600">{$t('rooms.page.info.arrival.checkoutTime')}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<SquareParking class="h-5 w-5" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-slate-900">
							{$t('rooms.page.info.parking.title')}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							<span class="font-semibold text-slate-900">
								{$t('rooms.page.info.parking.highlightFree')}
							</span>
							{$t('rooms.page.info.parking.middle')}
							<span class="font-semibold text-slate-900">
								{$t('rooms.page.info.parking.highlightGuesthouse')}
							</span>
							{$t('rooms.page.info.parking.suffix')}
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<CigaretteOff class="h-5 w-5" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-slate-900">
							{$t('rooms.page.info.smoking.title')}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							{$t('rooms.page.info.smoking.prefix')}
							<span class="font-semibold text-slate-900">
								{$t('rooms.page.info.smoking.highlight')}
							</span>
							{$t('rooms.page.info.smoking.suffix')}
						</p>
					</div>
				</div>
			</div>

			<!-- Cancellation card (like design) -->
			<div class="rounded-2xl border border-brand/15 bg-brand/5 p-6 sm:p-7">
				<div class="flex items-start gap-4">
					<div
						class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white shadow-sm"
					>
						<Gavel class="h-5 w-5" />
					</div>

					<div class="min-w-0">
						<h3 class="text-lg font-semibold text-slate-900 sm:text-xl">
							{$t('rooms.page.info.cancellation.title')}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							{$t('rooms.page.info.cancellation.prefix')}
							<span class="font-semibold text-slate-900">
								{$t('rooms.page.info.cancellation.highlight')}
							</span>
							{$t('rooms.page.info.cancellation.middle')}
							<a
								class="font-semibold text-brand hover:opacity-90"
								href="https://www.europaeische.at"
								target="_blank"
								rel="noreferrer"
							>
								{$t('rooms.page.info.cancellation.link')}
							</a>.
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

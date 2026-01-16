<script lang="ts">
	import { lang, t } from '$lib/i18n';
	import { asset, resolve } from '$app/paths';
	import { accommodations } from '$lib/data/accommodations';
	import {
		Mountain,
		HeartHandshake,
		Snowflake,
		ArrowRight,
		Leaf,
		Sun,
		Flame,
		Sparkles,
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
		Bath
	} from 'lucide-svelte';

	const usps = [
		{ key: 1, icon: House },
		{ key: 2, icon: Mountain },
		{ key: 3, icon: HeartHandshake },
		{ key: 4, icon: Snowflake },
	];

	const withAsset = (path: string) => asset(path);
	const currentMonth = new Date().getMonth();
	const heroImage =
		currentMonth >= 4 && currentMonth <= 8
			? withAsset('/images/balkon-ausblick.jpg')
			: withAsset('/images/winter-balkon_ausblick-1.jpg');

	const rooms = accommodations;
	const accommodationsBase = resolve('/unterkuenfte-preise');
	const siteUrl = 'https://rader-gitschtal.at';
	const ogImage = $derived.by(() => new URL(heroImage, siteUrl).toString());
	const homeJsonLd = $derived.by(() =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'LodgingBusiness',
			name: 'Gästehaus Rader',
			url: siteUrl,
			image: ogImage,
			address: {
				'@type': 'PostalAddress',
				streetAddress: 'Weißbriach 92',
				postalCode: '9622',
				addressLocality: 'Weißbriach',
				addressCountry: 'AT'
			},
			telephone: '+43 676 6246826',
			email: 'info@rader-gitschtal.at'
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
</script>

<svelte:head>
	<title>Gästehaus Rader</title>
	<meta name="description" content={$t('hero.subtitle')} />
	<meta property="og:title" content={$t('hero.title')} />
	<meta property="og:description" content={$t('hero.subtitle')} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<script type="application/ld+json">{homeJsonLd}</script>
</svelte:head>

<div class="space-y-16 pb-16">
	<section class="relative min-h-screen">
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
			class="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center text-white sm:px-10"
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
		<div class="space-y-16">
			<section class="grid gap-6 lg:grid-cols-4">
				{#each usps as item}
					<div
						class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
					>
						<div class="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
							<item.icon class="h-5 w-5" aria-hidden="true" />
						</div>
						<h3 class="mt-4 text-base font-semibold text-slate-900">
							{$t(`usp.${item.key}.title`)}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							{$t(`usp.${item.key}.body`)}
						</p>
					</div>
				{/each}
			</section>

			<!-- ROOMS -->
			<section>
				<div class="flex flex-wrap items-end justify-between gap-4">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
							{$t('rooms.section.kicker')}
						</p>
						<h2 class="mt-3 text-4xl font-serif font-medium leading-[0.95] text-slate-900">
							{$t('rooms.section.title')}
						</h2>
						<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					</div>
					<div class="flex items-center justify-between gap-4">
						<a
							href={resolve('/unterkuenfte-preise')}
							class="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-brand hover:opacity-90"
						>
							{$t('rooms.section.cta')}
							<ArrowRight class="h-4 w-4" aria-hidden="true" />
						</a>
					</div>
				</div>

				<div class="mt-8">
					<div
						class="mt-5 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 scroll-pl-4 scroll-pr-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:scroll-pl-0 sm:scroll-pr-0"
					>
						{#each rooms as r}
							<a
								href={`${accommodationsBase}/${r.slug}`}
								class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:w-[340px]"
							>
								<!-- Image -->
								<div class="relative">
									<img
										src={withAsset(r.images.main)}
										alt={`${$t('home.rooms.card.imageAltPrefix')} ${r.title}`}
										class="h-[260px] w-full object-cover sm:h-[280px]"
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
								<div class="px-5 pb-4 pt-4">
									<h3 class="text-base font-semibold tracking-tight text-slate-900">
										{r.title}
									</h3>

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
									class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/20"
								></div>
							</a>
						{/each}
					</div>
				</div>
			</section>
		</div>
	</div>

	<!-- SUSTAINABILITY -->
	<div class="w-full bg-[#f1eee7]">
		<section class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
			<div class="rounded-3xl px-0 py-0 sm:px-10 sm:py-12">
				<div class="grid items-center gap-10 lg:grid-cols-2">
					<!-- Left: image card -->
					<div class="relative">
						<div class="relative overflow-hidden rounded-3xl">
							<img
								src={withAsset('/images/solar.png')}
								alt={$t('home.sustainability.imageAlt')}
								class="h-[320px] w-full object-cover sm:h-[380px]"
								loading="lazy"
							/>
							<div
								class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent"
							></div>
						</div>

						<!-- Floating icon tile (bottom-right) -->
						<div class="absolute -bottom-6 right-6">
							<div
								class="grid h-20 w-20 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg ring-1 ring-black/5"
							>
								<Sun class="h-8 w-8" aria-hidden="true" />
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

						<div class="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
							<p>{$t('home.sustainability.body1')}</p>
							<p>{$t('home.sustainability.body2')}</p>
						</div>

						<div class="mt-6 border-t border-slate-200 pt-6">
							<div class="grid gap-5 sm:grid-cols-2">
								<!-- Solar / Photovoltaik -->
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
										<p class="text-xs text-slate-500">
											{$t('home.sustainability.solar.body')}
										</p>
									</div>
								</div>

								<!-- Fernw„rme -->
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
										<p class="text-xs text-slate-500">
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

	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-16">
			<!-- SEASONS -->
			<section class="rounded-3xl bg-[#f3efe6] px-6 py-12 sm:px-10 sm:py-14">
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

				<div class="mt-10 grid gap-6 lg:grid-cols-2">
					<a
						href={resolve('/erlebnisse/sommer')}
						class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm"
					>
						<img
							src={withAsset('/images/house-summer.jpg')}
							alt={$t('home.seasons.summer.imageAlt')}
							class="h-64 w-full object-cover sm:h-72"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
						></div>
						<div class="absolute bottom-0 left-0 right-0 p-6">
							<h3 class="text-xl font-semibold text-white">
								{$t('seasons.summer.title')}
							</h3>
							<p class="mt-1 text-sm text-white/85">
								{$t('seasons.summer.body')}
							</p>
							<span
								class="mt-4 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition group-hover:translate-y-[-1px]"
							>
								{$t('seasons.summer.cta')}
							</span>
						</div>
					</a>

					<a
						href={resolve('/erlebnisse/winter')}
						class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm"
					>
						<img
							src={withAsset('/images/house-winter.jpg')}
							alt={$t('home.seasons.winter.imageAlt')}
							class="h-64 w-full object-cover sm:h-72"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
						></div>
						<div class="absolute bottom-0 left-0 right-0 p-6">
							<h3 class="text-xl font-semibold text-white">
								{$t('seasons.winter.title')}
							</h3>
							<p class="mt-1 text-sm text-white/85">
								{$t('seasons.winter.body')}
							</p>
							<span
								class="mt-4 inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition group-hover:translate-y-[-1px]"
							>
								{$t('seasons.winter.cta')}
							</span>
						</div>
					</a>
				</div>
			</section>

			<!-- AUSSTATTUNG (unter den Jahreszeiten einfügen) -->
			<section class="rounded-3xl px-0 py-0 sm:px-10 sm:py-14">
				<div class="flex items-center gap-3">
					<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
						<Sparkles class="h-5 w-5" aria-hidden="true" />
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
							{$t('home.amenities.kicker')}
						</p>
						<h2 class="mt-2 text-3xl font-serif font-semibold leading-[0.95] text-slate-900 sm:text-4xl">
							{$t('home.amenities.title')}
						</h2>
						<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
					</div>
				</div>

				<p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
					{$t('home.amenities.subtitle')}
				</p>

				<div class="mt-10 space-y-12">
					<!-- Basis-Komfort -->
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="text-brand">
								<BedDouble class="h-5 w-5" aria-hidden="true" />
							</div>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('home.amenities.basic.title')}
							</h3>
						</div>

						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Bed class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.basic.bedding.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.basic.bedding.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<ShowerHead class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.basic.towels.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.basic.towels.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Leaf class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.basic.care.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.basic.care.body')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Küche -->
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="text-brand">
								<Microwave class="h-5 w-5" aria-hidden="true" />
							</div>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('home.amenities.kitchen.title')}
							</h3>
						</div>

						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Microwave class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.kitchen.kitchenette.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.kitchen.kitchenette.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Coffee class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.kitchen.espresso.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.kitchen.espresso.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<CupSoda class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.kitchen.kettle.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.kitchen.kettle.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Utensils class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.kitchen.dishes.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.kitchen.dishes.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Sandwich class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.kitchen.toaster.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.kitchen.toaster.body')}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Haus-Ausstattung -->
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="text-brand">
								<House class="h-5 w-5" aria-hidden="true" />
							</div>
							<h3 class="text-base font-semibold text-slate-900">
								{$t('home.amenities.house.title')}
							</h3>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Wifi class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.house.wifi.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.house.wifi.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<SquareParking class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.house.parking.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.house.parking.body')}
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
										<Snowflake class="h-5 w-5" aria-hidden="true" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">
											{$t('home.amenities.house.ski.title')}
										</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											{$t('home.amenities.house.ski.body')}
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
</div>

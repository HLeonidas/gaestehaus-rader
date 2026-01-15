<script lang="ts">
	import { t } from '$lib/i18n';
	import { base } from '$app/paths';
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
		Coffee,
		CupSoda,
		Utensils,
		Sandwich,
		House,
		Wifi,
		SquareParking,
	} from 'lucide-svelte';

	const usps = [
		{ key: 1, icon: Mountain },
		{ key: 2, icon: Mountain },
		{ key: 3, icon: HeartHandshake },
		{ key: 4, icon: Snowflake },
	];

	const withBase = (path: string) => `${base}${path}`;

	const rooms = [
		{
			key: 1,
			badge: 'Beliebt',
			img: withBase('/images/room-1.jpg'),
			price: 150,
			meta: '45 m² · 2–4 Gäste · Mountain View',
			amenities: ['wifi', 'balcony', 'mountain'],
		},
		{
			key: 2,
			badge: null,
			img: withBase('/images/room-2.jpg'),
			price: 120,
			meta: '32 m² · 2 Gäste · Valley View',
			amenities: ['wifi', 'balcony'],
		},
		{
			key: 3,
			badge: null,
			img: withBase('/images/room-3.jpg'),
			price: 110,
			meta: '28 m² · 1–2 Gäste · Forest View',
			amenities: ['wifi', 'parking', 'pet'],
		},
	];
</script>

<svelte:head>
	<title>Gästehaus Rader</title>
</svelte:head>

<div class="space-y-16 pb-16">
	<section class="relative min-h-screen">
		<div class="absolute inset-0">
			<div
				class="h-full w-full bg-cover bg-center"
				style={`background-image: url('${withBase('/images/house-winter.jpg')}');`}
				aria-hidden="true"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15"
				aria-hidden="true"
			/>
			<div
				class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_55%)]"
				aria-hidden="true"
			/>
		</div>

		<div
			class="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 text-center text-white sm:px-10"
		>
			<h1 class="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
				{$t('hero.title')}
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-sm text-white/85 sm:text-base">
				{$t('hero.subtitle')}
			</p>

			<div class="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
				<a
					href={withBase('/unterkuenfte-preise')}
					class="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/60"
				>
					{$t('hero.cta.primary')}
				</a>
				<a
					href={withBase('/ueber-uns')}
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
							<svelte:component this={item.icon} class="h-5 w-5" />
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
							href={withBase('/unterkuenfte-preise')}
							class="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-brand hover:opacity-90"
						>
							{$t('rooms.section.cta')}
							<ArrowRight class="h-4 w-4" />
						</a>
					</div>
				</div>

				<div class="mt-8">
					<div
						class="mt-5 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
					>
						{#each rooms as r}
							<a
								href={withBase('/unterkuenfte-preise')}
								class="group relative w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:w-[340px]"
							>
								<!-- Image -->
								<div class="relative">
									<img
										src={r.img}
										alt=""
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
										{$t(`rooms.card.${r.key}.title`)}
									</h3>

									<!-- Meta line (small, muted) -->
									<p class="mt-2 text-xs text-slate-500">
										{$t(`rooms.card.${r.key}.meta`)}
									</p>

									<!-- Amenities (optional) -->
									{#if r.amenities?.length}
										<div class="mt-4 flex items-center gap-3 text-slate-500">
											{#each r.amenities as a}
												<!-- Use any icon you like; here are tiny placeholders as circles -->
												<span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
													<span class="h-3 w-3 rounded bg-slate-400/70" />
												</span>
											{/each}
										</div>
									{:else}
										<!-- Keep spacing similar to screenshot even without amenities -->
										<div class="mt-4 h-7" />
									{/if}
								</div>

								<!-- Hover ring -->
								<div
									class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/20"
								/>
							</a>
						{/each}
					</div>
				</div>
			</section>

			<!-- SUSTAINABILITY -->
			<div class="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#f1eee7]">
				<section class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
					<div
						class="rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
					>
						<div class="grid items-center gap-10 lg:grid-cols-2">
							<!-- Left: image card -->
							<div class="relative">
								<div class="relative overflow-hidden rounded-3xl">
									<img
										src={withBase("/images/solar.png")}
										alt=""
										class="h-[320px] w-full object-cover sm:h-[380px]"
										loading="lazy"
									/>
									<div
										class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-transparent"
									/>
								</div>

								<!-- Floating icon tile (bottom-right) -->
								<div class="absolute -bottom-6 right-6">
									<div
										class="grid h-20 w-20 place-items-center rounded-2xl bg-emerald-600 text-white shadow-lg ring-1 ring-black/5"
									>
										<Sun class="h-8 w-8" />
									</div>
								</div>
							</div>

							<!-- Right: content -->
							<div class="space-y-5">
								<div
									class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700"
								>
									<Leaf class="h-4 w-4" />
									ECO-FRIENDLY
								</div>

								<h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
									Nachhaltigkeit aus<br />Leidenschaft
								</h2>

								<div class="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
									<p>
										At Gästehaus Rader, our love for the mountains goes hand in hand
										with our commitment to preserving them. We believe that true
										hospitality means taking responsibility for the environment that
										hosts us.
									</p>
									<p>
										To protect the pristine alpine environment, we produce our own
										green energy via high-efficiency on-site solar panels. By
										harnessing the power of the Carinthian sun, we minimize our
										carbon footprint while providing you with a modern, guilt-free
										luxury experience.
									</p>
								</div>

								<div class="mt-6 border-t border-slate-200 pt-6">
									<div class="grid gap-5 sm:grid-cols-2">
										<!-- Solar / Photovoltaik -->
										<div class="flex items-start gap-3">
											<div
												class="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
											>
												<Sun class="h-5 w-5" />
											</div>
											<div>
												<p class="text-sm font-semibold text-slate-900">
													Solar & Photovoltaik
												</p>
												<p class="text-xs text-slate-500">
													Eigenstrom vom Dach - direkt vor Ort genutzt.
												</p>
											</div>
										</div>

										<!-- Fernw„rme -->
										<div class="flex items-start gap-3">
											<div
												class="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
											>
												<Flame class="h-5 w-5" />
											</div>
											<div>
												<p class="text-sm font-semibold text-slate-900">
													Heizung mit Fernw„rme
												</p>
												<p class="text-xs text-slate-500">
													W„rmeversorgung aus dem Dorf - effizient und verl„sslich.
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

			<!-- SEASONS -->
			<section class="rounded-3xl bg-[#f3efe6] px-6 py-12 sm:px-10 sm:py-14">
				<div class="text-center">
					<h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
						{$t('seasons.title')}
					</h2>
					<p class="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
						{$t('seasons.subtitle')}
					</p>
				</div>

				<div class="mt-10 grid gap-6 lg:grid-cols-2">
					<a
						href={withBase('/erlebnisse/sommer')}
						class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm"
					>
						<img
							src={withBase('/images/house-summer.jpg')}
							alt=""
							class="h-64 w-full object-cover sm:h-72"
							loading="lazy"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
						href={withBase('/erlebnisse/winter')}
						class="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 shadow-sm"
					>
						<img
							src={withBase('/images/house-winter.jpg')}
							alt=""
							class="h-64 w-full object-cover sm:h-72"
							loading="lazy"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
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
			<section
				class="rounded-3xl px-6 py-12 sm:px-10 sm:py-14"
			>
				<div class="flex items-center gap-3">
					<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
						<Sparkles class="h-5 w-5" />
					</div>

					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Ausstattung</p>
						<h2 class="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
							In allen Appartements inklusive
						</h2>
					</div>
				</div>

				<p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
					Alles, was Sie für einen entspannten Aufenthalt brauchen – von Basis-Komfort über Küche bis zur
					Haus-Ausstattung. Ohne Aufpreis, in jedem Appartement.
				</p>

				<div class="mt-10 space-y-12">
					<!-- Basis-Komfort -->
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<div class="text-brand">
								<BedDouble class="h-5 w-5" />
							</div>
							<h3 class="text-base font-semibold text-slate-900">Basis-Komfort</h3>
						</div>

						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Bed class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Hochwertige Bettwäsche</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Feinste ägyptische Baumwolle für einen tiefen, erholsamen Schlaf.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<ShowerHead class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Frische Handtücher</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Extra flauschige Handtücher und Bademäntel für Ihren Wellness-Moment.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Leaf class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Bio-Pflegeprodukte</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Nachhaltige Seifen und Shampoos mit alpinen Kräuterextrakten.
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
								<Microwave class="h-5 w-5" />
							</div>
							<h3 class="text-base font-semibold text-slate-900">Küche</h3>
						</div>

						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Microwave class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Küchenzeile</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Voll ausgestattet mit Induktionsherd und Mikrowelle.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Coffee class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Nespresso-Maschine</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Inklusive einer Auswahl an Premium-Kaffeekapseln.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<CupSoda class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Wasserkocher</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Sowie ein Teesortiment für gemütliche Abende.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Utensils class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Geschirr-Set</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Vollständiges Set für 4 Personen inklusive Weingläsern.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Sandwich class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Toaster</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Moderner Toaster für Ihr perfektes Berg-Frühstück.
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
								<House class="h-5 w-5" />
							</div>
							<h3 class="text-base font-semibold text-slate-900">Haus-Ausstattung</h3>
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Wifi class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">High-Speed WLAN</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Kostenloses Glasfaser-Internet im gesamten Resort für Ihre Verbindung zur Welt.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<SquareParking class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Privater Parkplatz</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Sicherer, kameraüberwachter Parkplatz direkt vor dem Haupteingang.
										</p>
									</div>
								</div>
							</div>

							<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
								<div class="flex items-start gap-3">
									<div class="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
										<Snowflake class="h-5 w-5" />
									</div>
									<div>
										<p class="text-sm font-semibold text-slate-900">Skiraum mit Trockner</p>
										<p class="mt-1 text-xs leading-relaxed text-slate-500">
											Beheizter Abstellraum für Ihre Skiausrüstung mit integriertem Schuhtrockner.
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

<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { t } from '$lib/i18n';
	import {
		ArrowLeft,
		Coffee,
		Copy,
		Heart,
		MapPin,
		Mountain,
		Share2,
		SquareParking,
		Star,
		Sun,
		Utensils,
		Users,
		Wifi
	} from 'lucide-svelte';

	let { data } = $props();
	const accommodation = data.accommodation;

	const withAsset = (path: string) => asset(path);

	const amenityIcons = {
		wifi: Wifi,
		balcony: Sun,
		mountain: Mountain,
		coffee: Coffee,
		kitchen: Utensils,
		parking: SquareParking
	} as const;

	// helper for "+X Bilder" overlay
	const galleryCount = accommodation?.images?.gallery?.length ?? 0;
	const overlayMore = Math.max(0, galleryCount - 2);

	// reviews carousel UI-only
	let reviewIndex = 0;
	const visibleReviews = 3; // like screenshot
	const canPrev = reviewIndex > 0;
	const canNext = reviewIndex + visibleReviews < (accommodation?.reviews?.length ?? 0);
</script>

<svelte:head>
	<title>{accommodation.title} – Gästehaus Rader</title>
</svelte:head>

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
		<section class="rounded-3xl bg-transparent">
			<!-- Back -->
			<a
				href={resolve('/unterkuenfte-preise')}
				class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand hover:opacity-90"
			>
				<ArrowLeft class="h-4 w-4" />
				Zurück
			</a>

			<!-- GALLERY -->
			<div class="mt-6 grid gap-4 lg:grid-cols-[1fr,340px]">
				<!-- Left big -->
				<div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
					<img
						src={withAsset(accommodation.images.main)}
						alt=""
						class="h-[320px] w-full object-cover sm:h-[380px] lg:h-[420px]"
						loading="lazy"
					/>
				</div>

				<!-- Right stack -->
				<div class="grid gap-4">
					<div class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
						<img
							src={withAsset(accommodation.images.gallery?.[0] ?? accommodation.images.main)}
							alt=""
							class="h-[152px] w-full object-cover sm:h-[180px] lg:h-[200px]"
							loading="lazy"
						/>
					</div>

					<div class="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
						<img
							src={withAsset(accommodation.images.gallery?.[1] ?? accommodation.images.main)}
							alt=""
							class="h-[152px] w-full object-cover sm:h-[180px] lg:h-[200px]"
							loading="lazy"
						/>

						{#if overlayMore > 0}
							<div class="absolute inset-0 bg-black/35"></div>
							<div class="absolute inset-0 grid place-items-center">
								<span
									class="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur"
								>
									+{overlayMore} Bilder
								</span>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- HEADER + SHARE -->
			<div class="mt-8 flex items-start justify-between gap-6">
				<div class="min-w-0">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Gästehaus Rader</p>
					<h1 class="font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
						{accommodation.title}
					</h1>
					<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
						{accommodation.subtitle}
					</p>
				</div>

				<button
					type="button"
					class="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
				>
					<Share2 class="h-4 w-4" />
					Teilen
				</button>
			</div>

			<!-- INFO CARDS (4) -->
			<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Größe</p>
					<p class="mt-1 text-sm font-semibold text-slate-900">{accommodation.attributes.size}</p>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Etage</p>
					<p class="mt-1 text-sm font-semibold text-slate-900">{accommodation.attributes.floor}</p>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Aussicht</p>
					<p class="mt-1 text-sm font-semibold text-slate-900">{accommodation.attributes.view}</p>
				</div>
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
					<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Gäste</p>
					<p class="mt-1 text-sm font-semibold text-slate-900">{accommodation.attributes.guests}</p>
				</div>
			</div>

			<!-- MAIN CONTENT + BOOKING CARD -->
			<div class="mt-10 grid gap-10 lg:grid-cols-[1fr,360px] lg:items-start">
				<!-- LEFT CONTENT -->
				<div class="space-y-12">
					<!-- Description -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">Ihr Zuhause in den Alpen</h2>
						<div class="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
							{#each accommodation.description as paragraph}
								<p>{paragraph}</p>
							{/each}
						</div>
					</section>

					<!-- Amenities -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">Ausstattung</h2>
						<div class="mt-5 grid gap-x-10 gap-y-4 text-sm text-slate-700 sm:grid-cols-2">
							{#each accommodation.amenities as amenity}
								{#if amenityIcons[amenity as keyof typeof amenityIcons]}
									<div class="flex items-center gap-3">
										<span class="grid h-8 w-8 place-items-center rounded-xl bg-brand/10 text-brand">
											<svelte:component
												this={amenityIcons[amenity as keyof typeof amenityIcons]}
												class="h-4 w-4"
											></svelte:component>
										</span>
										<span>{$t(`amenity.${amenity}`)}</span>
									</div>
								{/if}
							{/each}
						</div>
					</section>

					<!-- Floorplan -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">Grundriss</h2>
						<div class="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
							<img
								src={withAsset(accommodation.floorplanImage)}
								alt=""
								class="h-72 w-full object-contain p-6 sm:h-80"
								loading="lazy"
							/>
						</div>
					</section>

					<!-- Prices & Details TABLE -->
					<section>
						<h2 class="text-2xl font-serif text-slate-900">Preise & Details</h2>

						<div class="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
							<table class="w-full text-left text-sm">
								<thead class="bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
									<tr>
										<th class="px-4 py-3">Zeitraum</th>
										<th class="px-4 py-3">Preis / Nacht</th>
										<th class="px-4 py-3">Aufschlag / Person</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-slate-100">
									{#each accommodation.priceMatrix as row}
										<tr class="text-slate-700">
											<td class="px-4 py-3 font-medium text-slate-900">{row.period}</td>
											<td class="px-4 py-3 font-semibold text-brand">{row.pricePerNight}</td>
											<td class="px-4 py-3 font-semibold text-slate-900">{row.extraPerson}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<p class="mt-3 text-xs text-slate-500">
							<!-- Alle Preise inkl. gesetzlicher MwSt. zzgl. Endreinigung (einmalig {accommodation.cleaningFee ?? '45€'}) und Kurtaxe. -->
						</p>
					</section>

					<!-- Reviews carousel -->
					<section>
						<div class="flex items-center justify-between gap-4">
							<h2 class="text-2xl font-serif text-slate-900">Gästebewertungen</h2>

							<div class="flex items-center gap-2">
								<button
									type="button"
									class={`grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 ${
										!canPrev ? 'opacity-40 pointer-events-none' : ''
									}`}
									onclick={() => (reviewIndex = Math.max(0, reviewIndex - 1))}
									aria-label="Vorherige Bewertungen"
								>
									‹
								</button>
								<button
									type="button"
									class={`grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50 ${
										!canNext ? 'opacity-40 pointer-events-none' : ''
									}`}
									onclick={() => (reviewIndex = Math.min((accommodation.reviews.length ?? 0) - visibleReviews, reviewIndex + 1))}
									aria-label="Nächste Bewertungen"
								>
									›
								</button>
							</div>
						</div>

						<div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each accommodation.reviews.slice(reviewIndex, reviewIndex + visibleReviews) as review}
								<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
									<p class="mt-3 text-sm leading-relaxed text-slate-600">“{review.text}”</p>

									<div class="mt-4 flex items-center gap-3">
										<div class="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
											<!-- {review.initials ?? review.name?.slice(0, 2)?.toUpperCase()} -->
										</div>
										<div class="min-w-0">
											<p class="text-xs font-semibold text-slate-900">{review.name}</p>
											<!-- <p class="text-[11px] text-slate-500">{review.date ?? ''}</p> -->
										</div>
									</div>
								</div>
							{/each}
						</div>
					</section>
				</div>

				<!-- RIGHT BOOKING CARD (sticky) -->
				<aside class="lg:sticky lg:top-8">
					<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
						<div class="flex items-start justify-between gap-3">
							<div>
								<p class="text-sm font-semibold text-slate-900">
									ab <span class="text-2xl font-semibold text-slate-900">{accommodation.pricePerNightBase}€</span>
									<span class="text-xs text-slate-500">/ Nacht</span>
								</p>
							</div>
						</div>

						<div class="mt-5 space-y-3">
							<div>
								<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Anreise</p>
								<button
									type="button"
									class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:bg-slate-50"
								>
									Datum wählen
								</button>
							</div>

							<div>
								<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Abreise</p>
								<button
									type="button"
									class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:bg-slate-50"
								>
									Datum wählen
								</button>
							</div>

							<div>
								<p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Gäste</p>
								<button
									type="button"
									class="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-700 shadow-sm hover:bg-slate-50"
								>
									2 Erwachsene, 0 Kinder
								</button>
							</div>

							<button
								type="button"
								class="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
							>
								Jetzt anfragen / Buchen
							</button>

							<p class="text-center text-[11px] text-slate-500">Sie werden noch nicht belastet</p>
						</div>

						<!-- price breakdown (UI) -->
						<div class="mt-6 border-t border-slate-100 pt-5 text-sm">
							<div class="flex items-center justify-between text-slate-600">
								<span>120€ × 5 Nächte</span>
								<span>600€</span>
							</div>
							<div class="mt-2 flex items-center justify-between text-slate-600">
								<span>Endreinigung</span>
								<span>45€</span>
							</div>
							<div class="mt-2 flex items-center justify-between text-slate-600">
								<span>Kurtaxe</span>
								<span>15€</span>
							</div>

							<div class="mt-4 flex items-center justify-between font-semibold text-slate-900">
								<span>Gesamt</span>
								<span>660€</span>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</section>
	</div>
</main>

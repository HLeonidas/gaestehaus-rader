<script lang="ts">
	import { t } from '$lib/i18n';
	import { base } from '$app/paths';

	type SeasonKey = 'summer' | 'winter';

	const withBase = (path: string) => `${base}${path}`;
	let activeTab = $state<SeasonKey>('summer');

	const content: Record<SeasonKey, { title: string; subtitle: string; bg: string }> = {
		summer: {
			title: 'Sommer Erlebnisse im Gitschtal',
			subtitle:
				'Entdecken Sie unberhrte Natur, kristallklare Seen und alpine Abenteuer fr die ganze Familie.',
			bg: '/images/house-summer.jpg',
		},
		winter: {
			title: 'Winter Erlebnisse im Gitschtal',
			subtitle: 'Pulverschnee, Panorama und gemtliche Htten - erleben Sie die Alpen im Winter.',
			bg: '/images/house-winter.jpg',
		},
	};
</script>

<svelte:head>
	<title>{$t('experiences.title')} G„stehaus Rader</title>
</svelte:head>

<!-- ERLEBNISSE PAGE (Tailwind) -->
<!-- Requirements: Tailwind + your bg-brand/text-brand utilities available -->

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
		<!-- HERO -->
		<section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
			<!-- SWITCHER -->
			<div class="flex justify-center bg-white px-6 py-6">
				<div class="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 shadow-sm">
					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
							activeTab == 'summer'
								? 'bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900'
						}`}
						on:click={() => (activeTab = 'summer')}
					>
						<span aria-hidden="true">??</span>
						Sommer
					</button>
					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
							activeTab == 'winter'
								? 'bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900'
						}`}
						on:click={() => (activeTab = 'winter')}
					>
						<span aria-hidden="true">??</span>
						Winter
					</button>
				</div>
			</div>
		</section>

		<!-- CONTENT WRAPPER -->
		<div class="mt-10 space-y-12" id="aktivitaeten">
			<!-- INTRO + CARDS (SUMMER) -->
			{#if activeTab === 'summer'}
				<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
					<div class="grid gap-8 lg:grid-cols-[1.2fr,0.9fr] lg:items-start">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Aktiv & Natur</p>
							<h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
								Unvergessliche Momente in Kärnten
							</h2>
						</div>
						<p class="text-sm leading-relaxed text-slate-600 sm:text-base">
							Von gemütlichen Wanderungen bis hin zu rasanten Mountainbike-Touren – das Gitschtal bietet
							für jeden das richtige Tempo.
						</p>
					</div>

					<!-- grid like screenshot (DESIGN-ACCURATE inside max-w-6xl) -->
					<div class="experience-grid mt-8 gap-6">
						<!-- 1) Big landscape (top-left) -->
						<article class="experience-card c1 group relative overflow-hidden rounded-3xl">
							<img
								src={withBase('/images/summer-hike.jpg')}
								alt=""
								class="h-full w-full object-cover"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
							></div>

							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Wanderlust</p>
								<h3 class="mt-2 text-2xl font-semibold text-white">Wandern im Gitschtal</h3>
								<p class="mt-2 max-w-xl text-sm text-white/85">
									Entdecken Sie über 100km markierte Wanderwege direkt vor unserer Haustür.
								</p>
							</div>
						</article>

						<!-- 2) Tall portrait (top-right) -->
						<article class="experience-card c2 group relative overflow-hidden rounded-3xl">
							<img
								src={withBase('/images/summer-lake.png')}
								alt=""
								class="h-full w-full object-cover"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
							></div>

							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Erfrischung</p>
								<h3 class="mt-2 text-xl font-semibold text-white">Baden am Pressegger See</h3>
							</div>
						</article>

						<!-- 3) Small square (bottom-left) -->
						<article class="experience-card c3 group relative overflow-hidden rounded-3xl">
							<img
								src={withBase('/images/summer-bike.jpg')}
								alt=""
								class="h-full w-full object-cover"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
							></div>

							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Action</p>
								<h3 class="mt-2 text-xl font-semibold text-white">Mountainbike &amp; E-Bike</h3>
							</div>
						</article>

						<!-- 4) Wide landscape (bottom-right) -->
						<article class="experience-card c4 group relative overflow-hidden rounded-3xl">
							<img
								src={withBase('/images/summer-lift.png')}
								alt=""
								class="h-full w-full object-cover"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
							></div>

							<span
								class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
							>
								Inklusive Card
							</span>

							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Highlight</p>
								<h3 class="mt-2 text-2xl font-semibold text-white">Sommerbergbahnen</h3>
								<p class="mt-2 max-w-xl text-sm text-white/85">
									Mühelos auf den Gipfel: Kostenlose Nutzung der Bergbahnen in der Region Nassfeld.
								</p>
							</div>
						</article>
					</div>
				</section>
			{/if}

			<!-- INTRO + CARDS (WINTER) -->
			{#if activeTab === 'winter'}
				<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
					<div class="grid gap-8 lg:grid-cols-[1.2fr,0.9fr] lg:items-start">
						<div>
							<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Winterzauber</p>
							<h2 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
								Magische Wintertage in den Alpen
							</h2>
						</div>
						<p class="text-sm leading-relaxed text-slate-600 sm:text-base">
							Pulverschnee, Panorama und gemütliche Hütten – vom Skitag am Nassfeld bis zur Winterwanderung
							im Tal.
						</p>
					</div>

					<div class="mt-8 grid gap-6 lg:grid-cols-3">
						<article class="group relative overflow-hidden rounded-3xl lg:col-span-2">
							<img
								src={withBase('/images/winter-ski.jpg')}
								alt=""
								class="h-[260px] w-full object-cover sm:h-[300px]"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
							></div>
							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Skigebiet</p>
								<h3 class="mt-2 text-2xl font-semibold text-white">Skifahren am Nassfeld</h3>
								<p class="mt-2 max-w-xl text-sm text-white/85">
									Eines der größten Skigebiete Österreichs – perfekt für Familien und Genießer.
								</p>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/30"
							></div>
						</article>

						<article class="group relative overflow-hidden rounded-3xl">
							<img
								src={withBase('/images/winter-ice.jpg')}
								alt=""
								class="h-[260px] w-full object-cover sm:h-[300px]"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
							></div>
							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Natur-Eis</p>
								<h3 class="mt-2 text-xl font-semibold text-white">Eislaufen am Weißensee</h3>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/30"
							></div>
						</article>

						<article class="group relative overflow-hidden rounded-3xl">
							<img
								src={withBase('/images/winter-hike.jpg')}
								alt=""
								class="h-[260px] w-full object-cover"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
							></div>
							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Ruhe</p>
								<h3 class="mt-2 text-xl font-semibold text-white">Winterwandern</h3>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/30"
							></div>
						</article>

						<article class="group relative overflow-hidden rounded-3xl lg:col-span-2">
							<img
								src={withBase('/images/winter-crosscountry.jpg')}
								alt=""
								class="h-[260px] w-full object-cover"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
							></div>
							<span
								class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
							>
								beliebt
							</span>
							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Sport</p>
								<h3 class="mt-2 text-2xl font-semibold text-white">Langlaufen & Loipen</h3>
								<p class="mt-2 max-w-xl text-sm text-white/85">
									Perfekt präparierte Loipen in der Region Nassfeld–Pressegger See.
								</p>
							</div>
							<div
								class="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-brand/30"
							></div>
						</article>
					</div>
				</section>
			{/if}

			<!-- CTA BLOCK -->
			<section class="overflow-hidden rounded-3xl bg-[#221a12]">
				<div class="px-8 py-14 sm:px-12 sm:py-16">
					<h2 class="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
						Bereit für Ihren Traumurlaub im Gitschtal?
					</h2>
					<p class="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
						Sichern Sie sich jetzt Ihr Zimmer im Gästehaus Rader und erleben Sie die Region von ihrer
						schönsten Seite.
					</p>

					<div class="mt-8 flex flex-wrap gap-3">
						<a
							href={withBase('/kontakt')}
							class="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
						>
							Unverbindlich Anfragen
						</a>
						<a
							href={withBase('/unterkuenfte-preise')}
							class="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
						>
							Verfügbarkeit prüfen
						</a>
					</div>
				</div>
			</section>
		</div>
	</div>
</main>

<style>
	/* Mobile: untereinander */
	.experience-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem; /* entspricht gap-6 */
	}

	/* Desktop (wie Screenshot): 2 Reihen / 2 Spalten (8/4 feeling) */
	@media (min-width: 768px) {
		.experience-grid {
			grid-template-columns: 2fr 1fr;
			grid-template-rows: 320px 300px;
			grid-template-areas:
				'c1 c2'
				'c3 c4';
		}

		.c1 {
			grid-area: c1;
		}
		.c2 {
			grid-area: c2;
		}
		.c3 {
			grid-area: c3;
		}
		.c4 {
			grid-area: c4;
		}
	}

	/* sorgt dafür, dass die Karten die festgelegte Höhe sauber füllen */
	.experience-card {
		height: 100%;
	}
</style>

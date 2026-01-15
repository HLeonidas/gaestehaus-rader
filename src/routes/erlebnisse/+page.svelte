<script lang="ts">
	import { t } from '$lib/i18n';
	import { base } from '$app/paths';
	import { Snowflake, Sun } from 'lucide-svelte';

	type SeasonKey = 'summer' | 'winter';
	type ExperienceEvent = {
		id: string;
		season: SeasonKey;
		kicker: string;
		title: string;
		description?: string;
		image: string;
		className?: string;
		badge?: string;
		titleSize?: string;
		layout?: string;
	};

	const withBase = (path: string) => `${base}${path}`;
	let activeTab = $state<SeasonKey>('summer');

	const events: ExperienceEvent[] = [
		{
			id: 'summer-hike',
			season: 'summer',
			kicker: 'Wanderlust',
			title: 'Wandern im Gitschtal',
			description: 'Entdecken Sie über 100km markierte Wanderwege direkt vor unserer Haustür.',
			image: '/images/summer-hike.jpg',
			layout: 'summer',
			className: 'c1',
			titleSize: 'text-2xl',
		},
		{
			id: 'summer-lake',
			season: 'summer',
			kicker: 'Erfrischung',
			title: 'Baden am Pressegger See',
			image: '/images/summer-lake.png',
			layout: 'summer',
			className: 'c2',
			titleSize: 'text-xl',
		},
		{
			id: 'summer-bike',
			season: 'summer',
			kicker: 'Action',
			title: 'Mountainbike & E-Bike',
			image: '/images/summer-bike.jpg',
			layout: 'summer',
			className: 'c3',
			titleSize: 'text-xl',
		},
		{
			id: 'summer-lift',
			season: 'summer',
			kicker: 'Highlight',
			title: 'Sommerbergbahnen',
			description: 'Mühelos auf den Gipfel: Kostenlose Nutzung der Bergbahnen in der Region Nassfeld.',
			image: '/images/summer-lift.png',
			layout: 'summer',
			className: 'c4',
			badge: 'Inklusive Card',
			titleSize: 'text-2xl',
		},
		{
			id: 'winter-ski',
			season: 'winter',
			kicker: 'Skigebiet',
			title: 'Skifahren am Nassfeld',
			description: 'Eines der größten Skigebiete Österreichs – perfekt für Familien und Genießer.',
			image: '/images/winter-ski.jpg',
			layout: 'winter',
			className: 'lg:col-span-2',
			titleSize: 'text-2xl',
		},
		{
			id: 'winter-ice',
			season: 'winter',
			kicker: 'Natur-Eis',
			title: 'Eislaufen am Weißensee',
			image: '/images/winter-ice.jpg',
			layout: 'winter',
			className: '',
			titleSize: 'text-xl',
		},
		{
			id: 'winter-hike',
			season: 'winter',
			kicker: 'Ruhe',
			title: 'Winterwandern',
			image: '/images/winter-hike.jpg',
			layout: 'winter',
			className: '',
			titleSize: 'text-xl',
		},
		{
			id: 'winter-crosscountry',
			season: 'winter',
			kicker: 'Sport',
			title: 'Langlaufen & Loipen',
			description: 'Perfekt präparierte Loipen in der Region Nassfeld–Pressegger See.',
			image: '/images/winter-crosscountry.jpg',
			layout: 'winter',
			className: 'lg:col-span-2',
			badge: 'beliebt',
			titleSize: 'text-2xl',
		},
	];

	const summerEvents = events.filter((event) => event.season === 'summer');
	const winterEvents = events.filter((event) => event.season === 'winter');
	const currentEvents = $derived(activeTab === 'summer' ? summerEvents : winterEvents);

	const content: Record<SeasonKey, { kicker: string; title: string; subtitle: string; bg: string }> = {
		summer: {
			kicker: 'Aktiv & Natur',
			title: 'Sommer Erlebnisse im Gitschtal',
			subtitle:
				'Entdecken Sie unberührte Natur, kristallklare Seen und alpine Abenteuer für die ganze Familie.',
			bg: '/images/house-summer.jpg',
		},
		winter: {
			kicker: 'Schnee & Stille',
			title: 'Winter Erlebnisse im Gitschtal',
			subtitle: 'Pulverschnee, Panorama und gemütliche Hütten - erleben Sie die Alpen im Winter.',
			bg: '/images/house-winter.jpg',
		},
	};
	const currentContent = $derived(content[activeTab]);
</script>

<svelte:head>
	<title>{$t('experiences.title')} G„stehaus Rader</title>
</svelte:head>

<!-- ERLEBNISSE PAGE (Tailwind) -->
<!-- Requirements: Tailwind + your bg-brand/text-brand utilities available -->

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<!-- HERO -->
		<section class="px-6 sm:px-10">
			<div class="flex justify-center">
				<div class="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition ${
							activeTab == 'summer'
								? 'bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900'
						}`}
						on:click={() => (activeTab = 'summer')}
					>
						<Sun class="h-4 w-4" />
						Sommer
					</button>
					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition ${
							activeTab == 'winter'
								? 'bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900'
						}`}
						on:click={() => (activeTab = 'winter')}
					>
						<Snowflake class="h-4 w-4" />
						Winter
					</button>
				</div>
			</div>
		</section>

		<!-- CONTENT WRAPPER -->
		<div class="mt-5 space-y-12" id="aktivitaeten">
			<section class="sm:p-10">
				<div class="space-y-4">
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						{currentContent.kicker}
					</p>
					<h1 class="font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
						{currentContent.title}
					</h1>
					<div class="h-[3px] w-14 rounded-full bg-brand"></div>
					<p class="max-w-2xl text-base leading-relaxed text-slate-600">
						{currentContent.subtitle}
					</p>
				</div>

				<div
					class={`experience-grid mt-8 gap-6 ${activeTab === 'winter' ? 'experience-grid--winter' : ''}`}
				>
					{#each currentEvents as event}
						<article
							class={`experience-card group relative overflow-hidden rounded-3xl ${event.className ?? ''}`}
						>
							<img src={withBase(event.image)} alt="" class="h-full w-full object-cover" loading="lazy" />
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
							></div>

							{#if event.badge}
								<span
									class="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm"
								>
									{event.badge}
								</span>
							{/if}

							<div class="absolute bottom-0 left-0 right-0 p-6">
								<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
									{event.kicker}
								</p>
								<h3 class={`mt-2 font-semibold text-white ${event.titleSize ?? 'text-xl'}`}>
									{event.title}
								</h3>
								{#if event.description}
									<p class="mt-2 max-w-xl text-sm text-white/85">{event.description}</p>
								{/if}
							</div>
						</article>
					{/each}
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

	.experience-grid--winter {
		grid-template-columns: 1fr;
		grid-template-areas: none;
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

		.experience-grid--winter {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: auto;
			grid-template-areas: none;
		}
	}

	@media (min-width: 1024px) {
		.experience-grid--winter {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	/* sorgt dafür, dass die Karten die festgelegte Höhe sauber füllen */
	.experience-card {
		height: 100%;
	}
</style>

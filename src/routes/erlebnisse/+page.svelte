<script lang="ts">
	import { t } from '$lib/i18n';
	import { base } from '$app/paths';
	import { Snowflake, Sun } from 'lucide-svelte';

	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

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

	function setSeason(season: SeasonKey) {
		if (activeTab === season) return;
		activeTab = season;
	}

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

	const content: Record<SeasonKey, { kicker: string; title: string; subtitle: string; bg: string }> =
		{
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
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
							activeTab === 'summer'
								? 'is-active bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
						}`}
						on:click={() => setSeason('summer')}
					>
						<Sun
							class={`h-4 w-4 transition-transform duration-300 ${
								activeTab === 'summer' ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
							}`}
						/>
						Sommer
					</button>

					<button
						type="button"
						class={`tab-btn inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300 ${
							activeTab === 'winter'
								? 'is-active bg-brand text-white shadow-sm'
								: 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
						}`}
						on:click={() => setSeason('winter')}
					>
						<Snowflake
							class={`h-4 w-4 transition-transform duration-300 ${
								activeTab === 'winter' ? '-rotate-12 scale-110' : 'rotate-0 scale-100'
							}`}
						/>
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

				{#key activeTab}
					<div
						class={`experience-grid mt-8 gap-6 ${activeTab === 'winter' ? 'experience-grid--winter' : ''}`}
						in:fly={{ y: 26, duration: 520, easing: cubicOut }}
					>
						{#each currentEvents as event, i (event.id)}
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
				{/key}
			</section>
		</div>
	</div>
</main>

<style>
	.experience-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem; /* gap-6 */
	}

	/* ---- SUMMER GRID (like screenshot) ---- */
	@media (min-width: 768px) {
		.experience-grid {
			/* 12-col grid for 8/4 + 4/8 layout */
			grid-template-columns: repeat(12, minmax(0, 1fr));
			grid-template-rows: 320px 300px; /* adjust if you want */
		}

		/* Row 1 */
		.c1 {
			grid-column: 1 / span 8; /* 8/12 */
			grid-row: 1;
		}
		.c2 {
			grid-column: 9 / span 4; /* 4/12 */
			grid-row: 1;
		}

		/* Row 2 */
		.c3 {
			grid-column: 1 / span 4; /* 4/12 */
			grid-row: 2;
		}
		.c4 {
			grid-column: 5 / span 8; /* 8/12 */
			grid-row: 2;
		}

		/* Winter: ignore the custom summer positioning */
		.experience-grid--winter {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: auto;
		}

		.experience-grid--winter .c1,
		.experience-grid--winter .c2,
		.experience-grid--winter .c3,
		.experience-grid--winter .c4 {
			grid-column: auto;
			grid-row: auto;
		}
	}

	@media (min-width: 1024px) {
		.experience-grid--winter {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	/* cards fill their grid cell */
	.experience-card {
		height: 100%;
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
</style>

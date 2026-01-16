<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { lang } from '$lib/i18n';
	import { ArrowRight, CalendarDays, Star, Users, Wifi, Utensils, Mountain } from 'lucide-svelte';

	let { data } = $props();
	const accommodation = $derived.by(() => data.accommodation);

	const withAsset = (path: string) => asset(path);

	onMount(() => {
		const win = window as Window & {
			dw?: ((...args: unknown[]) => void) & { q?: unknown[][] };
		};

		type DwFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
		const dwFn: DwFn = function (...args: unknown[]) {
			dwFn.q = dwFn.q || [];
			dwFn.q.push(args);
		};
		win.dw = dwFn;

		const container = document.getElementById('deskline-container');
		if (container) {
			container.innerHTML = '';
		}

		dwFn('settings', 'fa73de04-c8e1-4b05-b4a8-5697e2d52a1c', {
			context: {
				serviceIds: [],
				productIds: [],
			},
			lang: 'de',
		});

		const existingScript = document.getElementById('deskline-script');
		if (existingScript?.parentNode) {
			existingScript.parentNode.removeChild(existingScript);
		}

		const script = document.createElement('script');
		script.id = 'deskline-script';
		script.async = true;
		script.src =
			'https://web5.deskline.net/start/ACCOKTN/fa73de04-c8e1-4b05-b4a8-5697e2d52a1c/index.js';
		if (container) {
			container.appendChild(script);
		} else {
			document.body.appendChild(script);
		}
		return () => {
			const scriptEl = document.getElementById('deskline-script');
			if (scriptEl?.parentNode) {
				scriptEl.parentNode.removeChild(scriptEl);
			}
			if (container) {
				container.innerHTML = '';
			}
			delete win.dw;
		};
	});
</script>

<svelte:head>
	<title>{accommodation.title} – Buchung | Gästehaus Rader</title>
</svelte:head>

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
		<div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
			<div class="space-y-10">
				<div class="space-y-4">
					<p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
						<a href={resolve('/')} class="hover:text-slate-700">Home</a>
						<span class="mx-2 text-slate-300">›</span>
						<a href={resolve('/unterkuenfte-preise')} class="hover:text-slate-700">Unterkünfte</a>
						<span class="mx-2 text-slate-300">›</span>
						Buchung
					</p>
					<h1 class="font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
						Book Your Alpine Escape (Mock)
					</h1>
					<p class="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
						Experience premium hospitality in the heart of the Austrian Alps.
					</p>
				</div>

				<section class="space-y-4">
					<div class="flex items-center gap-3">
						<span class="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
							1
						</span>
						<h2 class="text-lg font-semibold text-slate-900">Select Dates</h2>
					</div>

					<div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
						<div class="flex items-center justify-between text-sm font-semibold text-slate-700">
							<button type="button" class="rounded-full p-2 text-slate-400 hover:text-slate-600">
								‹
							</button>
							<div class="flex items-center gap-6">
								<span>December 2023</span>
								<span class="text-slate-300">|</span>
								<span>January 2024</span>
							</div>
							<button type="button" class="rounded-full p-2 text-slate-400 hover:text-slate-600">
								›
							</button>
						</div>

						<div class="mt-5 grid gap-6 sm:grid-cols-2">
							<div class="space-y-3">
								<div class="grid grid-cols-7 gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
									<span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
								</div>
								<div class="grid grid-cols-7 gap-2 text-xs text-slate-600">
									{#each Array.from({ length: 31 }) as _, i}
										<span
											class={`grid h-8 w-8 place-items-center rounded-full ${
												i >= 4 && i <= 26 ? 'bg-amber-100 text-amber-900' : ''
											}`}
										>
											{i + 1}
										</span>
									{/each}
								</div>
							</div>

							<div class="space-y-3">
								<div class="grid grid-cols-7 gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
									<span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
								</div>
								<div class="grid grid-cols-7 gap-2 text-xs text-slate-600">
									{#each Array.from({ length: 31 }) as _, i}
										<span
											class={`grid h-8 w-8 place-items-center rounded-full ${
												i >= 1 && i <= 7 ? 'bg-amber-100 text-amber-900' : ''
											} ${i === 6 ? 'bg-amber-400 text-white' : ''}`}
										>
											{i + 1}
										</span>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</section>

				<section class="space-y-4">
					<div class="flex items-center gap-3">
						<span class="grid h-9 w-9 place-items-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
							2
						</span>
						<h2 class="text-lg font-semibold text-slate-900">Guests</h2>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
							<p class="text-sm font-semibold text-slate-900">Adults</p>
							<p class="text-xs text-slate-500">Ages 13+</p>
							<div class="mt-3 flex items-center gap-3">
								<button type="button" class="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
									–
								</button>
								<span class="text-sm font-semibold text-slate-900">2</span>
								<button type="button" class="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
									+
								</button>
							</div>
						</div>

						<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
							<p class="text-sm font-semibold text-slate-900">Children</p>
							<p class="text-xs text-slate-500">Ages 2-12</p>
							<div class="mt-3 flex items-center gap-3">
								<button type="button" class="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
									–
								</button>
								<span class="text-sm font-semibold text-slate-900">0</span>
								<button type="button" class="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
									+
								</button>
							</div>
						</div>
					</div>
				</section>

				<div class="flex items-center gap-4">
					<button
						type="button"
						class="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
					>
						Check Availability
						<ArrowRight class="h-4 w-4" />
					</button>
					<div class="flex items-center gap-2 text-xs text-slate-500">
						<CalendarDays class="h-4 w-4" />
						Free cancellation within 24h.
					</div>
				</div>

				<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
					<div class="flex items-center gap-3">
						<Users class="h-5 w-5 text-brand" />
						<h2 class="text-lg font-semibold text-slate-900">Direct Booking</h2>
					</div>
					<p class="mt-2 text-sm text-slate-600">
						Live availability and booking is loaded below via our secure booking partner.
					</p>
					<div id="deskline-container" class="mt-5 min-h-[520px] rounded-2xl bg-slate-50"></div>
				</section>
			</div>

			<div class="relative overflow-hidden rounded-[32px] border border-slate-200">
				<div
					class="absolute inset-0 bg-cover bg-center"
					style={`background-image: url('${withAsset(accommodation.images.main)}');`}
					aria-hidden="true"
				></div>
				<div class="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent"></div>

				<div class="relative flex min-h-[680px] items-end justify-center p-8">
					<div class="w-full max-w-sm rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur">
						<div class="flex items-center justify-between">
							<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
								Your stay selection
							</p>
							<span class="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-600">
								<Star class="h-4 w-4" />
							</span>
						</div>
						<h3 class="mt-3 text-xl font-semibold text-slate-900">{accommodation.title}</h3>

						<div class="mt-5 space-y-3 text-sm text-slate-600">
							<div class="flex items-center justify-between">
								<span>Guests</span>
								<span class="font-semibold text-slate-900">
									{accommodation.attributes.guests[$lang]}
								</span>
							</div>
							<div class="flex items-center justify-between">
								<span>View</span>
								<span class="font-semibold text-slate-900">
									{accommodation.attributes.view[$lang]}
								</span>
							</div>
							<div class="flex items-center justify-between">
								<span>Total Price</span>
								<span class="text-lg font-semibold text-amber-600">
									€{accommodation.pricePerNightBase}
								</span>
							</div>
						</div>

						<div class="mt-6 border-t border-slate-200 pt-5">
							<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
								Included amenities
							</p>
							<div class="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
								<span class="inline-flex items-center gap-2">
									<Utensils class="h-4 w-4 text-amber-500" />
									Organic breakfast
								</span>
								<span class="inline-flex items-center gap-2">
									<Wifi class="h-4 w-4 text-amber-500" />
									High-speed Wi-Fi
								</span>
								<span class="inline-flex items-center gap-2">
									<Mountain class="h-4 w-4 text-amber-500" />
									Alpine views
								</span>
								<span class="inline-flex items-center gap-2">
									<Users class="h-4 w-4 text-amber-500" />
									Concierge support
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

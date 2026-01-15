<script lang="ts">
	import { t } from '$lib/i18n';
import { Check, Copy, MapPin, ArrowUpRight } from 'lucide-svelte';

	let ibanCopied = false;
	let bicCopied = false;
	let ibanTimer: ReturnType<typeof setTimeout> | null = null;
	let bicTimer: ReturnType<typeof setTimeout> | null = null;

	const copyToClipboard = async (value: string, type: 'iban' | 'bic') => {
		if (!navigator?.clipboard) return;
		await navigator.clipboard.writeText(value);

		if (type === 'iban') {
			ibanCopied = true;
			if (ibanTimer) clearTimeout(ibanTimer);
			ibanTimer = setTimeout(() => {
				ibanCopied = false;
			}, 2000);
			return;
		}

		bicCopied = true;
		if (bicTimer) clearTimeout(bicTimer);
		bicTimer = setTimeout(() => {
			bicCopied = false;
		}, 2000);
	};
</script>

<svelte:head>
	<title>{$t('contact.title')} Gästehaus Rader</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
	<section class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm sm:p-12">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Gästehaus Rader</p>
		<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
			Kontaktieren <span class="italic">Sie uns</span>
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
			Haben Sie Fragen zu Ihrem Aufenthalt im Gitschtal? Wir sind gerne für Sie da und freuen uns auf
			Ihre Nachricht.
		</p>

		<div class="mt-10 grid gap-8 border-t border-slate-100 lg:grid-cols-[1.2fr,1fr]">
			<div class="mt-8 grid gap-8 sm:grid-cols-2">
				<div>
					<p class="text-sm font-semibold text-slate-900">Anschrift</p>
					<div class="mt-3 space-y-1 text-sm text-slate-600">
						<p class="font-semibold text-slate-800">Familie Herold-Hueber</p>
						<p>Weißbriach 92</p>
						<p>9622 Weißbriach, Österreich</p>
					</div>
				</div>

				<div>
					<p class="text-sm font-semibold text-slate-900">Direktkontakt</p>
					<div class="mt-3 space-y-2 text-sm text-slate-600">
						<p class="flex items-center">
							<span
								class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand"
								aria-hidden="true"
							>
								<svg
									viewBox="0 0 24 24"
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.81.31 1.6.57 2.35a2 2 0 0 1-.45 2.11L7.09 8.09a16 16 0 0 0 6.82 6.82l1.91-1.14a2 2 0 0 1 2.11-.45c.75.26 1.54.45 2.35.57A2 2 0 0 1 22 16.92z"
									/>
								</svg>
							</span>
							+43 676 6246826
						</p>
						<p class="flex items-center">
							<span
								class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand"
								aria-hidden="true"
							>
								<svg
									viewBox="0 0 24 24"
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path
										d="M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.81.31 1.6.57 2.35a2 2 0 0 1-.45 2.11L7.09 8.09a16 16 0 0 0 6.82 6.82l1.91-1.14a2 2 0 0 1 2.11-.45c.75.26 1.54.45 2.35.57A2 2 0 0 1 22 16.92z"
									/>
								</svg>
							</span>
							+43 4286 22
						</p>
						<p class="flex items-center">
							<span
								class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand"
								aria-hidden="true"
							>
								<svg
									viewBox="0 0 24 24"
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4" />
									<path d="M22 6l-10 7L2 6" />
								</svg>
							</span>
							<a class="font-semibold text-slate-900" href="mailto:info@rader-gitschtal.at">
								info@rader-gitschtal.at
							</a>
						</p>
					</div>
				</div>
			</div>
				
			<div class="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				<iframe
					title="Google Maps"
					class="h-[320px] w-full border-0 sm:h-[360px]"
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					src="https://www.google.com/maps?q=Weissbriach%2092%2C%209622%20Weissbriach%2C%20Austria&output=embed"
				></iframe>
			</div>
		</div>
		<div class="mt-10 grid gap-8 border-t border-slate-100 lg:grid-cols-[1.2fr,1fr]">
			<div class="mt-8 grid gap-8 sm:grid-cols-2">
				<div class="sm:col-span-2">
					<div class="grid gap-6 rounded-2xl bg-slate-50 p-6 text-xs text-slate-600 sm:grid-cols-2">
						<div>
							<p class="font-semibold uppercase tracking-[0.2em] text-slate-500">IBAN</p>
							<div class="mt-2 flex flex-wrap items-center gap-3">
								<button
									type="button"
									class="inline-flex items-center gap-2 font-semibold text-slate-800 underline decoration-dotted decoration-slate-400 underline-offset-4 transition hover:text-brand"
									on:click={() => copyToClipboard('AT86 3936 4001 0361 6109', 'iban')}
								>
									AT86 3936 4001 0361 6109
									{#if ibanCopied}
										<Check class="h-4 w-4 text-emerald-600" />
									{:else}
										<Copy class="h-4 w-4 text-slate-500" />
									{/if}
								</button>
							</div>
						</div>
						<div>
							<p class="font-semibold uppercase tracking-[0.2em] text-slate-500">BIC</p>
							<div class="mt-2 flex flex-wrap items-center gap-3">
								<button
									type="button"
									class="inline-flex items-center gap-2 font-semibold text-slate-800 underline decoration-dotted decoration-slate-400 underline-offset-4 transition hover:text-brand"
									on:click={() => copyToClipboard('RZKTAT2K364', 'bic')}
								>
									RZKTAT2K364
									{#if bicCopied}
										<Check class="h-4 w-4 text-emerald-600" />
									{:else}
										<Copy class="h-4 w-4 text-slate-500" />
									{/if}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

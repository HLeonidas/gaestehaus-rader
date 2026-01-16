<script lang="ts">
	import { t } from '$lib/i18n';
	import { Check, Copy, Mail, Phone, PhoneCall } from 'lucide-svelte';

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

	let mapEnabled = false;

	const mapSrc =
		'https://www.google.com/maps?q=Weissbriach%2092%2C%209622%20Weissbriach%2C%20Austria&output=embed';

	// optional: externer Link (öffnet Maps in neuem Tab)
	const mapLink =
		'https://www.google.com/maps?q=Weissbriach%2092%2C%209622%20Weissbriach%2C%20Austria';
</script>

<svelte:head>
	<title>{$t('contact.title')} - {$t('brand.name')}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
	<section class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm sm:p-12">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
			{$t('brand.name')}
		</p>
		<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
			{$t('contact.headingPrefix')} <span class="italic">{$t('contact.headingEmphasis')}</span>
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
			{$t('contact.subtitle')}
		</p>

		<div class="mt-10 grid gap-8 border-t border-slate-100 lg:grid-cols-[1.2fr,1fr]">
			<div class="mt-8 grid gap-8 sm:grid-cols-2">
				<div>
					<p class="text-sm font-semibold text-slate-900">{$t('contact.address.title')}</p>
					<div class="mt-3 space-y-1 text-sm text-slate-600">
						<p class="font-semibold text-slate-800">{$t('contact.address.name')}</p>
						<p>{$t('contact.address.line1')}</p>
						<p>{$t('contact.address.line2')}</p>
					</div>
				</div>

				<div>
					<p class="text-sm font-semibold text-slate-900">{$t('contact.direct.title')}</p>
					<div class="mt-3 space-y-2 text-sm text-slate-600">
						<p class="flex items-center">
							<span
								class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand"
								aria-hidden="true"
							>
								<Phone class="h-4 w-4" />
							</span>
							+43 676 6246826
						</p>
						<p class="flex items-center">
							<span
								class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand"
								aria-hidden="true"
							>
								<PhoneCall class="h-4 w-4" />
							</span>
							+43 4286 22
						</p>
						<p class="flex items-center">
							<span
								class="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand"
								aria-hidden="true"
							>
								<Mail class="h-4 w-4" />
							</span>
							<a class="font-semibold text-slate-900" href="mailto:info@rader-gitschtal.at">
								info@rader-gitschtal.at
							</a>
						</p>
					</div>
				</div>
			</div>

			<div
				class="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
			>
				{#if mapEnabled}
					<iframe
						title="Google Maps"
						class="h-[320px] w-full border-0 sm:h-[360px]"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						src={mapSrc}
					></iframe>

					<!-- small control to disable again (optional) -->
					<div class="absolute left-4 top-4">
						<button
							type="button"
							class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 backdrop-blur hover:bg-white"
							onclick={() => (mapEnabled = false)}
						>
							{$t('contact.map.close')}
						</button>
					</div>
				{:else}
					<!-- Placeholder / consent card -->
					<div class="grid h-[320px] place-items-center px-6 py-8 sm:h-[360px]">
						<div class="max-w-sm text-center">
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
								{$t('contact.map.label')}
							</p>
							<h3 class="mt-3 text-lg font-semibold text-slate-900">
								{$t('contact.map.title')}
							</h3>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">
								{$t('contact.map.description')}
							</p>

							<div class="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
								<button
									type="button"
									class="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
									onclick={() => (mapEnabled = true)}
								>
									{$t('contact.map.load')}
								</button>

								<a
									class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
									href={mapLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									{$t('contact.map.open')}
								</a>
							</div>

							<p class="mt-4 text-[12px] text-slate-500">
								{$t('contact.map.tip')}
							</p>
						</div>
					</div>
				{/if}
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
									onclick={() => copyToClipboard('AT86 3936 4001 0361 6109', 'iban')}
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
									onclick={() => copyToClipboard('RZKTAT2K364', 'bic')}
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



<script lang="ts">
	import { t } from '$lib/i18n';
	import { trackEvent } from '$lib/analytics/plausible';
	import { Check, Copy, Mail, MessageCircle, Phone, PhoneCall } from 'lucide-svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';

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

	// externer Link zum Google-Unternehmensprofil
	const mapLink = 'https://maps.app.goo.gl/cXgd5iJbYPmSx2ad9';

	const enableMap = () => {
		mapEnabled = true;
		void trackEvent('Map: Loaded', { source: 'contact' });
	};
</script>

<SeoHead titleKey="contact.seo.title" descriptionKey="contact.seo.description" />

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
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
		<div class="mt-8 grid gap-8 border-t border-slate-100 pt-6 lg:grid-cols-[1.2fr,1fr]">
			<div class="space-y-8">
				<div class="rounded-2xl bg-white pt-2">
					<p class="text-sm font-semibold text-slate-900">{$t('contact.address.title')}</p>
					<div class="mt-3 space-y-1 text-sm text-slate-600">
						<p class="font-semibold text-slate-800">Gästehaus Rader</p>
						<p>
							<a
								class="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
								href={mapLink}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => trackEvent('Map: Open External', { source: 'contact' })}
							>
								{$t('contact.address.line1')}
							</a>
						</p>
						<p>{$t('contact.address.line2')}</p>
					</div>
				</div>

				<div class="rounded-2xl bg-white">
					<p class="text-sm font-semibold text-slate-900">{$t('contact.direct.title')}</p>
					<div class="mt-3 space-y-3 text-sm text-slate-600">
						<a
							class="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
							href="tel:+436766246826"
							onclick={() => trackEvent('Contact: Phone Click', { source: 'contact', line: 'mobile' })}
						>
							<span class="flex items-center gap-3">
								<span
									class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand"
									aria-hidden="true"
								>
									<Phone class="h-4 w-4" />
								</span>
								<span class="font-semibold text-slate-900">+43 676 6246826</span>
							</span>
							<span class="text-slate-400" aria-hidden="true">↗</span>
						</a>
						<a
							class="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
							href="https://wa.me/436766246826"
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => trackEvent('Contact: WhatsApp Click', { source: 'contact' })}
						>
							<span class="flex items-center gap-3">
								<span
									class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"
									aria-hidden="true"
								>
									<MessageCircle class="h-4 w-4" />
								</span>
								<span class="font-semibold text-slate-900">WhatsApp schreiben</span>
							</span>
							<span class="text-slate-400" aria-hidden="true">↗</span>
						</a>

						<a
							class="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
							href="tel:+434286222"
							onclick={() => trackEvent('Contact: Phone Click', { source: 'contact', line: 'landline' })}
						>
							<span class="flex items-center gap-3">
								<span
									class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand"
									aria-hidden="true"
								>
									<PhoneCall class="h-4 w-4" />
								</span>
								<span class="font-semibold text-slate-900">+43 4286 222</span>
							</span>
							<span class="text-slate-400" aria-hidden="true">↗</span>
						</a>

						<a
							class="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-slate-50"
							href="mailto:info@rader-gitschtal.at"
							onclick={() => trackEvent('Contact: Email Click', { source: 'contact' })}
						>
							<span class="flex items-center gap-3">
								<span
									class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand"
									aria-hidden="true"
								>
									<Mail class="h-4 w-4" />
								</span>
								<span class="font-semibold text-slate-900">info@rader-gitschtal.at</span>
							</span>
							<span class="text-slate-400" aria-hidden="true">↗</span>
						</a>
					</div>
				</div>

			</div>

			<div
				class="relative min-h-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:min-h-[360px] lg:min-h-full"
			>
				{#if mapEnabled}
					<iframe
						title={$t('contact.map.iframeTitle')}
						class="h-full w-full border-0"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						src={mapSrc}
					></iframe>

					<!-- small control to disable again (optional) -->
					<!-- <div class="absolute left-4 top-4">
						<button
							type="button"
							class="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 backdrop-blur hover:bg-white"
							onclick={() => (mapEnabled = false)}
						>
							{$t('contact.map.close')}
						</button>
					</div> -->
				{:else}
					<!-- Placeholder / consent card -->
					<div class="grid h-full place-items-center px-4 py-6">
						<div class="max-w-sm text-center">
							<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
								{$t('contact.map.label')}
							</p>
							<h3 class="mt-3 text-lg font-semibold text-slate-900">
								{$t('contact.map.title')}
							</h3>

							<div class="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
								<button
									type="button"
									class="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
									onclick={enableMap}
								>
									{$t('contact.map.load')}
								</button>

								<a
									class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
									href={mapLink}
									target="_blank"
									rel="noopener noreferrer"
									onclick={() => trackEvent('Map: Open External', { source: 'contact' })}
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

		<div class="mt-6 space-y-6">
			<div class="rounded-2xl py-5">
				<p class="text-sm font-semibold text-slate-900">{$t('contact.trust.title')}</p>
				<ul class="mt-3 grid list-inside list-disc gap-2 text-sm text-slate-600 sm:grid-cols-2">
					<li>{$t('contact.trust.response')}</li>
					<li>{$t('contact.trust.languages')}</li>
					<li>{$t('contact.trust.checkin')}</li>
					<li>{$t('contact.trust.parking')}</li>
				</ul>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
				<p class="text-sm font-semibold text-slate-900">{$t('contact.payment.title')}</p>
				<p class="mt-1 text-xs text-slate-500">{$t('contact.payment.subtitle')}</p>
				<div class="mt-4 grid gap-4 sm:grid-cols-2">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">IBAN</p>
						<div class="mt-2 flex flex-wrap items-center gap-2">
							<span class="font-mono text-sm font-semibold text-slate-800 sm:text-base">
								AT86 3936 4001 0361 6109
							</span>
							<button
								type="button"
								class="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-brand/30"
								onclick={() => copyToClipboard('AT86 3936 4001 0361 6109', 'iban')}
								aria-label={$t('contact.payment.copyIban')}
							>
								{#if ibanCopied}
									<Check class="h-4 w-4 text-emerald-600" />
									<span aria-live="polite">{$t('contact.payment.copied')}</span>
								{:else}
									<Copy class="h-4 w-4 text-slate-500" />
									<span>{$t('contact.payment.copy')}</span>
								{/if}
							</button>
						</div>
					</div>
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">BIC</p>
						<div class="mt-2 flex flex-wrap items-center gap-2">
							<span class="font-mono text-sm font-semibold text-slate-800 sm:text-base">
								RZKTAT2K364
							</span>
							<button
								type="button"
								class="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-brand/30"
								onclick={() => copyToClipboard('RZKTAT2K364', 'bic')}
								aria-label={$t('contact.payment.copyBic')}
							>
								{#if bicCopied}
									<Check class="h-4 w-4 text-emerald-600" />
									<span aria-live="polite">{$t('contact.payment.copied')}</span>
								{:else}
									<Copy class="h-4 w-4 text-slate-500" />
									<span>{$t('contact.payment.copy')}</span>
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<script lang="ts">
	import { trackEvent } from '$lib/analytics/plausible';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { t } from '$lib/i18n';
	import { Check, ChevronRight, Copy, Mail, MessageCircle, Phone, PhoneCall } from 'lucide-svelte';

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

	const mapSrc =
		'https://www.google.com/maps?q=Weissbriach%2092%2C%209622%20Weissbriach%2C%20Austria&output=embed';
	const mapLink = 'https://maps.app.goo.gl/cXgd5iJbYPmSx2ad9';
	let mapEnabled = false;

	const enableMap = () => {
		mapEnabled = true;
		void trackEvent('Map: Loaded', { source: 'contact' });
	};
</script>

<SeoHead titleKey="contact.seo.title" descriptionKey="contact.seo.description" />

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section>
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
			{$t('brand.name')}
		</p>
		<h1 class="mt-4 font-serif text-5xl leading-[0.95] text-slate-900 sm:text-6xl">
			{$t('contact.headingPrefix')} <span class="italic">{$t('contact.headingEmphasis')}</span>
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
			{$t('contact.subtitle')}
		</p>

		<div class="mt-10 border-t border-slate-200 pt-8">
			<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
				{$t('contact.quick.title')}
			</p>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
				{$t('contact.subtitle')}
			</p>
			<div class="mt-3 flex flex-wrap items-center gap-3">
				<a
					href="https://wa.me/436766246826"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
					onclick={() => trackEvent('Contact: WhatsApp Click', { source: 'contact', placement: 'quick' })}
				>
					{$t('contact.cta.whatsapp')}
				</a>
				<a
					href="tel:+436766246826"
					class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
					onclick={() => trackEvent('Contact: Phone Click', { source: 'contact', line: 'mobile', placement: 'quick' })}
				>
					{$t('contact.cta.callNow')}
				</a>
			</div>
		</div>

		<div class="mt-8 grid gap-10 border-t border-slate-200 pt-8 lg:grid-cols-[1fr,0.95fr]">
			<div>
				<p class="text-lg font-semibold text-slate-900">{$t('contact.card.title')}</p>
				<div class="mt-6">
					<p class="text-sm font-semibold text-slate-900">{$t('contact.address.title')}</p>
					<div class="mt-3 space-y-1 text-sm text-slate-600">
						<p class="font-semibold text-slate-800">{$t('contact.address.name')}</p>
						<p>
							<a
								class="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-slate-900"
								href={mapLink}
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => trackEvent('Map: Open External', { source: 'contact', placement: 'address-line1' })}
							>
								{$t('contact.address.line1')}
							</a>
						</p>
						<p>{$t('contact.address.line2')}</p>
					</div>
				</div>
				<div class="my-6 h-px bg-slate-200"></div>
				<div>
					<p class="text-sm font-semibold text-slate-900">{$t('contact.methods.title')}</p>
					<div class="mt-3 divide-y divide-slate-100 text-sm text-slate-600">
						<a
							class="flex items-center justify-between py-3 transition hover:text-slate-900"
							href="https://wa.me/436766246826"
							target="_blank"
							rel="noopener noreferrer"
							onclick={() => trackEvent('Contact: WhatsApp Click', { source: 'contact', placement: 'methods' })}
						>
							<span class="flex items-center gap-3">
								<MessageCircle class="h-4 w-4 text-emerald-600" aria-hidden="true" />
								<span class="font-semibold text-slate-900">{$t('contact.cta.whatsapp')}</span>
								<span class="text-slate-600">+43 676 6246826</span>
							</span>
							<ChevronRight class="h-4 w-4 text-slate-400" aria-hidden="true" />
						</a>
						<a
							class="flex items-center justify-between py-3 transition hover:text-slate-900"
							href="tel:+436766246826"
							onclick={() => trackEvent('Contact: Phone Click', { source: 'contact', line: 'mobile', placement: 'methods' })}
						>
							<span class="flex items-center gap-3">
								<Phone class="h-4 w-4 text-brand" aria-hidden="true" />
								<span class="font-semibold text-slate-900">Mobil</span>
								<span class="text-slate-600">+43 676 6246826</span>
							</span>
							<ChevronRight class="h-4 w-4 text-slate-400" aria-hidden="true" />
						</a>
						<a
							class="flex items-center justify-between py-3 transition hover:text-slate-900"
							href="tel:+434286222"
							onclick={() => trackEvent('Contact: Phone Click', { source: 'contact', line: 'landline', placement: 'methods' })}
						>
							<span class="flex items-center gap-3">
								<PhoneCall class="h-4 w-4 text-brand" aria-hidden="true" />
								<span class="font-semibold text-slate-900">Festnetz</span>
								<span class="text-slate-600">+43 4286 222</span>
							</span>
							<ChevronRight class="h-4 w-4 text-slate-400" aria-hidden="true" />
						</a>
						<a
							class="flex items-center justify-between py-3 transition hover:text-slate-900"
							href="mailto:info@rader-gitschtal.at"
							onclick={() => trackEvent('Contact: Email Click', { source: 'contact', placement: 'methods' })}
						>
							<span class="flex items-center gap-3">
								<Mail class="h-4 w-4 text-brand" aria-hidden="true" />
								<span class="font-semibold text-slate-900">E-Mail</span>
								<span class="text-slate-600">info@rader-gitschtal.at</span>
							</span>
							<ChevronRight class="h-4 w-4 text-slate-400" aria-hidden="true" />
						</a>
					</div>
				</div>
			</div>

			<div class="flex h-full flex-col">
				<div class="flex flex-wrap items-center justify-between gap-3">
					<p class="text-sm font-semibold text-slate-900">{$t('contact.map.title')}</p>
					<a
						class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50"
						href={mapLink}
						target="_blank"
						rel="noopener noreferrer"
						onclick={() => trackEvent('Map: Open External', { source: 'contact', placement: 'map-header' })}
					>
						{$t('contact.route.cta')}
					</a>
				</div>
				<div
					class="relative mt-4 h-[320px] min-h-[320px] flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-[360px] sm:min-h-[360px] lg:h-full"
				>
					{#if mapEnabled}
						<iframe
							title={$t('contact.map.iframeTitle')}
							class="h-full w-full border-0"
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							src={mapSrc}
						></iframe>
					{:else}
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
										onclick={() => trackEvent('Map: Open External', { source: 'contact', placement: 'map-placeholder' })}
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
		</div>

		<div class="mt-10 space-y-8 border-t border-slate-200 pt-8">
			<div>
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

			<div class="h-px w-full bg-slate-200"></div>

			<div>
				<p class="text-sm font-semibold text-slate-900">{$t('contact.trust.title')}</p>
				<div class="mt-3 flex flex-wrap gap-2">
					<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
						{$t('contact.trust.responseShort')}
					</span>
					<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
						{$t('contact.trust.languagesShort')}
					</span>
					<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
						{$t('contact.trust.checkinShort')}
					</span>
					<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
						{$t('contact.trust.parkingShort')}
					</span>
				</div>
			</div>
		</div>
	</section>
</div>

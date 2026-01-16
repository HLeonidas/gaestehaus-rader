<script lang="ts">
	import { asset } from '$app/paths';
	import { t } from '$lib/i18n';

	const withAsset = (path: string) => asset(path);
</script>

<svelte:head>
	<title>{$t('imprint.title')} - {$t('brand.name')}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{$t('brand.name')}</p>
		<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
			{$t('imprint.title')}
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
			{$t('imprint.subtitle')}
		</p>

		<div class="mt-10 grid gap-8 border-t border-slate-100 pt-8 lg:grid-cols-2">
			<div class="space-y-3 text-sm text-slate-600">
				<p class="text-sm font-semibold text-slate-900">{$t('imprint.company.title')}</p>
				<p class="font-semibold text-slate-800">{$t('imprint.company.name')}</p>
				<p>{$t('imprint.company.addressLine1')}</p>
				<p>{$t('imprint.company.addressLine2')}</p>
				<p>
					{$t('imprint.company.phone')}:
					<a class="hover:text-slate-900" href="tel:+436766246826">+43 676 6246826</a>
				</p>
				<p>
					{$t('imprint.company.phone')}:
					<a class="hover:text-slate-900" href="tel:+43428622">+43 4286 222</a>
				</p>
				<p>
					{$t('imprint.company.email')}:
					<a class="hover:text-slate-900" href="mailto:info@rader-gitschtal.at">
						info@rader-gitschtal.at
					</a>
				</p>
			</div>

			<div class="space-y-3 text-sm text-slate-600">
				<p class="text-sm font-semibold text-slate-900">{$t('imprint.legal.title')}</p>
				<p>
					{$t('imprint.legal.legalForm.label')}:
					<span class="text-slate-500">{$t('imprint.legal.legalForm.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.companyRegister.label')}:
					<span class="text-slate-500">{$t('imprint.legal.companyRegister.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.registerCourt.label')}:
					<span class="text-slate-500">{$t('imprint.legal.registerCourt.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.vatId.label')}:
					<span class="text-slate-500">{$t('imprint.legal.vatId.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.authority.label')}:
					<span class="text-slate-500">{$t('imprint.legal.authority.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.profession.label')}:
					<span class="text-slate-500">{$t('imprint.legal.profession.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.country.label')}:
					<span class="text-slate-500">{$t('imprint.legal.country.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.mediaOwner.label')}:
					<span class="text-slate-500">{$t('imprint.legal.mediaOwner.value')}</span>
				</p>
				<p>
					{$t('imprint.legal.businessPurpose.label')}:
					<span class="text-slate-500">{$t('imprint.legal.businessPurpose.value')}</span>
				</p>
			</div>
		</div>

		<div class="mt-10 grid gap-6 border-t border-slate-100 pt-8 text-sm text-slate-600">
			<div>
				<p class="text-sm font-semibold text-slate-900">{$t('imprint.liability.content.title')}</p>
				<p class="mt-2">
					{$t('imprint.liability.content.body')}
				</p>
			</div>
			<div>
				<p class="text-sm font-semibold text-slate-900">{$t('imprint.liability.links.title')}</p>
				<p class="mt-2">
					{$t('imprint.liability.links.body')}
				</p>
			</div>
			<div>
				<p class="text-sm font-semibold text-slate-900">{$t('imprint.copyright.title')}</p>
				<p class="mt-2">
					{$t('imprint.copyright.body')}
				</p>
			</div>
		</div>

		<div class="mt-12 border-t border-slate-100 pt-10">
			<div
				class="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:p-8"
			>
				<div class="grid gap-6 sm:grid-cols-[auto,1fr,auto] sm:items-center">
					<!-- Avatar -->
					<div class="h-28 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
						<img
							src={withAsset('/images/other/lh.jpg')}
							alt={$t('imprint.webdesign.imageAlt')}
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Text -->
					<div>
						<p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
							{$t('imprint.webdesign.kicker')}
						</p>
						<p class="mt-2 text-xl font-semibold text-slate-900">
							{$t('imprint.webdesign.name')}
						</p>
						<p class="mt-1 text-sm text-slate-600 max-w-md">
							{$t('imprint.webdesign.body')}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

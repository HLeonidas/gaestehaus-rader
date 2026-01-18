<script lang="ts">
	import { resolve } from '$app/paths';
	import { lang, t } from '$lib/i18n';
	import {
		ArrowRight,
		BadgeCheck,
		BusFront,
		Check,
		Clock,
		Info,
		Mountain,
		Sparkles,
		Ticket,
		Utensils,
		Users,
		Waves,
	} from 'lucide-svelte';

	const guestCardOverviewUrl = $derived.by(() =>
		$lang === 'en'
			? 'https://www.nassfeld.at/en/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic'
			: 'https://www.nassfeld.at/de/Unterkunft-finden/Reise-planen/PREMIUM-Cards/GaesteCard-basic'
	);
</script>

<svelte:head>
	<title>{$t('guestcard.page.title')} - {$t('brand.name')}</title>
	<meta name="description" content={$t('guestcard.page.subtitle')} />
</svelte:head>

<main class="bg-[#fbfaf7]">
	<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
		<section class="space-y-4">
			<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
				{$t('guestcard.page.kicker')}
			</p>
			<h1 class="font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
				{$t('guestcard.page.title')}
			</h1>
			<div class="h-[3px] w-14 rounded-full bg-brand"></div>
			<p class="max-w-3xl text-base leading-relaxed text-slate-600">
				{$t('guestcard.page.subtitle')}
			</p>
		</section>

		<section class="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
			<div class="space-y-6">
				<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
					<div class="flex items-start gap-4">
						<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
							<Ticket class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h2 class="text-lg font-semibold text-slate-900">
								{$t('guestcard.page.what.title')}
							</h2>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">
								{$t('guestcard.page.what.body')}
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
					<div class="flex items-start gap-4">
						<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
							<Users class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h2 class="text-lg font-semibold text-slate-900">
								{$t('guestcard.page.who.title')}
							</h2>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">
								{$t('guestcard.page.who.body')}
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
					<div class="flex items-start gap-4">
						<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
							<Clock class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h2 class="text-lg font-semibold text-slate-900">
								{$t('guestcard.page.validity.title')}
							</h2>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">
								{$t('guestcard.page.validity.body')}
							</p>
						</div>
					</div>
				</div>
			</div>

			<aside class="space-y-6">
				<div class="rounded-3xl border border-brand/20 bg-brand/5 p-6 shadow-sm">
					<div class="flex items-start gap-4">
						<div class="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand shadow-sm">
							<BadgeCheck class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<p class="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
								{$t('guestcard.page.quick.title')}
							</p>
							<ul class="mt-3 space-y-2 text-sm text-slate-600">
								<li class="flex items-start gap-2">
									<Check class="mt-0.5 h-4 w-4 text-brand" aria-hidden="true" />
									<span>{$t('guestcard.page.quick.item1')}</span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="mt-0.5 h-4 w-4 text-brand" aria-hidden="true" />
									<span>{$t('guestcard.page.quick.item2')}</span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="mt-0.5 h-4 w-4 text-brand" aria-hidden="true" />
									<span>{$t('guestcard.page.quick.item3')}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
					<div class="flex items-start gap-4">
						<div class="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
							<Info class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<h2 class="text-lg font-semibold text-slate-900">
								{$t('guestcard.page.rules.title')}
							</h2>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">
								{$t('guestcard.page.rules.body')}
							</p>
						</div>
					</div>
				</div>
			</aside>
		</section>

		<section class="mt-12">
			<div class="flex items-center gap-4">
				<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
					<Sparkles class="h-5 w-5" aria-hidden="true" />
				</div>
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
						{$t('guestcard.page.categories.kicker')}
					</p>
					<h2 class="mt-2 text-3xl font-serif font-medium leading-[0.95] text-slate-900 sm:text-4xl">
						{$t('guestcard.page.categories.title')}
					</h2>
					<div class="mt-3 h-[3px] w-14 rounded-full bg-brand"></div>
				</div>
			</div>

			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex items-start gap-3">
						<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<BusFront class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<p class="text-sm font-semibold text-slate-900">
								{$t('guestcard.page.category.transport.title')}
							</p>
							<p class="mt-1 text-xs leading-relaxed text-slate-500">
								{$t('guestcard.page.category.transport.body')}
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex items-start gap-3">
						<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Waves class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<p class="text-sm font-semibold text-slate-900">
								{$t('guestcard.page.category.wellness.title')}
							</p>
							<p class="mt-1 text-xs leading-relaxed text-slate-500">
								{$t('guestcard.page.category.wellness.body')}
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex items-start gap-3">
						<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Mountain class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<p class="text-sm font-semibold text-slate-900">
								{$t('guestcard.page.category.outdoor.title')}
							</p>
							<p class="mt-1 text-xs leading-relaxed text-slate-500">
								{$t('guestcard.page.category.outdoor.body')}
							</p>
						</div>
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex items-start gap-3">
						<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
							<Utensils class="h-5 w-5" aria-hidden="true" />
						</div>
						<div>
							<p class="text-sm font-semibold text-slate-900">
								{$t('guestcard.page.category.food.title')}
							</p>
							<p class="mt-1 text-xs leading-relaxed text-slate-500">
								{$t('guestcard.page.category.food.body')}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div class="max-w-2xl">
					<h2 class="text-xl font-semibold text-slate-900">
						{$t('guestcard.page.overview.title')}
					</h2>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						{$t('guestcard.page.overview.body')}
					</p>
				</div>
				<a
					href={guestCardOverviewUrl}
					class="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
					target="_blank"
					rel="noreferrer"
				>
					{$t('guestcard.page.overview.cta')}
					<ArrowRight class="h-4 w-4" aria-hidden="true" />
				</a>
			</div>
		</section>

		<section class="mt-12 rounded-3xl bg-brand px-6 py-8 text-white sm:px-10 sm:py-10">
			<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
						{$t('brand.name')}
					</p>
					<h2 class="mt-3 font-serif text-3xl leading-[0.95] text-white sm:text-4xl">
						{$t('guestcard.page.cta.title')}
					</h2>
					<p class="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
						{$t('guestcard.page.cta.body')}
					</p>
				</div>
				<div class="flex flex-wrap gap-3">
					<a
						href={resolve('/buchen')}
						class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white/90"
					>
						{$t('guestcard.page.cta.primary')}
					</a>
					<a
						href={`${resolve('/faq')}#gaestecard`}
						class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/95 transition hover:bg-white/10"
					>
						{$t('guestcard.page.cta.secondary')}
					</a>
				</div>
			</div>
		</section>
	</div>
</main>

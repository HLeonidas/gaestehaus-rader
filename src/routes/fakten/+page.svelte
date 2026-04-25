<script lang="ts">
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { accommodations } from '$lib/data/accommodations';
	import { guesthouseFacts } from '$lib/data/facts';
	import { lang } from '$lib/i18n';
	import { SITE_ORIGIN } from '$lib/seo';
	import {
		ArrowRight,
		CarFront,
		Clock3,
		Home,
		Mail,
		MapPinned,
		MessageCircleQuestion,
		Mountain,
		PawPrint,
		Phone,
		Sparkles,
		Wifi,
	} from 'lucide-svelte';

	const locale = $derived.by(() => ($lang === 'en' ? 'en' : 'de'));
	const pageCopy = guesthouseFacts.page;
	const facts = guesthouseFacts.facts;
	const locationFacts = guesthouseFacts.locationFacts;
	const highlights = $derived.by(() => guesthouseFacts.highlights[locale]);
	const faqItems = guesthouseFacts.faq;
	const pageUrl = new URL(resolve('/fakten'), SITE_ORIGIN).toString();
	const bookingUrl = resolve('/buchen');
	const contactUrl = resolve('/kontakt');
	const factsJsonLd = $derived.by(() =>
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'WebPage',
					'@id': `${pageUrl}#webpage`,
					url: pageUrl,
					name: pageCopy.seoTitle[locale],
					description: pageCopy.seoDescription[locale],
					inLanguage: locale === 'de' ? 'de-AT' : 'en',
					mainEntity: {
						'@id': `${SITE_ORIGIN}/#lodging`,
					},
				},
				{
					'@type': 'LodgingBusiness',
					'@id': `${SITE_ORIGIN}/#lodging`,
					name: guesthouseFacts.name,
					url: SITE_ORIGIN,
					email: guesthouseFacts.email,
					telephone: guesthouseFacts.phones[0],
					contactPoint: guesthouseFacts.phones.map((phone) => ({
						'@type': 'ContactPoint',
						telephone: phone,
						contactType: 'customer service',
						availableLanguage: ['German', 'English'],
					})),
					address: {
						'@type': 'PostalAddress',
						streetAddress: guesthouseFacts.address.streetAddress,
						postalCode: guesthouseFacts.address.postalCode,
						addressLocality: guesthouseFacts.address.addressLocality,
						addressCountry: guesthouseFacts.address.addressCountry,
					},
					geo: {
						'@type': 'GeoCoordinates',
						latitude: guesthouseFacts.geo.latitude,
						longitude: guesthouseFacts.geo.longitude,
					},
					checkinTime: '14:00',
					checkoutTime: '10:00',
					petsAllowed: false,
					amenityFeature: [
						{ '@type': 'LocationFeatureSpecification', name: 'High-speed Wi-Fi', value: true },
						{ '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
						{ '@type': 'LocationFeatureSpecification', name: 'Balcony', value: true },
						{ '@type': 'LocationFeatureSpecification', name: 'Kitchen', value: true },
					],
					containsPlace: accommodations.map((room) => ({
						'@type': 'Accommodation',
						name: room.title,
						identifier: room.slug,
					})),
					description:
						locale === 'de'
							? 'Familiengeführtes Gästehaus mit drei Ferienwohnungen in Weißbriach im Gitschtal.'
							: 'Family-run guesthouse with three holiday apartments in Weißbriach in the Gitschtal valley.',
				},
				{
					'@type': 'FAQPage',
					'@id': `${pageUrl}#faq`,
					url: `${pageUrl}#faq`,
					inLanguage: locale === 'de' ? 'de-AT' : 'en',
					mainEntity: faqItems.map((item) => ({
						'@type': 'Question',
						name: item.question[locale],
						acceptedAnswer: {
							'@type': 'Answer',
							text: item.answer[locale],
						},
					})),
				},
			],
		})
	);

	const factIcons: Record<string, typeof Home> = {
		name: Home,
		address: MapPinned,
		coordinates: MapPinned,
		phones: Phone,
		email: Mail,
		apartments: Home,
		checkin: Clock3,
		parking: CarFront,
		wifi: Wifi,
		pets: PawPrint,
	};

	const locationIcons: Record<string, typeof Mountain> = {
		region: Mountain,
		'weissensee-nassfeld': Mountain,
		booking: ArrowRight,
	};
</script>

<SeoHead title={pageCopy.seoTitle[locale]} description={pageCopy.seoDescription[locale]} />

<svelte:head>
	{@html `<script type="application/ld+json">${factsJsonLd}</script>`}
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{pageCopy.kicker[locale]}</p>
		<h1 class="mt-4 max-w-3xl font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
			{pageCopy.title[locale]}
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
			{pageCopy.subtitle[locale]}
		</p>
		<p class="mt-5 inline-flex items-center gap-2 rounded-full bg-brand/5 px-4 py-2 text-sm text-slate-700">
			<Sparkles class="h-4 w-4 text-brand" />
			{pageCopy.machineReadable[locale]}
		</p>
	</section>

	<section use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out mt-8 grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
		<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{pageCopy.factsTitle[locale]}</p>
			<h2 class="mt-4 text-2xl font-semibold text-slate-900">{pageCopy.factsIntro[locale]}</h2>
			<dl class="mt-8 grid gap-4 sm:grid-cols-2">
				{#each facts as item}
					{@const Icon = factIcons[item.id] ?? Home}
					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<div class="flex items-start gap-3">
							<div class="mt-0.5 rounded-xl bg-white p-2 text-brand shadow-sm">
								<Icon class="h-4 w-4" />
							</div>
							<div>
								<dt class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label[locale]}</dt>
								<dd class="mt-2 text-sm leading-relaxed text-slate-800">{item.value[locale]}</dd>
							</div>
						</div>
					</div>
				{/each}
			</dl>
		</div>

		<div class="space-y-8">
			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{pageCopy.locationTitle[locale]}</p>
				<p class="mt-4 text-sm leading-relaxed text-slate-600">{pageCopy.locationIntro[locale]}</p>
				<ul class="mt-6 space-y-4">
					{#each locationFacts as item}
						{@const Icon = locationIcons[item.id] ?? Mountain}
						<li class="flex gap-3 rounded-2xl bg-slate-50 p-4">
							<div class="mt-0.5 rounded-xl bg-white p-2 text-brand shadow-sm">
								<Icon class="h-4 w-4" />
							</div>
							<div>
								<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label[locale]}</p>
								<p class="mt-1 text-sm leading-relaxed text-slate-800">{item.value[locale]}</p>
							</div>
						</li>
					{/each}
				</ul>
				<div class="mt-6 text-sm text-slate-700">
					<a class="font-medium text-brand hover:text-brand/80" href={guesthouseFacts.mapUrl} target="_blank" rel="noopener noreferrer">
						{guesthouseFacts.address.formatted[locale]}
					</a>
					<p class="mt-2 font-mono text-xs text-slate-500">{guesthouseFacts.geo.formatted}</p>
				</div>
			</div>

			<div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{pageCopy.ctaTitle[locale]}</p>
				<p class="mt-4 text-sm leading-relaxed text-slate-600">{pageCopy.ctaBody[locale]}</p>
				<div class="mt-6 flex flex-wrap gap-3">
					<a href={bookingUrl} class="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand/90">
						{pageCopy.ctaPrimary[locale]}
						<ArrowRight class="h-4 w-4" />
					</a>
					<a href={contactUrl} class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50">
						{pageCopy.ctaSecondary[locale]}
					</a>
				</div>
			</div>
		</div>
	</section>

	<section use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{pageCopy.highlightsTitle[locale]}</p>
		<p class="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">{pageCopy.highlightsIntro[locale]}</p>
		<ul class="mt-6 grid gap-4 md:grid-cols-2">
			{#each highlights as item}
				<li class="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
					<Sparkles class="mt-0.5 h-4 w-4 shrink-0 text-brand" />
					<span>{item}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section id="faq" use:reveal class="opacity-0 translate-y-8 transition-all duration-700 ease-out mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
		<div class="flex items-start gap-3">
			<div class="rounded-xl bg-brand/10 p-2 text-brand">
				<MessageCircleQuestion class="h-5 w-5" />
			</div>
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">{pageCopy.faqTitle[locale]}</p>
				<p class="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{pageCopy.faqIntro[locale]}</p>
			</div>
		</div>
		<div class="mt-6 grid gap-4 md:grid-cols-2">
			{#each faqItems as item}
				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
					<h2 class="text-base font-semibold text-slate-900">{item.question[locale]}</h2>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">{item.answer[locale]}</p>
				</div>
			{/each}
		</div>
	</section>
</div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { CalendarDays, Mail, Search, Users } from 'lucide-svelte';
	import type { Lang } from '$lib/i18n';
	import { accommodations } from '$lib/data/accommodations';
	import {
		buildBookingContext,
		draftDirectInquiry,
		prepareAvailabilitySearch,
		recommendApartments,
		registerBookingWebMcp,
	} from '$lib/booking-agent';

	type Props = {
		lang: Lang;
		selectedSlug?: string;
	};

	let { lang, selectedSlug = '' }: Props = $props();

	let checkIn = $state('');
	let checkOut = $state('');
	let adults = $state(2);
	let children = $state(0);
	let apartmentSlug = $state('');
	let preparedSummary = $state('');
	let mailtoHref = $state('');

	const webMcpFormAttributes: Record<string, string> = {
		toolname: 'prepare_availability_search',
		tooldescription:
			'Prepare Guesthouse Rader availability search details before the final check in the embedded feratel booking widget.',
	};

	const copy = $derived.by(() =>
		lang === 'en'
			? {
					kicker: 'Booking preparation',
					title: 'Check dates with the booking partner',
					body:
						'Choose your travel details here, then complete the live availability check in the feratel widget below.',
					checkIn: 'Check-in',
					checkOut: 'Check-out',
					adults: 'Adults',
					children: 'Children',
					apartment: 'Apartment',
					flexible: 'Flexible',
					submit: 'Prepare search',
					email: 'Draft email',
					widget: 'Continue in booking widget',
					prepared: 'Prepared search',
					bestFit: 'Best fit',
					priceFrom: 'from',
				}
			: {
					kicker: 'Buchung vorbereiten',
					title: 'Reisedaten beim Buchungspartner pruefen',
					body:
						'Waehlen Sie hier Ihre Eckdaten und fuehren Sie die Live-Verfuegbarkeitspruefung danach im feratel-Widget darunter fort.',
					checkIn: 'Anreise',
					checkOut: 'Abreise',
					adults: 'Erwachsene',
					children: 'Kinder',
					apartment: 'Appartement',
					flexible: 'Flexibel',
					submit: 'Suche vorbereiten',
					email: 'E-Mail entwerfen',
					widget: 'Im Buchungswidget fortfahren',
					prepared: 'Vorbereitete Suche',
					bestFit: 'Passende Empfehlung',
					priceFrom: 'ab',
				}
	);

	const recommendation = $derived.by(() => {
		const result = recommendApartments({ guests: adults + children }, lang);
		return result.recommendations.find((item) => item.fitsGuestCount) ?? result.recommendations[0];
	});

	const machineContext = $derived.by(() =>
		JSON.stringify(
			buildBookingContext(lang, { checkIn, checkOut, adults, children, apartmentSlug }),
			null,
			2
		)
	);

	const focusBookingWidget = () => {
		document.getElementById('deskline-container')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	const setSearchState = (state: {
		checkIn?: string;
		checkOut?: string;
		adults?: number;
		children?: number;
		apartmentSlug?: string;
	}) => {
		checkIn = state.checkIn ?? checkIn;
		checkOut = state.checkOut ?? checkOut;
		adults = state.adults ?? adults;
		children = state.children ?? children;
		apartmentSlug = state.apartmentSlug ?? apartmentSlug;
		const prepared = prepareAvailabilitySearch(
			{ checkIn, checkOut, adults, children, apartmentSlug },
			lang
		);
		preparedSummary = prepared.summary;
	};

	const handleSubmit = () => {
		setSearchState({ checkIn, checkOut, adults, children, apartmentSlug });
		focusBookingWidget();
	};

	const handleDraftEmail = () => {
		const draft = draftDirectInquiry({ checkIn, checkOut, adults, children, apartmentSlug }, lang);
		mailtoHref = draft.mailto;
	};

	onMount(() => {
		if (selectedSlug) apartmentSlug = selectedSlug;

		return registerBookingWebMcp({
			getLanguage: () => lang,
			getSearchState: () => ({ checkIn, checkOut, adults, children, apartmentSlug }),
			setSearchState,
			focusBookingWidget,
		});
	});
</script>

<section class="mx-auto w-full max-w-5xl px-4 pt-8 sm:px-6" aria-labelledby="booking-agent-title">
	<pre
		id="booking-agent-context"
		data-agent-resource="guesthouse-rader-booking"
		hidden
		aria-hidden="true"
	>
		{machineContext}
	</pre>

	<div class="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:grid-cols-[1fr,18rem]">
		<form
			class="space-y-4"
			{...webMcpFormAttributes}
			onsubmit={(event) => {
				event.preventDefault();
				handleSubmit();
			}}
		>
			<div class="space-y-1">
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{copy.kicker}</p>
				<h2 id="booking-agent-title" class="font-serif text-2xl text-slate-900 sm:text-3xl">
					{copy.title}
				</h2>
				<p class="max-w-2xl text-sm leading-relaxed text-slate-600">{copy.body}</p>
			</div>

			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
				<label class="space-y-1 text-sm font-semibold text-slate-700">
					<span class="inline-flex items-center gap-1.5">
						<CalendarDays class="h-4 w-4 text-brand" aria-hidden="true" />
						{copy.checkIn}
					</span>
					<input
						name="checkIn"
						type="date"
						bind:value={checkIn}
						class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
					/>
				</label>

				<label class="space-y-1 text-sm font-semibold text-slate-700">
					<span class="inline-flex items-center gap-1.5">
						<CalendarDays class="h-4 w-4 text-brand" aria-hidden="true" />
						{copy.checkOut}
					</span>
					<input
						name="checkOut"
						type="date"
						bind:value={checkOut}
						class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
					/>
				</label>

				<label class="space-y-1 text-sm font-semibold text-slate-700">
					<span class="inline-flex items-center gap-1.5">
						<Users class="h-4 w-4 text-brand" aria-hidden="true" />
						{copy.adults}
					</span>
					<input
						name="adults"
						type="number"
						min="1"
						max="6"
						bind:value={adults}
						class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
					/>
				</label>

				<label class="space-y-1 text-sm font-semibold text-slate-700">
					<span>{copy.children}</span>
					<input
						name="children"
						type="number"
						min="0"
						max="6"
						bind:value={children}
						class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
					/>
				</label>

				<label class="space-y-1 text-sm font-semibold text-slate-700">
					<span>{copy.apartment}</span>
					<select
						name="apartmentSlug"
						bind:value={apartmentSlug}
						class="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
					>
						<option value="">{copy.flexible}</option>
						{#each accommodations as accommodation}
							<option value={accommodation.slug}>Appartement {accommodation.title}</option>
						{/each}
					</select>
				</label>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<button
					type="submit"
					class="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40"
				>
					<Search class="h-4 w-4" aria-hidden="true" />
					{copy.submit}
				</button>
				<button
					type="button"
					class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand/20"
					onclick={handleDraftEmail}
				>
					<Mail class="h-4 w-4" aria-hidden="true" />
					{copy.email}
				</button>
				{#if mailtoHref}
					<a
						href={mailtoHref}
						class="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand/5"
					>
						{copy.email}
					</a>
				{/if}
			</div>
		</form>

		<aside class="rounded-xl bg-slate-50 p-4">
			<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
				{preparedSummary ? copy.prepared : copy.bestFit}
			</p>
			{#if preparedSummary}
				<p class="mt-2 text-sm font-semibold leading-relaxed text-slate-900">{preparedSummary}</p>
			{:else if recommendation}
				<p class="mt-2 text-lg font-semibold text-slate-900">{recommendation.title}</p>
				<p class="mt-1 text-sm text-slate-600">
					{copy.priceFrom} EUR {recommendation.priceFromEurPerNight} / Nacht
				</p>
			{/if}
			<button
				type="button"
				class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
				onclick={focusBookingWidget}
			>
				<Search class="h-4 w-4" aria-hidden="true" />
				{copy.widget}
			</button>
		</aside>
	</div>
</section>

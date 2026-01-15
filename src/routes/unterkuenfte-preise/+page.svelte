<script lang="ts">
	import { t } from '$lib/i18n';
	import { base } from '$app/paths';
	import {
		Lightbulb,
		Wifi,
		Mountain,
		Coffee,
		Sun,
		Flame,
		ShowerHead,
		Bath,
		Baby,
		SquareParking,
		ArrowRight,
		Gavel,
		CreditCard,
		CigaretteOff,
		Clock,
	} from 'lucide-svelte';

	const amenityIcons: Record<string, typeof Wifi> = {
		wifi: Wifi,
		balcony: Sun,
		mountain: Mountain,
		coffee: Coffee,
		sauna: Flame,
		fireplace: Flame,
		shower: ShowerHead,
		bath: Bath,
	};

	const withBase = (path: string) => `${base}${path}`;

	const rooms = [
		{
			key: 1,
			badge: 'badge.popular', // "Beliebt"
			image: withBase('/images/room-1.jpg'),
			amenities: ['wifi', 'balcony', 'mountain', 'coffee'],
		},
		{
			key: 2,
			badge: 'badge.exclusive', // "Exklusiv"
			image: withBase('/images/room-2.jpg'),
			amenities: ['wifi', 'sauna', 'fireplace', 'shower'],
		},
		{
			key: 3,
			badge: null,
			image: withBase('/images/room-3.jpg'),
			amenities: ['wifi', 'bath', 'balcony', 'mountain'],
		},
	];

	function badgeClasses(badgeKey: string) {
		// Screenshot: "BELIEBT" dark/grey, "EXKLUSIV" orange
		if (badgeKey === 'badge.exclusive') {
			return 'bg-brand text-white';
		}
		return 'bg-slate-800/90 text-white';
	}
</script>

<svelte:head>
	<title>{$t('rooms.page.title')} · Gästehaus Rader</title>
</svelte:head>

<div class="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
	<div class="space-y-10">
		<!-- Header / breadcrumb -->
		<section class="space-y-4">
			<p class="text-xs text-slate-500">
				{$t('rooms.page.breadcrumb')}
			</p>

			<div class="space-y-3">
				<h1 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
					{$t('rooms.page.title')}
				</h1>
				<p class="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
					{$t('rooms.page.subtitle')}
				</p>
			</div>
		</section>

		<!-- Content grid -->
		<section>
			<!-- Filter -->
			<!-- removed -->

			<!-- Room list -->
			<div class="space-y-10">
				{#each rooms as room}
					<article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
						<!-- Image -->
						<div class="relative">
							<img src={room.image} alt="" class="h-auto w-full object-cover sm:h-72" loading="lazy" />
							{#if room.badge}
								<span
									class={`absolute right-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm ${badgeClasses(
										room.badge
									)}`}
								>
									{$t(room.badge)}
								</span>
							{/if}
						</div>

						<!-- Content (split like screenshot) -->
						<div class="grid gap-8 p-6 md:grid-cols-[1.6fr,0.9fr] md:gap-0">
							<!-- Left -->
							<div class="md:pr-10">
								<h2 class="text-lg font-semibold text-slate-900 sm:text-xl">
									{$t(`rooms.page.card.${room.key}.title`)}
								</h2>
								<p class="text-sm text-slate-700">{$t(`rooms.page.card.${room.key}.type`)}</p>

								<div class="mt-2 text-xs text-slate-500">
									{$t(`rooms.page.card.${room.key}.meta`)}
								</div>

								<p class="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
									{$t(`rooms.page.card.${room.key}.body`)}
								</p>

								<!-- Amenities row -->
								<div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-600">
									{#each room.amenities as amenity}
										<span class="inline-flex items-center gap-2">
											<svelte:component this={amenityIcons[amenity]} class="h-4 w-4 text-brand" />
											{$t(`amenity.${amenity}`)}
										</span>
									{/each}
								</div>
							</div>

							<!-- Right (divider + price + button) -->
							<div
								class="flex flex-col items-end justify-between md:border-l md:border-slate-200 md:pl-10"
							>
								<div class="text-right">
									<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
										{$t('rooms.page.from')}
									</p>
									<div class="mt-2 flex items-end justify-end gap-2">
										<p class="text-2xl font-semibold text-brand">
											€{$t(`rooms.page.card.${room.key}.price`)}
										</p>
										<span class="pb-1 text-xs text-slate-500">/ {$t('price.night')}</span>
									</div>
								</div>

								<a
									href={withBase('/buchen')}
									class="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/30"
								>
									{$t('rooms.page.cta')}
									<ArrowRight class="h-4 w-4" />
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- Bottom section -->
		<section class="space-y-10">
			<div class="text-center space-y-3">
				<p class="text-xs font-semibold tracking-[0.35em] uppercase text-brand">Your Stay</p>

				<h2 class="font-serif text-3xl sm:text-4xl text-slate-900">Inclusive Services</h2>

				<div class="mx-auto h-[2px] w-10 rounded-full bg-brand"></div>
			</div>

			<!-- Inclusive services tiles -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<Lightbulb class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">Strom/Heizung</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">FREE</p>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<Wifi class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">Highspeed Wifi</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">FREE</p>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<Baby class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">Kinderbett &amp; Hochstuhl</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">FREE</p>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
					<div class="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
						<SquareParking class="h-6 w-6" />
					</div>
					<p class="mt-4 text-sm font-semibold text-slate-900">Parken</p>
					<p class="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">FREE</p>
				</div>
			</div>

			<!-- Price info card -->
			<div class="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-8">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<div class="min-w-0">
						<h2 class="text-2xl font-medium tracking-tight text-slate-900 sm:text-2xl">
							Weitere Informationen zu den Preisen
						</h2>
						<p class="mt-2 text-sm text-slate-500">
							Preise gelten für 2 Personen pro Ferienwohnung und Tag (ohne Verpflegung)
						</p>
					</div>

					<span
						class="inline-flex items-center rounded-full border border-brand/15 bg-brand/10 px-4 py-2 text-xs font-semibold text-brand"
					>
						Kinder bis 8 Jahre übernachten kostenfrei
					</span>
				</div>

				<div class="mt-6 divide-y divide-slate-100">
					<div class="flex items-center justify-between gap-6 py-5">
						<p class="text-sm text-slate-700">
							Aufschlag für <span class="font-semibold text-slate-900">jede weitere Person</span> pro Tag
						</p>
						<span class="whitespace-nowrap text-sm font-semibold text-slate-900">€ 10,-</span>
					</div>

					<div class="flex items-center justify-between gap-6 py-5">
						<div>
							<p class="text-sm text-slate-700">Kurtaxe pro Erwachsenen (ab 17 Jahre) und pro Tag</p>
							<p class="mt-1 text-xs text-slate-400">Erhöhung ab 1. Mai auf € 2,70</p>
						</div>
						<span class="whitespace-nowrap text-sm font-semibold text-slate-900">€ 2,10</span>
					</div>

					<div class="flex items-center justify-between gap-6 py-5">
						<p class="text-sm font-semibold text-slate-800">Endreinigung</p>
						<span class="whitespace-nowrap text-sm font-semibold text-slate-900">€ 45,-</span>
					</div>
				</div>

				<p class="mt-5 inline-flex items-center gap-2 text-xs italic text-slate-400">
					<span aria-hidden="true">🐾</span>
					Hinweis: Vierbeiner sind leider nicht erlaubt.
				</p>
			</div>

			<!-- Info blocks (with icons like design) -->
			<div class="grid gap-10 pt-2 md:grid-cols-2">
				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<CreditCard class="h-5 w-5" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-slate-900">Zahlung</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							Betrag ist bitte <span class="font-semibold text-slate-900">vor Ort in bar</span> zu
							bezahlen. Nach Rücksprache auch mit
							<span class="font-semibold text-slate-900">Überweisung</span> möglich. Keine Anzahlung notwendig.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<Clock class="h-5 w-5" />
					</div>
					<div class="w-full">
						<h3 class="text-lg font-semibold text-slate-900">Anreise &amp; Abreise</h3>

						<div class="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
							<div class="flex items-center justify-between px-4 py-3 text-sm">
								<span class="font-semibold text-slate-900">Check-in</span>
								<span class="text-slate-600">ab 14:00 Uhr</span>
							</div>
							<div class="flex items-center justify-between px-4 py-3 text-sm">
								<span class="font-semibold text-slate-900">Check-out</span>
								<span class="text-slate-600">bis 10:00 Uhr</span>
							</div>
						</div>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<SquareParking class="h-5 w-5" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-slate-900">Parkplatz</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							<span class="font-semibold text-slate-900">Kostenfrei</span> direkt vor unserem
							<span class="font-semibold text-slate-900">Gästehaus</span>. Keine Reservierung erforderlich.
						</p>
					</div>
				</div>

				<div class="flex items-start gap-4">
					<div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
						<CigaretteOff class="h-5 w-5" />
					</div>
					<div>
						<h3 class="text-lg font-semibold text-slate-900">Rauchen</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							In unseren Wohnungen ist <span class="font-semibold text-slate-900"
								>rauchen grundsätzlich untersagt</span
							>. Wir haben auf den Balkonen für Aschenbecher gesorgt.
						</p>
					</div>
				</div>
			</div>

			<!-- Cancellation card (like design) -->
			<div class="rounded-2xl border border-brand/15 bg-brand/5 p-6 sm:p-7">
				<div class="flex items-start gap-4">
					<div
						class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white shadow-sm"
					>
						<Gavel class="h-5 w-5" />
					</div>

					<div class="min-w-0">
						<h3 class="text-lg font-semibold text-slate-900 sm:text-xl">Stornobedingungen</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-600">
							Es gelten die <span class="font-semibold text-slate-900"
								>österreichischen Hotelbedingungen</span
							>. Wir empfehlen Ihnen eine Reiserücktrittsversicherung abzuschließen. Nähere Informationen
							erhalten Sie unter
							<a
								class="font-semibold text-brand hover:opacity-90"
								href="https://www.europaeische.at"
								target="_blank"
								rel="noreferrer"
							>
								Europäische Reiseversicherung
							</a>.
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>

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
		ArrowRight
	} from 'lucide-svelte';

	const amenityIcons: Record<string, typeof Wifi> = {
		wifi: Wifi,
		balcony: Sun,
		mountain: Mountain,
		coffee: Coffee,
		sauna: Flame,
		fireplace: Flame,
		shower: ShowerHead,
		bath: Bath
	};

	const withBase = (path: string) => `${base}${path}`;

	const rooms = [
		{
			key: 1,
			badge: 'badge.popular', // "Beliebt"
			image: withBase('/images/room-1.jpg'),
			amenities: ['wifi', 'balcony', 'mountain', 'coffee']
		},
		{
			key: 2,
			badge: 'badge.exclusive', // "Exklusiv"
			image: withBase('/images/room-2.jpg'),
			amenities: ['wifi', 'sauna', 'fireplace', 'shower']
		},
		{
			key: 3,
			badge: null,
			image: withBase('/images/room-3.jpg'),
			amenities: ['wifi', 'bath', 'balcony', 'mountain']
		}
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
						<img
							src={room.image}
							alt=""
							class="h-auto w-full object-cover sm:h-72"
							loading="lazy"
						/>
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
						<div class="flex flex-col items-end justify-between md:border-l md:border-slate-200 md:pl-10">
							<div class="text-right">
								<p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
									{$t('rooms.page.from')}
								</p>
								<div class="mt-2 flex items-end justify-end gap-2">
									<p class="text-2xl font-semibold text-brand">€{$t(`rooms.page.card.${room.key}.price`)}</p>
									<span class="pb-1 text-xs text-slate-500">/ {$t('price.night')}</span>
								</div>
							</div>

							<a
							href={withBase("/buchen")}
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

	<section class="space-y-8">
		<div>
			<h2 class="text-2xl font-semibold tracking-tight text-slate-900">
				Weitere Informationen zu den Preisen
			</h2>

			<div class="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
				<div class="flex flex-wrap items-start justify-between gap-4">
					<p>Preise gelten für 2 Personen pro Ferienwohnung und Tag (ohne Verpflegung)</p>
				</div>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<p>
						Kinder bis
						<span class="font-semibold text-slate-900">einschließlich 8 Jahre</span>
						übernachten
						<span class="font-semibold text-slate-900">kostenfrei</span>
					</p>
				</div>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<p>
						Aufschlag für <span class="font-semibold text-slate-900">jede weitere Person</span> pro
						Tag
					</p>
					<span class="whitespace-nowrap font-semibold text-slate-900">€ 10,-</span>
				</div>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<p>Kurtaxe pro Erwachsenen (ab 17 Jahre) und pro Tag</p>
					<span class="whitespace-nowrap font-semibold text-slate-900">€ 2,10 (ab 1. Mai € 2,70)</span>
				</div>
				<div class="flex flex-wrap items-start justify-between gap-4">
					<p class="font-semibold text-slate-700">Endreinigung</p>
					<span class="whitespace-nowrap font-semibold text-slate-900">€ 45,-</span>
				</div>
				<p class="text-xs text-slate-500">Hinweis: Vierbeiner sind nicht erlaubt</p>
			</div>
		</div>

		<div class="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
			<div class="flex flex-col items-center text-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
					<Lightbulb class="h-6 w-6" />
				</div>
				<p class="mt-3 text-sm font-semibold text-slate-800">Strom</p>
				<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">FREE</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
					<Wifi class="h-6 w-6" />
				</div>
				<p class="mt-3 text-sm font-semibold text-slate-800">Wifi</p>
				<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">FREE</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
					<Baby class="h-6 w-6" />
				</div>
				<p class="mt-3 text-sm font-semibold text-slate-800">Kinderbett und Hochstuhl</p>
				<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">FREE</p>
			</div>
			<div class="flex flex-col items-center text-center">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
					<SquareParking class="h-6 w-6" />
				</div>
				<p class="mt-3 text-sm font-semibold text-slate-800">Parken</p>
				<p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">FREE</p>
			</div>
		</div>
	</section>

	<section class="grid gap-10 md:grid-cols-2">
		<div class="space-y-3">
			<h3 class="text-xl font-semibold text-slate-900">Zahlung</h3>
			<p class="text-sm leading-relaxed text-slate-600">
				Betrag ist bitte <span class="font-semibold text-slate-900">vor Ort in bar</span> zu
				bezahlen. Nach Rücksprache auch mit
				<span class="font-semibold text-slate-900">Überweisung</span> möglich. Keine Anzahlung
				notwendig.
			</p>
		</div>

		<div class="space-y-3">
			<h3 class="text-xl font-semibold text-slate-900">Anreise/Abreise</h3>
			<p class="text-sm text-slate-600">
				<span class="font-semibold text-slate-900">Check in</span> ab 14:00 Uhr
			</p>
			<p class="text-sm text-slate-600">
				<span class="font-semibold text-slate-900">Check out</span> bis 10:00 Uhr
			</p>
		</div>

		<div class="space-y-3">
			<h3 class="text-xl font-semibold text-slate-900">Parkplatz</h3>
			<p class="text-sm leading-relaxed text-slate-600">
				<span class="font-semibold text-slate-900">Kostenfrei</span> direkt vor unserem
				<span class="font-semibold text-slate-900">Gästehaus</span>.
			</p>
		</div>

		<div class="space-y-3">
			<h3 class="text-xl font-semibold text-slate-900">Raucher</h3>
			<p class="text-sm leading-relaxed text-slate-600">
				In unseren Wohnungen ist
				<span class="font-semibold text-slate-900">rauchen grundsätzlich untersagt</span>. Wir
				haben auf den Balkonen für Aschenbecher gesorgt.
			</p>
		</div>

		<div class="space-y-3 md:col-span-2">
			<h3 class="text-xl font-semibold text-slate-900">Storno</h3>
			<p class="text-sm leading-relaxed text-slate-600">
				Es gelten die
				<span class="font-semibold text-slate-900">österreichischen Hotelbedingungen</span>. Wir
				empfehlen Ihnen eine Reiserücktrittsversicherung abzuschließen. Nähere Informationen
				erhalten Sie unter
				<a class="font-semibold text-brand hover:opacity-90" href="https://www.europaeische.at">
					Europäische Reiseversicherung
				</a>
				.
			</p>
		</div>
	</section>
	</div>
</div>

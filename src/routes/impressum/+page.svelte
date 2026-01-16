<script lang="ts">
	import { asset } from '$app/paths';
	import { ArrowUpRight } from 'lucide-svelte';

	const withAsset = (path: string) => asset(path);
</script>

<svelte:head>
	<title>Impressum – Gästehaus Rader</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Gästehaus Rader</p>
		<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">Impressum</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
			Angaben gemäß § 5 ECG, § 14 UGB und Offenlegung gemäß § 25 MedienG.
		</p>

		<div class="mt-10 grid gap-8 border-t border-slate-100 pt-8 lg:grid-cols-2">
			<div class="space-y-3 text-sm text-slate-600">
				<p class="text-sm font-semibold text-slate-900">Unternehmensangaben</p>
				<p class="font-semibold text-slate-800">Familie Herold-Hueber</p>
				<p>Weißbriach 92</p>
				<p>9622 Weißbriach, Österreich</p>
				<p>Telefon: <a class="hover:text-slate-900" href="tel:+436766246826">+43 676 6246826</a></p>
				<p>Telefon: <a class="hover:text-slate-900" href="tel:+43428622">+43 4286 222</a></p>
				<p>
					E-Mail:
					<a class="hover:text-slate-900" href="mailto:info@rader-gitschtal.at">
						info@rader-gitschtal.at
					</a>
				</p>
			</div>

			<div class="space-y-3 text-sm text-slate-600">
				<p class="text-sm font-semibold text-slate-900">Rechtliche Angaben</p>
				<p>Rechtsform: <span class="text-slate-500">Privatvermietung</span></p>
				<p>Firmenbuchnummer: <span class="text-slate-500">nicht im Firmenbuch eingetragen</span></p>
				<p>Firmenbuchgericht: <span class="text-slate-500">entf&auml;llt</span></p>
				<p>UID-Nummer: <span class="text-slate-500">entf&auml;llt</span></p>
				<p>Gewerbebeh&ouml;rde: <span class="text-slate-500">Bezirkshauptmannschaft Hermagor</span></p>
				<p>
					Berufsbezeichnung:
					<span class="text-slate-500">Beherbergungsbetrieb / Privatvermietung</span>
				</p>
				<p>Staat der Verleihung: <span class="text-slate-500">&Ouml;sterreich</span></p>
				<p>
					Medieninhaber (&sect;25 MedienG):
					<span class="text-slate-500"
						>Familie Herold-Hueber, Wei&szlig;briach 92, 9622 Wei&szlig;briach</span
					>
				</p>
				<p>Unternehmensgegenstand: <span class="text-slate-500">Beherbergung von G&auml;sten</span></p>
			</div>
		</div>

		<div class="mt-10 grid gap-6 border-t border-slate-100 pt-8 text-sm text-slate-600">
			<div>
				<p class="text-sm font-semibold text-slate-900">Haftung für Inhalte</p>
				<p class="mt-2">
					Wir entwickeln die Inhalte dieser Website laufend weiter und bemühen uns, korrekte und aktuelle
					Informationen bereitzustellen. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
					können wir keine Haftung übernehmen.
				</p>
			</div>
			<div>
				<p class="text-sm font-semibold text-slate-900">Haftung für Links</p>
				<p class="mt-2">
					Unsere Website enthält Links zu externen Websites, für deren Inhalte wir nicht verantwortlich
					sind. Bei Kenntnis von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
				</p>
			</div>
			<div>
				<p class="text-sm font-semibold text-slate-900">Urheberrecht</p>
				<p class="mt-2">
					Die Inhalte dieser Website unterliegen dem Urheberrecht. Die Verwendung von Bildern und Texten
					ist nur mit unserer ausdrücklichen Zustimmung gestattet.
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
							src={withAsset('/images/lh.jpg')}
							alt="Webdesign Profil"
							class="h-full w-full object-cover"
							loading="lazy"
						/>
					</div>

					<!-- Text -->
					<div>
						<p class="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand">
							Webdesign & Entwicklung
						</p>
						<p class="mt-2 text-xl font-semibold text-slate-900">Leon Hueber</p>
						<p class="mt-1 text-sm text-slate-600 max-w-md">
							Konzeption, Design und technische Umsetzung dieser Website.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

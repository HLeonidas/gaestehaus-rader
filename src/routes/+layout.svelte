<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { lang, setLang, t } from '$lib/i18n';
	import '../app.css';

	let { children } = $props();

	const navItems = [
		{ href: resolve('/unterkuenfte-preise'), key: 'nav.roomsShort' },
		{ href: resolve('/erlebnisse'), key: 'nav.experiences' },
		{ href: resolve('/ueber-uns'), key: 'nav.about' },
		{ href: resolve('/kontakt'), key: 'nav.contact' },
	];

	const withAsset = (path: string) => asset(path);
	const bookingHref = resolve('/buchen');

	// Keep ONLY for max-width control
	const isHome = $derived(page.url.pathname === resolve('/'));
	const isFullWidth = $derived(page.url.pathname.startsWith(resolve('/buchen')));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- No more isHome theme switching -->
<div class="flex min-h-screen flex-col bg-[#faf9f6] text-slate-900">
	<header class="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
			<a
				href={resolve('/')}
				class="flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/40"
				aria-label="Gästehaus Rader - Startseite"
			>
				<div
					class="flex h-16 w-44 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200 sm:h-20 sm:w-52"
				>
					<img
						src={withAsset('/images/logo-rader-gitschtal.jpg')}
						alt="Gästehaus Rader"
						class="h-12 w-auto object-contain sm:h-14"
						loading="lazy"
					/>
				</div>
			</a>

			<nav
				class="hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-slate-700 lg:flex"
			>
				{#each navItems as item}
					<a
						href={item.href}
						class={`transition-colors hover:text-brand ${
							page.url.pathname === item.href ? 'text-brand' : 'text-slate-700'
						}`}
					>
						{$t(item.key)}
					</a>
				{/each}
			</nav>

			<div class="flex items-center gap-3">
				<div
					class="hidden items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold md:flex"
				>
					<button
						type="button"
						class={`rounded-full px-3 py-1 transition ${
							$lang === 'de' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
						}`}
						onclick={() => setLang('de')}
					>
						DE
					</button>
					<button
						type="button"
						class={`rounded-full px-3 py-1 transition ${
							$lang === 'en' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
						}`}
						onclick={() => setLang('en')}
					>
						EN
					</button>
				</div>

				<a
					href={bookingHref}
					class="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40"
				>
					{$t('nav.booking')}
				</a>
			</div>
		</div>

		<nav class="border-t border-slate-100 bg-white/70 lg:hidden">
			<div
				class="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-3 text-sm font-medium sm:px-6"
			>
				{#each navItems as item}
					<a
						href={item.href}
						class={`whitespace-nowrap transition-colors hover:text-brand ${
							page.url.pathname === item.href ? 'text-brand' : 'text-slate-700'
						}`}
					>
						{$t(item.key)}
					</a>
				{/each}
			</div>
		</nav>
	</header>

	<!-- ONLY remaining isHome logic: max-width behavior -->
	<main
		class={`w-full flex-1 ${
			isHome ? '' : isFullWidth ? '' : 'mx-auto max-w-6xl px-4 py-10 sm:px-6'
		}`}
	>
		{@render children()}
	</main>

	<footer class="border-t border-slate-200 bg-white text-slate-800">
		<div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
			<div class="grid gap-10 lg:grid-cols-3">
				<div>
					<div class="flex items-center gap-3">
						<div class="flex items-center justify-center rounded-lg shadow-sm">
							<img
								src={withAsset('/images/logo-rader-gitschtal.jpg')}
								alt="Gästehaus Rader"
								class="h-12 w-auto object-contain sm:h-14"
								loading="lazy"
							/>
						</div>
					</div>

					<p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
						{$t('footer.tagline')}
					</p>
				</div>

				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em]">
						{$t('footer.quicklinks')}
					</p>
					<ul class="mt-4 space-y-3 text-sm text-slate-600">
						<li>
							<a class="hover:text-slate-900" href={resolve('/unterkuenfte-preise')}>
								{$t('nav.roomsShort')}
							</a>
						</li>
						<li>
							<a class="hover:text-slate-900" href={resolve('/erlebnisse')}>
								{$t('nav.experiences')}
							</a>
						</li>
						<li>
							<a class="hover:text-slate-900" href={resolve('/ueber-uns')}>
								{$t('nav.about')}
							</a>
						</li>
						<li>
							<a class="hover:text-slate-900" href={resolve('/kontakt')}>
								{$t('nav.contact')}
							</a>
						</li>
					</ul>
				</div>

				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em]">
						{$t('footer.contact')}
					</p>
					<ul class="mt-4 space-y-3 text-sm text-slate-600">
						<li class="font-semibold text-slate-800">Familie Herold-Hueber</li>
						<li>Weißbriach 92</li>
						<li>9622 Weißbriach, Österreich</li>
						<li>
							<a class="hover:text-slate-900" href="tel:+436766246826">+43 676 6246826</a>
						</li>
						<li>
							<a class="hover:text-slate-900" href="mailto:info@rader-gitschtal.at">
								info@rader-gitschtal.at
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div
				class="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
			>
				<p>
					© {new Date().getFullYear()} Gästehaus Rader. {$t('footer.rights')}
				</p>
				<div class="flex flex-wrap gap-x-6 gap-y-2">
					<a href={resolve('/impressum')} class="hover:text-slate-900">{$t('footer.imprint')}</a>
					<a href={resolve('/datenschutz')} class="hover:text-slate-900">{$t('footer.privacy')}</a>
					<a href={resolve('/agb')} class="hover:text-slate-900">{$t('footer.terms')}</a>
					<a href={resolve('/bildnachweise')} class="hover:text-slate-900">
						{$t('footer.credits')}
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>

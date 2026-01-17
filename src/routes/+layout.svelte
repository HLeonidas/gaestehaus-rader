<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { lang, setLang, t } from '$lib/i18n';
	import { MessageCircle } from 'lucide-svelte';
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
	const siteUrl = 'https://www.rader-gitschtal.at';
	const canonicalUrl = $derived.by(() => new URL(page.url.pathname, siteUrl).toString());

	const normalizePath = (path: string) => (path === '/' ? '/' : path.replace(/\/+$/, ''));
	const isActive = (href: string) => {
		const current = normalizePath(page.url.pathname);
		const target = normalizePath(href);

		return current === target || (target !== '/' && current.startsWith(`${target}/`));
	};

	// Keep ONLY for max-width control
	const isHome = $derived(page.url.pathname === resolve('/'));
	const isFullWidth = $derived(page.url.pathname.startsWith(resolve('/buchen')));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href={canonicalUrl} />
	<meta property="og:site_name" content="Gästehaus Rader" />
</svelte:head>

<!-- No more isHome theme switching -->
<div class="flex min-h-screen flex-col bg-[#faf9f6] text-slate-900">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-md"
	>
		{$t('accessibility.skip')}
	</a>
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
						src={withAsset('/images/other/logo-rader-gitschtal.jpg')}
						alt="Gästehaus Rader"
						class="h-12 w-auto object-contain sm:h-14"
						loading="lazy"
					/>
				</div>
			</a>

			<nav
				class="hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-slate-700 lg:flex"
				aria-label={$t('nav.primary')}
			>
				{#each navItems as item}
					<a
						href={item.href}
						class={`transition-colors hover:text-brand ${
							isActive(item.href) ? 'text-brand' : 'text-slate-700'
						}`}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{$t(item.key)}
					</a>
				{/each}
			</nav>

			<div class="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
				<div
					class="flex items-center rounded-full border border-slate-200 bg-white p-1 text-[11px] font-semibold sm:text-xs"
				>
					<button
						type="button"
						class={`rounded-full px-2.5 py-1 transition sm:px-3 ${
							$lang === 'de' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
						}`}
						onclick={() => setLang('de')}
						aria-pressed={$lang === 'de'}
						aria-label={$t('nav.langDe')}
					>
						DE
					</button>
					<button
						type="button"
						class={`rounded-full px-2.5 py-1 transition sm:px-3 ${
							$lang === 'en' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
						}`}
						onclick={() => setLang('en')}
						aria-pressed={$lang === 'en'}
						aria-label={$t('nav.langEn')}
					>
						EN
					</button>
				</div>

				<a
					href={bookingHref}
					class="inline-flex items-center justify-center rounded-full bg-brand px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40 sm:px-5 sm:text-sm"
					aria-label={$t('nav.booking')}
				>
					{$t('nav.booking')}
				</a>
			</div>
		</div>

		<nav class="border-t border-slate-100 bg-white/70 lg:hidden" aria-label={$t('nav.primary')}>
			<div
				class="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-3 text-sm font-medium sm:px-6"
			>
				{#each navItems as item}
					<a
						href={item.href}
						class={`whitespace-nowrap transition-colors hover:text-brand ${
							isActive(item.href) ? 'text-brand' : 'text-slate-700'
						}`}
						aria-current={isActive(item.href) ? 'page' : undefined}
					>
						{$t(item.key)}
					</a>
				{/each}
			</div>
		</nav>
	</header>

	<!-- ONLY remaining isHome logic: max-width behavior -->
	<main
		id="main-content"
		class={`w-full flex-1 ${
			isHome ? '' : isFullWidth ? '' : 'mx-auto max-w-6xl px-2 py-10 sm:px-6'
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
								src={withAsset('/images/other/logo-rader-gitschtal.jpg')}
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
						<li>
							<a class="hover:text-slate-900" href={resolve('/faq')}>
								{$t('footer.faq')}
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
							<a
								class="ml-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
								href="https://wa.me/436766246826"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="WhatsApp: +43 676 6246826"
							>
								<MessageCircle class="h-3.5 w-3.5" aria-hidden="true" />
								WhatsApp
							</a>
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
					<a href={resolve('/barrierefreiheit')} class="hover:text-slate-900">
						{$t('footer.accessibility')}
					</a>
					<a href={resolve('/bildnachweise')} class="hover:text-slate-900">
						{$t('footer.credits')}
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>

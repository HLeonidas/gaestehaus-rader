<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { lang, setLang, t } from '$lib/i18n';
	import '../app.css';

	// Svelte 5: children comes from $props()
	let { children } = $props();

	const navItems = [
		{ href: '/zimmer', key: 'nav.roomsShort' },
		{ href: '/erlebnisse', key: 'nav.experiences' },
		{ href: '/wellness', key: 'nav.wellness' },
		{ href: '/ueber-uns', key: 'nav.about' }
	];

	const bookingHref = '/buchen';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Warm page background like screenshot -->
<div class="min-h-screen bg-[#faf9f6] text-slate-900">
	<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
			<!-- Brand -->
			<a
				href="/"
				class="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/40"
				aria-label="Gästehaus Rader - Startseite"
			>
				<div class="flex h-10 w-10 items-center justify-center rounded-lg text-white shadow-sm">
					                  <img
                    src="/images/logo.png"
                    alt=""
                    class=""
                    loading="lazy"
                  />
				</div>
				<span class="text-base font-bold text-slate-900 sm:text-lg">Gästehaus Rader</span>
			</a>

			<!-- Desktop nav centered -->
			<nav class="hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-slate-700 lg:flex">
				{#each navItems as item}
					<a
						href={item.href}
						class={`transition-colors hover:text-brand ${
							$page.url.pathname === item.href ? 'text-brand' : 'text-slate-700'
						}`}
					>
						{$t(item.key)}
					</a>
				{/each}
			</nav>

			<!-- Right actions -->
			<div class="flex items-center gap-3">
				<!-- Language pill (like screenshot) -->
				<div class="hidden items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold md:flex">
					<button
						type="button"
						class={`rounded-full px-3 py-1 transition ${
							$lang === 'de' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
						}`}
						on:click={() => setLang('de')}
					>
						DE
					</button>
					<button
						type="button"
						class={`rounded-full px-3 py-1 transition ${
							$lang === 'en' ? 'bg-brand text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
						}`}
						on:click={() => setLang('en')}
					>
						EN
					</button>
				</div>

				<!-- Primary CTA -->
				<a
					href={bookingHref}
					class="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/40"
				>
					{$t('nav.booking')}
				</a>
			</div>
		</div>

		<!-- Mobile nav row -->
		<nav class="lg:hidden border-t border-slate-100 bg-white/70">
			<div class="mx-auto flex max-w-6xl items-center gap-5 overflow-x-auto px-4 py-3 text-sm font-medium sm:px-6">
				{#each navItems as item}
					<a
						href={item.href}
						class={`whitespace-nowrap transition-colors hover:text-brand ${
							$page.url.pathname === item.href ? 'text-brand' : 'text-slate-700'
						}`}
					>
						{$t(item.key)}
					</a>
				{/each}
			</div>
		</nav>
	</header>

	<!-- IMPORTANT: main should NOT force white bg; homepage sections will handle their own backgrounds -->
	<main class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
		{@render children()}
	</main>

	<!-- Footer like screenshot -->
	<footer class="bg-[#0f172a] text-slate-100">
		<div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
			<div class="grid gap-10 lg:grid-cols-3">
				<!-- Brand / description -->
				<div>
					<div class="flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white shadow-sm">
							<svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
								<path d="M4 18h16" stroke="currentColor" stroke-width="1.5" fill="none" />
								<path d="M12 6l4 6H8l4-6Z" fill="currentColor" />
							</svg>
						</div>
						<p class="text-base font-semibold text-white">Gästehaus Rader</p>
					</div>

					<p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
						{$t('footer.tagline')}
					</p>

					<!-- optional social icons like screenshot bottom-left -->
					<div class="mt-6 flex gap-3">
						<a href="#" class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/15" aria-label="Instagram">
							<span class="text-sm">⌁</span>
						</a>
						<a href="#" class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/15" aria-label="Facebook">
							<span class="text-sm">⌁</span>
						</a>
					</div>
				</div>

				<!-- Quick links -->
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
						{$t('footer.quicklinks')}
					</p>
					<ul class="mt-4 space-y-3 text-sm text-slate-300">
						<li><a class="hover:text-white" href="/zimmer">{$t('nav.roomsShort')}</a></li>
						<li><a class="hover:text-white" href="/wellness">{$t('nav.wellness')}</a></li>
						<li><a class="hover:text-white" href="/erlebnisse">{$t('nav.experiences')}</a></li>
						<li><a class="hover:text-white" href="/winter">{$t('footer.winter')}</a></li>
					</ul>
				</div>

				<!-- Contact -->
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
						{$t('footer.contact')}
					</p>
					<ul class="mt-4 space-y-3 text-sm text-slate-300">
						<li>{$t('footer.addressLine1')}</li>
						<li>{$t('footer.addressLine2')}</li>
						<li>
							<a class="hover:text-white" href="tel:+430000000">+43 000 0000</a>
						</li>
						<li>
							<a class="hover:text-white" href="mailto:info@gaestehaus-rader.at">info@gaestehaus-rader.at</a>
						</li>
					</ul>
				</div>

			</div>

			<!-- bottom bar -->
			<div class="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
				<p>© {new Date().getFullYear()} Gästehaus Rader. {$t('footer.rights')}</p>
				<div class="flex flex-wrap gap-x-6 gap-y-2">
					<a href="/impressum" class="hover:text-white">{$t('footer.imprint')}</a>
					<a href="/datenschutz" class="hover:text-white">{$t('footer.privacy')}</a>
					<a href="/agb" class="hover:text-white">{$t('footer.terms')}</a>
				</div>
			</div>
		</div>
	</footer>
</div>

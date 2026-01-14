<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { lang, setLang, t } from '$lib/i18n';
	import '../app.css';

	let { children } = $props();

	const navItems = [
		{ href: '/', key: 'nav.home' },
		{ href: '/ueber-uns', key: 'nav.about' },
		{ href: '/unterkuenfte-preise', key: 'nav.rooms' },
		{ href: '/buchen', key: 'nav.booking' },
		{ href: '/kontakt', key: 'nav.contact' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-white text-slate-900">
	<header class="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-3">
				<div class="h-10 w-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-heading text-lg">
					R
				</div>
				<div class="leading-tight">
					<span class="block font-heading text-lg tracking-wide">Gästehaus Rader</span>
					<span class="block text-xs uppercase tracking-[0.25em] text-slate-500">Kärnten</span>
				</div>
			</a>
			<nav class="hidden items-center gap-6 text-sm font-medium lg:flex">
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
			<div class="flex items-center gap-3">
				<a
					href="/buchen"
					class="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand/90 md:inline-flex"
				>
					{$t('nav.booking')}
				</a>
				<div class="flex items-center gap-1 rounded-full border border-slate-200 p-1 text-xs font-semibold">
					<button
						class={`rounded-full px-3 py-1 transition ${
							$lang === 'de' ? 'bg-brand text-white' : 'text-slate-600 hover:text-slate-900'
						}`}
						type="button"
						on:click={() => setLang('de')}
					>
						DE
					</button>
					<button
						class={`rounded-full px-3 py-1 transition ${
							$lang === 'en' ? 'bg-brand text-white' : 'text-slate-600 hover:text-slate-900'
						}`}
						type="button"
						on:click={() => setLang('en')}
					>
						EN
					</button>
				</div>
			</div>
		</div>
		<nav class="flex items-center gap-4 overflow-x-auto border-t border-slate-100 px-6 py-3 text-sm font-medium lg:hidden">
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
		</nav>
	</header>

	<main class="mx-auto w-full max-w-6xl px-6 py-10">{@render children()}</main>

	<footer class="border-t border-slate-200 bg-slate-50">
		<div class="mx-auto w-full max-w-6xl px-6 py-10">
			<div class="grid gap-8 md:grid-cols-[2fr,1fr,1fr]">
				<div>
					<p class="text-lg font-heading">Gästehaus Rader</p>
					<p class="mt-2 text-sm text-slate-600">Weißbriach, Gitschtal · Kärnten</p>
					<p class="mt-4 text-sm text-slate-600">info@gaestehaus-rader.at · +43 000 0000</p>
				</div>
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
						{$t('footer.links')}
					</p>
					<ul class="mt-3 space-y-2 text-sm text-slate-700">
						<li><a href="/kontakt" class="hover:text-brand">{$t('nav.contact')}</a></li>
						<li><a href="/buchen" class="hover:text-brand">{$t('nav.booking')}</a></li>
						<li><a href="/unterkuenfte-preise" class="hover:text-brand">{$t('nav.rooms')}</a></li>
					</ul>
				</div>
				<div>
					<p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
						{$t('footer.legal')}
					</p>
					<ul class="mt-3 space-y-2 text-sm text-slate-700">
						<li><a href="/impressum" class="hover:text-brand">{$t('footer.imprint')}</a></li>
						<li><a href="/datenschutz" class="hover:text-brand">{$t('footer.privacy')}</a></li>
						<li><a href="/agb" class="hover:text-brand">{$t('footer.terms')}</a></li>
					</ul>
				</div>
			</div>
			<p class="mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Gästehaus Rader</p>
		</div>
	</footer>
</div>

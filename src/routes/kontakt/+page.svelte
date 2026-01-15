<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('contact.title')} · Gästehaus Rader</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">

<section class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
	<p class="text-xs uppercase tracking-[0.3em] text-slate-500">Kontakt</p>
	<h1 class="mt-4 text-4xl">{$t('contact.title')}</h1>
	<p class="mt-4 max-w-3xl text-base text-slate-600">{$t('contact.body')}</p>
</section>

<section class="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
	<form class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
		<div class="grid gap-4">
			<input
				type="text"
				placeholder={$t('contact.form.name')}
				class="rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
			/>
			<input
				type="email"
				placeholder={$t('contact.form.email')}
				class="rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
			/>
			<textarea
				rows="5"
				placeholder={$t('contact.form.message')}
				class="rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
			></textarea>
			<button
				type="button"
				class="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand/90"
			>
				{$t('contact.form.cta')}
			</button>
		</div>
	</form>
	<div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
		<p class="font-semibold text-slate-800">Gästehaus Rader</p>
		<p class="mt-2">Weißbriach, Gitschtal</p>
		<p>Kärnten, Österreich</p>
		<p class="mt-4">info@gaestehaus-rader.at</p>
		<p>+43 000 0000</p>
		<div class="mt-6 rounded-xl bg-white p-4 text-sm text-slate-600">
			<p class="font-semibold text-slate-800">{$t('contact.arrival.title')}</p>
			<p class="mt-1">{$t('contact.arrival.body')}</p>
		</div>
	</div>
</section>
</div>

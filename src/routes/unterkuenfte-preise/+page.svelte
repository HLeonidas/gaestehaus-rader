<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('rooms.title')} · Gästehaus Rader</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
	<p class="text-xs uppercase tracking-[0.3em] text-slate-500">Unterkünfte</p>
	<h1 class="mt-4 text-4xl">{$t('rooms.title')}</h1>
	<p class="mt-4 max-w-3xl text-base text-slate-600">{$t('rooms.body')}</p>
</section>

<section class="mt-10 grid gap-6 lg:grid-cols-3">
	{#each [1, 2, 3] as index}
		<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div class="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-200 via-slate-100 to-white"></div>
			<h2 class="mt-4 text-2xl">{$t(`rooms.card.${index}.title`)}</h2>
			<p class="mt-2 text-sm text-slate-600">{$t(`rooms.card.${index}.body`)}</p>
			<div class="mt-4 flex items-center justify-between text-sm">
				<span class="font-semibold text-brand">{$t('price.from')}</span>
				<a href="/buchen" class="font-semibold text-slate-700 hover:text-brand">
					{$t('nav.booking')}
				</a>
			</div>
		</div>
	{/each}
</section>

<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<svelte:head>
	<title>{$t('about.title')} · Gästehaus Rader</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
	<p class="text-xs uppercase tracking-[0.3em] text-slate-500">Über uns</p>
	<h1 class="mt-4 text-4xl">{$t('about.title')}</h1>
	<p class="mt-4 max-w-3xl text-base text-slate-600">{$t('about.body')}</p>
	<div class="mt-10 grid gap-6 md:grid-cols-3">
		{#each [1, 2, 3] as index}
			<div class="rounded-2xl border border-slate-200 p-6">
				<p class="text-sm font-semibold text-slate-800">{$t(`about.card.${index}.title`)}</p>
				<p class="mt-2 text-sm text-slate-600">{$t(`about.card.${index}.body`)}</p>
			</div>
		{/each}
	</div>
</section>

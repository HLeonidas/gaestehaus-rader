<script lang="ts">
	import { t } from '$lib/i18n';

	const faqItems = [
		{ question: 'faq.q1', answer: 'faq.a1' },
		{ question: 'faq.q2', answer: 'faq.a2' },
		{ question: 'faq.q3', answer: 'faq.a3' },
		{ question: 'faq.q4', answer: 'faq.a4' },
		{ question: 'faq.q5', answer: 'faq.a5' },
		{ question: 'faq.q6', answer: 'faq.a6', id: 'gaestecard' },
		{ question: 'faq.q7', answer: 'faq.a7' },
		{ question: 'faq.q8', answer: 'faq.a8' },
	];
</script>

<svelte:head>
	<title>{$t('faq.title')} - {$t('brand.name')}</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
	<section class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
		<p class="text-xs font-semibold uppercase tracking-[0.35em] text-brand">
			{$t('brand.name')}
		</p>
		<h1 class="mt-4 font-serif text-4xl leading-[0.95] text-slate-900 sm:text-5xl">
			{$t('faq.title')}
		</h1>
		<div class="mt-4 h-[3px] w-14 rounded-full bg-brand"></div>
		<p class="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
			{$t('faq.subtitle')}
		</p>

		<div class="mt-8 grid gap-6 sm:grid-cols-2">
			{#each faqItems as item}
				<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm" id={item.id}>
					<h2 class="text-base font-semibold text-slate-900">
						{$t(item.question)}
					</h2>
					<p class="mt-2 text-sm leading-relaxed text-slate-600">
						{$t(item.answer)}
					</p>
				</div>
			{/each}
		</div>
	</section>
</div>

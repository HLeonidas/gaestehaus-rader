<script lang="ts">
	import { onMount } from 'svelte';
	import { lang, t } from '$lib/i18n';
	import { cleanupDeskline, mountDeskline } from '$lib/deskline';
	import { Ticket } from 'lucide-svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';

	let containerEl: HTMLDivElement;

	onMount(() => {
		mountDeskline(containerEl, $lang ?? 'de');

		return () => {
			cleanupDeskline(containerEl);
		};
	});
</script>

<SeoHead titleKey="booking.seo.title" descriptionKey="booking.seo.description" />

<div class="mx-auto w-full max-w-4xl px-4 pt-8 sm:px-6">
	<div class="rounded-2xl border border-brand/20 bg-brand/5 p-4 sm:p-5">
		<div class="flex items-start gap-3">
			<div class="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
				<Ticket class="h-5 w-5" aria-hidden="true" />
			</div>
			<div>
				<p class="text-sm font-semibold text-slate-900">
					{$t('booking.guestcard.title')}
				</p>
				<p class="mt-1 text-xs text-slate-600 sm:text-sm">
					{$t('booking.guestcard.body')}
				</p>
			</div>
		</div>
	</div>
</div>

<div id="deskline-container" bind:this={containerEl}>
	<p class="py-10 text-center text-slate-500">
		{$lang === 'de' ? 'Buchungsplattform wird geladen…' : 'Booking platform is loading…'}
	</p>
</div>


<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { MapPinOff, House, TriangleAlert } from 'lucide-svelte';

	export let error: any;
	export let status: number;

	const is404 = status === 404 || error?.status === 404 || error?.message?.includes('Not Found');
	
	const homeHref = `${base}/`;
</script>

<main class="px-6 py-20">
	<div class="mx-auto max-w-xl text-center">
		<div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
			<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
				{#if is404}
					<MapPinOff class="h-8 w-8" />
				{:else}
					<TriangleAlert class="h-8 w-8" />
				{/if}
			</div>

			<p class="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-brand">Gästehaus Rader</p>

			<h1 class="mt-3 font-serif text-3xl font-semibold leading-[0.95] text-slate-900 sm:text-4xl">
				{#if is404}
					Seite nicht gefunden
				{:else}
					Etwas ist schiefgelaufen
				{/if}
			</h1>

			<div class="mx-auto mt-4 h-[3px] w-14 rounded-full bg-brand"></div>

			{#if is404}
				<p class="mt-6 text-sm text-slate-600">
					Diese Seite existiert leider nicht (mehr). Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.
				</p>

				<a
					href={homeHref}
					class="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
				>
					<House class="h-4 w-4" />
					Zur Startseite
				</a>
			{:else}
				<p class="mt-6 text-sm text-slate-600">
					Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.
				</p>

				<!-- Optional: show status for debugging -->
				<p class="mt-3 text-xs text-slate-400">
					Status: {status}
				</p>
			{/if}
		</div>
	</div>
</main>

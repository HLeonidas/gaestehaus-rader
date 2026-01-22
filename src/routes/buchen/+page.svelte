<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { lang, t } from '$lib/i18n';
	import { Ticket } from 'lucide-svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';

	const ACCOUNT_ID = 'fa73de04-c8e1-4b05-b4a8-5697e2d52a1c';
	const SCRIPT_ID = 'deskline-script';
	const SCRIPT_SRC =
		'https://web5.deskline.net/start/ACCOKTN/fa73de04-c8e1-4b05-b4a8-5697e2d52a1c/index.js';

	const SESSION_FLAG = 'deskline:scriptAdded';

	type DwFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

	let containerEl: HTMLDivElement;

	function injectDeskline() {
		// Ensure container is clean
		containerEl.innerHTML = '';

		// Create/overwrite dw queue each time
		const win = window as Window & { dw?: DwFn };
		const dwFn: DwFn = function (...args: unknown[]) {
			dwFn.q = dwFn.q || [];
			dwFn.q.push(args);
		};
		win.dw = dwFn;

		// Queue settings before script loads
		dwFn('settings', ACCOUNT_ID, {
			context: { serviceIds: [], productIds: [] },
			lang: $lang ?? 'de',
		});

		// Inject script into container (as required)
		const script = document.createElement('script');
		script.id = SCRIPT_ID;
		script.async = true;
		script.src = `${SCRIPT_SRC}?cb=${Date.now()}`; // avoid cached "already executed" behavior
		containerEl.appendChild(script);

		// Mark as added for this browser session
		sessionStorage.setItem(SESSION_FLAG, '1');
	}

	onMount(() => {
		if (!browser) return;

		const alreadyAdded = sessionStorage.getItem(SESSION_FLAG) === '1';

		// If we have already added it once in this session, force a hard reload
		// (this fixes the broken 2nd SPA visit)
		if (alreadyAdded) {
			// prevent infinite reload loop: clear flag BEFORE reloading
			sessionStorage.removeItem(SESSION_FLAG);
			location.reload();
			return;
		}

		// First visit in this session: just inject
		injectDeskline();
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
	<p class="py-10 text-center text-slate-500">Buchungsplattform wird geladen…</p>
</div>


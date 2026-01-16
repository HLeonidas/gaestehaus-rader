<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { lang } from '$lib/i18n';

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

<div id="deskline-container" bind:this={containerEl}>
	<p class="py-10 text-center text-slate-500">Buchungsplattform wird geladen…</p>
</div>

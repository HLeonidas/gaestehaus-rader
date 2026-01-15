<script lang="ts">
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';

	onMount(() => {
		const win = window as Window & {
			dw?: ((...args: unknown[]) => void) & { q?: unknown[][] };
		};

		type DwFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
		const dwFn: DwFn = function (...args: unknown[]) {
			dwFn.q = dwFn.q || [];
			dwFn.q.push(args);
		};
		win.dw = dwFn;

		const container = document.getElementById('deskline-container');
		if (container) {
			container.innerHTML = '';
		}

		dwFn('settings', 'fa73de04-c8e1-4b05-b4a8-5697e2d52a1c', {
			context: {
				serviceIds: [],
				productIds: [],
			},
			lang: 'de',
		});

		const existingScript = document.getElementById('deskline-script');
		if (existingScript?.parentNode) {
			existingScript.parentNode.removeChild(existingScript);
		}

		const script = document.createElement('script');
		script.id = 'deskline-script';
		script.async = true;
		script.src =
			'https://web5.deskline.net/start/ACCOKTN/fa73de04-c8e1-4b05-b4a8-5697e2d52a1c/index.js';
		if (container) {
			container.appendChild(script);
		} else {
			document.body.appendChild(script);
		}
		return () => {
			const scriptEl = document.getElementById('deskline-script');
			if (scriptEl?.parentNode) {
				scriptEl.parentNode.removeChild(scriptEl);
			}
			if (container) {
				container.innerHTML = '';
			}
			delete win.dw;
		};
	});
</script>

<svelte:head>
	<title>{$t('booking.title')} · Gästehaus Rader</title>
</svelte:head>

<div id="deskline-container"></div>

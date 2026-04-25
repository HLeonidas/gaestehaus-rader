import { browser } from '$app/environment';

const ACCOUNT_ID = 'fa73de04-c8e1-4b05-b4a8-5697e2d52a1c';
const SCRIPT_ID = 'deskline-script';
const SCRIPT_SRC =
	'https://web5.deskline.net/start/ACCOKTN/fa73de04-c8e1-4b05-b4a8-5697e2d52a1c/index.js';

type DwFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

type DesklineWindow = Window & {
	dw?: DwFn;
};

const createQueue = () => {
	const dwFn: DwFn = function (...args: unknown[]) {
		dwFn.q = dwFn.q || [];
		dwFn.q.push(args);
	};
	return dwFn;
};

export function cleanupDeskline(container?: HTMLElement | null) {
	if (!browser) return;
	const script = document.getElementById(SCRIPT_ID);
	script?.parentNode?.removeChild(script);
	if (container) container.innerHTML = '';
	delete (window as DesklineWindow).dw;
}

export function mountDeskline(
	container: HTMLElement,
	lang: string,
	context?: {
		serviceIds?: string[];
		productIds?: string[];
	}
) {
	if (!browser) return;
	cleanupDeskline(container);

	const win = window as DesklineWindow;
	win.dw = createQueue();
	win.dw('settings', ACCOUNT_ID, {
		context: {
			serviceIds: context?.serviceIds ?? [],
			productIds: context?.productIds ?? [],
		},
		lang,
	});

	const script = document.createElement('script');
	script.id = SCRIPT_ID;
	script.async = true;
	script.src = SCRIPT_SRC;
	container.appendChild(script);
}

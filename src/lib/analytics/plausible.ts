import { browser } from '$app/environment';
type PlausibleModule = typeof import('@plausible-analytics/tracker/plausible.js');

const domain = 'rader-gitschtal.at';
let initialized = false;
let trackerPromise: Promise<PlausibleModule> | null = null;
let initPromise: Promise<void> | null = null;

const loadTracker = async () => {
	if (!trackerPromise) {
		trackerPromise = import('@plausible-analytics/tracker/plausible.js');
	}

	return trackerPromise;
};

const ensureInitialized = async () => {
	if (!browser || initialized) {
		return;
	}

	if (!initPromise) {
		initPromise = (async () => {
			const tracker = await loadTracker();
			tracker.init({ domain, autoCapturePageviews: false });
			initialized = true;
		})();
	}

	await initPromise;
};

export const trackPageview = async (url?: string) => {
	await ensureInitialized();

	if (!browser) {
		return;
	}

	const tracker = await loadTracker();

	tracker.track('pageview', url ? { url } : {});
};

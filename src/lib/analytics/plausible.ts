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

const normalizeProps = (
	props?: Record<string, string | number | boolean>
): Record<string, string> | undefined => {
	if (!props) {
		return undefined;
	}

	return Object.fromEntries(
		Object.entries(props).map(([key, value]) => [key, String(value)])
	) as Record<string, string>;
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

export const trackEvent = async (
	eventName: string,
	props?: Record<string, string | number | boolean>
) => {
	await ensureInitialized();

	if (!browser) {
		return;
	}

	const tracker = await loadTracker();
	const normalizedProps = normalizeProps(props);

	tracker.track(eventName, normalizedProps ? { props: normalizedProps } : {});
};

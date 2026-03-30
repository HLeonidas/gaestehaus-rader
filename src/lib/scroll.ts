import type Lenis from 'lenis';

const DEFAULT_SCROLL_DURATION = 1;

let lenisInstance: Lenis | null = null;

type PageScrollOptions = {
	behavior?: ScrollBehavior;
	duration?: number;
	offset?: number;
};

const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function setLenisInstance(instance: Lenis | null) {
	lenisInstance = instance;
}

export function getLenisInstance() {
	return lenisInstance;
}

export function scrollPageTo(
	top: number,
	{ behavior = 'smooth', duration = DEFAULT_SCROLL_DURATION, offset = 0 }: PageScrollOptions = {}
) {
	if (typeof window === 'undefined') return;

	const targetTop = Math.max(0, top + offset);
	const resolvedBehavior =
		behavior === 'smooth' && prefersReducedMotion() ? 'auto' : behavior;

	if (lenisInstance) {
		lenisInstance.scrollTo(targetTop, {
			duration,
			immediate: resolvedBehavior !== 'smooth',
		});
		return;
	}

	window.scrollTo({ top: targetTop, behavior: resolvedBehavior });
}

export function scrollPageToElement(
	target: string | HTMLElement,
	options: PageScrollOptions = {}
) {
	if (typeof window === 'undefined') return false;

	const element =
		typeof target === 'string' ? document.getElementById(target) : target;

	if (!element) return false;

	const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
	scrollPageTo(absoluteTop, options);

	return true;
}

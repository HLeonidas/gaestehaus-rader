export type RevealOptions = {
	threshold?: number;
	rootMargin?: string;
};

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const prefersReducedMotion =
		typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		node.classList.remove('opacity-0', 'translate-y-8', 'translate-y-4', 'scale-95');
		node.classList.add('opacity-100', 'translate-y-0', 'scale-100');
		return {};
	}

	const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.remove('opacity-0', 'translate-y-8', 'translate-y-4', 'scale-95');
					node.classList.add('opacity-100', 'translate-y-0', 'scale-100');
					observer.unobserve(node);
				}
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

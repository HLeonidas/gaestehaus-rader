import { base as appBase, resolve } from '$app/paths';
import type { Lang } from '$lib/i18n';

export const DEFAULT_LOCALE: Lang = 'de';
export const EN_LOCALE_PREFIX = '/en';

const routePairs = [
	{ de: '/', en: '/' },
	{ de: '/unterkuenfte-preise', en: '/accommodations-prices' },
	{ de: '/unterkuenfte', en: '/accommodations' },
	{ de: '/erlebnisse/sommer', en: '/experiences/summer' },
	{ de: '/erlebnisse/winter', en: '/experiences/winter' },
	{ de: '/erlebnisse', en: '/experiences' },
	{ de: '/ueber-uns', en: '/about' },
	{ de: '/kontakt', en: '/contact' },
	{ de: '/buchen', en: '/book' },
	{ de: '/online-buchen', en: '/online-booking' },
	{ de: '/fakten', en: '/facts' },
	{ de: '/faq', en: '/faq' },
	{ de: '/workation', en: '/workation' },
	{ de: '/impressum', en: '/imprint' },
	{ de: '/datenschutz', en: '/privacy' },
	{ de: '/agb', en: '/terms' },
	{ de: '/barrierefreiheit', en: '/accessibility' },
	{ de: '/bildnachweise', en: '/image-credits' },
	{ de: '/gastehaus-rader', en: '/guesthouse-rader' },
] as const;

const deSorted = [...routePairs].sort((left, right) => right.de.length - left.de.length);
const enSorted = [...routePairs].sort((left, right) => right.en.length - left.en.length);

export const normalizePathname = (pathname: string) => {
	if (!pathname || pathname === '/') return '/';
	const cleanPath = pathname.split(/[?#]/, 1)[0] ?? '/';
	const withoutTrailingSlash = cleanPath.replace(/\/+$/, '');
	return withoutTrailingSlash || '/';
};

export const withTrailingSlash = (pathname: string) => {
	const normalized = normalizePathname(pathname);
	return normalized === '/' ? '/' : `${normalized}/`;
};

export const stripBasePrefix = (pathname: string) => {
	const normalized = normalizePathname(pathname);
	if (!appBase) return normalized;
	if (normalized === appBase) return '/';
	if (normalized.startsWith(`${appBase}/`)) return normalized.slice(appBase.length) || '/';
	return normalized;
};

export const getLocaleFromPathname = (pathname: string): Lang => {
	const normalized = stripBasePrefix(pathname);
	return normalized === '/en' || normalized.startsWith('/en/') ? 'en' : 'de';
};

export const stripLocalePrefix = (pathname: string) => {
	const normalized = stripBasePrefix(pathname);
	if (normalized === '/en') return '/';
	if (normalized.startsWith('/en/')) return normalized.slice(3) || '/';
	return normalized;
};

const matchPrefix = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);

const translateWithPairs = (
	pathname: string,
	pairs: Array<{ source: string; target: string }>
) => {
	for (const pair of pairs) {
		if (!matchPrefix(pathname, pair.source)) continue;
		const suffix = pathname.slice(pair.source.length);
		return `${pair.target}${suffix}` || '/';
	}
	return pathname;
};

export const toGermanPath = (pathname: string) => {
	const normalized = stripLocalePrefix(pathname);
	return translateWithPairs(
		normalizePathname(normalized),
		enSorted.map((pair) => ({ source: pair.en, target: pair.de }))
	);
};

export const translatePathname = (pathname: string, targetLocale: Lang) => {
	const germanPath = toGermanPath(pathname);
	if (targetLocale === 'de') return withTrailingSlash(germanPath);

	const translated = translateWithPairs(
		germanPath,
		deSorted.map((pair) => ({ source: pair.de, target: pair.en }))
	);
	return withTrailingSlash(`${EN_LOCALE_PREFIX}${translated === '/' ? '' : translated}`);
};

export const localizePath = (basePath: string, currentPathname: string) =>
	resolve(translatePathname(basePath, getLocaleFromPathname(currentPathname)));

export const samePathOtherLocale = (currentPathname: string, targetLocale: Lang) =>
	resolve(translatePathname(currentPathname, targetLocale));

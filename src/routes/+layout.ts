import { getLocaleFromPathname } from '$lib/routing';

export const prerender = true;
export const trailingSlash = 'always';

export const load = ({ url }: { url: URL }) => ({
	locale: getLocaleFromPathname(url.pathname),
});

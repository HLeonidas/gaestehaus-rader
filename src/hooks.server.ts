import type { Handle } from '@sveltejs/kit';
import { getLocaleFromPathname } from '$lib/routing';

export const handle: Handle = async ({ event, resolve }) => {
	const locale = getLocaleFromPathname(event.url.pathname);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('<html lang="de">', `<html lang="${locale}">`),
	});
};

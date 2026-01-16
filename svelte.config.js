import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const base = process.env.BASE_PATH ?? '';

const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html'
		}),
		paths: {
			base,
			relative: false
		},
		prerender: {
			handleHttpError: ({ status, path, referrer, message }) => {
				if (status === 404) {
					console.warn(`Skipping prerender for ${path} (linked from ${referrer ?? 'unknown'})`);
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;

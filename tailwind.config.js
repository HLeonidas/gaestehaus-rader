/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#f29200'
				}
			},
			fontFamily: {
				heading: ['"Playfair Display"', 'serif'],
				sans: ['"Montserrat"', 'ui-sans-serif', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};

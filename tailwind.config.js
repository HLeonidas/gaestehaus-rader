/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#f29200'
				},
				alpine: {
					DEFAULT: '#2D463E'
				},
				slatecore: {
					DEFAULT: '#333333'
				}
			},
			fontFamily: {
				heading: ['"Montserrat"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				sans: ['"Montserrat"', 'ui-sans-serif', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};

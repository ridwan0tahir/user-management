/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			fontFamily: { 'work-sans': ['Work-Sans', 'sans-serif'] },
			colors: {},
		},
	},
	plugins: [require('tailwindcss-animate')],
}

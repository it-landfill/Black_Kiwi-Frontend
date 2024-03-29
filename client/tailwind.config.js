/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
		'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
		'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
		"./node_modules/vue-tailwind-datepicker/**/*.js"
	],
	jit: true,
	theme: {
		extend: {},
	},
	plugins: [
		
	],
};

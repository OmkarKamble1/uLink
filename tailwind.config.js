/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		screens: {
			ssm: '550px',
			sm: '680px',
			sm2: '850px',
			md: '960px',
			lg: '1360px',
			cust: '1000px'
		},
		extend: {
			fontFamily: {
				Nunito: ['Nunito'],
				Quicksand: ['Prompt'],
				Caveat: ['Caveat']
			}
		}
	}
};

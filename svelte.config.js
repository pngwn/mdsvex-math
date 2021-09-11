import { mdsvex } from 'mdsvex';
import { mdsvex_config } from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	},
	extensions: ['.svelte', '.svx'],
	preprocess: [mdsvex(mdsvex_config)]
};

export default config;

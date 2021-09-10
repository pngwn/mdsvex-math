import { mdsvex } from 'mdsvex';
import math from 'remark-math';
import raw from 'rehype-raw';
import katex from 'rehype-katex';
import visit from 'unist-util-visit';

const convert_html_to_raw = () => (tree) => {
	visit(tree, 'html', (node) => {
		node.type = 'raw';
	});
};

const correct_hast_tree = () => (tree) => {
	visit(tree, 'text', (node) => {
		if (node.value.trim().startsWith('<')) {
			node.type = 'raw';
		}
	});
};

const mdsvex_config = {
	remarkPlugins: [math, convert_html_to_raw],
	rehypePlugins: [correct_hast_tree, raw, [katex, { macros: { '\\f': '#1f(#2)' } }]]
};

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

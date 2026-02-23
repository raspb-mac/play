import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Run as edge function (optional, default: false)
			edge: false,
			// Split into multiple functions per route (optional)
			split: false
		})
	}
};

export default config;

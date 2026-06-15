import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {any} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Wichtig für SPA-Routing auf GitHub Pages
			precompress: false,
			strict: true
		}),
		// NEU: Das verhindert, dass der Build bei dynamischen API-Routen abbricht
		prerender: {
			handleUnseenRoutes: 'ignore'
		}
	}
};

export default config;

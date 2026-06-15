import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {any} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter()
    }
};

export default config;
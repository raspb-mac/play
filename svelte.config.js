import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { importAssets } from 'svelte-preprocess-import-assets';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    importAssets({
      urlFilter: (url) => !url.startsWith('/')
    }),
    vitePreprocess()
  ],
  kit: {
    adapter: adapter(),
    paths: {
      relative: false
    },
    alias: {
      $store: './src/store',
      $helper: './src/lib/helper',
      $images: './src/lib/assets/images',
      $icons: './src/lib/assets/icons',
      $fonts: './src/lib/assets/fonts',
      $components: './src/lib/components',
      $configs: './src/lib/configs',
      $services: './src/lib/services',
      $interfaces: './src/interfaces'
    },
	}
};

export default config;

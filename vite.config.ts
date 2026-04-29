import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const emptySourceMap = JSON.stringify({
  version: 3,
  sources: [],
  names: [],
  mappings: ''
});

export default defineConfig({
  plugins: [
    tailwindcss({ optimize: false }),
    sveltekit(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide',
      additionalFiles: {
        'strategy.js.map': emptySourceMap,
        'middleware.js.map': emptySourceMap
      },
      strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
      urlPatterns: [
        {
          pattern: '/about-us',
          localized: [
            ['de', '/de/ueber-uns'],
            ['en', '/en/about-us']
          ]
        },
        {
          pattern: '/about-us/:slug',
          localized: [
            ['de', '/de/ueber-uns/:slug'],
            ['en', '/en/about-us/:slug']
          ]
        },
        {
          pattern: '/expertise',
          localized: [
            ['de', '/de/kompetenzen'],
            ['en', '/en/expertise']
          ]
        },
        {
          pattern: '/expertise/:slug',
          localized: [
            ['de', '/de/kompetenzen/:slug'],
            ['en', '/en/expertise/:slug']
          ]
        },
        {
          pattern: '/insights',
          localized: [
            ['de', '/de/news-und-insights'],
            ['en', '/en/news-and-insights']
          ]
        },
        {
          pattern: '/insights/:slug',
          localized: [
            ['de', '/de/news-und-insights/:slug'],
            ['en', '/en/news-and-insights/:slug']
          ]
        },
        {
          pattern: '/insights/blog/:post',
          localized: [
            ['de', '/de/news-und-insights/blog/:post'],
            ['en', '/en/news-and-insights/blog/:post']
          ]
        },
        {
          pattern: '/contact',
          localized: [
            ['de', '/de/kontakt'],
            ['en', '/en/contact']
          ]
        },
        {
          pattern: '/imprint',
          localized: [
            ['de', '/de/impressum'],
            ['en', '/en/imprint']
          ]
        },
        {
          pattern: '/privacy',
          localized: [
            ['de', '/de/datenschutz'],
            ['en', '/en/privacy']
          ]
        },
        {
          pattern: '/thank-you',
          localized: [
            ['de', '/de/vielen-dank'],
            ['en', '/en/thank-you']
          ]
        },
        {
          pattern: '/',
          localized: [
            ['de', '/de'],
            ['en', '/en']
          ]
        }
      ]
    })
  ],
  build: {
    chunkSizeWarningLimit: 2048,
    cssMinify: 'esbuild'
  }
});

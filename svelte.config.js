import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @todo Make this app SSG */

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {},
  }),

  kit: {
    adapter: adapter(),
    prerender: {
      default: true,
    },

    // hydrate the <div id="svelte"> element in src/app.html
    // target: '#svelte',
    vite: {
      server: {
        fs: {
          allow: ['studio'],
        },
      },
    },
  },
};

export default config;

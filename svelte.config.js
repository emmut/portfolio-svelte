import adapter from '@sveltejs/adapter-node';
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
  },
};

export default config;

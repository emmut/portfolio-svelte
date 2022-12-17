import adapter from '@sveltejs/adapter-vercel';
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
    adapter: adapter({
      edge: true,
    }),
  },
};

export default config;

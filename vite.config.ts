import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config: UserConfig = {
  server: {
    fs: {
      allow: ['./studio'],
    },
  },
  plugins: [sveltekit()],
};

export default config;

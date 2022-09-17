import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

const config: UserConfig = {
  server: {
    host: true,
    // port: 8080,
    fs: {
      allow: ['./studio'],
    },
  },
  plugins: [sveltekit()],
};

export default config;

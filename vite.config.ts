import type { UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';

const config: UserConfig = {
  resolve: {
    alias: {
      '@studio': path.resolve(__dirname, 'studio'),
    },
  },
  server: {
    fs: {
      allow: ['./studio'],
    },
  },
  plugins: [sveltekit()],
};

export default config;

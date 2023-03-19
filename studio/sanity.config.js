import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schemas from './schemas/schema';
import deskStructure from './deskStructure';
import { env } from 'process';

export default defineConfig({
  name: 'emmut',
  title: 'emmut',
  projectId: 'ql7rbeue',
  dataset: process.env.NODE_ENV || 'production',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
  css: { postcss: false },
});

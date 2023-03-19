import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import schemas from "./schemas/schema"; 
import deskStructure from "./deskStructure";

export default defineConfig({
  name: 'emmut',
  title: "emmut",
  projectId: "ql7rbeue",
  dataset: "production",
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
  css: { postcss: false}
});

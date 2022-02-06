import { dev } from '$app/env';

import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import imageUrlBuilder from '@sanity/image-url';

import createClient from '@sanity/client';
import { api } from '../../studio/sanity.json';
const { projectId, dataset } = api;

const config = {
  projectId,
  dataset,
  apiVersion: '2022-01-07',
  useCdn: !dev,
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source: string): ImageUrlBuilder => {
  return builder.image(source);
};

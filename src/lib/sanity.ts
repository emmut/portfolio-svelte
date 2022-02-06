import { env } from 'process';

import createClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { api } from '../../studio/sanity.json';
const { projectId, dataset } = api;

const config = {
	projectId,
	dataset,
	apiVersion: '2022-01-07',
	useCdn: !dev
};

export const client = createClient(config);

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
}

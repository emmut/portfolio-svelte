import { env } from 'process';

import createClient from '@sanity/client';
import { api } from '../../studio/sanity.json';
const { projectId, dataset } = api;

const config = {
	projectId,
	dataset,
	apiVersion: '2022-01-07',
	useCdn: env.NODE_ENV === 'production'
};

export const client = createClient(config);

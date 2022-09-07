/** @see https://www.npmjs.com/package/graphql-request */
/** @see https://docs.github.com/en/graphql */

import 'dotenv/config';
import { env } from 'process';
import { GraphQLClient, gql } from 'graphql-request';
import type { RequestHandler } from '@sveltejs/kit';
import { endpoint } from '$lib/config/default';

export const get: RequestHandler = async () => {
  const query = gql`
    {
      viewer {
        login
        bio
        avatarUrl
      }
    }
  `;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  try {
    const data = await client.request(query);

    return {
      status: 200,
      body: {
        ...data,
      },
    };
  } catch (error) {
    return {
      status: 502,
      body: new Error('Bad Gateway'),
    };
  }
};

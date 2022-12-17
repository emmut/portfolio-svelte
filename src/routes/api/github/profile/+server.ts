/** @see https://www.npmjs.com/package/graphql-request */
/** @see https://docs.github.com/en/graphql */

import { json, error, type RequestHandler } from '@sveltejs/kit';

import { GITHUB_ACCESS_TOKEN } from '$env/static/private';
import { GraphQLClient, gql } from 'graphql-request';
import { endpoint } from '$lib/config/default';

export const GET: RequestHandler = async () => {
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
      authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
  });

  try {
    const data = await client.request(query);

    return json(data);
  } catch (e) {
    throw error(502, 'Bad Gateway');
  }
};

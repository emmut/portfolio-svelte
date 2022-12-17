/** @see https://www.npmjs.com/package/graphql-request */
/** @see https://docs.github.com/en/graphql */

import type { RequestHandler } from './$types';
import type { Repos } from '$lib/types/Repos';

import { GraphQLClient, gql } from 'graphql-request';
import { endpoint } from '$lib/config/default';
import { json } from '@sveltejs/kit';
import { GITHUB_ACCESS_TOKEN } from '$env/static/private';

export const GET: RequestHandler = async () => {
  const query = gql`
    {
      viewer {
        login
        pinnedItems(first: 10) {
          nodes {
            ... on Repository {
              id
              name
              description
              nameWithOwner
              url
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
      user(login: "emmut") {
        id
      }
    }
  `;

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
  });

  try {
    const data: Repos = await client.request(query);

    return json(data);
  } catch (error) {
    throw error(502, 'Invalid response from Github');
  }
};

/** @see https://www.npmjs.com/package/graphql-request */
/** @see https://docs.github.com/en/graphql */

import 'dotenv/config';
import { env } from 'process';
import { GraphQLClient, gql } from 'graphql-request';
import type { EndpointOutput } from '@sveltejs/kit';
import { endpoint } from '$lib/config/default';

export async function get(): Promise<EndpointOutput> {
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
      authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
    },
  });

  const data = await client.request(query);

  return {
    status: 200,
    body: {
      ...data,
    },
  };
}

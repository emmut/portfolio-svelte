/** @see https://www.npmjs.com/package/graphql-request */
/** @see https://docs.github.com/en/graphql */

import type { RequestHandler } from './$types';
import type { Repos } from '$lib/types/Repos';

import { GITHUB_ACCESS_TOKEN } from '$env/static/private';
import { endpoint } from '$lib/config/default';
import { json } from '@sveltejs/kit';

export const GET = async () => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(
        `
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
        `
      ),
    });

    return json(response);
  } catch (error) {
    throw error(502, 'Invalid response from Github');
  }
};

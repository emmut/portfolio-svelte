import { PRIVATE_GITHUB_ACCESS_TOKEN } from '$env/static/private';
import { endpoint } from '$lib/config/default';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${PRIVATE_GITHUB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
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
        `,
      }),
    });

    return json((await response.json()).data);
  } catch (e) {
    throw error(502, 'Invalid response from Github');
  }
};

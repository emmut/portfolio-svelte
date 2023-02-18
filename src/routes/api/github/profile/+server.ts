import { json, error, type RequestHandler } from '@sveltejs/kit';

import { PRIVATE_GITHUB_ACCESS_TOKEN } from '$env/static/private';
import { endpoint } from '$lib/config/default';

export const GET: RequestHandler = async ({ fetch }) => {
  try {
    const data = await fetch(endpoint, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${PRIVATE_GITHUB_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          {
            viewer {
              login
              bio
              avatarUrl
            }
          }
        `,
      }),
    });

    return json((await data.json()).data);
  } catch (e) {
    throw error(502, 'Invalid response from Github');
  }
};

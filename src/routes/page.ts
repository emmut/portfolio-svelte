import type { Load } from './$types';

export const load: Load = async ({ fetch }) => {
  const res = await fetch('/portfolios');
  const portfolios = await res.json();
  if (res.ok) {
    return {
      portfolios,
    };
  }

  return {
    status: res.status,
    error: new Error('could not get portfolios'),
  };
};

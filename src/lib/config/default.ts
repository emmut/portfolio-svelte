import { dev } from '$app/environment';

export const endpoint = 'https://api.github.com/graphql';

export const github = 'https://github.com/emmut';

export const githubSessionKey = 'github-repos';

export const themeProps = {
  dark: {
    icon: 'favicon.png',
    color: '#22c55e',
  },
  light: {
    icon: 'favicon-light.png',
    color: '#db2777',
  },
};

export const counterUri = dev ? 'local-dev' : 'emmut-portfoli-app';

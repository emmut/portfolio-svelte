import type { InputValue } from '@portabletext/svelte/ptTypes';

export type Profile = {
  avatar: string;
  bio: InputValue;
  name: string;
};

export type GithubProfile = {
  viewer: {
    avatarUrl: string;
    login: string;
    bio: string;
  };
};

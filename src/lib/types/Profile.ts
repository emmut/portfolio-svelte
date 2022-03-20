import type { PortableTextBlocks } from '@portabletext/svelte/ptTypes';

export type Profile = {
  avatar: string;
  bio: PortableTextBlocks;
  name: string;
};

export type GithubProfile = {
  viewer: {
    avatarUrl: string;
    login: string;
    bio: string;
  };
};

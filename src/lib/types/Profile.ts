export type Profile = {
  viewer: {
    avatarUrl: string;
    bio: string;
    name: string;
  };
};

export type GithubProfile = {
  viewer: {
    avatarUrl: string;
    login: string;
    bio: string;
  };
};

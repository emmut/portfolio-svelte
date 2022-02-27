export type Profile = {
  avatar: string;
  bio: string;
  name: string;
};

export type GithubProfile = {
  viewer: {
    avatarUrl: string;
    login: string;
    bio: string;
  };
};

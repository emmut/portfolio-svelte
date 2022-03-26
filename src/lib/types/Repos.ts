export type Repos = {
  viewer: {
    pinnedItems: {
      nodes: Repo[];
    };
  };
};

export type Repo = {
  url: string;
  nameWithOwner: string;
  description: string;
  primaryLanguage: {
    name: string;
    color: string;
  };
};

export type RepoStore = Promise<Repo[]> | [];

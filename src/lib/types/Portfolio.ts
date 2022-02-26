export type Portfolio = {
  _id: number;
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  image?: string;
  excerpt?: string;
};

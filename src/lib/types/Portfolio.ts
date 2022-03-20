import type { PortableTextBlocks } from '@portabletext/svelte/ptTypes';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Portfolio = {
  _id: number;
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  image?: {
    asset: SanityImageSource;
    caption: string;
  };
  excerpt?: string;
  bio?: PortableTextBlocks;
};

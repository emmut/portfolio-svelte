import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type Tool = {
  image?: {
    asset: SanityImageSource;
    caption: string;
  };
  title: string;
  text: string;
  since: string;
};

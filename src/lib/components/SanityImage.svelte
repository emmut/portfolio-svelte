<script lang="ts">
  import { urlFor } from '$lib/sanity';
  import { deviceDpr } from '$lib/utils';
  import type {
    CropMode,
    FitMode,
    SanityImageHotspot,
    SanityImageSource,
  } from '@sanity/image-url/lib/types/types';

  const {
    src,
    quality,
    crop = 'focalpoint',
    fit = 'crop',
    loading,
    class: className,
    alt,
    width,
    height,
    onLoaded,
  }: Props = $props();

  interface Props {
    src: SanityImageSource | string;
    quality?: number;
    crop?: CropMode;
    fit?: FitMode;
    useSanity?: boolean;
    loading?: 'eager' | 'lazy';
    class?: string;
    alt?: string;
    width?: number;
    height?: number;
    onLoaded?: () => void;
  }

  let image = $state<HTMLImageElement>();
  let dpr = deviceDpr();
  let hotspot = $state<SanityImageHotspot>();
  let loaded = $state(false);

  if (typeof src === 'object' && 'hotspot' in src) {
    hotspot = src.hotspot;
  }

  function getImgSrc() {
    let sanityUrl = urlFor(src)
      .width(image?.clientWidth ?? width ?? 0)
      .height(image?.clientHeight ?? height ?? 0)
      .quality(quality ?? 85)
      .dpr(dpr)
      .crop(crop)
      .fit(fit ?? 'crop')
      .auto('format');

    if (crop === 'focalpoint' && hotspot) {
      sanityUrl = sanityUrl.focalPoint(hotspot.x, hotspot.y);
    }

    return sanityUrl.url();
  }

  function handleLoad() {
    loaded = true;
    onLoaded?.();
  }
</script>

{#if src}
  <img
    bind:this={image}
    onload={handleLoad}
    data-loaded={loaded}
    class={className}
    src={getImgSrc()}
    alt={alt}
    width={width}
    height={height}
    style={`aspect-ratio: ${width}/${height}`}
    {loading}
  />
{/if}

<style lang="postcss">
  :global(body.js img) {
    transition: opacity 400ms ease-out;

    &[data-loaded='false'] {
      @apply opacity-0;
    }
  }
</style>

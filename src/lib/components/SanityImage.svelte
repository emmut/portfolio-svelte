<script lang="ts">
  import { urlFor } from '$lib/sanity';
  import { deviceDpr } from '$lib/utils';
  import type { CropMode, FitMode, SanityImageSource } from '@sanity/image-url/lib/types/types';

  export let sizes = [1500, 1000, 500];
  export let breakpoints = ['min-width: 1500px', 'min-width: 500px', 'max-width: 499px'];
  export let src: SanityImageSource;
  export let quality = 85;
  export let crop: CropMode = 'center';
  export let fit: FitMode = 'crop';
  const aspectRatio = $$props.height / $$props.width;
</script>

{#if src}
  <picture>
    {#each sizes as size, i}
      <source
        media="({breakpoints[i]})"
        srcset={src &&
          urlFor(src)
            .height(Math.floor(size * aspectRatio))
            .width(size)
            .quality(quality)
            .auto('format')
            .crop(crop)
            .fit(fit)
            .dpr(deviceDpr())
            .url()}
      />
    {/each}
    <img
      class={$$props.class}
      src={src &&
        urlFor(src)
          .height(Math.floor(sizes[sizes.length - 1] * aspectRatio))
          .width(sizes[sizes.length - 1])
          .quality(quality)
          .url()}
      alt={$$props.alt}
      width={$$props.width}
      height={$$props.height}
    />
  </picture>
{/if}

<style lang="postcss">
  img {
    @apply block;
  }
</style>

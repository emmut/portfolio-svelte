<script lang="ts">
  import { urlFor } from '$lib/sanity';
  import { deviceDpr } from '$lib/utils';
  import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

  export let sizes = [1500, 1000, 500];
  export let breakpoints = ['min-width: 1500px', 'min-width: 500px', 'max-width: 499px'];
  export let src: SanityImageSource;
  export let quality = 85;
</script>

{#if src}
  <picture>
    {#each sizes as size, i}
      <source
        media="({breakpoints[i]})"
        srcset={urlFor(src).width(size).quality(quality).auto('format').dpr(deviceDpr()).url()}
      />
    {/each}
    <img
      class={$$props.class}
      src={urlFor(src).width(sizes.at(-1)).quality(quality).url()}
      alt={$$props.alt}
    />
  </picture>
{/if}

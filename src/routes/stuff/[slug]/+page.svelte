<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import type { Portfolio } from '$lib/types/Portfolio';
  import Link from '$lib/components/Link.svelte';
  import SanityImage from '$lib/components/SanityImage.svelte';

  let { data } = $props();
  const portfolio: Portfolio = data.portfolio;
</script>

<svelte:head>
  <title>{portfolio.title} /emmut</title>
</svelte:head>

{#if portfolio.image}
  <SanityImage
    class="mb-6 w-full xl:-ml-8 xl:w-[calc(100%+4rem)] xl:min-w-[calc(100%+4rem)]"
    src={portfolio.image}
    alt={portfolio.image.caption}
    width={750}
    height={422}
    loading="eager"
  />
{/if}

<div class="prose mx-auto dark:prose-invert">
  <h1 class="mb-0 text-4xl font-bold">{portfolio.title}</h1>
  <PortableText
    value={portfolio.bio}
    components={{
      marks: {
        link: Link,
      },
    }}
  />
</div>

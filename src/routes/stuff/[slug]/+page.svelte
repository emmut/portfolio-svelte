<script lang="ts">
  import PortableText from '@portabletext/svelte';
  import Link from '$lib/components/Link.svelte';
  import Image from '$lib/components/SanityImage.svelte';
  import type { Portfolio } from '$lib/types/Portfolio';

  // export let portfolio: Portfolio;
  export let data;
  const { portfolio } = data;
</script>

<svelte:head>
  <title>{portfolio.title} /emmut</title>
</svelte:head>

<Image
  class="mb-6 w-full xl:-ml-8 xl:w-[calc(100%+4rem)] xl:min-w-[calc(100%+4rem)]"
  src={portfolio.image}
  alt={portfolio.image.caption}
  width="1000"
  height="750"
/>
<div class="prose mx-auto dark:prose-invert">
  <h1 class="text-4xl font-bold">{portfolio.title}</h1>
  <PortableText
    blocks={portfolio.bio}
    serializers={{
      marks: {
        link: Link,
      },
    }}
  />
</div>

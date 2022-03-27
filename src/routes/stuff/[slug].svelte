<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import type { Portfolio } from '$lib/types/Portfolio';

  export const load: Load = async ({ fetch, params }) => {
    const { slug } = params;
    const res = await fetch(`/portfolio/${slug}.json`);
    const { portfolio }: Record<string, Portfolio> = await res.json();

    if (res.ok) {
      return {
        props: {
          portfolio,
        },
      };
    }

    return {
      status: 301,
      redirect: '/stuff',
    };
  };
</script>

<script lang="ts">
  import PortableText from '@portabletext/svelte';
  import Link from '$lib/components/Link.svelte';
  import Image from '$lib/components/SanityImage.svelte';

  export let portfolio: Portfolio;
</script>

<svelte:head>
  <title>{portfolio.title} /emmut</title>
</svelte:head>

<Image
  class="mb-6 w-full xl:-ml-8 xl:w-[calc(100%+4rem)] xl:min-w-[calc(100%+4rem)]"
  src={portfolio.image}
  alt={portfolio.image.caption}
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

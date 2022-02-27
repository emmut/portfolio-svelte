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

  export let portfolio: Portfolio;
</script>

<h1 class="mb-9 text-4xl font-bold">{portfolio.title}</h1>
<div class="prose dark:prose-invert">
  <PortableText
    blocks={portfolio.bio}
    serializers={{
      marks: {
        link: Link,
      },
    }}
  />
</div>

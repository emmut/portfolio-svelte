<script lang="ts">
  import PortableText from '@portabletext/svelte';
  import Link from '$lib/components/Link.svelte';
  import Image from '$lib/components/SanityImage.svelte';
  import Card from '$lib/components/Card.svelte';
  import { toPlainText } from '$lib/utils';
  import type { PortableTextBlocks } from '@portabletext/svelte/ptTypes';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import type { Tool } from '$lib/types/Tool';

  export let data;
  const { about }: PortableTextBlocks = data;
  const { image }: SanityImageAssetDocument = data;
  const { tools }: Tool[] = data;
</script>

<svelte:head>
  <title>Me /emmut</title>
  <meta name="description" content="{toPlainText(about).substring(0, 120)}..." />
</svelte:head>

<Image
  class="mb-6 w-full xl:-ml-8 xl:w-[calc(100%+4rem)] xl:min-w-[calc(100%+4rem)]"
  src={image}
  alt={image.caption}
  width="1000"
  height="750"
/>

<div class="prose mx-auto dark:prose-invert">
  <h1>About me</h1>
  <PortableText
    blocks={about}
    serializers={{
      marks: {
        link: Link,
      },
    }}
  />

  <div class="grid grid-cols-1 gap-3">
    {#each tools as tool, i}
      <Card padding="px-3 py-4">
        <div
          class="not-prose flex flex-col gap-2 sm:flex-row {i % 2 === 0 ? '' : 'flex-row-reverse'}"
        >
          <div class="w-24">
            <Image src={tool.image} alt={tool.image.caption ?? ''} width="96" height="96" />
          </div>
          <div class="flex flex-1 flex-col">
            <h2 class="text-md text-xl font-bold">{tool.title}</h2>
            <p class="text-sm">
              {tool.text}
            </p>
            {#if tool.since}
              <span class="mt-1 inline-block text-sm font-bold">Since: {tool.since ?? ''}</span>
            {/if}
          </div>
        </div>
      </Card>
    {/each}
  </div>
</div>

<script lang="ts">
  import { PortableText, toPlainText } from '@portabletext/svelte';
  import Link from '$lib/components/Link.svelte';
  import Image from '$lib/components/Image.svelte';
  import Card from '$lib/components/Card.svelte';
  import type { SanityImageAssetDocument } from '@sanity/client';
  import type { Tool } from '$lib/types/Tool';
  import PageHeader from '$lib/components/PageHeader.svelte';

  export let data;
  const about = data.about;
  const image: SanityImageAssetDocument = data.image;
  const tools: Tool[] = data.tools;
</script>

<svelte:head>
  <title>Me /emmut</title>
  <meta name="description" content="{toPlainText(about).substring(0, 120)}..." />
</svelte:head>

<PageHeader>me</PageHeader>

<Image
  class="mb-6 w-full xl:-ml-8 xl:w-[calc(100%+4rem)] xl:min-w-[calc(100%+4rem)]"
  src={image}
  alt={image.caption}
  width="750"
  height="422"
  loading="eager"
/>

<div class="prose mx-auto dark:prose-invert">
  <h1>About me</h1>
  <PortableText
    value={about}
    components={{
      marks: {
        link: Link,
      },
    }}
  />

  <div class="grid grid-cols-1 gap-3">
    {#each tools as tool, i}
      <Card padding="px-3 py-4">
        <div
          class="not-prose flex flex-col items-start gap-4 sm:flex-row {i % 2 === 0
            ? ''
            : 'flex-row-reverse'}"
        >
          <div class="grid w-24 place-items-center rounded-md bg-neutral-100 p-2 dark:bg-gray-400">
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

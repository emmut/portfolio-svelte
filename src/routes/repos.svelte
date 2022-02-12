<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const res = await fetch('/github/repos.json');
    const repos = await res.json();

    if (res.ok) {
      return {
        props: {
          repos,
        },
      };
    }

    return {
      status: res.status,
      error: new Error('a problem fetching repos occured'),
    };
  }
</script>

<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import type { Repos } from '$lib/types/Repos';

  export let repos: Repos;
</script>

<div class="flex flex-col gap-3">
  {#each repos.viewer.pinnedItems.nodes as repo}
    <a href={repo.url}>
      <Card>
        <span class="title text-md inline-block font-bold">{repo.nameWithOwner}</span>
        <span class="inline-block">{repo.description}</span>
        <div class="flex justify-end">
          <span class="text-md inline-block font-bold">{repo.primaryLanguage.name}</span>
        </div>
      </Card>
    </a>
  {/each}
</div>

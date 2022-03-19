<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import type { Repos } from '$lib/types/Repos';

  export let repos: Repos;
</script>

<div class="flex flex-col gap-3">
  {#each repos.viewer.pinnedItems.nodes as repo}
    <a href={repo.url}>
      <Card>
        <span class="title text-md inline-block font-bold">{repo.nameWithOwner}</span>
        <span class="inline-block text-sm text-zinc-600 dark:text-zinc-300">{repo.description}</span
        >
        <div class="flex justify-end">
          <Pill color={repo.primaryLanguage.color}>{repo.primaryLanguage.name}</Pill>
        </div>
      </Card>
    </a>
  {/each}
</div>

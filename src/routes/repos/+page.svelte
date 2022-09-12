<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Pill from '$lib/components/Pill.svelte';
  import type { Repo } from '$lib/types/Repos';
  import { onMount } from 'svelte';
  import { repos } from '$lib/stores/repos';
  import { githubSessionKey } from '$lib/config/default';

  async function getRepos(): Promise<Repo[]> {
    try {
      let prevRepos = sessionStorage.getItem(githubSessionKey);

      if (prevRepos !== null) {
        return JSON.parse(prevRepos);
      }

      const response = await fetch('/api/github/repos');
      const json = await response.json();

      const repos = json.viewer.pinnedItems.nodes;
      sessionStorage.setItem(githubSessionKey, JSON.stringify(repos));

      return repos;
    } catch (error) {
      console.error(error);
      throw new Error('Could not fetch repos');
    }
  }

  onMount(() => {
    $repos = getRepos();
  });
</script>

<svelte:head>
  <title>Repos /emmut</title>
</svelte:head>

<div class="flex flex-col gap-3">
  {#await $repos}
    {#each Array(6) as _}
      <Card padding="px-3 py-[7px]">
        <span
          class="animate-pulse title text-md mt-0.5 mb-2 inline-block h-4 w-6/12 rounded-sm bg-gray-500 font-bold"
        />
        <span
          class="animate-pulse mb-1 inline-block h-3 w-4/12 rounded-sm bg-gray-500 text-sm text-zinc-600 dark:text-zinc-300"
        />
        <div class="flex justify-end">
          <div class="animate-pulse h-5 w-16 rounded-full bg-gray-500" />
        </div>
      </Card>
    {/each}
  {:then repos}
    {#each repos as repo}
      <a href={repo.url}>
        <Card>
          <span class="title text-md inline-block font-bold">{repo.nameWithOwner}</span>
          <span class="inline-block text-sm text-zinc-600 dark:text-zinc-300"
            >{repo.description}</span
          >
          <div class="flex justify-end">
            <Pill class="mb-1" color={repo.primaryLanguage.color}>{repo.primaryLanguage.name}</Pill>
          </div>
        </Card>
      </a>
    {/each}
  {:catch}
    <!-- promise was rejected -->
    <p class="text-center">Could not fetch repos. Try again later.</p>
  {/await}
</div>

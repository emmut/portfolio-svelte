<script context="module">
  export const prerender = false;
</script>

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

      const response = await fetch('/github/repos.json');
      const json = await response.json();

      const repos = json.repos.viewer.pinnedItems.nodes;
      sessionStorage.setItem(githubSessionKey, JSON.stringify(repos));

      return repos;
    } catch (error) {
      console.error(error);
      throw new Error('could not fetch repos');
    }
  }

  onMount(() => {
    $repos = getRepos();
  });
</script>

<div class="flex flex-col gap-3">
  {#await $repos}
    {#each Array(6) as _}
      <Card padding="px-3 py-2">
        <span
          class="skeleton-box title text-md mt-0.5 mb-2 inline-block h-4 w-6/12 rounded-sm bg-gray-500 font-bold"
        />
        <span
          class="skeleton-box mb-1 inline-block h-3 w-4/12 rounded-sm bg-gray-500 text-sm text-zinc-600 dark:text-zinc-300"
        />
        <div class="flex justify-end">
          <div class="skeleton-box h-5 w-16 rounded-full bg-gray-500" />
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
  {:catch error}
    <!-- promise was rejected -->
    <p class="text-center">Could not fetch repos. Try again later.</p>
  {/await}
</div>

<style lang="postcss">
  .skeleton-box {
    @apply relative overflow-hidden;

    &::after {
      @apply absolute inset-0 translate-x-[-100%] content-[''];
      background-image: linear-gradient(
        90deg,
        rgba(150, 150, 150, 0) 0,
        rgba(150, 150, 150, 0.2) 20%,
        rgba(150, 150, 150, 0.5) 60%,
        rgba(150, 150, 150, 0)
      );
      animation: shimmer 1200ms infinite;
    }
  }

  @keyframes shimmer {
    100% {
      @apply translate-x-[100%];
    }
  }
</style>

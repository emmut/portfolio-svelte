<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import type { GithubProfile } from '$lib/types/Profile';
  import { github } from '$lib/config/default';

  export let githubProfile: GithubProfile;

  const { avatarUrl, login, bio } = githubProfile.viewer;
</script>

<Card padding="py-4 px-3">
  <img
    class="h-28 w-28 rounded-full ring-4 ring-neutral-100/70"
    src={avatarUrl}
    alt="My Github avatar"
  />
  <div class="text-md mt-4 font-bold tracking-wide">
    <span class="text-pink-600 dark:text-green-500">/</span>{login}
  </div>
  <div
    class="bio prose my-2 text-sm text-zinc-600 dark:text-zinc-300 dark:prose-strong:text-zinc-200"
  >
    {bio}
  </div>

  <a
    class="mt-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:w-auto sm:text-sm"
    href={github}>Go to my Github page</a
  >
</Card>

<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import type { GithubProfile } from '$lib/types/Profile';
  import { github } from '$lib/config/default';
  import Image from './Image.svelte';

  interface Props {
    githubProfile: GithubProfile;
  }

  let { githubProfile }: Props = $props();

  const { avatarUrl, login, bio } = githubProfile.viewer;
</script>

<Card padding="py-4 px-3">
  <Image
    src={avatarUrl}
    class="h-28 w-28 max-w-sm rounded-full ring-4 ring-zinc-300/70 dark:ring-neutral-100/70"
    alt="My Github avatar"
    useSanity={false}
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
    class="mt-3 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-xs hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:w-auto sm:text-sm"
    href={github}>Go to my Github page</a
  >
</Card>

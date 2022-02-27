<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import type { Profile } from '$lib/types/Profile';

  export let profile: Profile;

  const { avatar, bio, name } = profile;
</script>

<Card padding="py-4 px-3">
  <img
    class="w-28 rounded-full ring-2 ring-neutral-100/70"
    src={avatarUrl}
    alt="My Github avatar"
  />
  <div class="text-md mt-4 font-bold tracking-wide">
    <span class="text-pink-600 dark:text-green-500">/</span>{name}
  </div>
  <div class="bio leading-5">
    {bio}
  </div>
</Card>

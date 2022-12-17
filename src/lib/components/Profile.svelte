<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import { urlFor } from '$lib/sanity';
  import type { Profile } from '$lib/types/Profile';
  import { deviceDpr } from '$lib/utils';
  import { PortableText } from '@portabletext/svelte';
  import Link from './Link.svelte';
  import ProfileImage from './ProfileImage.svelte';

  export let profile: Profile;

  const { avatar, bio, name } = profile;
</script>

<Card padding="py-4 px-3">
  <ProfileImage src={urlFor(avatar).width(400).dpr(deviceDpr()).auto('format').url()} alt="Me" />

  <div class="text-md mt-4 font-bold tracking-wide">
    <span class="mr-0.5 text-pink-600 dark:text-green-500">/</span>{name}
  </div>
  <div
    class="bio prose mt-2 text-sm text-zinc-600 dark:text-zinc-300 dark:prose-strong:text-zinc-200"
  >
    <PortableText
      value={bio}
      components={{
        marks: {
          link: Link,
        },
      }}
    />
  </div>
</Card>

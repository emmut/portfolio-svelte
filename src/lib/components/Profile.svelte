<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import type { Profile } from '$lib/types/Profile';
  import { PortableText } from '@portabletext/svelte';
  import Link from './Link.svelte';
  import Image from './Image.svelte';

  interface Props {
    profile: Profile;
  }

  let { profile }: Props = $props();

  const { avatar, bio, name } = profile;
</script>

<Card padding="py-4 px-3">
  <Image
    src={avatar}
    class="max-w-sm rounded-full ring-4 ring-zinc-300/70 dark:ring-neutral-100/70"
    alt="Me"
    width="112"
    height="112"
  />

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

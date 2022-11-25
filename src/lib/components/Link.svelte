<!-- AbsoluteURL (custom mark) -->
<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte';

  // Property custom marks receive from @portabletext/svelte when redered
  export let portableText: MarkComponentProps<{
    href?: string;
    newWindow?: boolean;
  }>;

  // Remember to make your variables reactive so that they can reflect prop changes
  // See: https://svelte.dev/docs#3_$_marks_a_statement_as_reactive
  $: ({ value } = portableText);
  $: newWindow = value.newWindow || false;
</script>

{#if value.href}
  <a href={value.href} target={newWindow ? '_blank' : undefined}>
    <!-- Marks receive children which you can render with Svelte's slots -->
    <slot />
  </a>
{:else}
  <!-- If no valid URL, render only the contents of the mark -->
  <slot />
{/if}

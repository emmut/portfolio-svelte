<script lang="ts">
  import { mergeClasses } from '$lib/utils';

  interface Props {
    padding?: string;
    children?: import('svelte').Snippet;
  }

  let { padding = 'px-3 py-1', children }: Props = $props();

  let totalClasses = $derived(mergeClasses(
    padding,
    'flex flex-col rounded-md bg-white dark:bg-gray-600 shadow-xs shadow-neutral-300 dark:shadow-gray-900 shadow-sm'
  ));
</script>

<div class={totalClasses}>
  {@render children?.()}
</div>

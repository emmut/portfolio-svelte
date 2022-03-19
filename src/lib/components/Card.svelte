<script lang="ts">
  import { mergeClasses } from '$lib/utils';

  export let padding = 'px-3 py-1';

  $: totalClasses = mergeClasses(
    padding,
    'flex flex-col rounded-md bg-white dark:bg-gray-600 shadow-sm shadow-neutral-300 dark:shadow-gray-900 shadow'
  );
</script>

<div class={totalClasses}>
  <slot />
</div>

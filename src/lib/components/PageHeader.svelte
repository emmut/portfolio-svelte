<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<div class="group mb-5 lg:-mt-1">
  <h1 class="group text-3xl dark:text-gray-500">
    <span
      class="ml-1 inline-block w-0 text-pink-600 opacity-0 transition-all duration-200 group-hover:w-4 group-hover:opacity-100 dark:text-green-500 sm:ml-0"
      >/</span
    >{@render children?.()}
  </h1>
</div>

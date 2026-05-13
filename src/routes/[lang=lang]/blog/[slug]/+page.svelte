<script lang="ts">
  import Page from '../../../blog/[slug]/+page.svelte';

  let { data } = $props();
</script>

<Page {data} />

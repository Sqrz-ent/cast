<script lang="ts">
  import Page from '../../blog/+page.svelte';

  let { data } = $props();
</script>

<Page {data} />

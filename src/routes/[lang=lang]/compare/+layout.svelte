<script>
  import Layout from '../../compare/+layout.svelte';

  let { children } = $props();
</script>

<Layout>
  {@render children()}
</Layout>

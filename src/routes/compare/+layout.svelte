<script>
  let { children } = $props();
</script>

<div class="compare-shell">
  {@render children()}
</div>

<style>
  .compare-shell {
    background: #f5f0eb;
    min-height: 100vh;
  }
</style>

<script>
  let { children } = $props();
</script>

<div class="compare-shell">
  {@render children()}
</div>

<style>
  .compare-shell {
    background: #0a0a0a;
    min-height: 100vh;
  }
</style>

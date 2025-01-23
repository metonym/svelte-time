<script>
  let { children } = $props();
</script>

<div>
  {@render children?.()}
</div>

<style>
  div {
    padding: 1rem;
    border: 1px solid #24292e;
  }
</style>

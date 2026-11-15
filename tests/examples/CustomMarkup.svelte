<script>
  import Time from "svelte-time";
</script>

<Time relative timestamp="2024-01-01">
  {#snippet children(formatted)}
    <strong>{formatted}</strong>
  {/snippet}
</Time>

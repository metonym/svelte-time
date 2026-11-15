<script lang="ts">
  import Time from "svelte-time";
</script>

<Time data-test="children-markup" timestamp="2024-01-01T00:00:00.000Z">
  {#snippet children(formatted)}
    <strong>{formatted}</strong>
  {/snippet}
</Time>

<Time data-test="children-live" relative live>
  {#snippet children(formatted)}
    <em>{formatted}</em>
  {/snippet}
</Time>

<Time data-test="no-children" timestamp="2024-01-01T00:00:00.000Z" />

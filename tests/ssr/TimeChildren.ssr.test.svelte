<script lang="ts">
  import Time from "svelte-time";

  let { timestamp }: { timestamp: string } = $props();
</script>

<Time {timestamp}>
  {#snippet children(formatted)}
    <strong>{formatted}</strong>
  {/snippet}
</Time>

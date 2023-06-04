<script lang="ts">
  import Time, { svelteTime } from "svelte-time";

  const CUSTOM_INTERVAL = 30 * 1_000;
</script>

<Time data-test="relative-live" relative live={CUSTOM_INTERVAL} />

<time
  data-test="action-relative-live"
  use:svelteTime={{
    relative: true,
    live: CUSTOM_INTERVAL,
  }}
/>

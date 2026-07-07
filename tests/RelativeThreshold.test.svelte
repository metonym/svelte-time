<script lang="ts">
  import Time, { svelteTime, time } from "svelte-time";

  const THRESHOLD = 2 * 60 * 1_000; // 2 minutes, matches RelativeThreshold.test.ts

  const fresh = new Date().toISOString();
  const alreadyOld = new Date(Date.now() - THRESHOLD * 2).toISOString();
</script>

<Time
  data-test="component-threshold"
  relative
  live
  format="h:mm a"
  relativeThreshold={THRESHOLD}
  timestamp={fresh}
/>

<Time data-test="component-default" relative live timestamp={fresh} />

<Time
  data-test="component-already-past"
  relative
  live
  format="h:mm a"
  relativeThreshold={THRESHOLD}
  timestamp={alreadyOld}
/>

<time
  data-test="action-threshold"
  use:svelteTime={{
    relative: true,
    live: true,
    format: "h:mm a",
    relativeThreshold: THRESHOLD,
    timestamp: fresh,
  }}
></time>

<time
  data-test="attachment-threshold"
  {@attach time({
    relative: true,
    live: true,
    format: "h:mm a",
    relativeThreshold: THRESHOLD,
    timestamp: fresh,
  })}
></time>

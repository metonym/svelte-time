<script lang="ts">
  import { time } from "svelte-time";

  const CUSTOM_INTERVAL = 30 * 1_000;
  const timestamp = new Date().toISOString();
</script>

<time
  data-test="attachment-live-a"
  {@attach time({ relative: true, live: CUSTOM_INTERVAL, timestamp })}
></time>

<time
  data-test="attachment-live-b"
  {@attach time({ relative: true, live: CUSTOM_INTERVAL, timestamp })}
></time>

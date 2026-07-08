<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `time` is used in the {@attach} directives below
  import { time } from "svelte-time";

  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directives below
  const CUSTOM_INTERVAL = 30 * 1_000;
  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directives below
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

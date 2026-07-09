<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `stopwatch` is used in the {@attach} directives below
  import { stopwatch } from "svelte-time";

  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directives below
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directive below
  const oneHourAgo = new Date(Date.now() - 3600000);

  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directive below
  let pauseSince = $state(new Date());
  let running = $state(true);

  function togglePause() {
    running = !running;
  }
</script>

<time
  data-test="basic"
  {@attach stopwatch({ since: fiveMinutesAgo, live: false })}
></time>

<time
  data-test="format-mm-ss"
  {@attach stopwatch({
    since: fiveMinutesAgo,
    format: "mm:ss",
    live: false,
  })}
></time>

<time
  data-test="humanize"
  {@attach stopwatch({
    since: oneHourAgo,
    humanize: true,
    withSuffix: true,
    live: false,
  })}
></time>

<time
  data-test="live"
  {@attach stopwatch({ since: new Date() })}
></time>

<time
  data-test="pause"
  {@attach stopwatch({ since: pauseSince, running })}
></time>
<button
  type="button"
  data-test="btn-toggle-pause"
  onclick={togglePause}
>
  Toggle
</button>

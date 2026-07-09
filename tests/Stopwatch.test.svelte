<script lang="ts">
  import { Stopwatch } from "svelte-time";

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const oneHourAgo = new Date(Date.now() - 3600000);

  let pauseSince = $state(new Date());
  let running = $state(true);

  function togglePause() {
    running = !running;
  }

  let resetSince = $state(new Date());

  function reset() {
    resetSince = new Date();
  }
</script>

<!-- Basic: counts up from `since` -->
<Stopwatch
  data-test="basic"
  since={fiveMinutesAgo}
  live={false}
/>

<!-- Fixed format -->
<Stopwatch
  data-test="format-mm-ss"
  since={fiveMinutesAgo}
  format="mm:ss"
  live={false}
/>

<!-- Humanize + withSuffix -->
<Stopwatch
  data-test="humanize-default"
  since={oneHourAgo}
  humanize
  live={false}
/>
<Stopwatch
  data-test="humanize-with-suffix"
  since={oneHourAgo}
  humanize
  withSuffix
  live={false}
/>

<!-- Locale -->
<Stopwatch
  data-test="locale-de"
  since={oneHourAgo}
  humanize
  locale="de"
  live={false}
/>

<!-- Live ticking (default: every second) -->
<Stopwatch
  data-test="live"
  since={new Date()}
/>

<!-- Live with a custom fixed interval -->
<Stopwatch
  data-test="live-custom-interval"
  since={new Date()}
  live={5000}
/>

<!-- Pause/resume excludes paused interval from elapsed time -->
<Stopwatch
  data-test="pause"
  since={pauseSince}
  {running}
>
  {#snippet children(formatted, isRunning)}
    <span data-test="pause-value">{formatted}</span>
    <span data-test="pause-running">{isRunning}</span>
  {/snippet}
</Stopwatch>
<button
  type="button"
  data-test="btn-toggle-pause"
  onclick={togglePause}
>
  Toggle
</button>

<!-- Changing `since` resets the stopwatch to zero -->
<Stopwatch
  data-test="reset"
  since={resetSince}
/>
<button
  type="button"
  data-test="btn-restart"
  onclick={reset}
>
  Restart
</button>

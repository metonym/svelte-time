<script lang="ts">
  import { stopwatch } from "svelte-time";

  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const oneHourAgo = new Date(Date.now() - 3600000);

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

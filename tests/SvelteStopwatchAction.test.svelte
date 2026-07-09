<script lang="ts">
  import { svelteStopwatch } from "svelte-time";

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
  use:svelteStopwatch={{ since: fiveMinutesAgo, live: false }}
></time>
<span
  data-test="basic-span"
  use:svelteStopwatch={{ since: fiveMinutesAgo, live: false }}
></span>

<time
  data-test="format-mm-ss"
  use:svelteStopwatch={{
    since: fiveMinutesAgo,
    format: "mm:ss",
    live: false,
  }}
></time>

<time
  data-test="humanize"
  use:svelteStopwatch={{
    since: oneHourAgo,
    humanize: true,
    withSuffix: true,
    live: false,
  }}
></time>

<time
  data-test="locale"
  use:svelteStopwatch={{
    since: oneHourAgo,
    humanize: true,
    locale: "de",
    live: false,
  }}
></time>

<time
  data-test="live"
  use:svelteStopwatch={{ since: new Date() }}
></time>

<time
  data-test="pause"
  use:svelteStopwatch={{ since: pauseSince, running }}
></time>
<button
  type="button"
  data-test="btn-toggle-pause"
  onclick={togglePause}
>
  Toggle
</button>

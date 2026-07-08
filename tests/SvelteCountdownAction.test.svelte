<script lang="ts">
  import { svelteCountdown } from "svelte-time";

  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
  const twoSecondsFromNow = new Date(now.getTime() + 2000);

  const { oncomplete }: { oncomplete?: () => void } = $props();
</script>

<time
  data-test="basic"
  use:svelteCountdown={{ to: fiveMinutesFromNow, live: false }}
></time>
<span
  data-test="basic-span"
  use:svelteCountdown={{ to: fiveMinutesFromNow, live: false }}
></span>

<time
  data-test="format-mm-ss"
  use:svelteCountdown={{
    to: fiveMinutesFromNow,
    format: "mm:ss",
    live: false,
  }}
></time>

<time
  data-test="humanize"
  use:svelteCountdown={{
    to: fiveMinutesFromNow,
    humanize: true,
    withSuffix: true,
    live: false,
  }}
></time>

<time
  data-test="locale"
  use:svelteCountdown={{
    to: fiveMinutesFromNow,
    humanize: true,
    locale: "de",
    live: false,
  }}
></time>

<time
  data-test="live"
  use:svelteCountdown={{ to: twoSecondsFromNow }}
></time>

<time
  data-test="on-complete"
  use:svelteCountdown={{ to: twoSecondsFromNow, oncomplete }}
></time>

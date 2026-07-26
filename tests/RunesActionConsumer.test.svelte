<svelte:options runes={true} />

<script lang="ts">
  import { svelteCountdown, svelteDuration, svelteTime } from "svelte-time";

  let timestamp = $state("2020-02-01");
  let since = $state("2023-12-31T23:59:00.000Z");
  let to = $state(new Date("2024-01-01T00:05:00.000Z"));
  let completedCalls = $state(0);

  function bumpTimestamp() {
    timestamp = "2021-03-15";
  }

  function bumpSince() {
    since = "2023-12-31T23:50:00.000Z";
  }

  function completeCountdown() {
    to = new Date(Date.now() - 1000);
  }

  function handleCountdownComplete() {
    completedCalls++;
  }
</script>

<time
  data-test="time"
  use:svelteTime={{ timestamp }}
></time>
<button
  type="button"
  data-test="btn-time"
  onclick={bumpTimestamp}
>
  Update timestamp
</button>

<time
  data-test="duration"
  use:svelteDuration={{ since, live: false }}
></time>
<button
  type="button"
  data-test="btn-duration"
  onclick={bumpSince}
>
  Update since
</button>

<time
  data-test="countdown"
  use:svelteCountdown={{
    to,
    live: false,
    oncomplete: handleCountdownComplete,
  }}
></time>
<span data-test="countdown-oncomplete-calls">{completedCalls}</span>
<button
  type="button"
  data-test="btn-countdown"
  onclick={completeCountdown}
>
  Complete countdown
</button>

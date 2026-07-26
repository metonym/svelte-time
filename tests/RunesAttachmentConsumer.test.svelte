<svelte:options runes={true} />

<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `time`, `duration`, and `countdown` are used in the {@attach} directives below
  import { countdown, duration, time } from "svelte-time";

  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directives below
  let timestamp = $state("2020-02-01");
  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directives below
  let since = $state("2023-12-31T23:59:00.000Z");
  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directives below
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
</script>

<time
  data-test="time"
  {@attach time({ timestamp })}
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
  {@attach duration({ since, live: false })}
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
  {@attach countdown({
    to,
    live: false,
    oncomplete: () => completedCalls++,
  })}
></time>
<span data-test="countdown-oncomplete-calls">{completedCalls}</span>
<button
  type="button"
  data-test="btn-countdown"
  onclick={completeCountdown}
>
  Complete countdown
</button>

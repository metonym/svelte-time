<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `timeRange` is used in the {@attach} directives below
  import { timeRange } from "svelte-time";

  const START = "2024-01-05";
  const END = "2024-01-10T00:00:00.000Z";

  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directive below
  let start = $state(START);
  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directive below
  let end = $state(END);
</script>

<span
  data-test="basic"
  {@attach timeRange({ start: START, end: END })}
></span>

<span
  data-test="format"
  {@attach timeRange({ start: START, end: END, format: "YYYY-MM-DD" })}
></span>

<span
  data-test="separator"
  {@attach timeRange({ start: START, end: END, separator: " to " })}
></span>

<span
  data-test="locale"
  {@attach timeRange({ start: START, end: END, format: "MMMM", locale: "de" })}
></span>

<span
  data-test="reactive"
  {@attach timeRange({ start, end })}
></span>
<button
  type="button"
  onclick={() => {
    start = "2024-02-05";
    end = "2024-02-10T00:00:00.000Z";
  }}
>
  Update
</button>

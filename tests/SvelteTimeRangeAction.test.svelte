<script lang="ts">
  import { svelteTimeRange } from "svelte-time";

  let start = $state("2024-01-05");
  let end = $state("2024-01-10T00:00:00.000Z");
</script>

<span
  data-test="basic"
  use:svelteTimeRange={{ start, end }}
></span>

<span
  data-test="format"
  use:svelteTimeRange={{ start, end, format: "YYYY-MM-DD" }}
></span>

<span
  data-test="separator"
  use:svelteTimeRange={{ start, end, separator: " to " }}
></span>

<span
  data-test="locale"
  use:svelteTimeRange={{ start, end, format: "MMMM", locale: "de" }}
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

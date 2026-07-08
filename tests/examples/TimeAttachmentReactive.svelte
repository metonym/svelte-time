<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `time` is used in the {@attach} directive below
  import { time } from "svelte-time";

  // biome-ignore lint/correctness/noUnusedVariables: used in the {@attach} directive below
  let timestamp = $state("2021-02-02");
</script>

<time {@attach time({ timestamp, format: "YYYY-MM-DD" })}></time>
<button
  type="button"
  onclick={() => (timestamp = "2021-02-03")}
>
  Update
</button>

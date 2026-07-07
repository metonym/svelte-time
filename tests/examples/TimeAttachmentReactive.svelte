<script lang="ts">
  import { time } from "svelte-time";

  let timestamp = $state("2021-02-02");
</script>

<time {@attach time({ timestamp, format: "YYYY-MM-DD" })}></time>
<button onclick={() => (timestamp = "2021-02-03")}>Update</button>

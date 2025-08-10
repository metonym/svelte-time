<script>
  import { svelteTime } from "svelte-time";

  let timestamp = $state("2021-02-02");
  let format = $state("dddd @ h:mm A · MMMM D, YYYY");
</script>

<button onclick={() => (timestamp = "2022-02-02")}> Update </button>

<div>
  <time use:svelteTime={{ timestamp, format }}></time>
</div>

<script lang="ts">
  import { svelteTime } from "svelte-time";

  let timestamp = $state("2021-02-02");
  let format = $state("dddd @ h:mm A · MMMM D, YYYY");

  function updateTimestamp() {
    const date = new Date(timestamp);
    date.setDate(date.getDate() + 1);
    timestamp = date.toISOString().split("T")[0];
  }
</script>

<button
  type="button"
  onclick={updateTimestamp}
>
  Update
</button>

<div>
  <time use:svelteTime={{ timestamp, format }}></time>
</div>

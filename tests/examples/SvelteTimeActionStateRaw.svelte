<script lang="ts">
  import { svelteTime } from "svelte-time";

  let data = $state.raw({
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  });

  function updateData() {
    data = {
      timestamp: "2025-04-02",
      format: "dddd @ h:mm A · MMMM D, YYYY",
    };
  }
</script>

<button
  type="button"
  onclick={updateData}
>
  Update
</button>

<div>
  <time use:svelteTime={data}></time>
</div>

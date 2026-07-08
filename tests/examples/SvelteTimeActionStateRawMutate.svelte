<script lang="ts">
  import { svelteTime } from "svelte-time";

  let data = $state.raw({
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  });

  function mutateField() {
    // Mutates the same $state.raw reference in place, rather than
    // reassigning it — $state.raw is not deeply reactive, so this must
    // NOT trigger the action's update().
    data.timestamp = "2025-04-02";
  }
</script>

<button
  type="button"
  onclick={mutateField}
>
  Mutate
</button>

<div>
  <time use:svelteTime={data}></time>
</div>

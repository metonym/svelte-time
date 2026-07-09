<script>
  import { Stopwatch } from "svelte-time";

  let since = $state(new Date());
</script>

<div>
  <!-- Ticks live by default, once per second -->
  <Stopwatch {since} />
  <button
    type="button"
    onclick={() => (since = new Date())}
  >
    Restart
  </button>
</div>

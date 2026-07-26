<script>
  import { Stopwatch } from "svelte-time/intl";

  let since = $state(new Date());
</script>

<!-- Ticks live by default, once per second -->
<Stopwatch {since} />

<!-- Changing `since` restarts the stopwatch -->
<button
  type="button"
  onclick={() => (since = new Date())}
>
  Restart
</button>

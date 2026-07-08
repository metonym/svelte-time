<script>
  import { Duration } from "svelte-time";

  const since = new Date().toISOString();
</script>

<!-- Elapsed time since `since`, ticking live -->
<Duration
  {since}
  live
  format="HH:mm:ss"
/>

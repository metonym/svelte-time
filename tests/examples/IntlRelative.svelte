<script>
  import { Time } from "svelte-time/intl";
</script>

<Time
  relative
  timestamp={Date.now() - 4 * 86_400_000}
/>
<Time
  relative
  timestamp={Date.now() + 2 * 3_600_000}
/>

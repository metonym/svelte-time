<script>
  import { Time } from "svelte-time/intl";

  const timestamp = new Date();
</script>

<Time
  relative
  live
  {timestamp}
/>

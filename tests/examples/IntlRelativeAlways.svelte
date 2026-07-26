<script>
  import { Time } from "svelte-time/intl";

  const timestamp = Date.now() - 86_400_000;
</script>

<!-- numeric="auto" (default): "yesterday" -->
<Time
  relative
  {timestamp}
/>

<!-- numeric="always": "1 day ago" -->
<Time
  relative
  {timestamp}
  numeric="always"
/>

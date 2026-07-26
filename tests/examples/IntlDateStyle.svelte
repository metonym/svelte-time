<script>
  import { Time } from "svelte-time/intl";

  const timestamp = new Date();
</script>

<Time
  {timestamp}
  options={{ dateStyle: "short" }}
/>
<Time
  {timestamp}
  options={{ dateStyle: "full" }}
/>
<Time
  {timestamp}
  options={{ dateStyle: "medium", timeStyle: "short" }}
/>

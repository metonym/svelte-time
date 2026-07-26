<script>
  import { Time } from "svelte-time/intl";

  const timestamp = new Date();
</script>

<!-- Alternate calendar systems, no plugins required -->
<Time
  {timestamp}
  options={{ dateStyle: "long", calendar: "japanese" }}
/>
<Time
  {timestamp}
  options={{ dateStyle: "long", calendar: "islamic" }}
/>
<Time
  {timestamp}
  options={{ dateStyle: "long", calendar: "buddhist" }}
/>

<!-- Alternate numbering system -->
<Time
  {timestamp}
  options={{ dateStyle: "long", numberingSystem: "arab" }}
/>

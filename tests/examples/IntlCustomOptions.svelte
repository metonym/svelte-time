<script>
  import { Time } from "svelte-time/intl";
</script>

<Time
  timestamp="2020-02-01"
  options={{ weekday: "long", year: "numeric", month: "short", day: "numeric" }}
/>

<Time
  timestamp={new Date()}
  options={{ year: "numeric", month: "2-digit", day: "2-digit" }}
/>

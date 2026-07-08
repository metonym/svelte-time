<script>
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import Time, { dayjs } from "svelte-time";

  dayjs.extend(utc);
  dayjs.extend(timezone);
</script>

<Time
  timestamp="2013-11-18T11:55:20Z"
  tz="America/Toronto"
  format="YYYY-MM-DDTHH:mm:ss"
/>

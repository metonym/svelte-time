<script lang="ts">
    import { utc } from "dayjs/esm";
  import Time, { svelteTime } from "svelte-time";
  import { dayjs } from "svelte-time";

  let time = dayjs().format("MMM DD, YYYY");
  let relativeTime = dayjs().from(dayjs());
</script>

<!-- Basic -->
<Time data-test="default" />
<Time data-test="timestamp-string" timestamp="2020-02-01" />
<Time
  data-test="timestamp-date"
  timestamp={new Date()}
  format="dddd @ h:mm a"
/>
<Time
  data-test="timestamp-number"
  timestamp={1e10}
  format="dddd @ h:mm A · MMMM D, YYYY"
/>

<!-- Relative time -->
<Time data-test="relative" relative />
<Time data-test="relative-timestamp" relative timestamp="2021-02-02" />
<Time data-test="relative-timestamp-number" relative timestamp={1e10} />
<Time data-test="relative-live" relative live />

<!-- Timezone -->
<Time 
  data-test="timezone" 
  format="dddd @ h:mm A · MMMM D, YYYY"
  timestamp={Date.UTC(2024, 0, 1, 12, 0, 0)} 
  timezone="America/New_York" />

<!-- Action -->
<time data-test="action" use:svelteTime />
<time
  data-test="action-timestamp-format"
  use:svelteTime={{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
/>
<time
  data-test="action-relative"
  use:svelteTime={{
    timestamp: "2021-02-02",
    relative: true,
  }}
/>
<time
  data-test="action-relative-live"
  use:svelteTime={{
    relative: true,
    live: true,
  }}
/>

<span data-test="dayjs">
  {time}
</span>

<span data-test="dayjs-relative">
  {relativeTime}
</span>

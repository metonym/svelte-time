<script lang="ts">
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

<!-- Action -->
<time data-test="action" use:svelteTime></time>
<time
  data-test="action-timestamp-format"
  use:svelteTime={{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
></time>
<time
  data-test="action-relative"
  use:svelteTime={{
    timestamp: "2021-02-02",
    relative: true,
  }}
></time>
<time
  data-test="action-relative-live"
  use:svelteTime={{
    relative: true,
    live: true,
  }}
></time>

<span data-test="dayjs">
  {time}
</span>

<span data-test="dayjs-relative">
  {relativeTime}
</span>

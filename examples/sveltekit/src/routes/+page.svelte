<script lang="ts">
  import Time, { svelteTime } from "svelte-time";
  import { dayjs } from "svelte-time";

  let time = dayjs().format("MMM DD, YYYY");
  let relativeTime = dayjs().from(dayjs());
</script>

<!-- Basic -->
<Time />
<Time timestamp="2020-02-01" />
<Time timestamp={new Date()} format="dddd @ h:mm a" />
<Time timestamp={1e10} format="dddd @ h:mm A · MMMM D, YYYY" />

<!-- Relative time -->
<Time relative />
<Time relative timestamp="2021-02-02" />
<Time relative timestamp={1e10} />
<Time relative live />

<!-- Action -->
<time use:svelteTime></time>
<time
  use:svelteTime={{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
></time>
<time
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

<span>
  {time}
</span>

<span>
  {relativeTime}
</span>

<style>
  :global(time) {
    display: block;
  }
</style>

<script>
  import Time, { svelteTime } from "svelte-time";
  import { dayjs } from "svelte-time";

  let time = dayjs().format("MMM DD, YYYY");
</script>

<h2>Basic</h2>

<Time />
<Time timestamp="2020-02-01" />
<Time timestamp={new Date()} format="dddd @ h:mm a" />
<Time timestamp={1e10} format="dddd @ h:mm A · MMMM D, YYYY" />

<h2>Relative</h2>

<Time relative />
<Time relative timestamp="2021-02-02" />
<Time relative timestamp={1e10} />
<Time live relative />

<h2>use:svelteTime</h2>

<time use:svelteTime />

<time
  use:svelteTime={{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
/>

<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
  }}
/>

<time
  use:svelteTime={{
    relative: true,
    live: true,
  }}
/>

{time}

<style>
  :global(time) {
    display: block;
    margin-bottom: 0.5rem;
  }
</style>

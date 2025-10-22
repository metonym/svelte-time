<script lang="ts">
  import Time from "svelte-time";

  let timestamp = $state("2020-02-01");
  let format = $state("MMM DD, YYYY");
  let relative = $state(false);
  let live = $state<boolean | number>(false);

  function updateTimestamp() {
    timestamp = "2021-03-15";
  }

  function updateFormat() {
    format = "YYYY-MM-DD";
  }

  function toggleRelative() {
    relative = !relative;
  }

  function toggleLive() {
    live = !live;
  }
</script>

<Time data-test="reactive-timestamp" {timestamp} />
<button data-test="btn-timestamp" onclick={updateTimestamp}
  >Update timestamp</button
>

<Time data-test="reactive-format" timestamp="2020-02-01" {format} />
<button data-test="btn-format" onclick={updateFormat}>Update format</button>

<Time
  data-test="reactive-relative"
  timestamp="2021-02-02"
  format="MMM DD, YYYY"
  {relative}
/>
<button data-test="btn-relative" onclick={toggleRelative}
  >Toggle relative</button
>

<Time
  data-test="reactive-live"
  timestamp={new Date().toISOString()}
  {relative}
  {live}
/>
<button data-test="btn-live" onclick={toggleLive}>Toggle live</button>

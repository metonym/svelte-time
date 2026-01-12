<script>
  import { dayjs } from "svelte-time";

  let timestamp = $state("");
  let duration = $state(null);
</script>

<button onclick={() => (timestamp = dayjs().format("HH:mm:ss.SSSSSS"))}>
  Update {timestamp}
</button>

<button onclick={() => (duration = dayjs.duration(2, "hours").humanize())}>
  Duration: {duration || "Click to see 2 hours"}
</button>

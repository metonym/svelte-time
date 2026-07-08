<script>
  import { now } from "svelte-time";

  const a = $derived(now(30_000).valueOf());
  const b = $derived(now(30_000).valueOf());
</script>

<div data-test="now-a">{a}</div>
<div data-test="now-b">{b}</div>

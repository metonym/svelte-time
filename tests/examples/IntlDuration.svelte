<script>
  import { formatDuration } from "svelte-time/intl";

  const ms = 5_425_000; // 1h 30m 25s
</script>

<p>digital (default): {formatDuration(ms)}</p>
<p>long: {formatDuration(ms, { style: "long" })}</p>
<p>narrow: {formatDuration(ms, { style: "narrow" })}</p>
<p>negative: {formatDuration(-42_000)}</p>

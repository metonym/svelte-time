<script>
  import { formatRange, formatTime, relativeTime } from "svelte-time/intl";

  const timestamp = "2026-01-10T00:00:00Z";
</script>

<ul>
  <li>formatTime: {formatTime(timestamp)}</li>
  <li>relativeTime: {relativeTime(timestamp)}</li>
  <li>formatRange: {formatRange(timestamp, "2026-01-15T00:00:00Z")}</li>
</ul>

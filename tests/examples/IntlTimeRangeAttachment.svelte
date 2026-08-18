<script>
  import { timeRange } from "svelte-time/intl";
</script>

<time {@attach timeRange({ start: "2026-01-10", end: "2026-01-15" })}></time>

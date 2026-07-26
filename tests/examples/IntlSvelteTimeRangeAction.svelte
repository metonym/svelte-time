<script>
  import { svelteTimeRange } from "svelte-time/intl";
</script>

<time use:svelteTimeRange={{ start: "2026-01-10", end: "2026-01-15" }}></time>

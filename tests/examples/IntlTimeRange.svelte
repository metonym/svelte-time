<script>
  import { TimeRange } from "svelte-time/intl";
</script>

<!-- Output: "Jan 10 – 15, 2026" -->
<TimeRange
  start="2026-01-10"
  end="2026-01-15"
/>

<!-- Spans months/years automatically -->
<TimeRange
  start="2026-01-10"
  end="2026-03-02"
/>

<TimeRange
  start="2026-01-10"
  end="2026-01-15"
  options={{ dateStyle: "long" }}
/>

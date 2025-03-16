<script>
  import { Duration, dayjs } from "svelte-time";
</script>

<div>
  <!-- Display 1 hour (human-readable) -->
  <Duration value={3600000} humanize={true} />
</div>

<div>
  <!-- Display 90 seconds (human-readable) -->
  <Duration value={90} unit="seconds" humanize={true} />
</div>

<div>
  <!-- Display 2 hours using dayjs Duration object (human-readable) -->
  <Duration value={dayjs.duration(2, "hours")} humanize={true} />
</div>

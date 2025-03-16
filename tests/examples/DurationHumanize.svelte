<script>
  import { Duration, dayjs } from "svelte-time";
</script>

<div>
  <!-- Human-readable format -->
  <Duration value={3600000} humanize={true} />
</div>

<div>
  <!-- Custom format (e.g., "01:00:00") -->
  <Duration value={3600000} format="HH:mm:ss" />
</div>

<div>
  <!-- Short format (e.g., "01:30") -->
  <Duration value={5400000} format="mm:ss" />
</div>

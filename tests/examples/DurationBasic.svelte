<script>
  import { Duration } from "svelte-time";
</script>

<div>
  <!-- Default format: "HH:mm:ss" -->
  <Duration value={3661000} />
</div>

<div>
  <!-- unit converts a plain number before formatting -->
  <Duration
    value={90}
    unit="seconds"
    format="mm:ss"
  />
</div>

<div>
  <!-- Magnitude larger than the format's largest token rolls up -->
  <Duration
    value={5400000}
    format="mm:ss"
  />
</div>

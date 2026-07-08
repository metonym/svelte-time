<script>
  import { Duration } from "svelte-time";
</script>

<div>
  <Duration
    value={3600000}
    humanize
  />
  <!-- Output: "an hour" -->
</div>

<div>
  <Duration
    value={3600000}
    humanize
    withSuffix
  />
  <!-- Output: "in an hour" -->
</div>

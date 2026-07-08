<script lang="ts">
  import { Duration, dayjs } from "svelte-time";
</script>

<!-- Default: format="HH:mm:ss" -->
<Duration
  data-test="default"
  value={0}
/>
<Duration
  data-test="basic"
  value={3661000}
/>

<!-- Unit -->
<Duration
  data-test="value-seconds"
  value={90}
  unit="seconds"
  format="mm:ss"
/>

<!-- Rollup: excess magnitude rolls into the largest present token -->
<Duration
  data-test="rollup-minutes"
  value={5400000}
  format="mm:ss"
/>
<Duration
  data-test="rollup-hours"
  value={90000000}
  format="HH:mm:ss"
/>

<!-- Flexible value: ISO 8601 string and dayjs Duration instance -->
<Duration
  data-test="value-iso-string"
  value="PT2H"
/>
<Duration
  data-test="value-duration-object"
  value={dayjs.duration(2, "hours")}
/>

<!-- Humanize -->
<Duration
  data-test="humanize-default"
  value={3600000}
  humanize
/>
<Duration
  data-test="humanize-with-suffix"
  value={3600000}
  humanize
  withSuffix
/>

<!-- Locale -->
<Duration
  data-test="locale-de"
  value={3600000}
  humanize
  locale="de"
/>
<Duration
  data-test="locale-es"
  value={120000}
  humanize
  locale="es"
/>

<!-- since + live (elapsed/stopwatch mode) -->
<Duration
  data-test="since"
  since={new Date().toISOString()}
  live
  format="HH:mm:ss"
/>

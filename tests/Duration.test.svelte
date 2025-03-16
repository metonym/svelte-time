<script lang="ts">
  import { Duration, dayjs } from "svelte-time";
</script>

<!-- Basic (default: raw milliseconds) -->
<Duration data-test="default" value={3600000} />
<Duration data-test="value-seconds" value={90} unit="seconds" />
<Duration
  data-test="value-duration-object"
  value={dayjs.duration(2, "hours")}
/>

<!-- Humanize -->
<Duration data-test="humanize-default" value={3600000} humanize={true} />
<Duration data-test="humanize-false-format" value={3600000} format="HH:mm:ss" />
<Duration
  data-test="humanize-false-format-short"
  value={5400000}
  format="mm:ss"
/>

<!-- Locale -->
<Duration data-test="locale-de" value={3600000} humanize={true} locale="de" />
<Duration data-test="locale-es" value={120000} humanize={true} locale="es" />

<!-- Live updates -->
<Duration data-test="live" value={3600000} humanize={true} live />
<Duration
  data-test="live-custom-interval"
  value={3600000}
  live={1000}
  format="mm:ss"
/>

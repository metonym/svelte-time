<script lang="ts">
  import { svelteDuration } from "svelte-time";
</script>

<!-- Basic (default: raw milliseconds) -->
<time data-test="basic" use:svelteDuration={{ value: 3600000 }}></time>
<span data-test="basic-span" use:svelteDuration={{ value: 3600000 }}></span>

<!-- With unit -->
<time data-test="with-unit" use:svelteDuration={{ value: 90, unit: "seconds" }}
></time>

<!-- With format -->
<time
  data-test="with-format"
  use:svelteDuration={{
    value: 3600000,
    format: "HH:mm:ss",
  }}
></time>

<!-- With locale -->
<time
  data-test="with-locale"
  use:svelteDuration={{ value: 3600000, humanize: true, locale: "de" }}
></time>

<!-- Live updates -->
<time
  data-test="live"
  use:svelteDuration={{ value: 3600000, humanize: true, live: true }}
></time>

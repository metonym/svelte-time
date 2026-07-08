<script lang="ts">
  import { svelteDuration } from "svelte-time";
</script>

<time
  data-test="basic"
  use:svelteDuration={{ value: 3661000 }}
></time>
<span
  data-test="basic-span"
  use:svelteDuration={{ value: 3661000 }}
></span>

<time
  data-test="rollup"
  use:svelteDuration={{ value: 5400000, format: "mm:ss" }}
></time>

<time
  data-test="humanize"
  use:svelteDuration={{ value: 3600000, humanize: true, withSuffix: true }}
></time>

<time
  data-test="locale"
  use:svelteDuration={{ value: 3600000, humanize: true, locale: "de" }}
></time>

<time
  data-test="since"
  use:svelteDuration={{
    since: new Date().toISOString(),
    live: 1000,
    format: "HH:mm:ss",
  }}
></time>

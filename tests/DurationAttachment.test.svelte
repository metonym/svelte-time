<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `duration` is used in the {@attach} directives below
  import { duration } from "svelte-time";
</script>

<time
  data-test="basic"
  {@attach duration({ value: 3661000 })}
></time>

<time
  data-test="rollup"
  {@attach duration({ value: 5400000, format: "mm:ss" })}
></time>

<time
  data-test="humanize"
  {@attach duration({ value: 3600000, humanize: true, withSuffix: true })}
></time>

<time
  data-test="since"
  {@attach duration({
    since: new Date().toISOString(),
    live: true,
    format: "HH:mm:ss",
  })}
></time>

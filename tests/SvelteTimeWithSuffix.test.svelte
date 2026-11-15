<script lang="ts">
  import Time from "svelte-time";
</script>

<!-- Relative with suffix (default) -->
<Time data-test="relative-with-suffix" relative timestamp="2021-02-02" />

<!-- Relative without suffix -->
<Time
  data-test="relative-without-suffix"
  relative
  timestamp="2021-02-02"
  withoutSuffix
/>

<!-- Future timestamp with suffix (default) -->
<Time data-test="future-with-suffix" relative timestamp="2025-02-02" />

<!-- Future timestamp without suffix -->
<Time
  data-test="future-without-suffix"
  relative
  timestamp="2025-02-02"
  withoutSuffix
/>

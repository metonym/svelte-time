<script>
  import { svelteTime } from "svelte-time/intl";
</script>

<time use:svelteTime></time>

<time
  use:svelteTime={{
    timestamp: "2021-02-02",
    options: { dateStyle: "long" },
  }}
></time>

<time
  use:svelteTime={{ relative: true, timestamp: Date.now() - 4 * 86_400_000 }}
></time>

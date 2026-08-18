<script>
  import { time } from "svelte-time/intl";
</script>

<time
  {@attach time({ timestamp: "2021-02-02", options: { dateStyle: "long" } })}
></time>

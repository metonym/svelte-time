<script>
  import { time } from "svelte-time";
</script>

<time {@attach time({ timestamp: "2021-02-02", format: "YYYY-MM-DD" })}></time>

<script>
  import { svelteTime } from "svelte-time";
</script>

<div>
  <time use:svelteTime></time>
</div>

<div>
  <time
    use:svelteTime={{
      timestamp: "2021-02-02",
      format: "dddd @ h:mm A · MMMM D, YYYY",
    }}
  ></time>
</div>

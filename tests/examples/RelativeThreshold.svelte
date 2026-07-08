<script>
  import Time from "svelte-time";
</script>

<!-- Shows "a minute ago", flips to "4:40 am" after 2 hours -->
<Time
  relative
  live
  format="h:mm a"
  relativeThreshold={2 * 60 * 60 * 1000}
/>

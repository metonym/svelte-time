<script>
  import Time from "svelte-time";
</script>

<div>
  <Time timestamp="2020-02-01" format="dddd @ h:mm A · MMMM D, YYYY" />
</div>

<div>
  <Time timestamp={new Date()} format="YYYY/MM/DD" />
</div>

<div>
  <Time timestamp={1e10} format="ddd" />
</div>

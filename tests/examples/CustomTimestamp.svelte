<script>
  import Time from "svelte-time";
</script>

<div>
  <Time timestamp="2020-02-01" />
</div>

<div>
  <Time timestamp={new Date()} />
</div>

<div>
  <Time timestamp={1e10} />
</div>

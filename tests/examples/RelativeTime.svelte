<script>
  import Time from "svelte-time";
</script>

<div>
  <Time relative />
</div>

<div>
  <Time relative timestamp="2021-02-02" />
</div>

<div>
  <Time relative timestamp={1e10} />
</div>

<script>
  import "dayjs/locale/de"; // German locale
  import Time, { dayjs } from "svelte-time";
</script>

<Time timestamp={dayjs().locale("de")} format="dddd, MMMM D, YYYY" />

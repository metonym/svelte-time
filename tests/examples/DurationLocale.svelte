<script>
  import "dayjs/locale/de";
  import { Duration } from "svelte-time";
</script>

<div>
  <Duration
    value={3600000}
    humanize
    locale="de"
  />
  <!-- Output: "eine Stunde" -->
</div>

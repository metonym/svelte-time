<script>
  import "dayjs/locale/de"; // German locale
  import "dayjs/locale/es"; // Spanish locale
  import { Duration } from "svelte-time";
</script>

<div>
  <Duration value={3600000} humanize={true} locale="de" />
  <!-- Output: "eine Stunde" -->
</div>

<div>
  <Duration value={120000} humanize={true} locale="es" />
  <!-- Output: "2 minutos" -->
</div>

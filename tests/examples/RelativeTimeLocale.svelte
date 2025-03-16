<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import "dayjs/locale/ja"; // Japanese
  import Time from "svelte-time";
</script>

<div>
  <Time relative timestamp="2024-01-01" locale="de" />
</div>

<div>
  <Time relative timestamp="2024-01-01" locale="es" />
</div>

<div>
  <Time relative timestamp="2024-01-01" locale="fr" />
</div>

<div>
  <Time relative timestamp="2024-01-01" locale="ja" />
</div>

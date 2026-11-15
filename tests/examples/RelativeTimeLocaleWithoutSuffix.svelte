<script lang="ts">
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import Time from "svelte-time";
</script>

<div>
  <Time relative timestamp="2024-01-01" locale="de" withoutSuffix />
</div>

<div>
  <Time relative timestamp="2024-01-01" locale="es" withoutSuffix />
</div>

<div>
  <Time relative timestamp="2024-01-01" locale="fr" withoutSuffix />
</div>

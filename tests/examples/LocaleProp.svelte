<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import "dayjs/locale/ja"; // Japanese
  import Time from "svelte-time";
</script>

<div>
  <Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" locale="de" />
</div>

<div>
  <Time
    timestamp="2024-01-01"
    format="dddd, D [de] MMMM [de] YYYY"
    locale="es"
  />
</div>

<div>
  <Time timestamp="2024-01-01" format="dddd D MMMM YYYY" locale="fr" />
</div>

<div>
  <Time timestamp="2024-01-01" format="YYYY年M月D日(dddd)" locale="ja" />
</div>

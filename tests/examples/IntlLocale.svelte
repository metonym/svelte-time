<script>
  import { Time } from "svelte-time/intl";

  const timestamp = "2024-03-15T18:30:00Z";
</script>

<!-- No locale files to import — the browser/runtime's ICU data covers every BCP-47 locale -->
<Time
  {timestamp}
  locale="de"
  options={{ dateStyle: "long" }}
/>
<Time
  {timestamp}
  locale="ja"
  options={{ dateStyle: "long" }}
/>
<Time
  {timestamp}
  locale="ar"
  options={{ dateStyle: "long" }}
/>
<Time
  relative
  {timestamp}
  locale="fr"
/>

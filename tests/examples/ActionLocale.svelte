<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import "dayjs/locale/ja"; // Japanese
  import { svelteTime } from "svelte-time";
</script>

<div>
  <time
    use:svelteTime={{
      timestamp: "2024-01-01",
      format: "dddd, MMMM D, YYYY",
      locale: "de",
    }}
  ></time>
</div>

<div>
  <time
    use:svelteTime={{
      timestamp: "2024-01-01",
      format: "dddd, D [de] MMMM [de] YYYY",
      locale: "es",
    }}
  ></time>
</div>

<div>
  <time
    use:svelteTime={{
      relative: true,
      timestamp: "2024-01-01",
      locale: "fr",
    }}
  ></time>
</div>

<div>
  <time
    use:svelteTime={{
      relative: true,
      timestamp: "2024-01-01",
      locale: "ja",
    }}
  ></time>
</div>

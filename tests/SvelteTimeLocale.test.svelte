<script lang="ts">
  import Time, { svelteTime } from "svelte-time";
  import dayjs from "dayjs";
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import "dayjs/locale/ja"; // Japanese

  const fixedDate = "2024-01-01T12:00:00.000Z";

  // Pre-format dates with locales
  const germanDate = dayjs(fixedDate).locale("de").format("dddd, D. MMMM YYYY");
  const spanishDate = dayjs(fixedDate)
    .locale("es")
    .format("dddd, D [de] MMMM [de] YYYY");
  const frenchDate = dayjs(fixedDate).locale("fr").format("dddd D MMMM YYYY");
  const japaneseDate = dayjs(fixedDate)
    .locale("ja")
    .format("YYYY年M月D日(dddd)");
</script>

<!-- German Locale -->
<Time
  data-test="german-full"
  timestamp={fixedDate}
  format="dddd, D. MMMM YYYY"
  locale="de"
/>

<span data-test="german-formatted">{germanDate}</span>

<Time
  data-test="german-short"
  timestamp={fixedDate}
  format="dd., D. MMM YYYY"
  locale="de"
/>

<Time
  data-test="german-month-year"
  timestamp={fixedDate}
  format="MMMM YYYY"
  locale="de"
/>

<!-- Spanish Locale -->
<Time
  data-test="spanish-full"
  timestamp={fixedDate}
  format="dddd, D [de] MMMM [de] YYYY"
  locale="es"
/>

<span data-test="spanish-formatted">{spanishDate}</span>

<Time
  data-test="spanish-short"
  timestamp={fixedDate}
  format="dd., D MMM YYYY"
  locale="es"
/>

<!-- French Locale -->
<Time
  data-test="french-full"
  timestamp={fixedDate}
  format="dddd D MMMM YYYY"
  locale="fr"
/>

<span data-test="french-formatted">{frenchDate}</span>

<Time
  data-test="french-short"
  timestamp={fixedDate}
  format="dd. D MMM YYYY"
  locale="fr"
/>

<!-- Japanese Locale -->
<Time
  data-test="japanese-full"
  timestamp={fixedDate}
  format="YYYY年M月D日(dddd)"
  locale="ja"
/>

<span data-test="japanese-formatted">{japaneseDate}</span>

<Time
  data-test="japanese-short"
  timestamp={fixedDate}
  format="YYYY年M月D日"
  locale="ja"
/>

<!-- Relative Time in Different Locales -->
<Time data-test="german-relative" timestamp={fixedDate} relative locale="de" />

<Time data-test="spanish-relative" timestamp={fixedDate} relative locale="es" />

<Time data-test="french-relative" timestamp={fixedDate} relative locale="fr" />

<Time
  data-test="japanese-relative"
  timestamp={fixedDate}
  relative
  locale="ja"
/>

<time data-test="action-locale-es" use:svelteTime={{ locale: "es" }}></time>

<time data-test="action-locale-fr" use:svelteTime={{ locale: "fr" }}></time>

<time data-test="action-locale-ja" use:svelteTime={{ locale: "ja" }}></time>

<time data-test="action-locale-de" use:svelteTime={{ locale: "de" }}></time>

<!-- Legacy locale behavior: dayjs instance with locale set -->
<Time
  data-test="legacy-locale-de"
  timestamp={dayjs(fixedDate).locale("de")}
  format="dddd, MMMM D, YYYY"
/>

<Time
  data-test="legacy-locale-es"
  timestamp={dayjs(fixedDate).locale("es")}
  format="dddd, D [de] MMMM [de] YYYY"
/>

<Time
  data-test="legacy-locale-relative-de"
  timestamp={dayjs(fixedDate).locale("de")}
  relative
/>

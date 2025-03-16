<script lang="ts">
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import { writable } from "svelte/store";
  import Time from "svelte-time";
  import type { Locales } from "svelte-time";

  const locale = writable<Locales>("en");

  function setLocale(loc: Locales) {
    locale.set(loc);
  }
</script>

<button onclick={() => setLocale("en")}>English</button>
<button onclick={() => setLocale("de")}>Deutsch</button>
<button onclick={() => setLocale("es")}>Español</button>
<button onclick={() => setLocale("fr")}>Français</button>

<div>
  <Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" locale={$locale} />
</div>

<div>
  <Time relative timestamp="2024-01-01" locale={$locale} />
</div>

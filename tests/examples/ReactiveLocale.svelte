<script lang="ts">
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import Time, { type Locales } from "svelte-time";

  let locale = $state<Locales>("en");
</script>

<button onclick={() => (locale = "en")}>English</button>
<button onclick={() => (locale = "de")}>Deutsch</button>
<button onclick={() => (locale = "es")}>Español</button>
<button onclick={() => (locale = "fr")}>Français</button>

<div>
  <Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" {locale} />
</div>

<div>
  <Time relative timestamp="2024-01-01" {locale} />
</div>

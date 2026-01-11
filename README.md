# svelte-time

[![NPM][npm]][npm-url]

<!-- REPO_URL -->

`svelte-time` is a Svelte component and action to make a timestamp human-readable while encoding the machine-parseable value in the semantic `time` element.

Under the hood, it uses [day.js](https://github.com/iamkun/dayjs), a lightweight date-time library.

```svelte no-eval
<!-- Input -->
<Time relative />

<!-- Output rendered in the DOM -->
<time title="May 15, 2022" datetime="2022-05-15T18:03:57.430Z">
  a few seconds ago
</time>
```

Try it in the [Svelte REPL](https://svelte.dev/repl/00b3877edb80425b96bb41fb18059882).

---

<!-- TOC -->

## Installation

```bash
# npm
npm i svelte-time

# pnpm
pnpm i svelte-time

# Bun
bun i svelte-time

# Yarn
yarn add svelte-time
```

## Usage

### `Time` component

The displayed time defaults to `new Date().toISOString()` and is formatted as `"MMM DD, YYYY"`.

```svelte no-eval
<script>
  import Time from "svelte-time";
</script>

<Time />
```

The `timestamp` prop can be any of the following `dayjs` values: `string | number | Date | Dayjs`.

```svelte no-eval
<Time timestamp="2020-02-01" />

<Time timestamp={new Date()} />

<Time timestamp={1e10} />
```

Use the `format` prop to format the timestamp. Refer to the [dayjs format documentation](https://day.js.org/docs/en/display/format) for acceptable formats.

```svelte no-eval
<Time timestamp="2020-02-01" format="dddd @ h:mm A · MMMM D, YYYY" />

<Time timestamp={new Date()} format="YYYY/MM/DD" />

<Time timestamp={1e10} format="ddd" />
```

### Relative time

Set the `relative` prop value to `true` for the relative time displayed in a human-readable format.

```svelte no-eval
<Time relative />

<Time relative timestamp="2021-02-02" />

<Time relative timestamp={1e10} />
```

When using relative time, the `title` attribute will display a formatted timestamp.

Use the `format` prop to customize the [format](https://day.js.org/docs/en/display/format).

```svelte no-eval
<Time relative format="dddd @ h:mm A · MMMM D, YYYY" />
```

When using `relative`, the `time` element will set the formatted timestamp as the `title` attribute. Specify a custom `title` to override this.

```svelte no-eval
<Time relative title="Custom title" />
```

Set the value to `undefined` to omit the `title` altogether.

```svelte no-eval
<Time relative title={undefined} />
```

### Live updates

Set `live` to `true` for a live updating relative timestamp. The default refresh interval is 60 seconds.

```svelte no-eval
<Time live relative />
```

To customize the interval, pass a value to `live` in milliseconds (ms).

```svelte no-eval
<!-- Update every 30 seconds -->
<Time live={30 * 1_000} relative />

<!-- Update every 10 minutes -->
<Time live={10 * 60 * 1_000} relative />
```

### `svelteTime` action

An alternative to the `Time` component is to use the `svelteTime` action to format a timestamp in a raw HTML element.

The API is the same as the `Time` component.

```svelte no-eval
<script>
  import { svelteTime } from "svelte-time";
</script>

<time use:svelteTime></time>

<time
  use:svelteTime={{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
></time>
```

#### Relative time

Set `relative` to `true` to use relative time.

```svelte no-eval
<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
  }}
></time>

<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
></time>
```

To customize or omit the `title` attribute, use the `title` prop.

```svelte no-eval
<time
  use:svelteTime={{
    relative: true,
    title: "Custom title",
    timestamp: "2021-02-02",
  }}
></time>

<time
  use:svelteTime={{
    relative: true,
    title: undefined,
    timestamp: "2021-02-02",
  }}
></time>
```

Similar to the `Time` component, the `live` prop only works with relative time.

```svelte no-eval
<time
  use:svelteTime={{
    relative: true,
    live: true,
  }}
></time>
```

Specify a custom update interval using the `live` prop.

```svelte no-eval
<time
  use:svelteTime={{
    relative: true,
    live: 30 * 1_000, // Update every 30 seconds
  }}
></time>
```

### Remove "ago" suffix

Set `withoutSuffix` to `true` to remove the "ago" suffix from relative time.

<!-- render:RelativeTimeWithSuffix -->

```svelte no-eval
<script>
  import Time, { dayjs } from "svelte-time";

  const pastDate = dayjs().subtract(2, "days").toISOString();
  const futureDate = dayjs().add(2, "days").toISOString();
</script>

<!-- Past date -->
<Time relative timestamp={pastDate} />
<!-- Output: "2 days ago" -->

<Time relative timestamp={pastDate} withoutSuffix />
<!-- Output: "2 days" -->

<!-- Future date -->
<Time relative timestamp={futureDate} />
<!-- Output: "in 2 days" -->

<Time relative timestamp={futureDate} withoutSuffix />
<!-- Output: "2 days" -->
```

This also works with the `svelteTime` action:

```svelte no-eval
<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
    withoutSuffix: true,
  }}
></time>
```

#### Locale

Use the `locale` prop to format timestamps in different languages. Make sure to import the locale from `dayjs` first.

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German locale
  import "dayjs/locale/es"; // Spanish locale
  import { svelteTime } from "svelte-time";
</script>

<time
  use:svelteTime={{
    timestamp: "2024-01-01",
    format: "dddd, MMMM D, YYYY",
    locale: "de",
  }}
></time>

<time
  use:svelteTime={{
    relative: true,
    timestamp: "2024-01-01",
    locale: "es",
  }}
></time>
```

### `dayjs` export

The `dayjs` library is exported from this package for your convenience.

**Note**: the exported `dayjs` function already extends the [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time).

```svelte no-eval
<script>
  import { dayjs } from "svelte-time";

  let timestamp = "";
</script>

<button on:click={() => (timestamp = dayjs().format("HH:mm:ss.SSSSSS"))}>
  Update {timestamp}
</button>
```

### Custom locale

The default `dayjs` locale is English. No other locale is loaded by default for performance reasons.

To use a [custom locale](https://day.js.org/docs/en/i18n/changing-locale), import the relevant language from `dayjs` and use the `locale` prop. See a list of [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale).

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import "dayjs/locale/ja"; // Japanese
  import Time from "svelte-time";
</script>

<Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" locale="de" />
<Time timestamp="2024-01-01" format="dddd, D [de] MMMM [de] YYYY" locale="es" />
<Time timestamp="2024-01-01" format="dddd D MMMM YYYY" locale="fr" />
<Time timestamp="2024-01-01" format="YYYY年M月D日(dddd)" locale="ja" />
```

The `Locales` type is exported for TypeScript usage.

```typescript
import type { Locales } from "svelte-time";

const locale: Locales = "de";
const localeStore = writable<Locales>("en");
```

The `locale` prop also works with relative time.

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import "dayjs/locale/ja"; // Japanese
  import Time from "svelte-time";
</script>

<Time relative timestamp="2024-01-01" locale="de" />
<Time relative timestamp="2024-01-01" locale="es" />
<Time relative timestamp="2024-01-01" locale="fr" />
<Time relative timestamp="2024-01-01" locale="ja" />
```

The `withoutSuffix` prop also works with locales:

<!-- render:RelativeTimeLocaleWithoutSuffix -->

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import Time from "svelte-time";
</script>

<Time relative timestamp="2024-01-01" locale="de" withoutSuffix />
<!-- Output: "2 Jahre" (German, without "vor") -->

<Time relative timestamp="2024-01-01" locale="es" withoutSuffix />
<!-- Output: "2 años" (Spanish, without "hace") -->

<Time relative timestamp="2024-01-01" locale="fr" withoutSuffix />
<!-- Output: "2 ans" (French, without "il y a") -->
```

### Reactive locale

The `locale` prop is reactive, so you can bind it to a Svelte store to update all `<Time>` instances when the locale changes.

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German
  import "dayjs/locale/es"; // Spanish
  import "dayjs/locale/fr"; // French
  import { writable } from "svelte/store";
  import Time from "svelte-time";

  const locale = writable("en");

  function setLocale(loc) {
    locale.set(loc);
  }
</script>

<button on:click={() => setLocale("en")}>English</button>
<button on:click={() => setLocale("de")}>Deutsch</button>
<button on:click={() => setLocale("es")}>Español</button>
<button on:click={() => setLocale("fr")}>Français</button>

<Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" locale={$locale} />
<Time relative timestamp="2024-01-01" locale={$locale} />
```

### Custom locale (legacy)

You can also use the [`dayjs.locale`](https://day.js.org/docs/en/i18n/changing-locale) method to set a custom locale as the default, or pass a dayjs instance with locale already applied.

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German
  import Time, { dayjs } from "svelte-time";
</script>

<Time timestamp={dayjs().locale("de")} format="dddd, MMMM D, YYYY" />
```

To set a global default locale:

```svelte no-eval
<script>
  import "dayjs/locale/de"; // German locale
  import { dayjs } from "svelte-time";

  // Set the default locale to German.
  dayjs.locale("de");
</script>
```

### Custom timezone

To use a [custom timezone](https://day.js.org/docs/en/timezone/timezone), import the `utc` and `timezone` plugins from `dayjs`.

```svelte no-eval
<script>
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  import Time, { dayjs } from "svelte-time";

  dayjs.extend(utc);
  dayjs.extend(timezone);
</script>

<Time
  timestamp={dayjs("2013-11-18 11:55:20").tz("America/Toronto")}
  format="YYYY-MM-DDTHH:mm:ss"
/>
```

### Custom timezone (global)

Use the [`dayjs.tz.setDefault`](https://day.js.org/docs/en/timezone/default-timezone) method to set a custom timezone as the default.

```svelte no-eval
<script>
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  import Time, { dayjs } from "svelte-time";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("America/New_York");
</script>
```

### User timezone

Use the [`dayjs.ts.guess`](https://day.js.org/docs/en/timezone/guessing-user-timezone) method to guess the user's timezone.

```js
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.guess(); // America/New_York
```

To retrieve the abbreviated time zone, extend the [`advancedFormat`](https://day.js.org/docs/en/plugin/advanced-format) plugin.

```diff
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
+ import advancedFormat from "dayjs/plugin/advancedFormat";

  import { dayjs } from "svelte-time";

  dayjs.extend(utc);
  dayjs.extend(timezone);
+ dayjs.extend(advancedFormat);
```

Then, use the [`dayjs().local`](https://day.js.org/docs/en/manipulate/local) method to get the user's local time zone and format it using the `"z"` advanced option.

```js
dayjs().local().format("z"); // EST
dayjs().local().format("zzz"); // Eastern Standard Time
```

## API

### Props

| Name          | Type                                                  | Default value                                                                            |
| :------------ | :---------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| timestamp     | `string` &#124; `number` &#124; `Date` &#124; `Dayjs` | `new Date().toISOString()`                                                               |
| format        | `string`                                              | `"MMM DD, YYYY"` (See [dayjs display format](https://day.js.org/docs/en/display/format)) |
| relative      | `boolean`                                             | `false`                                                                                  |
| withoutSuffix | `boolean`                                             | `false` (only applies when `relative` is `true`)                                         |
| live          | `boolean` &#124; `number`                             | `false`                                                                                  |
| locale        | `Locales` (TypeScript) &#124; `string`                | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale))    |
| formatted     | `string`                                              | `""`                                                                                     |

## Examples

- [examples/sveltekit](examples/sveltekit)
- [examples/vite](examples/vite)
- [examples/rollup](examples/rollup)
- [examples/webpack](examples/webpack)

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-time.svg?style=for-the-badge&color=%23ff3e00
[npm-url]: https://npmjs.com/package/svelte-time

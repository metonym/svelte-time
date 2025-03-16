# svelte-time

[![NPM][npm]][npm-url]

**Note:** `svelte-time@2.0.0` only supports Svelte 5 in Runes mode.

Use [svelte-time@1.0.0](https://github.com/metonym/svelte-time/tree/v1.0.0) for Svelte 3, 4, and 5 (non-Runes mode).

---

`svelte-time` is a Svelte component and action library for formatting timestamps and durations. It provides human-readable time displays with support for relative formatting (e.g., "2 hours ago"), custom formats, locales, and duration formatting, while encoding machine-parseable values in semantic HTML elements.

Under the hood, it uses [day.js](https://github.com/iamkun/dayjs), a lightweight date-time library.

```svelte
<!-- Input -->
<Time relative />

<!-- Output rendered in the DOM -->
<time title="May 15, 2022" datetime="2022-05-15T18:03:57.430Z">
  a few seconds ago
</time>
```

Try it in the [Svelte REPL](https://svelte.dev/playground/e2a27786f93d42878388de482de403c9).

---

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

<!-- render:Basic -->

```svelte
<script>
  import Time from "svelte-time";
</script>

<Time />
```

The `timestamp` prop can be any of the following `dayjs` values: `string | number | Date | Dayjs`.

<!-- render:CustomTimestamp -->

```svelte
<Time timestamp="2020-02-01" />

<Time timestamp={new Date()} />

<Time timestamp={1e10} />
```

Use the `format` prop to format the timestamp. Refer to the [dayjs format documentation](https://day.js.org/docs/en/display/format) for acceptable formats.

<!-- render:CustomFormat -->

```svelte
<Time timestamp="2020-02-01" format="dddd @ h:mm A · MMMM D, YYYY" />

<Time timestamp={new Date()} format="YYYY/MM/DD" />

<Time timestamp={1e10} format="ddd" />
```

### Relative time

Set the `relative` prop value to `true` for the relative time displayed in a human-readable format.

<!-- render:RelativeTime -->

```svelte
<Time relative />

<Time relative timestamp="2021-02-02" />

<Time relative timestamp={1e10} />
```

When using relative time, the `title` attribute will display a formatted timestamp.

Use the `format` prop to customize the [format](https://day.js.org/docs/en/display/format).

<!-- render:RelativeTimeCustomFormat -->

```svelte
<Time relative format="dddd @ h:mm A · MMMM D, YYYY" />
```

When using `relative`, the `time` element will set the formatted timestamp as the `title` attribute. Specify a custom `title` to override this.

<!-- render:RelativeTimeCustomTitle -->

```svelte
<Time relative title="Custom title" />
```

Set the value to `undefined` to omit the `title` altogether.

<!-- render:RelativeTimeNoTitle -->

```svelte
<Time relative title={undefined} />
```

### Live updates

Set `live` to `true` for a live updating relative timestamp. The default refresh interval is 60 seconds.

```svelte
<Time live relative />
```

To customize the interval, pass a value to `live` in milliseconds (ms).

```svelte
<!-- Update every 30 seconds -->
<Time live={30 * 1_000} relative />

<!-- Update every 10 minutes -->
<Time live={10 * 60 * 1_000} relative />
```

### `svelteTime` action

An alternative to the `Time` component is to use the `svelteTime` action to format a timestamp in a raw HTML element.

The API is the same as the `Time` component.

<!-- render:SvelteTimeAction -->

```svelte
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

```svelte
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

#### Locale

Use the `locale` prop to format timestamps in different languages. Make sure to import the locale from `dayjs` first.

<!-- render:ActionLocale -->

```svelte
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

To customize or omit the `title` attribute, use the `title` prop.

```svelte
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

```svelte
<time
  use:svelteTime={{
    relative: true,
    live: true,
  }}
></time>
```

Specify a custom update interval using the `live` prop.

```svelte
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

```svelte
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

```svelte
<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
    withoutSuffix: true,
  }}
></time>
```

### `Duration` component

The `Duration` component displays a duration. It uses dayjs's [duration plugin](https://day.js.org/docs/en/durations/durations).

<!-- render:DurationBasic -->

```svelte
<script>
  import { Duration } from "svelte-time";
</script>

<!-- Display 1 hour (human-readable) -->
<Duration value={3600000} humanize={true} />

<!-- Display 90 seconds (human-readable) -->
<Duration value={90} unit="seconds" humanize={true} />

<!-- Display 2 hours using dayjs Duration object (human-readable) -->
<Duration value={dayjs.duration(2, "hours")} humanize={true} />
```

By default, durations are displayed as raw milliseconds. Use `humanize={true}` for human-readable format (e.g., "2 hours", "a minute") or provide a `format` string for custom formatting.

<!-- render:DurationHumanize -->

```svelte
<script>
  import { Duration, dayjs } from "svelte-time";
</script>

<!-- Human-readable format -->
<Duration value={3600000} humanize={true} />

<!-- Custom format (e.g., "01:00:00") -->
<Duration value={3600000} format="HH:mm:ss" />

<!-- Short format (e.g., "01:30") -->
<Duration value={5400000} format="mm:ss" />
```

#### Humanize

The `humanize` prop controls how durations are displayed:

- When `humanize` is `true`, durations are displayed in a natural language format using dayjs's `humanize()` method (e.g., "an hour", "2 minutes", "a few seconds").
- When `humanize` is `false` (default) and a `format` is provided, durations are displayed using the specified format string (e.g., "01:00:00", "60:00").
- When `humanize` is `false` (default) and no `format` is provided, durations are displayed as the raw number of milliseconds.

```svelte
<!-- Human-readable -->
<Duration value={3600000} humanize={true} />
<!-- Output: "an hour" -->

<!-- Custom format -->
<Duration value={3600000} format="HH:mm:ss" />
<!-- Output: "01:00:00" -->

<!-- Raw milliseconds (when no format provided) -->
<Duration value={3600000} />
<!-- Output: "3600000" -->
```

#### Duration units

When providing a numeric `value`, specify the unit using the `unit` prop:

```svelte
<Duration value={1} unit="milliseconds" />
<Duration value={30} unit="seconds" />
<Duration value={2} unit="minutes" />
<Duration value={24} unit="hours" />
<Duration value={7} unit="days" />
<Duration value={2} unit="weeks" />
<Duration value={1} unit="months" />
<Duration value={1} unit="years" />
```

#### Custom format

Use the `format` prop to display durations in a custom format. Supported format tokens:

- `HH` - Hours (padded, e.g., "01", "12")
- `H` - Hours (unpadded, e.g., "1", "12")
- `mm` - Minutes (padded, e.g., "01", "30")
- `m` - Minutes (unpadded, e.g., "1", "30")
- `ss` - Seconds (padded, e.g., "01", "45")
- `s` - Seconds (unpadded, e.g., "1", "45")
- `SSS` - Milliseconds (padded, e.g., "001", "500")
- `S` - Milliseconds (unpadded, e.g., "1", "500")

<!-- render:DurationCustomFormat -->

```svelte
<script>
  import { Duration } from "svelte-time";
</script>

<!-- Hours:Minutes:Seconds format -->
<Duration value={3661000} format="HH:mm:ss" />
<!-- Output: "01:01:01" -->

<!-- Minutes:Seconds format (total minutes) -->
<Duration value={90000} format="mm:ss" />
<!-- Output: "01:30" -->

<!-- Hours:Minutes format -->
<Duration value={5400000} format="HH:mm" />
<!-- Output: "01:30" -->

<!-- Unpadded hours and minutes -->
<Duration value={3661000} format="H:m:s" />
<!-- Output: "1:1:1" -->

<!-- Minutes and seconds with milliseconds -->
<Duration value={125000} format="mm:ss.SSS" />
<!-- Output: "02:05.000" -->

<!-- Long duration with hours, minutes, seconds -->
<Duration value={7323000} format="HH:mm:ss" />
<!-- Output: "02:02:03" -->
```

#### Locale

Use the `locale` prop to format durations in different languages. Make sure to import the locale from `dayjs` first.

<!-- render:DurationLocale -->

```svelte
<script>
  import "dayjs/locale/de"; // German locale
  import "dayjs/locale/es"; // Spanish locale
  import { Duration } from "svelte-time";
</script>

<Duration value={3600000} humanize={true} locale="de" />
<!-- Output: "eine Stunde" -->

<Duration value={120000} humanize={true} locale="es" />
<!-- Output: "2 minutos" -->
```

#### Live updates

Set `live` to `true` for a live updating duration. The default refresh interval is 60 seconds. The `live` prop updates the display at the specified interval, but does not change the underlying `value` prop.

```svelte
<Duration value={3600000} humanize={true} live />
```

To customize the interval, pass a value to `live` in milliseconds (ms).

**Note**: The `live` prop updates the display at the specified interval, but does not change the underlying `value` prop. For countdown timers, you need to decrease the `value` prop over time.

<!-- render:DurationLive -->

```svelte
<script>
  import { Duration } from "svelte-time";

  // Countdown timer: 5 minutes (300000 milliseconds)
  // For a countdown, the value must decrease over time
  let countdown = $state(5 * 60 * 1000);

  $effect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1000; // Decrease by 1 second each interval
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<!-- Countdown timer: value decreases, live prop updates display every second -->
<Duration value={countdown} live={1000} format="mm:ss" />
```

### `svelteDuration` action

An alternative to the `Duration` component is to use the `svelteDuration` action to format a duration in a raw HTML element.

The API is the same as the `Duration` component.

```svelte
<script>
  import { svelteDuration } from "svelte-time";
</script>

<span use:svelteDuration={{ value: 3600000, humanize: true }}></span>

<span
  use:svelteDuration={{
    value: 90,
    unit: "seconds",
    format: "mm:ss",
  }}
></span>
```

#### Locale

Use the `locale` prop to format durations in different languages.

```svelte
<script>
  import "dayjs/locale/de"; // German locale
  import { svelteDuration } from "svelte-time";
</script>

<span
  use:svelteDuration={{
    value: 3600000,
    humanize: true,
    locale: "de",
  }}
></span>
```

Similar to the `Duration` component, the `live` prop works for live updates.

```svelte
<span
  use:svelteDuration={{
    value: 3600000,
    humanize: true,
    live: true,
  }}
></span>
```

### `dayjs` export

The `dayjs` library is exported from this package for your convenience.

**Note**: the exported `dayjs` function already extends the [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time) and the [duration plugin](https://day.js.org/docs/en/durations/durations).

<!-- render:DayjsExport -->

```svelte
<script>
  import { dayjs } from "svelte-time";

  let timestamp = $state("");
  let duration = $state(null);
</script>

<button onclick={() => (timestamp = dayjs().format("HH:mm:ss.SSSSSS"))}>
  Update {timestamp}
</button>

<button onclick={() => (duration = dayjs.duration(2, "hours").humanize())}>
  Duration: {duration || "Click to see 2 hours"}
</button>
```

### Custom locale

The default `dayjs` locale is English. No other locale is loaded by default for performance reasons.

To use a [custom locale](https://day.js.org/docs/en/i18n/changing-locale), import the relevant language from `dayjs` and use the `locale` prop. See a list of [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale).

<!-- render:LocaleProp -->

```svelte
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

<!-- render:RelativeTimeLocale -->

```svelte
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

```svelte
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

<!-- render:ReactiveLocale -->

```svelte
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

<Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" locale={$locale} />
<Time relative timestamp="2024-01-01" locale={$locale} />
```

### Custom locale (legacy)

You can also use the [`dayjs.locale`](https://day.js.org/docs/en/i18n/changing-locale) method to set a custom locale as the default, or pass a dayjs instance with locale already applied.

<!-- render:CustomLocale -->

```svelte
<script>
  import "dayjs/locale/de"; // German
  import Time, { dayjs } from "svelte-time";
</script>

<Time timestamp={dayjs().locale("de")} format="dddd, MMMM D, YYYY" />
```

To set a global default locale:

```svelte
<script>
  import "dayjs/locale/de"; // German locale
  import { dayjs } from "svelte-time";

  // Set the default locale to German.
  dayjs.locale("de");
</script>
```

### Custom timezone

To use a [custom timezone](https://day.js.org/docs/en/timezone/timezone), import the `utc` and `timezone` plugins from `dayjs`.

<!-- render:CustomTimezone -->

```svelte
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

```svelte
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

### `Time` component props

| Name          | Type                                                  | Default value                                                                            |
| :------------ | :---------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| timestamp     | `string` &#124; `number` &#124; `Date` &#124; `Dayjs` | `new Date().toISOString()`                                                               |
| format        | `string`                                              | `"MMM DD, YYYY"` (See [dayjs display format](https://day.js.org/docs/en/display/format)) |
| relative      | `boolean`                                             | `false`                                                                                  |
| withoutSuffix | `boolean`                                             | `false` (only applies when `relative` is `true`)                                         |
| live          | `boolean` &#124; `number`                             | `false`                                                                                  |
| locale        | `Locales` (TypeScript) &#124; `string`                | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale))    |
| formatted     | `string`                                              | `""`                                                                                     |

### `Duration` component props

| Name     | Type                                                                                                                                        | Default value                                                                         |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| value    | `number` &#124; `Duration`                                                                                                                  | `0`                                                                                   |
| unit     | `"milliseconds"` &#124; `"seconds"` &#124; `"minutes"` &#124; `"hours"` &#124; `"days"` &#124; `"weeks"` &#124; `"months"` &#124; `"years"` | `"milliseconds"`                                                                      |
| format   | `string`                                                                                                                                    | `undefined` (uses humanize format)                                                    |
| humanize | `boolean`                                                                                                                                   | `false`                                                                               |
| locale   | `Locales` (TypeScript) &#124; `string`                                                                                                      | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale)) |
| live     | `boolean` &#124; `number`                                                                                                                   | `false`                                                                               |

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

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

```svelte
<script>
  import Time from "svelte-time";
</script>

<Time />
```

The `timestamp` prop can be any of the following `dayjs` values: `string | number | Date | Dayjs`.

```svelte
<Time timestamp="2020-02-01" />

<Time timestamp={new Date()} />

<Time timestamp={1e10} />
```

Use the `format` prop to format the timestamp. Refer to the [dayjs format documentation](https://day.js.org/docs/en/display/format) for acceptable formats.

```svelte
<Time timestamp="2020-02-01" format="dddd @ h:mm A · MMMM D, YYYY" />

<Time timestamp={new Date()} format="YYYY/MM/DD" />

<Time timestamp={1e10} format="ddd" />
```

### Relative time

Set the `relative` prop value to `true` for the relative time displayed in a human-readable format.

```svelte
<Time relative />

<Time relative timestamp="2021-02-02" />

<Time relative timestamp={1e10} />
```

When using relative time, the `title` attribute will display a formatted timestamp.

Use the `format` prop to customize the [format](https://day.js.org/docs/en/display/format).

```svelte
<Time relative format="dddd @ h:mm A · MMMM D, YYYY" />
```

When using `relative`, the `time` element will set the formatted timestamp as the `title` attribute. Specify a custom `title` to override this.

```svelte
<Time relative title="Custom title" />
```

Set the value to `undefined` to omit the `title` altogether.

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

```svelte
<script>
  import { svelteTime } from "svelte-time";
</script>

<time use:svelteTime />

<time
  use:svelteTime={{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
/>
```

#### Relative time

Set `relative` to `true` to use relative time.

```svelte
<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
  }}
/>

<time
  use:svelteTime={{
    relative: true,
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}
/>
```

To customize or omit the `title` attribute, use the `title` prop.

```svelte
<time
  use:svelteTime={{
    relative: true,
    title: "Custom title",
    timestamp: "2021-02-02",
  }}
/>

<time
  use:svelteTime={{
    relative: true,
    title: undefined,
    timestamp: "2021-02-02",
  }}
/>
```

Similar to the `Time` component, the `live` prop only works with relative time.

```svelte
<time
  use:svelteTime={{
    relative: true,
    live: true,
  }}
/>
```

Specify a custom update interval using the `live` prop.

```svelte
<time
  use:svelteTime={{
    relative: true,
    live: 30 * 1_000, // Update every 30 seconds
  }}
/>
```

### `dayjs` export

The `dayjs` library is exported from this package for your convenience.

**Note**: the exported `dayjs` function already extends the [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time).

```svelte
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

To use a [custome locale](https://day.js.org/docs/en/i18n/changing-locale), import the relevant language from `dayjs`. See a list of [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale).

```svelte
<script>
  import "dayjs/locale/de"; // German locale
  import Time, { dayjs } from "svelte-time";
</script>

<Time timestamp={dayjs().locale("de")} />
```

### Custom locale (global)

Use the [`dayjs.locale`](https://day.js.org/docs/en/i18n/changing-locale) method to set a custom locale as the default.

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

| Name      | Type                                                  | Default value                                                                            |
| :-------- | :---------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| timestamp | `string` &#124; `number` &#124; `Date` &#124; `Dayjs` | `new Date().toISOString()`                                                               |
| format    | `string`                                              | `"MMM DD, YYYY"` (See [dayjs display format](https://day.js.org/docs/en/display/format)) |
| relative  | `boolean`                                             | `false`                                                                                  |
| live      | `boolean` &#124; `number`                             | `false`                                                                                  |
| formatted | `string`                                              | `""`                                                                                     |

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

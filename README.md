# svelte-time

[![NPM][npm]][npm-url]

<!-- REPO_URL -->

> Svelte component and action to format a timestamp using [day.js](https://github.com/iamkun/dayjs)

This utility wraps the date-time library [day.js](https://github.com/iamkun/dayjs) as a declarative Svelte component and action.

**Use cases**

- format a timestamp using the semantic `time` element
- display a human-readable, relative time (e.g., "4 days ago") while preserving the original timestamp

Sample output:

<!-- prettier-ignore-start -->
```html
<time title="May 15, 2022" datetime="2022-05-15T18:03:57.430Z">
  a few seconds ago
</time>
```
<!-- prettier-ignore-end -->

Try it in the [Svelte REPL](https://svelte.dev/repl/00b3877edb80425b96bb41fb18059882).

---

<!-- TOC -->

## Installation

```bash
# Yarn
yarn add -D svelte-time

# npm
npm i -D svelte-time

# pnpm
pnpm i -D svelte-time
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

### Live updates

Set `live` to `true` for a live updating relative timestamp. The default refresh interval is 60 seconds.

```svelte
<Time live relative />
```

To customize the interval, pass a value to `live` in milliseconds (ms).

```svelte
<!-- Update every 30 seconds -->
<Time live={30 * 1000} relative />

<!-- Update every 10 minutes -->
<Time live={10 * 60 * 1000} relative />
```

### `svelteTime` action

Use the `svelteTime` action to format a timestamp in a raw HTML element.

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
    live: 30 * 1_000, // update every 30 seconds
  }}
/>
```

### Custom locale

Load a custom locale and set it as the default locale using the [dayjs.locale API](https://day.js.org/docs/en/i18n/changing-locale).

```svelte
<script context="module">
  import "dayjs/esm/locale/de";
  import dayjs from "dayjs/esm";

  dayjs.locale("de"); // German locale
</script>

<script>
  import Time from "svelte-time";
</script>

<Time />
```

### `dayjs` export

`dayjs` is re-exported for your convenience. This is useful when the component and action would not work for programmatic usage, like setting the document title.

**Note:** the exported `dayjs` function already extends the [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time).

```svelte
<script>
  import { dayjs } from "svelte-time";
</script>

<button on:click={() => (document.title = dayjs().format("MMM DD, YYYY"))}> Set title </button>
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

The [examples folder](examples/) contains sample set-ups.

- [examples/sveltekit](examples/sveltekit)
- [examples/vite](examples/vite)
- [examples/sapper](examples/sapper)
- [examples/snowpack](examples/snowpack)
- [examples/rollup](examples/rollup)
- [examples/webpack](examples/webpack)

## TypeScript

Svelte version 3.31 or greater is required to use this component with TypeScript.

TypeScript definitions are located in the [types folder](./types).

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-time.svg?style=for-the-badge&color=%23ff3e00
[npm-url]: https://npmjs.com/package/svelte-time

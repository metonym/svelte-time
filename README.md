# svelte-time

[![NPM][npm]][npm-url]

<!-- REPO_URL -->

> Svelte component and action to format a timestamp using [day.js](https://github.com/iamkun/dayjs)

This utility wraps the date-time library [day.js](https://github.com/iamkun/dayjs) in a declarative Svelte component and action.

**Use cases**

- display a formatted timestamp within the semantic `time` element
- display the relative time in a human-readable format (e.g., "4 days ago")

---

<!-- TOC -->

## Install

```bash
yarn add -D svelte-time
# OR
npm i -D svelte-time
```

## Usage

### Time component

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

<Time timestamp="{new Date()}" />

<Time timestamp="{1e10}" />

```

Use the `format` prop to format the timestamp. Refer to the [dayjs format documentation](https://day.js.org/docs/en/display/format) for a list of available formats.

```svelte
<Time timestamp="2020-02-01" format="dddd @ h:mm A · MMMM D, YYYY" />

<Time timestamp="{new Date()}" format="YYYY/MM/DD" />

<Time timestamp="{1e10}" format="ddd" />

```

### Relative time

Set the `relative` prop value to `true` for the relative time displayed in a human-readable format.

```svelte
<Time relative />

<Time relative timestamp="2021-02-02" />

<Time relative timestamp="{1e10}" />

```

### svelteTime action

Use the `svelteTime` action to format a timestamp in a raw HTML element.

<!-- prettier-ignore-start -->
```svelte
<script>
  import { svelteTime } from "svelte-time";
</script>

<time use:svelteTime />

<time
  use:svelteTime="{{
    timestamp: "2021-02-02",
    format: "dddd @ h:mm A · MMMM D, YYYY",
  }}"
/>

<time
  use:svelteTime="{{
    relative: true,
    timestamp: "2021-02-02",
  }}"
/>

```
<!-- prettier-ignore-end -->

## API

### Props

| Prop name | Value                                                                                                           |
| :-------- | :-------------------------------------------------------------------------------------------------------------- |
| timestamp | `string` &#124; `number` &#124; `Date` &#124; `Dayjs` (default: `new Date().toISOString()`)                     |
| format    | `string` (default `"MMM DD, YYYY"`) See [dayjs format documentation](https://day.js.org/docs/en/display/format) |
| relative  | `boolean` (default: `false`)                                                                                    |
| formatted | `string` (default `""`)                                                                                         |

## TypeScript

Svelte version 3.31 or greater is required to use this component with TypeScript.

## Changelog

[CHANGELOG.md](CHANGELOG.md)

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/svelte-time.svg?style=for-the-badge&color=%23ff3e00
[npm-url]: https://npmjs.com/package/svelte-time

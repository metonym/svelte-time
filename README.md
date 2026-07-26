# svelte-time

[![NPM][npm]][npm-url]

**Note:** `svelte-time@2` requires Svelte 5, since its internals use runes. The consuming app does not need to enable runes mode itself, since runes are opt-in per component.

Use [svelte-time@1.0.0](https://github.com/metonym/svelte-time/tree/v1.0.0) for Svelte 3, 4, and 5 (non-Runes mode).

---

## About

`svelte-time` is a Svelte component and action library for formatting timestamps and durations, encoding the machine-parseable value in the semantic `time` element.

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

It offers three interchangeable primitives, all backed by the same shared timer logic.

| Primitive                      | Export       | Use it when...                                                                                                                            |
| :----------------------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| [Component](#time-component)   | `Time`       | you want a declarative element with a `timestamp` prop, and full SSR support                                                              |
| [Action](#sveltetime-action)   | `svelteTime` | you want `use:svelteTime` on a plain element, no extra markup, and don't need the shared adaptive timer                                   |
| [Attachment](#time-attachment) | `time`       | you want the `@attach`-based alternative to the action, with reactive options and the same shared, adaptive timer as the `Time` component |

The [`dayjs`](#dayjs-export) re-export is also available as a convenience utility, not a rendering primitive.

### Compatibility

| Package version                                           | Svelte version                                    | Notes                                                                   |
| :-------------------------------------------------------- | :------------------------------------------------ | :---------------------------------------------------------------------- |
| [1.x](https://github.com/metonym/svelte-time/tree/v1.0.0) | 3, 4, 5 (non-runes)                               | Uses `export let` and legacy reactivity                                 |
| 2.x                                                       | 5+ (component, action); 5.29+ (`time` attachment) | Internals use runes; the consuming app does not need runes mode enabled |

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

The `timestamp` prop can be any of the following `dayjs` values: `string | number | Date | Dayjs`. String timestamps are written to `datetime` as-is; `Date`/`Dayjs`/`number` inputs are normalized to ISO 8601; invalid inputs omit the attribute.

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

Set `relative` to `true` to display the time relative to now (e.g. "4 days ago").

<!-- render:RelativeTime -->

```svelte
<Time relative />

<Time relative timestamp="2021-02-02" />

<Time relative timestamp={1e10} />
```

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

Pass `title={undefined}` to omit the attribute.

<!-- render:RelativeTimeNoTitle -->

```svelte
<Time relative title={undefined} />
```

### Custom markup

Pass a `children` snippet to render custom markup instead of the plain formatted text. The snippet receives the formatted value as its argument, and the component still owns the `<time>` element, `title`, and `datetime` handling.

<!-- render:CustomMarkup -->

```svelte
<Time relative timestamp={post.createdAt}>
  {#snippet children(formatted)}
    <strong>{formatted}</strong>
  {/snippet}
</Time>
```

### Live updates

Set `live` to `true` for a live updating relative timestamp. Updates follow an adaptive schedule based on the timestamp's age. See [Performance](#performance) for the full schedule and how the underlying timer works.

```svelte
<Time live relative />
```

To force a fixed interval instead, pass a value to `live` in milliseconds (ms).

```svelte
<!-- Update every 30 seconds -->
<Time live={30 * 1_000} relative />

<!-- Update every 10 minutes -->
<Time live={10 * 60 * 1_000} relative />
```

### Auto-switch to absolute format

Set `relativeThreshold` (age in ms) to switch from `relative` to the absolute `format` once a timestamp gets old enough. Only takes effect while `relative` is `true`. Combined with `live`, the switch happens automatically as time passes; without `live`, `relativeThreshold` only affects the value computed at render time.

<!-- render:RelativeThreshold -->

```svelte
<!-- Shows "a minute ago", flips to "4:40 am" after 2 hours -->
<Time relative live format="h:mm a" relativeThreshold={2 * 60 * 60 * 1000} />
```

### Performance

Designed to render thousands of live timestamps without measurable overhead.

- **One timer, not n timers.** All `Time` components and `time` attachments sharing a live-update interval subscribe to a single shared clock; a feed with 1,000 live timestamps on the same tier schedules one `setInterval`, not 1,000. Timers start when the first live consumer mounts and stop when the last unmounts, so an idle page runs zero timers.
- **Adaptive refresh.** `live={true}` updates on a schedule keyed to the timestamp's age: every 10s while under a minute old, 30s while under an hour old, 5 minutes while under a day old, and hourly beyond that, migrating tiers as the timestamp ages. Fresh timestamps are at most ~10 seconds stale; day-old ones update 60× less often than fixed 60-second polling. Pass a numeric `live` to force a fixed interval instead.
- **Background tabs.** Browsers throttle timers in hidden tabs; the shared clock refreshes immediately when the tab becomes visible again, so returning users never see stale text.
- **Cheap updates.** Each component parses its timestamp once per update (the resulting `dayjs` instance is shared by the formatted text and the `title`), and the `svelteTime` action and `time` attachment write updates via `textContent`, avoiding layout-forcing DOM APIs on the tick path.

The `svelteTime` action's `live` option is the exception: it's a simpler, per-node `setInterval` (fixed 60 seconds by default, or a custom interval in ms) that does not share a timer across nodes and does not use the adaptive schedule above. Prefer the `Time` component or the `time` attachment on pages with many live timestamps.

### SSR and SvelteKit

The `Time` component fully renders on the server: text, `title`, and `datetime` are all present in the HTML payload, and no timers are started during SSR (including with `live`).

The `svelteTime` action and the `time` attachment both render an empty `<time>` element until hydration, since neither actions nor attachments run on the server. Prefer the `Time` component over either one when SSR content matters (SEO, no-JS, avoiding a content flash).

Pass an explicit `timestamp` under SSR: the default (`new Date().toISOString()`) is re-evaluated on the client during hydration, so the server- and client-rendered values can differ, and relative text can cross a threshold (e.g. "a few seconds ago" → "a minute ago") between render and hydration.

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

Use `relativeThreshold` to switch to the absolute `format` once the timestamp's age (ms) meets or exceeds it.

```svelte
<time
  use:svelteTime={{
    relative: true,
    live: true,
    format: "h:mm a",
    relativeThreshold: 2 * 60 * 60 * 1_000, // 2 hours
  }}
></time>
```

### `time` attachment

[Attachments](https://svelte.dev/docs/svelte/@attach) (the `@attach` directive, Svelte 5.29+) are the successor to actions. The `time` attachment is an alternative to the `svelteTime` action with fully reactive options: it re-runs whenever any reactive value used to build its options changes, including options built inline in the template. In `live` mode, it shares the same global timer as the `Time` component instead of owning a `setInterval` per element.

<!-- render:TimeAttachment -->

```svelte
<script>
  import { time } from "svelte-time";
</script>

<time {@attach time({ timestamp: "2021-02-02", format: "YYYY-MM-DD" })}></time>
```

Because options are reactive, an inline options object built from `$state` updates the element automatically, with no `update()` contract required:

<!-- render:TimeAttachmentReactive -->

```svelte
<script lang="ts">
  import { time } from "svelte-time";

  let timestamp = $state("2021-02-02");
</script>

<time {@attach time({ timestamp, format: "YYYY-MM-DD" })}></time>
<button onclick={() => (timestamp = "2021-02-03")}>Update</button>
```

The `@attach` directive requires Svelte 5.29+ to use. The `svelteTime` action remains fully supported.

`relativeThreshold` works the same way as the `Time` component and `svelteTime` action:

```svelte
<time
  {@attach time({
    relative: true,
    live: true,
    format: "h:mm a",
    relativeThreshold: 2 * 60 * 60 * 1_000, // 2 hours
  })}
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

### Compact relative time

Set `relativeStyle` to `"micro"` to render relative time as a compact single unit (e.g. `"4d"`) instead of the humanized string (e.g. `"4 days ago"`), which is handy for dense UIs like comment lists and notification feeds. Only applies when `relative` is `true`. Output uses fixed English unit letters (`y`/`mo`/`d`/`h`/`m`/`s`) regardless of the `locale` prop, since dayjs's `relativeTime` locale tables have no single-letter forms to draw from.

<!-- render:RelativeStyleMicro -->

```svelte
<Time relative timestamp={pastDate} />
<!-- Output: "4 days ago" -->

<Time relative relativeStyle="micro" timestamp={pastDate} />
<!-- Output: "4d" instead of "4 days ago" -->
```

This also works with the `svelteTime` action and the `time` attachment:

```svelte
<time
  use:svelteTime={{
    relative: true,
    timestamp: pastDate,
    relativeStyle: "micro",
  }}
></time>

<time
  {@attach time({
    relative: true,
    timestamp: pastDate,
    relativeStyle: "micro",
  })}
></time>
```

### `dayjs` export

The `dayjs` library is exported from this package for your convenience.

**Note**: the exported `dayjs` function already extends the [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time) and the [duration plugin](https://day.js.org/docs/en/durations/durations).

<!-- render:DayjsExport -->

```svelte
<script>
  import { dayjs } from "svelte-time";

  let timestamp = $state("");
</script>

<button onclick={() => (timestamp = dayjs().format("HH:mm:ss.SSSSSS"))}>
  Update {timestamp}
</button>
```

## Internationalization

The default `dayjs` locale is English. No other locale is loaded by default for performance reasons: import each locale you need from `dayjs` once, then reference it by key. See the list of [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale).

### Component usage

Import the relevant language from `dayjs` and use the `locale` prop.

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

The `Locales` type is exported for TypeScript usage, along with `TimeProps`,
`SvelteTimeOptions`, and `RelativeStyle` for typing component wrappers and action options.

```typescript
import type {
  Locales,
  TimeProps,
  SvelteTimeOptions,
  RelativeStyle,
} from "svelte-time";

const exampleLocale: Locales = "de";
let locale = $state<Locales>("de");
let style: RelativeStyle = $state("default");
```

### Action usage

Use the `locale` option to format timestamps in different languages with the `svelteTime` action.

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

### Relative time and `withoutSuffix`

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

The `locale` prop is reactive, so binding it to a `$state` variable updates all `<Time>` instances when the locale changes.

<!-- render:ReactiveLocale -->

```svelte
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

<Time timestamp="2024-01-01" format="dddd, MMMM D, YYYY" {locale} />
<Time relative timestamp="2024-01-01" {locale} />
```

### Legacy locale (dayjs instance / global default)

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

### tz prop

Pass a `tz` prop to render a timestamp in a given [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) without pre-building a `dayjs.tz(...)` value yourself. This requires the `utc` and `timezone` plugins from `dayjs` to be extended; if they're missing, `tz` throws a clear error instead of failing silently.

<!-- render:TzProp -->

```svelte
<script>
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";
  import Time, { dayjs } from "svelte-time";

  dayjs.extend(utc);
  dayjs.extend(timezone);
</script>

<Time
  timestamp="2013-11-18T11:55:20Z"
  tz="America/Toronto"
  format="YYYY-MM-DDTHH:mm:ss"
/>
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

> **Note:** `dayjs.tz.setDefault(...)` only affects values built with `dayjs.tz(...)`; it does
> not change what `<Time>` renders by itself. Use the `tz` prop (above) for the common case, or
> pass a `dayjs.tz(value)` result as the `timestamp` prop explicitly if you're relying on a
> global default.

### User timezone

Use the [`dayjs.tz.guess`](https://day.js.org/docs/en/timezone/guessing-user-timezone) method to guess the user's timezone.

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

## Duration

`svelte-time` also ships a `Duration` component (plus a `svelteDuration` action and a `duration` attachment) for formatting a span of time — e.g. a video length or a stopwatch — as opposed to `Time`, which formats a point in time. For counting up from an instant with built-in pause/resume, see the dedicated [`Stopwatch` component](#stopwatch-component); for counting down to a future instant, see the dedicated [`Countdown` component](#countdown-component). For a span between two fixed endpoints — e.g. an event's start/end — see the dedicated [`TimeRange` component](#timerange-component).

### `Duration` component

`value` accepts a plain number (paired with `unit`), an ISO 8601 duration string (e.g. `"PT1H30M"`), a plain object of unit fields, or a dayjs `Duration` instance. The default `format` is `"HH:mm:ss"`.

<!-- render:DurationBasic -->

```svelte
<script>
  import { Duration } from "svelte-time";
</script>

<!-- Default format: "HH:mm:ss" -->
<Duration value={3661000} />
<!-- Output: "01:01:01" -->

<!-- unit converts a plain number before formatting -->
<Duration value={90} unit="seconds" format="mm:ss" />
<!-- Output: "01:30" -->
```

Unlike dayjs's own `duration.format()`, which drops any magnitude above the units present in the template, `format` rolls that magnitude into the largest unit that _is_ present — handy for players/timers that hide hours until they're needed:

```svelte
<Duration value={5400000} format="mm:ss" />
<!-- Output: "90:00", not "30:00" -->
```

### Humanize

Set `humanize` to `true` to render the duration as a natural-language string (using dayjs's `duration.humanize()`) instead of `format`. Set `withSuffix` to `true` to include a relative suffix (e.g. "in an hour" / "an hour ago") — off by default, since a plain span (a video length, a meeting duration) isn't inherently relative to now.

<!-- render:DurationHumanize -->

```svelte
<script>
  import { Duration } from "svelte-time";
</script>

<Duration value={3600000} humanize />
<!-- Output: "an hour" -->

<Duration value={3600000} humanize withSuffix />
<!-- Output: "in an hour" -->
```

### Locale

Use the `locale` prop to format durations in different languages. Make sure to import the locale from `dayjs` first.

<!-- render:DurationLocale -->

```svelte
<script>
  import "dayjs/locale/de";
  import { Duration } from "svelte-time";
</script>

<Duration value={3600000} humanize locale="de" />
<!-- Output: "eine Stunde" -->
```

### Live elapsed duration (stopwatch)

Pass a `since` timestamp instead of `value` to display the elapsed time since that instant — `since` and `live` turn `Duration` into a stopwatch, ticking at an adaptive interval (the same shared clock the `Time` component's `relative live` mode uses). `value`/`unit` are ignored when `since` is set.

<!-- render:DurationSince -->

```svelte
<script>
  import { Duration } from "svelte-time";

  const since = new Date().toISOString();
</script>

<Duration {since} live format="HH:mm:ss" />
```

Pass a number to `live` for a fixed interval instead of the adaptive default:

```svelte
<Duration since={startedAt} live={1000} format="HH:mm:ss" />
```

This mode is a passive readout of `now - since`: pausing requires manually recomputing `since` on every resume to exclude the paused interval. For a stopwatch with built-in pause/resume bookkeeping, see the dedicated [`Stopwatch` component](#stopwatch-component).

### `svelteDuration` action

An alternative to the `Duration` component is the `svelteDuration` action, for formatting a duration on a raw HTML element. The API is the same as the `Duration` component.

<!-- render:SvelteDurationAction -->

```svelte
<script>
  import { svelteDuration } from "svelte-time";
</script>

<time use:svelteDuration={{ value: 3661000 }}></time>
```

### `duration` attachment

The `duration` attachment is the [attachment](#time-attachment) equivalent of `svelteDuration`, with the same fully-reactive behavior as the `time` attachment.

<!-- render:DurationAttachmentExample -->

```svelte
<script>
  import { duration } from "svelte-time";
</script>

<time {@attach duration({ value: 3661000 })}></time>
```

### `Stopwatch` component

`Stopwatch` counts up from a `since` instant, with a `running` prop for built-in pause/resume — unlike `Duration`'s `since`/`live` mode, which is a passive readout of `now - since` and requires the caller to manually recompute `since` on every resume to exclude the paused interval, `Stopwatch` owns that bookkeeping internally: pausing freezes the displayed value, and resuming excludes the paused interval from the elapsed count. `since` defaults to the instant the component mounts; changing it later resets the stopwatch to zero and restarts it from the new anchor.

<!-- render:StopwatchBasic -->

```svelte
<script>
  import { Stopwatch } from "svelte-time";

  let since = $state(new Date());
</script>

<!-- Ticks live by default, once per second -->
<Stopwatch {since} />

<!-- Changing `since` restarts the stopwatch -->
<button onclick={() => (since = new Date())}>Restart</button>
```

Pause and resume with the `running` prop; the `children` snippet receives the current `running` state alongside the formatted value:

<!-- render:StopwatchPause -->

```svelte
<script>
  import { Stopwatch } from "svelte-time";

  const since = new Date();
  let running = $state(true);
</script>

<Stopwatch {since} {running}>
  {#snippet children(formatted, isRunning)}
    {formatted}
    {isRunning ? "(running)" : "(paused)"}
  {/snippet}
</Stopwatch>

<button onclick={() => (running = !running)}>
  {running ? "Pause" : "Resume"}
</button>
```

### `svelteStopwatch` action

An alternative to the `Stopwatch` component is the `svelteStopwatch` action, for counting up on a raw HTML element. The API is the same as the `Stopwatch` component.

```svelte
<script>
  import { svelteStopwatch } from "svelte-time";

  let running = $state(true);
</script>

<time use:svelteStopwatch={{ since: new Date(), running }}></time>
```

### `stopwatch` attachment

The `stopwatch` attachment is the [attachment](#time-attachment) equivalent of `svelteStopwatch`, with the same fully-reactive behavior as the `time`, `duration`, and `countdown` attachments.

```svelte
<script>
  import { stopwatch } from "svelte-time";

  let running = $state(true);
</script>

<time {@attach stopwatch({ since: new Date(), running })}></time>
```

### `Countdown` component

`Countdown` counts down to a future instant — the mirror image of `Stopwatch`'s pausable count-up. Pass a `to` timestamp (a point in time that hasn't happened yet — a `Date`, ISO string, or anything dayjs accepts); the displayed value is `to - now`, clamped at zero. Unlike `Duration`, `live` defaults to `true` and ticks every second (rather than the coarser adaptive schedule used for slowly-decaying "x minutes ago" text), since a countdown's final seconds are the ones that matter most. Changing `to` to a new instant restarts the countdown.

<!-- render:CountdownBasic -->

```svelte
<script>
  import { Countdown } from "svelte-time";

  let to = $state(new Date(Date.now() + 20_000));
</script>

<!-- Ticks live by default, once per second -->
<Countdown {to} />

<!-- format hides hours until they're needed -->
<Countdown {to} format="mm:ss" />

<!-- Changing `to` restarts the countdown -->
<button onclick={() => (to = new Date(Date.now() + 20_000))}>Reset</button>
```

### `oncomplete` and the `done` flag

`oncomplete` fires once, when the countdown reaches `to` (immediately, if `to` is already in the past; again, if `to` is later changed to another already-elapsed instant). The `children` snippet receives a `done` boolean alongside the formatted value, so you can swap in different markup once the countdown finishes without a separate `$effect`.

<!-- render:CountdownOnComplete -->

```svelte
<script>
  import { Countdown } from "svelte-time";

  let to = $state(new Date(Date.now() + 5000));
</script>

<Countdown {to} oncomplete={() => console.log("done!")}>
  {#snippet children(formatted, done)}
    {done ? "Done!" : formatted}
  {/snippet}
</Countdown>
```

### `svelteCountdown` action

An alternative to the `Countdown` component is the `svelteCountdown` action, for counting down on a raw HTML element. The API is the same as the `Countdown` component.

```svelte
<script>
  import { svelteCountdown } from "svelte-time";

  const to = new Date(Date.now() + 20_000);
</script>

<time use:svelteCountdown={{ to, oncomplete: () => console.log("done!") }}></time>
```

### `countdown` attachment

The `countdown` attachment is the [attachment](#time-attachment) equivalent of `svelteCountdown`, with the same fully-reactive behavior as the `time` and `duration` attachments.

```svelte
<script>
  import { countdown } from "svelte-time";

  const to = new Date(Date.now() + 20_000);
</script>

<time {@attach countdown({ to, oncomplete: () => console.log("done!") })}></time>
```

## Time Range

`TimeRange` formats a span between two fixed instants — an event's start/end, a meeting window — as opposed to `Duration`, whose endpoints are open-ended. HTML's `datetime` attribute can only hold a single machine-readable value, so it can't represent a range: `TimeRange` renders **two** `<time>` elements, one per endpoint, each with its own correct `datetime`, joined by a separator.

### `TimeRange` component

`format` (dayjs `.format()` tokens, same default as `Time`) applies independently to `start` and `end` — this is a v1 simplification, not a "smart" range formatter that dedupes a shared year/month (see [API](#api) for the full props list).

<!-- render:TimeRangeBasic -->

```svelte
<script>
  import { TimeRange } from "svelte-time";
</script>

<!-- An event's start/end -->
<TimeRange
  start="2024-06-05"
  end="2024-06-10"
/>
<!-- Output: "Jun 05, 2024 – Jun 10, 2024" -->
```

For a "live"/relative range (e.g. "3 days" as the humanized span between the endpoints), compose `Duration` instead:

```svelte
<Duration value={dayjs(end).diff(start)} humanize />
```

### Meeting window

`format` isn't limited to dates — pass a time-only format (and a custom `separator`) for a same-day window.

<!-- render:TimeRangeMeeting -->

```svelte
<script>
  import { TimeRange } from "svelte-time";
</script>

<!-- A same-day meeting window -->
<TimeRange
  start="2024-06-05T08:00:00"
  end="2024-06-05T10:00:00"
  format="h:mm A"
/>
<!-- Output: "8:00 AM – 10:00 AM" -->
```

### Locale

Use the `locale` prop to format both endpoints in different languages. Make sure to import the locale from `dayjs` first.

<!-- render:TimeRangeLocale -->

```svelte
<script>
  import "dayjs/locale/de";
  import { TimeRange } from "svelte-time";
</script>

<TimeRange
  start="2024-06-05"
  end="2024-06-10"
  format="D. MMMM"
  locale="de"
/>
<!-- Output: "5. Juni – 10. Juni" -->
```

### Custom markup

Pass a `children` snippet to fully replace the default output — unlike `Time`/`Duration`'s `children`, which only swaps the inner text of a single element, `TimeRange`'s snippet owns both `<time>` elements and the separator, since `format` alone can't express a "condensed" range (e.g. a shared date shown once, with only the time repeated on each side). Format each side independently with `dayjs` inside the snippet to get that.

<!-- render:TimeRangeCustomMarkup -->

```svelte
<script>
  import { dayjs, TimeRange } from "svelte-time";

  const start = "2024-06-05T08:00:00";
  const end = "2024-06-05T10:00:00";
</script>

<!-- Condensed: date once, time on each side -->
<TimeRange {start} {end}>
  {#snippet children({ startDatetime, endDatetime })}
    <time datetime={startDatetime}>{dayjs(start).format("MMM D, h:mm A")}</time>
    –
    <time datetime={endDatetime}>{dayjs(end).format("h:mm A")}</time>
  {/snippet}
</TimeRange>
<!-- Output: "Jun 5, 8:00 AM – 10:00 AM" -->
```

### `svelteTimeRange` action

An alternative to the `TimeRange` component is the `svelteTimeRange` action. Since an action attaches to a single DOM node but a range needs two `<time>` elements, `svelteTimeRange` is used on a wrapper element, which it populates with the two `<time>` children and the separator.

```svelte
<script>
  import { svelteTimeRange } from "svelte-time";
</script>

<span use:svelteTimeRange={{ start: "2024-06-05", end: "2024-06-10" }}></span>
```

### `timeRange` attachment

The `timeRange` attachment is the [attachment](#time-attachment) equivalent of `svelteTimeRange`, with the same reactive options, used on a wrapper element in the same way.

```svelte
<script>
  import { timeRange } from "svelte-time";
</script>

<span {@attach timeRange({ start: "2024-06-05", end: "2024-06-10" })}></span>
```

## Utilities

The formatting logic and shared clock behind `<Time>` and `svelteTime` are also available as standalone primitives, for use outside a `<time>` element — an `aria-label`, `document.title`, a toast, server code.

```svelte
<script>
  import { now, relativeTime } from "svelte-time";

  // Re-derives every 30s from the shared timer — no timer of its own.
  const label = $derived(relativeTime(post.createdAt, { from: now(30_000) }));
</script>

<button aria-label="Posted {label}">…</button>
```

### `now(intervalMs?)`

Reactive current time backed by the shared ticker. When read inside an effect or derived, the caller re-runs every `intervalMs` (default `60_000`); all readers of the same interval share one timer. Returns a fresh, non-reactive value on the server.

### `formatTime(timestamp, options?)`

Formats a timestamp as a string with byte-identical output to the `<Time>` component's `format` prop — same defaults, same locale fallback.

### `relativeTime(timestamp, options?)`

Formats a relative time string with byte-identical output to the `<Time>` component's `relative` prop. Pass `from` to set the reference point — use `now(...)` for a result that stays live.

## `svelte-time/intl` (zero-dependency alternative)

A zero-dependency alternative built on the browser/runtime's native `Intl` APIs instead of dayjs — no external package, no locale files to import, no plugins. It ships alongside (not instead of) the dayjs-based `Time`/`Duration`/`Countdown` primitives above.

> **Trade-off:** this is a formatting-only layer, not a drop-in dayjs replacement. It cannot parse arbitrary date strings, cannot do date arithmetic (`add`/`diff`/`startOf`, etc.), and has no custom token format strings (`"MMM DD, YYYY"`) — it only formats a `Date`/timestamp you already have, using `Intl.DateTimeFormatOptions` fields or `dateStyle`/`timeStyle` presets instead. It also depends on `Intl.DurationFormat`, the newest of the three `Intl` APIs it uses (Baseline since March 2025 — meaningfully less battle-tested than `DateTimeFormat`/`RelativeTimeFormat`, which have been widely available since 2020). See the [full comparison](#svelte-time-vs-svelte-timeintl) below before reaching for this over the dayjs-based package.

`Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, and `Intl.DurationFormat` are all Baseline widely available in modern browsers, Node, Bun, and Deno — so this subpackage adds zero bytes to your bundle beyond what the platform already ships. Import it from `svelte-time/intl` instead of `svelte-time`.

```bash
# Same install as above — svelte-time/intl is a subpath of the same package
npm i svelte-time
```

It mirrors the same primitives as the main package (component, action, attachment) for `Time`, `TimeRange`, `Stopwatch`, and `Countdown` — there's no intl counterpart to `Duration` since `formatDuration` (below) already covers fixed-span formatting without a component wrapper.

| Primitive  | Export            | Notes                                                          |
| :--------- | :---------------- | :---------------------------------------------------------------- |
| Component  | `Time`            | same shape as the main `Time` component                          |
| Component  | `TimeRange`       | renders a single condensed range via `formatRange` (see below)   |
| Component  | `Stopwatch`       | same shape as the main `Stopwatch` component                     |
| Component  | `Countdown`       | same shape as the main `Countdown` component                     |
| Action     | `svelteTime`      | same shape as the main `svelteTime` action                        |
| Action     | `svelteTimeRange` | same shape as the main `svelteTimeRange` action                  |
| Action     | `svelteStopwatch` | same shape as the main `svelteStopwatch` action                  |
| Action     | `svelteCountdown` | same shape as the main `svelteCountdown` action                  |
| Attachment | `time`            | same shape as the main `time` attachment                         |
| Attachment | `timeRange`       | attachment version of `TimeRange`                                 |
| Attachment | `stopwatch`       | attachment version of `Stopwatch`                                 |
| Attachment | `countdown`       | attachment version of `Countdown`                                 |

### `Time` component

`options` is a plain [`Intl.DateTimeFormatOptions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) object instead of a dayjs token string. The default is `dateStyle: "medium"`.

<!-- render:IntlBasic -->

```svelte
<script>
  import { Time } from "svelte-time/intl";
</script>

<Time />
```

<!-- render:IntlCustomOptions -->

```svelte
<Time
  timestamp="2020-02-01"
  options={{ weekday: "long", year: "numeric", month: "short", day: "numeric" }}
/>

<Time timestamp={new Date()} options={{ year: "numeric", month: "2-digit", day: "2-digit" }} />
```

### `dateStyle` / `timeStyle` presets

`Intl.DateTimeFormat`'s built-in style presets (`"short"`, `"medium"`, `"long"`, `"full"`) are a locale-aware alternative to hand-writing a token string.

<!-- render:IntlDateStyle -->

```svelte
<Time {timestamp} options={{ dateStyle: "short" }} />
<Time {timestamp} options={{ dateStyle: "full" }} />
<Time {timestamp} options={{ dateStyle: "medium", timeStyle: "short" }} />
```

### Relative time

Set `relative` to `true`, same as the main package. `numeric` maps directly to [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat)'s option: `"auto"` (default) prefers words like "yesterday"/"tomorrow" where the locale has one; `"always"` forces the numeric form ("1 day ago").

<!-- render:IntlRelative -->

```svelte
<Time relative timestamp={Date.now() - 4 * 86_400_000} />
<Time relative timestamp={Date.now() + 2 * 3_600_000} />
```

<!-- render:IntlRelativeAlways -->

```svelte
<!-- numeric="auto" (default): "yesterday" -->
<Time relative {timestamp} />

<!-- numeric="always": "1 day ago" -->
<Time relative {timestamp} numeric="always" />
```

### Live updates

Same `live` prop as the main package's `Time` component — `true` for the adaptive shared-clock schedule, or a number for a fixed interval in ms.

<!-- render:IntlLive -->

```svelte
<Time relative live {timestamp} />
```

### Locale

Pass any [BCP-47 locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) tag directly — no separate locale files to import, unlike dayjs. The runtime's built-in ICU data covers every locale it supports.

<!-- render:IntlLocale -->

```svelte
<Time {timestamp} locale="de" options={{ dateStyle: "long" }} />
<Time {timestamp} locale="ja" options={{ dateStyle: "long" }} />
<Time {timestamp} locale="ar" options={{ dateStyle: "long" }} />
<Time relative {timestamp} locale="fr" />
```

### Alternate calendars and numbering systems

`calendar` and `numberingSystem` are supported natively, with no plugins — something dayjs can't do without significant extra code.

<!-- render:IntlCalendar -->

```svelte
<Time {timestamp} options={{ dateStyle: "long", calendar: "japanese" }} />
<Time {timestamp} options={{ dateStyle: "long", calendar: "islamic" }} />
<Time {timestamp} options={{ dateStyle: "long", calendar: "buddhist" }} />
<Time {timestamp} options={{ dateStyle: "long", numberingSystem: "arab" }} />
```

### `TimeRange` component

Formats a span between two dates via [`Intl.DateTimeFormat.prototype.formatRange`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange), which condenses the shared parts of the range (e.g. "Jan 10 – 15, 2026" instead of spelling out both full dates). Unlike the main package's `TimeRange` (which renders **two** `<time>` elements, one per endpoint, joined by a separator — necessary since a single `datetime` attribute can't hold a range), this renders **one** `<time>` element using the native condensed text, with an [ISO 8601 interval](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals) (`start/end`) as its `datetime`.

<!-- render:IntlTimeRange -->

```svelte
<script>
  import { TimeRange } from "svelte-time/intl";
</script>

<!-- Output: "Jan 10 – 15, 2026" -->
<TimeRange start="2026-01-10" end="2026-01-15" />

<!-- Spans months/years automatically -->
<TimeRange start="2026-01-10" end="2026-03-02" />

<TimeRange start="2026-01-10" end="2026-01-15" options={{ dateStyle: "long" }} />
```

### `svelteTime` action

Same shape as the main package's `svelteTime` action.

<!-- render:IntlSvelteTimeAction -->

```svelte
<script>
  import { svelteTime } from "svelte-time/intl";
</script>

<time use:svelteTime></time>

<time
  use:svelteTime={{
    timestamp: "2021-02-02",
    options: { dateStyle: "long" },
  }}
></time>
```

### `time` attachment

<!-- render:IntlTimeAttachment -->

```svelte
<script>
  import { time } from "svelte-time/intl";
</script>

<time {@attach time({ timestamp: "2021-02-02", options: { dateStyle: "long" } })}></time>
```

### `svelteTimeRange` action

<!-- render:IntlSvelteTimeRangeAction -->

```svelte
<script>
  import { svelteTimeRange } from "svelte-time/intl";
</script>

<time use:svelteTimeRange={{ start: "2026-01-10", end: "2026-01-15" }}></time>
```

### `timeRange` attachment

<!-- render:IntlTimeRangeAttachment -->

```svelte
<script>
  import { timeRange } from "svelte-time/intl";
</script>

<time {@attach timeRange({ start: "2026-01-10", end: "2026-01-15" })}></time>
```

### `Stopwatch` component

Same shape as the main package's `Stopwatch` — counts up from a `since` instant, with a `running` prop for built-in pause/resume. `style` replaces `format`/`humanize`/`withSuffix`: `"digital"` (default) gives `"HH:mm:ss"`-style output; `"long"`/`"short"`/`"narrow"` give a humanized readout via `Intl.DurationFormat`.

<!-- render:IntlStopwatchBasic -->

```svelte
<script>
  import { Stopwatch } from "svelte-time/intl";

  let since = $state(new Date());
</script>

<!-- Ticks live by default, once per second -->
<Stopwatch {since} />

<!-- Changing `since` restarts the stopwatch -->
<button onclick={() => (since = new Date())}>Restart</button>
```

Pause and resume with the `running` prop; the `children` snippet receives the current `running` state alongside the formatted value:

<!-- render:IntlStopwatchPause -->

```svelte
<script>
  import { Stopwatch } from "svelte-time/intl";

  const since = new Date();
  let running = $state(true);
</script>

<Stopwatch {since} {running}>
  {#snippet children(formatted, isRunning)}
    {formatted}
    {isRunning ? "(running)" : "(paused)"}
  {/snippet}
</Stopwatch>

<button onclick={() => (running = !running)}>
  {running ? "Pause" : "Resume"}
</button>
```

### `svelteStopwatch` action

```svelte
<script>
  import { svelteStopwatch } from "svelte-time/intl";

  let running = $state(true);
</script>

<time use:svelteStopwatch={{ since: new Date(), running }}></time>
```

### `stopwatch` attachment

```svelte
<script>
  import { stopwatch } from "svelte-time/intl";

  let running = $state(true);
</script>

<time {@attach stopwatch({ since: new Date(), running })}></time>
```

### `Countdown` component

Same shape as the main package's `Countdown` — counts down to a future `to` instant, clamped at zero, ticking every second by default.

<!-- render:IntlCountdownBasic -->

```svelte
<script>
  import { Countdown } from "svelte-time/intl";

  let to = $state(new Date(Date.now() + 20_000));
</script>

<!-- Ticks live by default, once per second -->
<Countdown {to} />

<!-- style="long" gives a humanized readout -->
<Countdown {to} style="long" />

<!-- Changing `to` restarts the countdown -->
<button onclick={() => (to = new Date(Date.now() + 20_000))}>Reset</button>
```

`oncomplete` fires once, when the countdown reaches `to`. The `children` snippet receives a `done` boolean alongside the formatted value.

<!-- render:IntlCountdownOnComplete -->

```svelte
<script>
  import { Countdown } from "svelte-time/intl";

  let to = $state(new Date(Date.now() + 5000));
</script>

<Countdown {to} oncomplete={() => console.log("done!")}>
  {#snippet children(formatted, done)}
    {done ? "Done!" : formatted}
  {/snippet}
</Countdown>
```

### `svelteCountdown` action

```svelte
<script>
  import { svelteCountdown } from "svelte-time/intl";
</script>

<time use:svelteCountdown={{ to: new Date(Date.now() + 20_000), oncomplete: () => console.log("done!") }}></time>
```

### `countdown` attachment

```svelte
<script>
  import { countdown } from "svelte-time/intl";

  const to = new Date(Date.now() + 20_000);
</script>

<time {@attach countdown({ to, oncomplete: () => console.log("done!") })}></time>
```

### `formatDuration(ms, options?)`

Backed by [`Intl.DurationFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat) — `style` accepts `"digital"` (default, e.g. `"1:30:25"`), `"long"`, `"short"`, or `"narrow"`.

<!-- render:IntlDuration -->

```svelte
<script>
  import { formatDuration } from "svelte-time/intl";

  const ms = 5_425_000; // 1h 30m 25s
</script>

<p>digital (default): {formatDuration(ms)}</p>
<p>long: {formatDuration(ms, { style: "long" })}</p>
<p>narrow: {formatDuration(ms, { style: "narrow" })}</p>
<p>negative: {formatDuration(-42_000)}</p>
```

### Utility functions

`formatTime`, `relativeTime`, and `formatRange` are also available standalone, for use outside a `<time>` element.

<!-- render:IntlUtilities -->

```svelte
<script>
  import { formatRange, formatTime, relativeTime } from "svelte-time/intl";

  const timestamp = "2026-01-10T00:00:00Z";
</script>

<ul>
  <li>formatTime: {formatTime(timestamp)}</li>
  <li>relativeTime: {relativeTime(timestamp)}</li>
  <li>formatRange: {formatRange(timestamp, "2026-01-15T00:00:00Z")}</li>
</ul>
```

### `svelte-time` vs. `svelte-time/intl`

`svelte-time/intl` trades away dayjs's parsing, arithmetic, and format-string flexibility for a zero-dependency footprint. If your app already depends on dayjs elsewhere, or needs any of the "no" rows below, use the dayjs-based package instead.

| Aspect                    | `svelte-time` (dayjs)                                          | `svelte-time/intl`                                                       |
| :------------------------ | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Runtime dependency        | dayjs + `relativeTime`/`duration` plugins                        | none — built on platform `Intl` APIs                                       |
| Format style              | token strings, e.g. `"MMM DD, YYYY"`                              | `Intl.DateTimeFormatOptions` fields, or `dateStyle`/`timeStyle` presets     |
| Parsing arbitrary formats | yes, via dayjs                                                    | no — formats a `Date`/timestamp you already have                           |
| Date arithmetic           | yes (`add`/`diff`/`startOf`, etc.)                                | no                                                                          |
| Date ranges                | yes — `TimeRange` renders two `<time>` elements + separator      | yes — `TimeRange`/`formatRange` render one condensed native string        |
| Alternate calendars/numbering systems | requires extra dayjs plugins                          | built in (`calendar`/`numberingSystem` options)                            |
| Locale loading            | import each locale from `dayjs/locale/*`                         | none — covered by the runtime's built-in ICU data                          |
| Browser baseline support  | n/a (bundled library)                                             | `DateTimeFormat`/`RelativeTimeFormat`/`formatRange`: widely available since 2020; `DurationFormat`: newer (Baseline since March 2025) |

## API

### `Time` component props

| Name              | Type                                                  | Default value              | Description                                                                                                                                                                       |
| :---------------- | :---------------------------------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| timestamp         | `string` &#124; `number` &#124; `Date` &#124; `Dayjs` | `new Date().toISOString()` | The timestamp to display. String values pass through to `datetime` as-is; `Date`/`Dayjs`/`number` values are normalized to ISO 8601.                                              |
| format            | `string`                                              | `"MMM DD, YYYY"`           | Format for the displayed text (and the `title`, when `relative` is `true`). See the [dayjs display format](https://day.js.org/docs/en/display/format) docs.                       |
| relative          | `boolean`                                             | `false`                    | Display the timestamp relative to now (e.g. "4 days ago") instead of a formatted date.                                                                                            |
| withoutSuffix     | `boolean`                                             | `false`                    | Remove the "ago"/"in" suffix from relative time. Only applies when `relative` is `true`.                                                                                          |
| relativeStyle     | `RelativeStyle` (`"default"` &#124; `"micro"`)        | `"default"`                | Render a compact single unit (e.g. `"4d"`) instead of the humanized string. Only applies when `relative` is `true`. See [Compact relative time](#compact-relative-time).          |
| live              | `boolean` &#124; `number`                             | `false`                    | Keep relative time updated. `true` uses the adaptive schedule (see [Performance](#performance)); a number sets a fixed interval in ms. Only applies when `relative` is `true`.    |
| locale            | `Locales` (TypeScript) &#124; `string`                | `"en"`                     | Locale used to format the timestamp. See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale) and [Internationalization](#internationalization).              |
| tz                | `string`                                              | `undefined`                | IANA timezone (e.g. `"America/New_York"`) to render the timestamp in. Requires the dayjs `utc`/`timezone` plugins. See [tz prop](#tz-prop).                                       |
| relativeThreshold | `number`                                              | `undefined`                | Switch from `relative` to the absolute `format` once the timestamp's age (ms) meets or exceeds this value. See [Auto-switch to absolute format](#auto-switch-to-absolute-format). |
| children          | `Snippet<[string]>`                                   | `undefined`                | Custom markup rendered inside the `time` element instead of the plain formatted string; receives the formatted value as its argument. See [Custom markup](#custom-markup).        |

### `svelteTime` action and `time` attachment options

Both the `svelteTime` action and the `time` attachment accept the same options as the `Time` component's props, plus:

| Name  | Type                        | Default value                                   | Description                                                           |
| :---- | :-------------------------- | :---------------------------------------------- | :-------------------------------------------------------------------- |
| title | `string` &#124; `undefined` | formatted timestamp (when `relative` is `true`) | Override the `title` attribute; pass `undefined` to omit it entirely. |

`live` accepts the same `boolean | number` values on both, but their timers differ: the `svelteTime` action owns a simpler, per-node fixed interval (60 seconds by default when `true`, or a custom interval in ms), while the `time` attachment shares the same adaptive, global timer as the `Time` component. Neither the action's fixed interval nor the component/attachment's adaptive schedule apply to each other. See [Performance](#performance).

### Accessibility

The machine-readable `datetime` attribute is the accessible, parseable channel; the `title` tooltip isn't reachable via touch or keyboard, so don't rely on it to convey essential information: show the absolute date in text when it matters. Live text updates are deliberately not announced (`aria-live` is intentionally omitted): minute-by-minute announcements would be hostile to screen-reader users.

### `Duration` component props

| Name       | Type                                                                                                                                        | Default value                                                                         |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| value      | `number` &#124; `string` &#124; `object` &#124; `Duration`                                                                                  | `0` (ignored when `since` is set)                                                     |
| unit       | `"milliseconds"` &#124; `"seconds"` &#124; `"minutes"` &#124; `"hours"` &#124; `"days"` &#124; `"weeks"` &#124; `"months"` &#124; `"years"` | `"milliseconds"` (only applies when `value` is a plain number)                        |
| since      | `string` &#124; `number` &#124; `Date` &#124; `Dayjs`                                                                                       | `undefined` (see [live elapsed duration](#live-elapsed-duration-stopwatch))           |
| format     | `string`                                                                                                                                    | `"HH:mm:ss"`                                                                          |
| humanize   | `boolean`                                                                                                                                   | `false`                                                                               |
| withSuffix | `boolean`                                                                                                                                   | `false` (only applies when `humanize` is `true`)                                      |
| locale     | `Locales` (TypeScript) &#124; `string`                                                                                                      | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale)) |
| live       | `boolean` &#124; `number`                                                                                                                   | `false` (only applies when `since` is set)                                            |
| children   | `Snippet<[string]>`                                                                                                                         | `undefined`                                                                           |

### `Stopwatch` component props

| Name       | Type                                                    | Default value                                                                         |
| :--------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| since      | `string` &#124; `number` &#124; `Date` &#124; `Dayjs`    | `undefined` (captured once at mount as "now"); changing it resets the stopwatch       |
| running    | `boolean`                                                | `true`; set to `false` to pause, excluding the paused interval from elapsed time      |
| format     | `string`                                                 | `"HH:mm:ss"`                                                                          |
| humanize   | `boolean`                                                | `false`                                                                               |
| withSuffix | `boolean`                                                | `false` (only applies when `humanize` is `true`)                                      |
| locale     | `Locales` (TypeScript) &#124; `string`                   | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale)) |
| live       | `boolean` &#124; `number`                                | `true` (ticks every second while `running`; pass a number for a custom fixed interval in ms) |
| children   | `Snippet<[string, boolean]>`                             | `undefined`; receives the formatted value and the current `running` state             |

### `Countdown` component props

| Name       | Type                                                    | Default value                                                                         |
| :--------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| to         | `string` &#124; `number` &#124; `Date` &#124; `Dayjs`    | (required) target instant to count down to                                            |
| format     | `string`                                                 | `"HH:mm:ss"`                                                                          |
| humanize   | `boolean`                                                | `false`                                                                               |
| withSuffix | `boolean`                                                | `false` (only applies when `humanize` is `true`)                                      |
| locale     | `Locales` (TypeScript) &#124; `string`                   | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale)) |
| live       | `boolean` &#124; `number`                                | `true` (ticks every second; pass a number for a custom fixed interval in ms)          |
| oncomplete | `() => void`                                             | `undefined`; fires once, when the countdown reaches `to`                              |
| children   | `Snippet<[string, boolean]>`                             | `undefined`; receives the formatted value and a `done` flag                           |

### `TimeRange` component props

| Name      | Type                                                   | Default value                                                                                                                                     |
| :-------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| start     | `string` &#124; `number` &#124; `Date` &#124; `Dayjs`   | (required) start instant                                                                                                                              |
| end       | `string` &#124; `number` &#124; `Date` &#124; `Dayjs`   | (required) end instant                                                                                                                                |
| format    | `string`                                                 | `"MMM DD, YYYY"` (applied independently to `start` and `end`)                                                                                         |
| separator | `string`                                                 | `" – "`                                                                                                                                                |
| locale    | `Locales` (TypeScript) &#124; `string`                  | `"en"` (See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale))                                                                 |
| tz        | `string`                                                 | `undefined` (applied to both `start` and `end`; requires the dayjs `utc`/`timezone` plugins. See [tz prop](#tz-prop))                                 |
| children  | `Snippet<[object]>`                                      | `undefined`; receives a single object with `formattedStart`, `formattedEnd`, `startDatetime`, and `endDatetime` fields — destructure only what you need — and replaces the entire default output, not just the inner text   |

The `...rest` props (`SvelteHTMLElements["time"]` minus `children`) are spread onto **both** `<time>` elements — there's no per-side rest-prop split in v1.

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

# svelte-time

[![NPM][npm]][npm-url]

**Note:** `svelte-time@2` requires Svelte 5; its internals use runes. The consuming app does not need runes mode enabled, because runes are opt-in per component.

Use [svelte-time@1.0.0](https://github.com/metonym/svelte-time/tree/v1.0.0) for Svelte 3, 4, and 5 (non-Runes mode).

---

## About

`svelte-time` formats timestamps and durations as Svelte components and actions, and puts the machine-readable value on a semantic `time` element.

It uses [day.js](https://github.com/iamkun/dayjs).

```svelte
<!-- Input -->
<Time relative />

<!-- Output rendered in the DOM -->
<time title="May 15, 2022" datetime="2022-05-15T18:03:57.430Z">
  a few seconds ago
</time>
```

Try it in the [Svelte REPL](https://svelte.dev/playground/e2a27786f93d42878388de482de403c9).

Three primitives share the same timer logic:

| Primitive                      | Export       | Use it when...                                                                                                                            |
| :----------------------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| [Component](#time-component)   | `Time`       | you want a declarative element with a `timestamp` prop and full SSR support                                                               |
| [Action](#sveltetime-action)   | `svelteTime` | you want `use:svelteTime` on a plain element, no extra markup, and don't need the shared adaptive timer                                    |
| [Attachment](#time-attachment) | `time`       | you want `@attach` with reactive options and the same shared adaptive timer as the `Time` component                                       |

The [`dayjs`](#dayjs-export) re-export is a convenience utility, not a rendering primitive.

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

Set `relative` to `true` to show time relative to now, like "4 days ago".

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

With `relative`, the formatted timestamp goes on the `title` attribute. Pass your own `title` to override it.

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

Pass a `children` snippet to render custom markup. The snippet gets the formatted value; the component still owns `<time>`, `title`, and `datetime`.

<!-- render:CustomMarkup -->

```svelte
<Time relative timestamp={post.createdAt}>
  {#snippet children(formatted)}
    <strong>{formatted}</strong>
  {/snippet}
</Time>
```

### Live updates

Set `live` to `true` for a live relative timestamp. Updates follow an adaptive schedule based on age. See [Performance](#performance) for the schedule and how the timer works.

```svelte
<Time live relative />
```

Pass a number to `live` for a fixed interval in milliseconds.

```svelte
<!-- Update every 30 seconds -->
<Time live={30 * 1_000} relative />

<!-- Update every 10 minutes -->
<Time live={10 * 60 * 1_000} relative />
```

### Auto-switch to absolute format

Set `relativeThreshold` to an age in ms to switch from `relative` to absolute `format` once the timestamp is old enough. Only applies when `relative` is `true`. With `live`, the switch happens as time passes; without `live`, it only affects the value at render time.

<!-- render:RelativeThreshold -->

```svelte
<!-- Shows "a minute ago", flips to "4:40 am" after 2 hours -->
<Time relative live format="h:mm a" relativeThreshold={2 * 60 * 60 * 1000} />
```

### Performance

Built to keep lots of live timestamps cheap.

- **One timer, not n.** All `Time` components and `time` attachments on the same live interval share one clock. A feed with 1,000 timestamps on the same tier runs one `setInterval`, not 1,000. Timers start with the first live consumer and stop when the last unmounts. An idle page runs none.
- **Adaptive refresh.** `live={true}` ticks by age: every 10s under a minute, 30s under an hour, 5 minutes under a day, then hourly. Fresh stamps stay within about 10 seconds of truth; day-old ones update 60× less than fixed 60-second polling. Pass a number to `live` for a fixed interval.
- **Background tabs.** Browsers throttle hidden-tab timers. The shared clock refreshes as soon as the tab is visible again.
- **Cheap updates.** Each component parses its timestamp once per tick. The same `dayjs` instance feeds the text and the `title`. The `svelteTime` action and `time` attachment write via `textContent`, so the tick path avoids layout-forcing DOM APIs.

The `svelteTime` action is the exception: each node gets its own `setInterval` (60 seconds by default, or a custom ms interval), with no shared timer and no adaptive schedule. Prefer `Time` or the `time` attachment when many timestamps are live.

### SSR and SvelteKit

The `Time` component renders fully on the server: text, `title`, and `datetime` are in the HTML, and no timers start during SSR, even with `live`.

The `svelteTime` action and `time` attachment render an empty `<time>` until hydration, because neither runs on the server. Prefer `Time` when SSR content matters for SEO, no-JS, or avoiding a flash.

Pass an explicit `timestamp` under SSR. The default `new Date().toISOString()` is re-evaluated on the client during hydration, so server and client values can disagree, and relative text can cross a threshold between render and hydration, like "a few seconds ago" becoming "a minute ago".

### `svelteTime` action

Use the `svelteTime` action to format a timestamp on a raw HTML element.

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

Like the `Time` component, `live` only works with relative time.

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

[Attachments](https://svelte.dev/docs/svelte/@attach) (`@attach`, Svelte 5.29+) succeed actions. The `time` attachment is like `svelteTime`, but options stay reactive: it re-runs when any reactive value used to build options changes, including inline template objects. In `live` mode it shares the `Time` component's global timer instead of a per-element `setInterval`.

<!-- render:TimeAttachment -->

```svelte
<script>
  import { time } from "svelte-time";
</script>

<time {@attach time({ timestamp: "2021-02-02", format: "YYYY-MM-DD" })}></time>
```

Because options are reactive, an inline object built from `$state` updates the element automatically. No `update()` contract:

<!-- render:TimeAttachmentReactive -->

```svelte
<script lang="ts">
  import { time } from "svelte-time";

  let timestamp = $state("2021-02-02");
</script>

<time {@attach time({ timestamp, format: "YYYY-MM-DD" })}></time>
<button onclick={() => (timestamp = "2021-02-03")}>Update</button>
```

`@attach` needs Svelte 5.29+. The `svelteTime` action still works.

`relativeThreshold` works the same as on `Time` and `svelteTime`:

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

Set `withoutSuffix` to `true` to drop the "ago" suffix from relative time.

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

Same options work on the `svelteTime` action:

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

Set `relativeStyle` to `"micro"` for compact relative time like `"4d"` instead of `"4 days ago"`. Useful in dense UIs such as comment lists. Only applies when `relative` is `true`. Output always uses English unit letters (`y`/`mo`/`d`/`h`/`m`/`s`), even if `locale` is set, because dayjs's `relativeTime` locale tables have no single-letter forms.

<!-- render:RelativeStyleMicro -->

```svelte
<Time relative timestamp={pastDate} />
<!-- Output: "4 days ago" -->

<Time relative relativeStyle="micro" timestamp={pastDate} />
<!-- Output: "4d" instead of "4 days ago" -->
```

Same options work on the `svelteTime` action and the `time` attachment:

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

This package re-exports `dayjs`.

**Note:** the exported `dayjs` already has the [relativeTime plugin](https://day.js.org/docs/en/plugin/relative-time) and the [duration plugin](https://day.js.org/docs/en/durations/durations) applied.

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

The default `dayjs` locale is English. Nothing else is loaded unless you import it: pull each locale from `dayjs` once, then pass its key. See [supported locales](https://github.com/iamkun/dayjs/tree/dev/src/locale).

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

TypeScript also exports `Locales`, `TimeProps`, `SvelteTimeOptions`, and `RelativeStyle` for wrappers and action options.

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

Pass `locale` to `svelteTime` to format in another language.

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

`locale` also applies to relative time.

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

`withoutSuffix` works with locales too:

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

`locale` is reactive. Bind it to `$state` and every `<Time>` updates when it changes.

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

Or set a default with [`dayjs.locale`](https://day.js.org/docs/en/i18n/changing-locale), or pass a dayjs instance that already has a locale.

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

Pass `tz` with an [IANA timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) to render in that zone without building `dayjs.tz(...)` yourself. You must extend dayjs's `utc` and `timezone` plugins first; if they're missing, `tz` throws instead of failing silently.

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

> **Note:** `dayjs.tz.setDefault(...)` only affects values built with `dayjs.tz(...)`. It does
> not change what `<Time>` renders on its own. Use the `tz` prop for the common case, or pass a
> `dayjs.tz(value)` result as `timestamp` if you need the global default.

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

`Duration` formats a span of time, like a video length. `Time` formats a point in time. For pause/resume count-up, use [`Stopwatch`](#stopwatch-component). For a countdown to a future instant, use [`Countdown`](#countdown-component). For a span between two fixed endpoints, like an event start/end, use [`TimeRange`](#timerange-component). There is also a `svelteDuration` action and a `duration` attachment.

### `Duration` component

`value` accepts a number with `unit`, an ISO 8601 duration string like `"PT1H30M"`, a plain object of unit fields, or a dayjs `Duration` instance. Default `format` is `"HH:mm:ss"`.

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

dayjs's own `duration.format()` drops magnitude above the units in the template. Ours rolls that magnitude into the largest unit that is present, which is useful for players that hide hours until needed:

```svelte
<Duration value={5400000} format="mm:ss" />
<!-- Output: "90:00", not "30:00" -->
```

### Humanize

Set `humanize` to `true` for a natural-language string via dayjs's `duration.humanize()`, instead of `format`. Set `withSuffix` to `true` for a relative suffix like "in an hour" or "an hour ago". Suffixes are off by default; a video length isn't relative to now.

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

Use `locale` for other languages. Import the locale from `dayjs` first.

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

Pass `since` instead of `value` to show elapsed time since that instant. With `live`, `Duration` ticks on the same adaptive shared clock as `Time`'s `relative live` mode. `value` and `unit` are ignored when `since` is set.

<!-- render:DurationSince -->

```svelte
<script>
  import { Duration } from "svelte-time";

  const since = new Date().toISOString();
</script>

<Duration {since} live format="HH:mm:ss" />
```

Pass a number to `live` for a fixed interval:

```svelte
<Duration since={startedAt} live={1000} format="HH:mm:ss" />
```

This mode is a passive `now - since` readout. Pausing means recomputing `since` on every resume so the paused gap is excluded. For built-in pause/resume, use [`Stopwatch`](#stopwatch-component).

### `svelteDuration` action

The `svelteDuration` action formats a duration on a raw HTML element. Same API as the `Duration` component.

<!-- render:SvelteDurationAction -->

```svelte
<script>
  import { svelteDuration } from "svelte-time";
</script>

<time use:svelteDuration={{ value: 3661000 }}></time>
```

### `duration` attachment

The `duration` attachment is the [attachment](#time-attachment) form of `svelteDuration`, with the same reactive options as `time`.

<!-- render:DurationAttachmentExample -->

```svelte
<script>
  import { duration } from "svelte-time";
</script>

<time {@attach duration({ value: 3661000 })}></time>
```

### `Stopwatch` component

`Stopwatch` counts up from `since`, with a `running` prop for pause/resume. Unlike `Duration`'s `since`/`live` mode, it owns the pause bookkeeping: pause freezes the display, resume excludes the paused gap. `since` defaults to mount time; changing it later resets to zero from the new anchor.

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

Pause and resume with `running`. The `children` snippet gets the formatted value and the current `running` state:

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

The `svelteStopwatch` action counts up on a raw HTML element. Same API as `Stopwatch`.

```svelte
<script>
  import { svelteStopwatch } from "svelte-time";

  let running = $state(true);
</script>

<time use:svelteStopwatch={{ since: new Date(), running }}></time>
```

### `stopwatch` attachment

The `stopwatch` attachment is the [attachment](#time-attachment) form of `svelteStopwatch`, with the same reactive options as `time`, `duration`, and `countdown`.

```svelte
<script>
  import { stopwatch } from "svelte-time";

  let running = $state(true);
</script>

<time {@attach stopwatch({ since: new Date(), running })}></time>
```

### `Countdown` component

`Countdown` counts down to a future `to` timestamp: a `Date`, ISO string, or anything dayjs accepts. The display is `to - now`, clamped at zero. Unlike `Duration`, `live` defaults to `true` and ticks every second, because the last seconds of a countdown matter more than the adaptive "x minutes ago" schedule. Changing `to` restarts it.

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

`oncomplete` fires once when the countdown reaches `to`. If `to` is already past, it fires immediately. If you later change `to` to another already-elapsed instant, it fires again. The `children` snippet gets a `done` flag with the formatted value, so you can swap markup when it finishes without a separate `$effect`.

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

The `svelteCountdown` action counts down on a raw HTML element. Same API as `Countdown`.

```svelte
<script>
  import { svelteCountdown } from "svelte-time";

  const to = new Date(Date.now() + 20_000);
</script>

<time use:svelteCountdown={{ to, oncomplete: () => console.log("done!") }}></time>
```

### `countdown` attachment

The `countdown` attachment is the [attachment](#time-attachment) form of `svelteCountdown`, with the same reactive options as `time` and `duration`.

```svelte
<script>
  import { countdown } from "svelte-time";

  const to = new Date(Date.now() + 20_000);
</script>

<time {@attach countdown({ to, oncomplete: () => console.log("done!") })}></time>
```

## Time Range

`TimeRange` formats a span between two fixed instants, like an event start/end. `Duration` endpoints are open-ended. HTML `datetime` holds one value, so a range needs two: `TimeRange` renders two `<time>` elements, each with its own `datetime`, joined by a separator.

### `TimeRange` component

`format` uses dayjs `.format()` tokens, same default as `Time`, and applies independently to `start` and `end`. v1 does not dedupe a shared year or month. See [API](#api) for the full props list.

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

For a humanized span between endpoints like "3 days", compose `Duration`:

```svelte
<Duration value={dayjs(end).diff(start)} humanize />
```

### Meeting window

`format` isn't limited to dates. Pass a time-only format, and optionally a custom `separator`, for a same-day window.

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

Use `locale` to format both endpoints. Import the locale from `dayjs` first.

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

Pass a `children` snippet to replace the default output entirely. On `Time`/`Duration`, `children` only swaps inner text. On `TimeRange`, the snippet owns both `<time>` elements and the separator, because `format` alone can't condense a range (shared date once, times on each side). Format each side with `dayjs` inside the snippet.

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

The `svelteTimeRange` action attaches to a wrapper element and fills it with two `<time>` children and the separator. An action can only bind one node, and a range needs two.

```svelte
<script>
  import { svelteTimeRange } from "svelte-time";
</script>

<span use:svelteTimeRange={{ start: "2024-06-05", end: "2024-06-10" }}></span>
```

### `timeRange` attachment

The `timeRange` attachment is the [attachment](#time-attachment) form of `svelteTimeRange`, same reactive options, same wrapper usage.

```svelte
<script>
  import { timeRange } from "svelte-time";
</script>

<span {@attach timeRange({ start: "2024-06-05", end: "2024-06-10" })}></span>
```

## Utilities

The formatting logic and shared clock behind `<Time>` and `svelteTime` are also available as standalone helpers, for an `aria-label`, `document.title`, a toast, or server code.

```svelte
<script>
  import { now, relativeTime } from "svelte-time";

  // Re-derives every 30s from the shared timer. No timer of its own.
  const label = $derived(relativeTime(post.createdAt, { from: now(30_000) }));
</script>

<button aria-label="Posted {label}">…</button>
```

### `now(intervalMs?)`

Reactive current time from the shared ticker. Read inside an effect or derived and the caller re-runs every `intervalMs` (default `60_000`). All readers of the same interval share one timer. On the server, returns a fresh non-reactive value.

### `formatTime(timestamp, options?)`

Formats a timestamp as a string with the same output as `<Time>`'s `format` prop: same defaults, same locale fallback.

### `relativeTime(timestamp, options?)`

Formats a relative time string with the same output as `<Time relative />`. Pass `from` for the reference point; use `now(...)` to keep it live.

## `svelte-time/intl` (zero-dependency alternative)

A zero-dependency alternative on the runtime's native `Intl` APIs. No dayjs, no locale files, no plugins. It ships next to the dayjs-based primitives above; it does not replace them.

> **Trade-off:** formatting only, not a dayjs stand-in. It will not parse arbitrary date strings, will not do arithmetic (`add`/`diff`/`startOf`, etc.), and has no token format strings like `"MMM DD, YYYY"`. You hand it a `Date` or timestamp you already have, and it formats with `Intl.DateTimeFormatOptions` or `dateStyle`/`timeStyle` presets. It also uses `Intl.DurationFormat`, the newest of the three `Intl` APIs here (Baseline since March 2025, less proven than `DateTimeFormat`/`RelativeTimeFormat`, which have been widely available since 2020). See the [full comparison](#svelte-time-vs-svelte-timeintl) before picking this over the dayjs package.

`Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, and `Intl.DurationFormat` are Baseline in modern browsers, Node, Bun, and Deno, so this subpackage adds no bundle bytes beyond the platform. Import from `svelte-time/intl` instead of `svelte-time`.

```bash
# Same install as above. svelte-time/intl is a subpath of the same package
npm i svelte-time
```

Same component / action / attachment shape as the main package for `Time`, `TimeRange`, `Stopwatch`, and `Countdown`. No intl `Duration` component; `formatDuration` below already covers fixed spans.

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

`options` is an [`Intl.DateTimeFormatOptions`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options) object, not a dayjs token string. Default is `dateStyle: "medium"`.

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

`Intl.DateTimeFormat` style presets (`"short"`, `"medium"`, `"long"`, `"full"`) are a locale-aware alternative to writing a token string by hand.

<!-- render:IntlDateStyle -->

```svelte
<Time {timestamp} options={{ dateStyle: "short" }} />
<Time {timestamp} options={{ dateStyle: "full" }} />
<Time {timestamp} options={{ dateStyle: "medium", timeStyle: "short" }} />
```

### Relative time

Set `relative` to `true`, same as the main package. `numeric` maps to [`Intl.RelativeTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat): `"auto"` (default) prefers words like "yesterday" when the locale has them; `"always"` forces "1 day ago".

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

Same `live` prop as the main `Time` component: `true` for the adaptive shared-clock schedule, or a number for a fixed interval in ms.

<!-- render:IntlLive -->

```svelte
<Time relative live {timestamp} />
```

### Locale

Pass any [BCP-47 locale](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation) tag directly. No separate locale files, unlike dayjs. The runtime's ICU data covers what it supports.

<!-- render:IntlLocale -->

```svelte
<Time {timestamp} locale="de" options={{ dateStyle: "long" }} />
<Time {timestamp} locale="ja" options={{ dateStyle: "long" }} />
<Time {timestamp} locale="ar" options={{ dateStyle: "long" }} />
<Time relative {timestamp} locale="fr" />
```

### Alternate calendars and numbering systems

`calendar` and `numberingSystem` work natively, with no plugins. dayjs needs extra code for that.

<!-- render:IntlCalendar -->

```svelte
<Time {timestamp} options={{ dateStyle: "long", calendar: "japanese" }} />
<Time {timestamp} options={{ dateStyle: "long", calendar: "islamic" }} />
<Time {timestamp} options={{ dateStyle: "long", calendar: "buddhist" }} />
<Time {timestamp} options={{ dateStyle: "long", numberingSystem: "arab" }} />
```

### `TimeRange` component

Formats a span via [`Intl.DateTimeFormat.prototype.formatRange`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatRange), which condenses shared parts, e.g. "Jan 10 – 15, 2026". The main package's `TimeRange` renders two `<time>` elements because one `datetime` can't hold a range. This renders one `<time>` with the native condensed text and an [ISO 8601 interval](https://en.wikipedia.org/wiki/ISO_8601#Time_intervals) (`start/end`) as `datetime`.

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

Same shape as the main package `svelteTime` action.

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

Same shape as the main `Stopwatch`: counts up from `since`, with `running` for pause/resume. `style` replaces `format`/`humanize`/`withSuffix`. `"digital"` (default) is `"HH:mm:ss"`-style; `"long"`/`"short"`/`"narrow"` use `Intl.DurationFormat`.

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

Pause and resume with `running`. The `children` snippet gets the formatted value and the current `running` state:

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

Same shape as the main `Countdown`: counts down to a future `to`, clamped at zero, ticking every second by default.

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

`oncomplete` fires once when the countdown reaches `to`. The `children` snippet gets a `done` flag with the formatted value.

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

Uses [`Intl.DurationFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat). `style` accepts `"digital"` (default, e.g. `"1:30:25"`), `"long"`, `"short"`, or `"narrow"`.

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

`formatTime`, `relativeTime`, and `formatRange` are also available standalone, outside a `<time>` element.

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

`svelte-time/intl` drops dayjs parsing, arithmetic, and format strings for a zero-dependency footprint. If the app already uses dayjs, or needs any of the "no" rows below, stick with the dayjs package.

| Aspect                    | `svelte-time` (dayjs)                                          | `svelte-time/intl`                                                       |
| :------------------------ | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Runtime dependency        | dayjs + `relativeTime`/`duration` plugins                        | none, built on platform `Intl` APIs                                        |
| Format style              | token strings, e.g. `"MMM DD, YYYY"`                              | `Intl.DateTimeFormatOptions` fields, or `dateStyle`/`timeStyle` presets     |
| Parsing arbitrary formats | yes, via dayjs                                                    | no, formats a `Date`/timestamp you already have                            |
| Date arithmetic           | yes (`add`/`diff`/`startOf`, etc.)                                | no                                                                          |
| Date ranges                | yes, `TimeRange` renders two `<time>` elements + separator       | yes, `TimeRange`/`formatRange` render one condensed native string         |
| Alternate calendars/numbering systems | requires extra dayjs plugins                          | built in (`calendar`/`numberingSystem` options)                            |
| Locale loading            | import each locale from `dayjs/locale/*`                         | none, covered by the runtime's built-in ICU data                           |
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

`live` accepts the same `boolean | number` on both, but the timers differ. The `svelteTime` action uses a per-node fixed interval (60 seconds by default when `true`, or a custom ms value). The `time` attachment shares the adaptive global timer with the `Time` component. Those schedules are separate. See [Performance](#performance).

### Accessibility

The machine-readable `datetime` attribute is the accessible, parseable channel. The `title` tooltip isn't reachable via touch or keyboard, so don't put essential info only there; show the absolute date in text when it matters. Live text updates are not announced (`aria-live` is omitted on purpose). Minute-by-minute announcements would be hostile to screen-reader users.

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
| children  | `Snippet<[object]>`                                      | `undefined`; receives a single object with `formattedStart`, `formattedEnd`, `startDatetime`, and `endDatetime` fields. Destructure what you need. Replaces the entire default output, not just the inner text |

The `...rest` props (`SvelteHTMLElements["time"]` minus `children`) are spread onto both `<time>` elements. There is no per-side rest-prop split in v1.

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

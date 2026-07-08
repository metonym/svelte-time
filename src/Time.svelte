<script>
  /** @type {import("./Time.svelte.d.ts").TimeProps} */
  const {
    /**
     * Original timestamp
     * @type {import("dayjs").ConfigType}
     */
    timestamp = new Date().toISOString(),

    /**
     * Timestamp format for display.
     * It's also used as a title in the `relative` mode
     * @type {string}
     * @example "YYYY-MM-DD"
     */
    format = "MMM DD, YYYY",

    /**
     * Set to `true` to display the relative time from the provided `timestamp`.
     * The value is displayed in a human-readable, relative format (e.g., "4 days ago", "Last week")
     * @type {boolean}
     */
    relative = false,

    /**
     * Set to `true` to remove the "ago" suffix from relative time (e.g., "2 hours" instead of "2 hours ago").
     * Only applies when `relative` is `true`.
     * @type {boolean}
     */
    withoutSuffix = false,

    /**
     * Presentation style for `relative` output. `"micro"` renders a
     * compact single unit (e.g. "4d") instead of the humanized string
     * (e.g. "4 days ago"). Only applies when `relative` is `true`.
     * @type {import("./Time.svelte").RelativeStyle}
     */
    relativeStyle = "default",

    /**
     * Set to `true` to update the relative time at 60 second interval.
     * Pass in a number (ms) to specify the interval length
     * @type {boolean | number}
     */
    live = false,

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * IANA timezone name (e.g. "America/New_York") to render the timestamp
     * in. Requires the dayjs `utc` and `timezone` plugins to be extended.
     * @type {string | undefined}
     */
    tz = undefined,

    /**
     * When `relative` is `true`, switch to displaying `format` once the
     * timestamp's age (in ms) meets or exceeds this value.
     * @type {number | undefined}
     */
    relativeThreshold = undefined,

    /**
     * Snippet rendered inside the `time` element instead of the plain
     * formatted string. Receives the formatted value as its argument.
     * @type {import("svelte").Snippet<[string]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { untrack } from "svelte";
  import { toDatetime } from "./datetime";
  import { dayjs } from "./dayjs";
  import { resolveLocale } from "./format";
  import { microFormat } from "./micro";
  import { liveInterval, sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  /**
   * Get the effective locale to use.
   * If locale prop is default "en" and timestamp is a dayjs instance with a locale set,
   * preserve the timestamp's locale for backward compatibility.
   */
  const effectiveLocale = $derived(resolveLocale(timestamp, locale));

  /**
   * Parsed timestamp with the timezone (if provided) and effective locale
   * applied.
   * @type {import("dayjs").Dayjs}
   */
  const day = $derived.by(() => {
    const base = dayjs(timestamp);
    if (tz === undefined) return base.locale(effectiveLocale);
    if (typeof base.tz !== "function") {
      throw new Error(
        "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins — " +
          "see https://github.com/metonym/svelte-time#custom-timezone",
      );
    }
    return base.tz(tz).locale(effectiveLocale);
  });

  // Tier for adaptive `live === true` scheduling. Written from an effect
  // (rather than derived directly from `now`) to avoid a `$derived` cycle:
  // `now` is selected by this interval, so deriving the interval from `now`
  // directly would make `now` depend on itself. Seeded once from the raw
  // props (not the reactive `day`) since this is only an initial guess —
  // the effect below corrects it as soon as it runs.
  let interval = $state(
    untrack(() => liveInterval(dayjs(timestamp).diff(dayjs()))),
  );

  $effect(() => {
    if (relative && live === true) {
      const next = liveInterval(day.diff(now));
      if (next !== interval) interval = next;
    }
  });

  const effectiveInterval = $derived(
    typeof live === "number" ? Math.abs(live) : interval,
  );

  const now = $derived(
    relative && live !== false && canTick
      ? sharedNow(effectiveInterval)
      : dayjs(),
  );

  /**
   * Whether the timestamp's age has met or exceeded `relativeThreshold`,
   * in which case `relative` display gives way to `format`.
   * @type {boolean}
   */
  const isPastThreshold = $derived(
    relativeThreshold != null &&
      Math.abs(day.diff(live === false ? dayjs() : now)) >= relativeThreshold,
  );

  /**
   * Formatted timestamp.
   * Result of invoking `dayjs().format()` or `dayjs().from()`
   * @type {string}
   */
  let formatted = $derived(
    relative && !isPastThreshold
      ? relativeStyle === "micro"
        ? microFormat(day.diff(live === false ? dayjs() : now))
        : day.from(live === false ? dayjs() : now, withoutSuffix)
      : day.format(format),
  );

  /**
   * Title timestamp.
   * Result of invoking `dayjs().format()`
   * @type {string | undefined}
   */
  const title = $derived(
    relative && !isPastThreshold ? day.format(format) : undefined,
  );
</script>

{#if children}
  <time
    {title}
    {...rest}
    datetime={toDatetime(timestamp)}
  >
    {@render children(formatted)}
  </time>
{:else}
  <time
    {title}
    {...rest}
    datetime={toDatetime(timestamp)}
  >
    {formatted}
  </time>
{/if}

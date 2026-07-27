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
     * Also used as the `title` in `relative` mode.
     * @type {string}
     * @example "YYYY-MM-DD"
     */
    format = "MMM DD, YYYY",

    /**
     * Set to `true` for relative time from `timestamp`
     * (e.g. "4 days ago", "Last week").
     * @type {boolean}
     */
    relative = false,

    /**
     * Drop the "ago" suffix from relative time (e.g. "2 hours" not "2 hours ago").
     * Only applies when `relative` is `true`.
     * @type {boolean}
     */
    withoutSuffix = false,

    /**
     * Style for `relative` output. `"micro"` is a compact unit like "4d"
     * instead of "4 days ago". Only applies when `relative` is `true`.
     * @type {import("./Time.svelte").RelativeStyle}
     */
    relativeStyle = "default",

    /**
     * Keep relative time updating. `true` uses the adaptive schedule;
     * a number sets a fixed interval in ms.
     * @type {boolean | number}
     */
    live = false,

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * IANA timezone (e.g. "America/New_York"). Requires the dayjs `utc`
     * and `timezone` plugins.
     * @type {string | undefined}
     */
    tz = undefined,

    /**
     * When `relative` is `true`, switch to `format` once the timestamp's
     * age in ms meets or exceeds this value.
     * @type {number | undefined}
     */
    relativeThreshold = undefined,

    /**
     * Custom markup inside the `time` element. Receives the formatted
     * value as its argument.
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
   * Effective locale. If `locale` is default "en" and `timestamp` is a
   * dayjs instance with its own locale, keep that for compatibility.
   */
  const effectiveLocale = $derived(resolveLocale(timestamp, locale));

  /**
   * Parsed timestamp with timezone (if set) and effective locale applied.
   * @type {import("dayjs").Dayjs}
   */
  const day = $derived.by(() => {
    const base = dayjs(timestamp);
    if (tz === undefined) return base.locale(effectiveLocale);
    if (typeof base.tz !== "function") {
      throw new Error(
        "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins. " +
          "See https://github.com/metonym/svelte-time#custom-timezone",
      );
    }
    return base.tz(tz).locale(effectiveLocale);
  });

  // Tier for adaptive `live === true` scheduling. Written from an effect,
  // not derived from `now`, to avoid a `$derived` cycle: `now` is selected
  // by this interval, so deriving the interval from `now` would make `now`
  // depend on itself. Seeded once from the raw props (not the reactive
  // `day`) as an initial guess; the effect below corrects it.
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
   * True when age has met `relativeThreshold` and display should use
   * `format` instead of relative text.
   * @type {boolean}
   */
  const isPastThreshold = $derived(
    relativeThreshold != null &&
      Math.abs(day.diff(live === false ? dayjs() : now)) >= relativeThreshold,
  );

  /**
   * Formatted timestamp from `dayjs().format()` or `dayjs().from()`.
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
   * Title from `dayjs().format()`, when relative.
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

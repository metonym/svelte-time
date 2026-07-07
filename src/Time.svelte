<script>
  const {
    /**
     * Original timestamp
     * @type {import("dayjs").ConfigType}
     */
    timestamp = new Date().toISOString(),

    /**
     * Timestamp format for display.
     * It's also used as a title in the `relative` mode
     * @type {import("dayjs").OptionType}
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
    ...rest
  } = $props();

  import { dayjs } from "./dayjs";
  import { toDatetime } from "./datetime";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  /** Update interval appropriate to the timestamp's age. */
  function liveInterval(ageMs) {
    const age = Math.abs(ageMs);
    if (age < 60_000) return 10_000; // seconds-old: tick every 10s
    if (age < 3_600_000) return 30_000; // minutes-old: every 30s
    if (age < 86_400_000) return 300_000; // hours-old: every 5 min
    return 3_600_000; // days-old and beyond: hourly
  }

  /**
   * Get the effective locale to use.
   * If locale prop is default "en" and timestamp is a dayjs instance with a locale set,
   * preserve the timestamp's locale for backward compatibility.
   */
  const effectiveLocale = $derived.by(() => {
    if (locale !== "en") {
      return locale;
    }
    // Check if timestamp is a dayjs instance with a locale set
    if (timestamp && typeof timestamp === "object" && "$L" in timestamp) {
      const timestampLocale = timestamp.$L;
      if (timestampLocale && timestampLocale !== "en") {
        return timestampLocale;
      }
    }
    return locale;
  });

  /**
   * Parsed timestamp with the effective locale applied.
   * @type {import("dayjs").Dayjs}
   */
  const day = $derived(dayjs(timestamp).locale(effectiveLocale));

  // Tier for adaptive `live === true` scheduling. Written from an effect
  // (rather than derived directly from `now`) to avoid a `$derived` cycle:
  // `now` is selected by this interval, so deriving the interval from `now`
  // directly would make `now` depend on itself. Seeded once from the raw
  // props (not the reactive `day`) since this is only an initial guess —
  // the effect below corrects it as soon as it runs.
  let interval = $state(liveInterval(dayjs(timestamp).diff(dayjs())));

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
   * Formatted timestamp.
   * Result of invoking `dayjs().format()` or `dayjs().from()`
   * @type {string}
   */
  let formatted = $derived(
    relative
      ? day.from(live !== false ? now : dayjs(), withoutSuffix)
      : day.format(format),
  );

  /**
   * Title timestamp.
   * Result of invoking `dayjs().format()`
   * @type {string | undefined}
   */
  const title = $derived(relative ? day.format(format) : undefined);
</script>

<time {title} {...rest} datetime={toDatetime(timestamp)}>
  {formatted}
</time>

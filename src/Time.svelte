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

  import { dayjs } from "./dayjs-time";

  const DEFAULT_INTERVAL = 60 * 1_000;

  let tick = $state(0);

  $effect(() => {
    /** @type {undefined | NodeJS.Timeout} */
    let interval;
    if (relative && live !== false) {
      interval = setInterval(
        () => {
          tick++;
        },
        Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
      );
    }
    return () => clearInterval(interval);
  });

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
   * Formatted timestamp.
   * Result of invoking `dayjs().format()` or `dayjs().from()`
   * @type {string}
   */
  let formatted = $derived.by(() => {
    tick;
    if (relative) {
      // Use dayjs's built-in withoutSuffix parameter (locale-aware)
      return dayjs(timestamp)
        .locale(effectiveLocale)
        .from(dayjs(), withoutSuffix);
    }
    return dayjs(timestamp).locale(effectiveLocale).format(format);
  });

  const title = $derived(
    relative
      ? dayjs(timestamp).locale(effectiveLocale).format(format)
      : undefined,
  );
</script>

<time {title} {...rest} datetime={timestamp}>
  {formatted}
</time>

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

  const DEFAULT_INTERVAL = 60 * 1_000;

  $effect(() => {
    /** @type {undefined | NodeJS.Timeout} */
    let interval;
    if (relative && live !== false) {
      interval = setInterval(
        () => {
          formatted = dayjs(timestamp).locale(locale).from(dayjs());
        },
        Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
      );
    }
    return () => clearInterval(interval);
  });

  /**
   * Formatted timestamp.
   * Result of invoking `dayjs().format()`
   * @type {string}
   */
  let formatted = $state(
    relative
      ? dayjs(timestamp).locale(locale).from(dayjs())
      : dayjs(timestamp).locale(locale).format(format),
  );

  const title = $derived(
    relative ? dayjs(timestamp).locale(locale).format(format) : undefined,
  );
</script>

<time {title} {...rest} datetime={timestamp}>
  {formatted}
</time>

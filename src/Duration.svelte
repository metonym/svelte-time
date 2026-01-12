<script>
  const {
    /**
     * Duration value in milliseconds, or a dayjs Duration object
     * @type {number | import("dayjs").Duration}
     */
    value = 0,

    /**
     * Unit for the duration value (only used when value is a number)
     * @type {"milliseconds" | "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years"}
     */
    unit = "milliseconds",

    /**
     * Format for display. If not provided and humanize is false, displays raw milliseconds.
     * @type {string | undefined}
     * @example "HH:mm:ss"
     */
    format,

    /**
     * Set to `true` to display the duration in a human-readable format (e.g., "2 hours", "a minute")
     * @type {boolean}
     */
    humanize = false,

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * Set to `true` to update the duration at specified interval (for countdown/countup)
     * Pass in a number (ms) to specify the interval length
     * @type {boolean | number}
     */
    live = false,
    ...rest
  } = $props();

  import { dayjs } from "./dayjs-duration";

  const DEFAULT_INTERVAL = 60 * 1_000;

  let tick = $state(0);

  $effect(() => {
    /** @type {undefined | NodeJS.Timeout} */
    let interval;
    if (live !== false) {
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
   * Get the duration object from the value prop
   */
  const durationObj = $derived.by(() => {
    tick; // React to tick changes for live updates
    if (typeof value === "number") {
      return dayjs.duration(value, unit);
    }
    // value is already a dayjs Duration object
    return value;
  });

  /**
   * Formatted duration string
   */
  const formatted = $derived.by(() => {
    const duration = durationObj;
    if (format) {
      // Use custom format (e.g., "HH:mm:ss", "mm:ss")
      const totalSeconds = Math.floor(duration.asSeconds());
      const hasHours = /H/.test(format);
      const hours = Math.floor(totalSeconds / 3600);
      // If format doesn't include hours, use total minutes; otherwise use minutes after hours
      const minutes = hasHours
        ? Math.floor((totalSeconds % 3600) / 60)
        : Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const ms = duration.milliseconds() % 1000;

      // Replace in order: longest patterns first to avoid partial matches
      return format
        .replace(/HHH/g, String(hours).padStart(3, "0"))
        .replace(/HH/g, String(hours).padStart(2, "0"))
        .replace(/H/g, String(hours))
        .replace(/mmm/g, String(minutes).padStart(3, "0"))
        .replace(/mm/g, String(minutes).padStart(2, "0"))
        .replace(/m/g, String(minutes))
        .replace(/sss/g, String(seconds).padStart(3, "0"))
        .replace(/ss/g, String(seconds).padStart(2, "0"))
        .replace(/s/g, String(seconds))
        .replace(/SSSS/g, String(ms).padStart(4, "0"))
        .replace(/SSS/g, String(ms).padStart(3, "0"))
        .replace(/SS/g, String(ms).padStart(2, "0"))
        .replace(/S/g, String(ms));
    } else if (humanize) {
      // Use human-readable format with locale
      return duration.locale(locale).humanize();
    } else {
      // Fallback: return duration in milliseconds
      return String(duration.asMilliseconds());
    }
  });

  /**
   * ISO 8601 duration string for the datetime attribute
   */
  const datetime = $derived.by(() => {
    return durationObj.toISOString();
  });
</script>

<time {datetime} {...rest}>
  {formatted}
</time>

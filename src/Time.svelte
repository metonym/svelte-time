<script>
  // @ts-check

  /**
   * Original timestamp
   * @type {import("dayjs").ConfigType}
   */
  export let timestamp = new Date().toISOString();

  /**
   * Timestamp format for display.
   * It's also used as a title in the `relative` mode
   * @type {import("dayjs").OptionType}
   * @example "YYYY-MM-DD"
   */
  export let format = "MMM DD, YYYY";

  /**
   * Set to `true` to display the relative time from the provided `timestamp`.
   * The value is displayed in a human-readable, relative format (e.g., "4 days ago", "Last week")
   * @type {boolean}
   */
  export let relative = false;

  /**
   * Set to `true` to remove the "ago" suffix from relative time (e.g., "2 hours" instead of "2 hours ago").
   * Only applies when `relative` is `true`.
   * @type {boolean}
   */
  export let withoutSuffix = false;

  /**
   * Set to `true` to update the relative time at 60 second interval.
   * Pass in a number (ms) to specify the interval length
   * @type {boolean | number}
   */
  export let live = false;

  /**
   * The locale to use for formatting
   * @type {import("./locales").Locales}
   */
  export let locale = "en";

  /**
   * Formatted timestamp.
   * Result of invoking `dayjs().format()`
   * @type {string}
   */
  export let formatted = "";

  import { dayjs } from "./dayjs";
  import { onMount } from "svelte";

  /** @type {undefined | NodeJS.Timeout} */
  let interval = undefined;

  const DEFAULT_INTERVAL = 60 * 1_000;

  onMount(() => {
    return () => clearInterval(interval);
  });

  /**
   * Get the effective locale to use.
   * If locale prop is default "en" and timestamp is a dayjs instance with a locale set,
   * preserve the timestamp's locale for backward compatibility.
   */
  $: effectiveLocale = (() => {
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
  })();

  $: if (relative && live !== false) {
    clearInterval(interval);
    interval = setInterval(
      () => {
        formatted = dayjs(timestamp)
          .locale(effectiveLocale)
          .from(dayjs(), withoutSuffix);
      },
      Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
    );
  }
  $: formatted = relative
    ? dayjs(timestamp).locale(effectiveLocale).from(dayjs(), withoutSuffix)
    : dayjs(timestamp).locale(effectiveLocale).format(format);
  $: title = relative
    ? dayjs(timestamp).locale(effectiveLocale).format(format)
    : undefined;
</script>

<time {title} {...$$restProps} datetime={timestamp}>
  {formatted}
</time>

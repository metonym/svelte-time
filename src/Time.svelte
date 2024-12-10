<script>
  // @ts-check

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
    ...rest
  } = $props();

  import { dayjs } from "./dayjs";

  let liveUpdate = $state(0);

  const DEFAULT_INTERVAL = 60 * 1_000;

  $effect(() => {
    /** @type {undefined | NodeJS.Timeout} */
    let interval;
    if (relative && live !== false) {
      interval = setInterval(
        () => ++liveUpdate,
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
  let formatted = $derived.by(() => {
    liveUpdate; // no-op. this is a dependency trigger for live updates
    return relative ? dayjs(timestamp).from() : dayjs(timestamp).format(format);
  });

  const title = $derived(
    relative ? dayjs(timestamp).format(format) : undefined,
  );
</script>

<time {title} {...rest} datetime={timestamp}>
  {formatted}
</time>

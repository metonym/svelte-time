<script>
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
   * Set to `true` to update the relative time at 60 second interval.
   * Pass in a number (ms) to specify the interval length
   * @type {boolean | number}
   */
  export let live = false;

  /**
   * Formatted timestamp.
   * Result of invoking `dayjs().format()`
   * @type {string}
   */
  export let formatted = "";

  import { dayjs } from "./dayjs";
  import { onMount } from "svelte";

  let interval = undefined;

  const DEFAULT_INTERVAL = 60 * 1000;

  onMount(() => {
    if (relative && live !== false) {
      interval = setInterval(() => {
        formatted = dayjs(timestamp).from();
      }, Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL));
    }

    return () => {
      if (typeof interval === "number") {
        clearInterval(interval);
      }
    };
  });

  $: formatted = relative ? dayjs(timestamp).from() : dayjs(timestamp).format(format);
  $: title = relative ? dayjs(timestamp).format(format) : undefined;
</script>

<time {...$$restProps} {title} datetime={timestamp}>
  {formatted}
</time>

<script>
  /**
   * Original timestamp
   * @type {import("dayjs").ConfigType}
   */
  export let timestamp = new Date().toISOString();

  /**
   * Timestamp format for display
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
   * Formatted timestamp.
   * Result of invoking `dayjs().format()`
   * @type {string}
   */
  export let formatted = "";

  import { dayjs } from "./dayjs";

  $: formatted = relative
    ? dayjs(timestamp).from()
    : dayjs(timestamp).format(format);
  $: title = relative ? timestamp : undefined;
</script>

<time title="{title}" datetime="{timestamp}">
  {formatted}
</time>

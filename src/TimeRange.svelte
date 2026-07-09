<script>
  /** @type {import("./TimeRange.svelte.d.ts").TimeRangeProps} */
  const {
    /**
     * Start instant of the range.
     * @type {import("dayjs").ConfigType}
     */
    start,

    /**
     * End instant of the range.
     * @type {import("dayjs").ConfigType}
     */
    end,

    /**
     * Format applied independently to `start` and `end`.
     * @type {string}
     * @example "YYYY-MM-DD"
     */
    format = "MMM DD, YYYY",

    /**
     * Text rendered between the two formatted instants.
     * @type {string}
     */
    separator = " – ",

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * IANA timezone name (e.g. "America/New_York") applied to both
     * `start` and `end`. Requires the dayjs `utc` and `timezone` plugins
     * to be extended.
     * @type {string | undefined}
     */
    tz = undefined,

    /**
     * Snippet replacing the entire default output (both `time` elements
     * and the separator). Receives the formatted start, formatted end,
     * start `datetime`, and end `datetime`.
     * @type {import("svelte").Snippet<[string, string, string, string]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { toDatetime } from "./datetime";
  import { dayjs } from "./dayjs";
  import { resolveLocale } from "./format";

  const effectiveLocale = $derived(resolveLocale(start, locale));

  /**
   * Parse an instant with the timezone (if provided) and effective
   * locale applied.
   * @param {import("dayjs").ConfigType} value
   * @returns {import("dayjs").Dayjs}
   */
  const getDay = (value) => {
    const base = dayjs(value);
    if (tz === undefined) return base.locale(effectiveLocale);
    if (typeof base.tz !== "function") {
      throw new Error(
        "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins — " +
          "see https://github.com/metonym/svelte-time#custom-timezone",
      );
    }
    return base.tz(tz).locale(effectiveLocale);
  };

  const startDay = $derived(getDay(start));
  const endDay = $derived(getDay(end));

  const formattedStart = $derived(startDay.format(format));
  const formattedEnd = $derived(endDay.format(format));

  const startDatetime = $derived(toDatetime(start));
  const endDatetime = $derived(toDatetime(end));

  // Combined into a single spread per <time> element (rather than
  // `{...rest} datetime={...}`) so the formatter keeps each element on
  // one line — a line break between the separator and the second
  // <time> would otherwise be read as a literal space in the output.
  const startAttrs = $derived({ ...rest, datetime: startDatetime });
  const endAttrs = $derived({ ...rest, datetime: endDatetime });
</script>

{#if children}
  {@render children(
    formattedStart,
    formattedEnd,
    startDatetime ?? "",
    endDatetime ?? "",
  )}
{:else}
  <time {...startAttrs}>{formattedStart}</time>{separator}<!--
  --><time {...endAttrs}>{formattedEnd}</time>
{/if}

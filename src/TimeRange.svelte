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
     * Format applied to `start` and `end` independently.
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
     * IANA timezone (e.g. "America/New_York") applied to both endpoints.
     * Requires the dayjs `utc` and `timezone` plugins.
     * @type {string | undefined}
     */
    tz = undefined,

    /**
     * Replaces the entire default output (both `time` elements and the
     * separator). Receives `{ formattedStart, formattedEnd, startDatetime,
     * endDatetime }`; destructure what you need.
     * @type {import("svelte").Snippet<[{ formattedStart: string, formattedEnd: string, startDatetime: string, endDatetime: string }]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { toDatetime } from "./datetime";
  import { dayjs } from "./dayjs";
  import { resolveLocale } from "./format";

  const effectiveLocale = $derived(resolveLocale(start, locale));

  /**
   * Parse an instant with timezone (if set) and effective locale.
   * @param {import("dayjs").ConfigType} value
   * @returns {import("dayjs").Dayjs}
   */
  const getDay = (value) => {
    const base = dayjs(value);
    if (tz === undefined) return base.locale(effectiveLocale);
    if (typeof base.tz !== "function") {
      throw new Error(
        "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins. " +
          "See https://github.com/metonym/svelte-time#custom-timezone",
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

  // Single spread per <time> (not `{...rest} datetime={...}`) so the
  // formatter keeps each element on one line. A line break between the
  // separator and the second <time> would read as a literal space.
  const startAttrs = $derived({ ...rest, datetime: startDatetime });
  const endAttrs = $derived({ ...rest, datetime: endDatetime });
</script>

{#if children}
  {@render children({
    formattedStart,
    formattedEnd,
    startDatetime: startDatetime ?? "",
    endDatetime: endDatetime ?? "",
  })}
{:else}
  <time {...startAttrs}>{formattedStart}</time>{separator}<!--
  --><time {...endAttrs}>{formattedEnd}</time>
{/if}

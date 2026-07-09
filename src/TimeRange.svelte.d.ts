import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

export interface TimeRangeProps
  extends Omit<SvelteHTMLElements["time"], "children"> {
  /**
   * Start instant of the range.
   */
  start: ConfigType;

  /**
   * End instant of the range.
   */
  end: ConfigType;

  /**
   * Format applied independently to `start` and `end`.
   * @default "MMM DD, YYYY"
   */
  format?: string;

  /**
   * Text rendered between the two formatted instants.
   * @default " – "
   */
  separator?: string;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * IANA timezone name (e.g. "America/New_York") applied to both
   * `start` and `end`. Requires the dayjs `utc` and `timezone` plugins
   * to be extended by the consumer — throws at runtime otherwise.
   * @default undefined
   */
  tz?: string;

  /**
   * Snippet replacing the entire default output (both `time` elements
   * and the separator) — unlike `Time`/`Duration`'s `children`, this
   * doesn't just replace the inner text of a single element, since
   * there are two elements and a separator to arrange. Receives the
   * formatted start, formatted end, start `datetime`, and end
   * `datetime`.
   */
  children?: Snippet<[string, string, string, string]>;

  [key: `data-${string}`]: unknown;
}

declare const TimeRange: Component<TimeRangeProps>;

export default TimeRange;

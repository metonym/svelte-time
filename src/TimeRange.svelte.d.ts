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
   * Format applied to `start` and `end` independently.
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
   * IANA timezone (e.g. "America/New_York") applied to both endpoints.
   * Requires the dayjs `utc` and `timezone` plugins; throws at runtime
   * if missing.
   * @default undefined
   */
  tz?: string;

  /**
   * Replaces the entire default output (both `time` elements and the
   * separator). On `Time`/`Duration`, `children` only swaps inner text;
   * here the snippet owns both elements and the separator. Receives
   * `{ formattedStart, formattedEnd, startDatetime, endDatetime }`;
   * destructure what you need.
   */
  children?: Snippet<
    [
      {
        formattedStart: string;
        formattedEnd: string;
        startDatetime: string;
        endDatetime: string;
      },
    ]
  >;

  [key: `data-${string}`]: unknown;
}

declare const TimeRange: Component<TimeRangeProps>;

export default TimeRange;

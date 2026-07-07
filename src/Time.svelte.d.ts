import type { ConfigType } from "dayjs";
import type { Component } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = SvelteHTMLElements["time"];

export interface TimeProps extends RestProps {
  /**
   * Original timestamp
   * @default new Date().toISOString()
   */
  timestamp?: ConfigType;

  /**
   * Timestamp format for display.
   * It's also used as a title in the `relative` mode
   * @default "MMM DD, YYYY"
   */
  format?: string;

  /**
   * Set to `true` to display the relative time from the provided `timestamp`.
   * The value is displayed in a human-readable, relative format (e.g., "4 days ago", "Last week")
   * @default false
   */
  relative?: boolean;

  /**
   * Set to `true` to remove the "ago" suffix from relative time (e.g., "2 hours" instead of "2 hours ago").
   * Only applies when `relative` is `true`.
   * @default false
   */
  withoutSuffix?: boolean;

  /**
   * Set to `true` to update the relative time at 60 second interval.
   * Pass in a number (ms) to specify the interval length
   * @default false
   */
  live?: boolean | number;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  [key: `data-${string}`]: any;
}

declare const Time: Component<TimeProps>;

export default Time;

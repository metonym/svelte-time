import type { ConfigType, OptionType } from "dayjs";
import type { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

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
   * @type {import("dayjs").OptionType}
   * @default "MMM DD, YYYY"
   */
  format?: OptionType;

  /**
   * Set to `true` to display the relative time from the provided `timestamp`.
   * The value is displayed in a human-readable, relative format (e.g., "4 days ago", "Last week")
   * @default false
   */
  relative?: boolean;

  /**
   * Set to `true` to update the relative time at 60 second interval.
   * Pass in a number (ms) to specify the interval length
   * @default false
   */
  live?: boolean | number;

  /**
   * Formatted timestamp.
   * Result of invoking `dayjs().format()`
   * @default ""
   */
  formatted?: string;

  [key: `data-${string}`]: any;
}

export default class Time extends SvelteComponentTyped<
  TimeProps,
  Record<string, any>,
  {}
> {}

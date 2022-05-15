/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { ConfigType, OptionType } from "dayjs";

export interface TimeProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["time"]> {
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
}

export default class Time extends SvelteComponentTyped<TimeProps, {}, {}> {}

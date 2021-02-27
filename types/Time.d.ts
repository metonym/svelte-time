/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { ConfigType, OptionType } from "dayjs";

export interface TimeProps {
  /**
   * Original timestamp
   * @default new Date().toISOString()
   */
  timestamp?: ConfigType;

  /**
   * Timestamp format for display
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
   * Formatted timestamp.
   * Result of invoking `dayjs().format()`
   * @default ""
   */
  formatted?: string;
}

export default class Time extends SvelteComponentTyped<TimeProps, {}, {}> {}

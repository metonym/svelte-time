import type { Component } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = SvelteHTMLElements["time"];

type DayjsDuration = ReturnType<typeof import("./dayjs").dayjs.duration>;

export interface DurationProps extends RestProps {
  /**
   * Duration value in milliseconds, or a dayjs Duration object
   * @default 0
   */
  value?: number | DayjsDuration;

  /**
   * Unit for the duration value (only used when value is a number)
   * @default "milliseconds"
   */
  unit?:
    | "milliseconds"
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years";

  /**
   * Format for display. If not provided and humanize is false, displays raw milliseconds.
   * @example "HH:mm:ss"
   */
  format?: string;

  /**
   * Set to `true` to display the duration in a human-readable format (e.g., "2 hours", "a minute")
   * @default false
   */
  humanize?: boolean;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * Set to `true` to update the duration at specified interval (for countdown/countup)
   * Pass in a number (ms) to specify the interval length
   * @default false
   */
  live?: boolean | number;

  [key: `data-${string}`]: any;
}

declare const Duration: Component<DurationProps>;

export default Duration;

import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

/**
 * Style for `relative` output. `"micro"` is a compact unit like "4d"
 * instead of "4 days ago".
 */
export type RelativeStyle = "default" | "micro";

export interface TimeProps extends RestProps {
  /**
   * Original timestamp
   * @default new Date().toISOString()
   */
  timestamp?: ConfigType;

  /**
   * Timestamp format for display.
   * Also used as the `title` in `relative` mode.
   * @default "MMM DD, YYYY"
   */
  format?: string;

  /**
   * Set to `true` for relative time from `timestamp`
   * (e.g. "4 days ago", "Last week").
   * @default false
   */
  relative?: boolean;

  /**
   * Drop the "ago" suffix from relative time (e.g. "2 hours" not "2 hours ago").
   * Only applies when `relative` is `true`.
   * @default false
   */
  withoutSuffix?: boolean;

  /**
   * Style for `relative` output. `"micro"` is a compact unit like "4d"
   * instead of "4 days ago". Only applies when `relative` is `true`.
   * Output uses English unit letters regardless of `locale`; see README.
   * @default "default"
   */
  relativeStyle?: RelativeStyle;

  /**
   * Keep relative time updating. `true` uses the adaptive schedule;
   * a number sets a fixed interval in ms.
   * @default false
   */
  live?: boolean | number;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * IANA timezone (e.g. "America/New_York"). Requires the dayjs `utc`
   * and `timezone` plugins; throws at runtime if missing. Left
   * `undefined`, renders in the browser's local timezone, matching
   * dayjs's default.
   * @default undefined
   */
  tz?: string;

  /**
   * When `relative` is `true`, switch to `format` once the timestamp's
   * age in ms meets or exceeds this value. Left `undefined`, relative
   * display never expires.
   * @default undefined
   */
  relativeThreshold?: number;

  /**
   * Custom markup inside the `time` element. Receives the formatted
   * value as its argument.
   */
  children?: Snippet<[string]>;

  [key: `data-${string}`]: unknown;
}

declare const Time: Component<TimeProps>;

export default Time;

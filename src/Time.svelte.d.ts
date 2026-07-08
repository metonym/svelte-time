import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

/**
 * Presentation style for `relative` output. `"micro"` renders a
 * compact single unit (e.g. "4d") instead of the humanized string
 * (e.g. "4 days ago").
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
   * Presentation style for `relative` output. `"micro"` renders a
   * compact single unit (e.g. "4d") instead of the humanized string
   * (e.g. "4 days ago"). Only applies when `relative` is `true`. Output
   * uses English unit letters regardless of the `locale` prop — see
   * README.
   * @default "default"
   */
  relativeStyle?: RelativeStyle;

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

  /**
   * IANA timezone name (e.g. "America/New_York") to render the
   * timestamp in. Requires the dayjs `utc` and `timezone` plugins to be
   * extended by the consumer — throws at runtime otherwise. Left
   * `undefined` (the default), the timestamp renders in the browser's
   * local timezone, matching dayjs's own default behavior.
   * @default undefined
   */
  tz?: string;

  /**
   * When `relative` is `true`, switch to displaying `format` once the
   * timestamp's age (in ms) meets or exceeds this value. Left `undefined`
   * (the default), relative display never expires.
   * @default undefined
   */
  relativeThreshold?: number;

  /**
   * Snippet rendered inside the `time` element instead of the plain
   * formatted string. Receives the formatted value as its argument.
   */
  children?: Snippet<[string]>;

  [key: `data-${string}`]: any;
}

declare const Time: Component<TimeProps>;

export default Time;

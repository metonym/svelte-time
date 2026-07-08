import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface CountdownProps extends RestProps {
  /**
   * Target instant to count down to. Changing `to` restarts the
   * countdown (and resets `oncomplete` to fire again once the new
   * target is reached).
   */
  to: ConfigType;

  /**
   * Format for display, using dayjs's duration `format()` tokens
   * (e.g. "HH:mm:ss"). Ignored when `humanize` is `true`.
   * @default "HH:mm:ss"
   */
  format?: string;

  /**
   * Set to `true` to display the remaining time in a human-readable
   * format (e.g. "an hour") instead of `format`.
   * @default false
   */
  humanize?: boolean;

  /**
   * Set to `true` to include a relative suffix in humanized output
   * (e.g. "in an hour"). Only applies when `humanize` is `true`.
   * @default false
   */
  withSuffix?: boolean;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * Set to `true` to tick every second. Pass a number (ms) to use a
   * custom fixed interval instead.
   * @default true
   */
  live?: boolean | number;

  /**
   * Called once, when the countdown reaches `to`. Fires on mount if
   * `to` is already in the past. Fires again if `to` is later changed
   * to a new instant that has also already elapsed.
   */
  oncomplete?: () => void;

  /**
   * Snippet rendered inside the `time` element instead of the plain
   * formatted string. Receives the formatted value and whether the
   * countdown has completed.
   */
  children?: Snippet<[string, boolean]>;

  [key: `data-${string}`]: unknown;
}

declare const Countdown: Component<CountdownProps>;

export default Countdown;

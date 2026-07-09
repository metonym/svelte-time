import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface StopwatchProps extends RestProps {
  /**
   * Start instant to count elapsed time from. Captured once at mount
   * as "now" when omitted. Changing `since` resets the stopwatch to
   * zero from the new anchor.
   * @default undefined
   */
  since?: ConfigType;

  /**
   * Set to `false` to pause the stopwatch (freezes the displayed
   * elapsed value). Set back to `true` to resume — the paused
   * interval is excluded from the elapsed count.
   * @default true
   */
  running?: boolean;

  /**
   * Format for display, using dayjs's duration `format()` tokens
   * (e.g. "HH:mm:ss"). Ignored when `humanize` is `true`.
   * @default "HH:mm:ss"
   */
  format?: string;

  /**
   * Set to `true` to display the elapsed time in a human-readable
   * format (e.g. "an hour", "2 minutes") instead of `format`.
   * @default false
   */
  humanize?: boolean;

  /**
   * Set to `true` to include a relative suffix in humanized output
   * (e.g. "an hour ago"). Only applies when `humanize` is `true`.
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
   * custom fixed interval instead. Only applies while `running` is
   * `true`.
   * @default true
   */
  live?: boolean | number;

  /**
   * Snippet rendered inside the `time` element instead of the plain
   * formatted string. Receives the formatted value and the current
   * `running` state.
   */
  children?: Snippet<[string, boolean]>;

  [key: `data-${string}`]: unknown;
}

declare const Stopwatch: Component<StopwatchProps>;

export default Stopwatch;

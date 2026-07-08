import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { DayjsDuration, DurationUnit } from "./duration-format";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface DurationProps extends RestProps {
  /**
   * Duration value. Accepts anything dayjs's `duration()` accepts: a
   * number (paired with `unit`), an ISO 8601 duration string (e.g.
   * "PT1H30M"), a plain object of unit fields, or a dayjs `Duration`
   * instance. Ignored when `since` is provided.
   * @default 0
   */
  value?: number | string | object | DayjsDuration;

  /**
   * Unit for the duration value. Only applies when `value` is a plain number.
   * @default "milliseconds"
   */
  unit?: DurationUnit;

  /**
   * Start instant to count elapsed time from (e.g. a stopwatch/timer).
   * When provided, `value` and `unit` are ignored and the displayed
   * duration is `now - since`.
   * @default undefined
   */
  since?: ConfigType;

  /**
   * Format for display, using dayjs's duration `format()` tokens
   * (e.g. "HH:mm:ss"). Ignored when `humanize` is `true`.
   * @default "HH:mm:ss"
   */
  format?: string;

  /**
   * Set to `true` to display the duration in a human-readable format
   * (e.g. "an hour", "2 minutes") instead of `format`.
   * @default false
   */
  humanize?: boolean;

  /**
   * Set to `true` to include a relative suffix in humanized output
   * (e.g. "in an hour" / "an hour ago"). Only applies when `humanize`
   * is `true`.
   * @default false
   */
  withSuffix?: boolean;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * Set to `true` to update the elapsed duration at an adaptive
   * interval. Pass a number (ms) to specify a fixed interval. Only
   * applies when `since` is provided.
   * @default false
   */
  live?: boolean | number;

  /**
   * Snippet rendered inside the `time` element instead of the plain
   * formatted string. Receives the formatted value as its argument.
   */
  children?: Snippet<[string]>;

  [key: `data-${string}`]: unknown;
}

declare const Duration: Component<DurationProps>;

export default Duration;

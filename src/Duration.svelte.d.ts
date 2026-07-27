import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { DayjsDuration, DurationUnit } from "./duration-format";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface DurationProps extends RestProps {
  /**
   * Duration value: a number with `unit`, an ISO 8601 string like
   * "PT1H30M", a plain object of unit fields, or a dayjs `Duration`.
   * Ignored when `since` is set.
   * @default 0
   */
  value?: number | string | object | DayjsDuration;

  /**
   * Unit for the duration value. Only applies when `value` is a plain number.
   * @default "milliseconds"
   */
  unit?: DurationUnit;

  /**
   * Start instant for elapsed time. When set, `value`/`unit` are
   * ignored and the display is `now - since`.
   * @default undefined
   */
  since?: ConfigType;

  /**
   * Display format using dayjs duration tokens (e.g. "HH:mm:ss").
   * Ignored when `humanize` is `true`.
   * @default "HH:mm:ss"
   */
  format?: string;

  /**
   * Human-readable duration (e.g. "an hour") instead of `format`.
   * @default false
   */
  humanize?: boolean;

  /**
   * Add a relative suffix to humanized output (e.g. "in an hour").
   * Only applies when `humanize` is `true`.
   * @default false
   */
  withSuffix?: boolean;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * Keep elapsed duration updating. `true` uses the adaptive schedule;
   * a number sets a fixed interval in ms. Only applies with `since`.
   * @default false
   */
  live?: boolean | number;

  /**
   * Custom markup inside the `time` element. Receives the formatted
   * value as its argument.
   */
  children?: Snippet<[string]>;

  [key: `data-${string}`]: unknown;
}

declare const Duration: Component<DurationProps>;

export default Duration;

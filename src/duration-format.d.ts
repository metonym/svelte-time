import type { Locales } from "./locales";

/** A dayjs `Duration` instance (from the `duration` plugin). */
export type DayjsDuration = ReturnType<typeof import("dayjs")["duration"]>;

export type DurationUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks"
  | "months"
  | "years";

export interface FormatDurationOptions {
  value?: number | string | object | DayjsDuration;
  unit?: DurationUnit;
  format?: string;
  humanize?: boolean;
  withSuffix?: boolean;
  locale?: Locales | string;
}

/**
 * Normalize `value` into a dayjs `Duration` and render it, shared by the
 * `Duration` component, `svelteDuration` action, and `duration` attachment.
 */
export declare function formatDuration(options?: FormatDurationOptions): {
  formatted: string;
  datetime: string;
};

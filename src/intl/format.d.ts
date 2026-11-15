export type TimeInput = Date | number | string;

/**
 * Format a timestamp using `Intl.DateTimeFormat`. Defaults to
 * `{ dateStyle: "medium" }` when no field/style options are given.
 */
export declare function formatTime(
  timestamp: TimeInput,
  options?: Intl.DateTimeFormatOptions & { locale?: string },
): string;

/**
 * Format a date range using `Intl.DateTimeFormat.prototype.formatRange`,
 * e.g. "Jan 10 – 15, 2026". Defaults to `{ dateStyle: "medium" }`.
 */
export declare function formatRange(
  start: TimeInput,
  end: TimeInput,
  options?: Intl.DateTimeFormatOptions & { locale?: string },
): string;

/**
 * Relative time string via `Intl.RelativeTimeFormat`, e.g. "4 days ago".
 * `from` sets the reference point (defaults to now).
 */
export declare function relativeTime(
  timestamp: TimeInput,
  options?: {
    locale?: string;
    numeric?: "always" | "auto";
    from?: TimeInput;
  },
): string;

/**
 * Format a millisecond duration via `Intl.DurationFormat`
 * (hours/minutes/seconds only). Pass `style: "long"` etc. for
 * humanized output.
 */
export declare function formatDuration(
  ms: number,
  options?: {
    locale?: string;
    style?: "long" | "short" | "narrow" | "digital";
  },
): string;

/**
 * ISO 8601 duration string for a millisecond span (e.g. "PT1H30M25S"),
 * for use as a `<time datetime>` value.
 */
export declare function toISODuration(ms: number): string;

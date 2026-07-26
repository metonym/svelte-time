// Zero-dependency by design — do not import dayjs (or anything else) here.
// This is what makes `svelte-time/intl` a separate, dep-free entry point.

/** @typedef {Date | number | string} TimeInput */

/**
 * Format a timestamp using `Intl.DateTimeFormat`. Defaults to
 * `{ dateStyle: "medium" }` when no field/style options are given.
 * @param {TimeInput} timestamp
 * @param {Intl.DateTimeFormatOptions & { locale?: string }} [options]
 * @returns {string}
 */
export function formatTime(timestamp, options = {}) {
  const { locale = "en", ...rest } = options;
  /** @type {Intl.DateTimeFormatOptions} */
  const dtOptions = Object.keys(rest).length ? rest : { dateStyle: "medium" };
  return new Intl.DateTimeFormat(locale, dtOptions).format(new Date(timestamp));
}

/**
 * Format a date range using `Intl.DateTimeFormat.prototype.formatRange`,
 * e.g. "Jan 10 – 15, 2026". Defaults to `{ dateStyle: "medium" }`.
 * @param {TimeInput} start
 * @param {TimeInput} end
 * @param {Intl.DateTimeFormatOptions & { locale?: string }} [options]
 * @returns {string}
 */
export function formatRange(start, end, options = {}) {
  const { locale = "en", ...rest } = options;
  /** @type {Intl.DateTimeFormatOptions} */
  const dtOptions = Object.keys(rest).length ? rest : { dateStyle: "medium" };
  return new Intl.DateTimeFormat(locale, dtOptions).formatRange(
    new Date(start),
    new Date(end),
  );
}

/** Largest-to-smallest; picks the first unit `diffMs` is at least one of. */
const RELATIVE_UNITS = /** @type {const} */ ([
  ["year", 31536000000],
  ["month", 2628000000],
  ["week", 604800000],
  ["day", 86400000],
  ["hour", 3600000],
  ["minute", 60000],
  ["second", 1000],
]);

/**
 * Relative time string via `Intl.RelativeTimeFormat`, e.g. "4 days ago".
 * `from` sets the reference point (defaults to now).
 * @param {TimeInput} timestamp
 * @param {{ locale?: string, numeric?: "always" | "auto", from?: TimeInput }} [options]
 * @returns {string}
 */
export function relativeTime(timestamp, options = {}) {
  const { locale = "en", numeric = "auto", from = new Date() } = options;
  const diffMs = new Date(timestamp).getTime() - new Date(from).getTime();
  const abs = Math.abs(diffMs);
  const [unit, unitMs] =
    RELATIVE_UNITS.find(([, ms]) => abs >= ms) ??
    RELATIVE_UNITS[RELATIVE_UNITS.length - 1];
  return new Intl.RelativeTimeFormat(locale, { numeric }).format(
    Math.round(diffMs / unitMs),
    unit,
  );
}

/**
 * Format a millisecond duration via `Intl.DurationFormat` (hours/minutes/
 * seconds only — good enough for stopwatch/countdown display; pass
 * `style: "long"` etc. for humanized output).
 * @param {number} ms
 * @param {{ locale?: string, style?: "long" | "short" | "narrow" | "digital" }} [options]
 * @returns {string}
 */
export function formatDuration(ms, options = {}) {
  const { locale = "en", style = "digital" } = options;
  const negative = ms < 0;
  let remaining = Math.abs(Math.round(ms));
  const hours = Math.floor(remaining / 3600000);
  remaining -= hours * 3600000;
  const minutes = Math.floor(remaining / 60000);
  remaining -= minutes * 60000;
  const seconds = Math.floor(remaining / 1000);

  const formatted = new Intl.DurationFormat(locale, { style }).format({
    hours,
    minutes,
    seconds,
  });
  return negative ? `-${formatted}` : formatted;
}

/**
 * ISO 8601 duration string for a millisecond span (e.g. "PT1H30M25S"),
 * for use as a `<time datetime>` value alongside `formatDuration`'s
 * human-readable text.
 * @param {number} ms
 * @returns {string}
 */
export function toISODuration(ms) {
  const negative = ms < 0;
  let remaining = Math.abs(Math.round(ms));
  const hours = Math.floor(remaining / 3600000);
  remaining -= hours * 3600000;
  const minutes = Math.floor(remaining / 60000);
  remaining -= minutes * 60000;
  const seconds = Math.floor(remaining / 1000);

  let iso = "PT";
  if (hours) iso += `${hours}H`;
  if (minutes) iso += `${minutes}M`;
  iso += `${seconds}S`;
  return negative ? `-${iso}` : iso;
}

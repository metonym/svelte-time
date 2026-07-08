import { dayjs } from "./dayjs";

/**
 * Resolve the effective locale: an explicit non-default `locale` wins;
 * otherwise a `$L` locale carried by a dayjs-instance `timestamp` is
 * preserved for backward compatibility; otherwise falls back to `locale`.
 * @param {import("dayjs").ConfigType} timestamp
 * @param {import("./locales").Locales} [locale]
 * @returns {import("./locales").Locales}
 */
export function resolveLocale(timestamp, locale = "en") {
  if (locale !== "en") return locale;
  if (timestamp && typeof timestamp === "object" && "$L" in timestamp) {
    const timestampLocale = /** @type {import("./locales").Locales} */ (
      timestamp.$L
    );
    if (timestampLocale && timestampLocale !== "en") return timestampLocale;
  }
  return locale;
}

/**
 * Format a timestamp as a string — same output as <Time format={...} />.
 * @param {import("dayjs").ConfigType} timestamp
 * @param {{ format?: string, locale?: import("./locales").Locales }} [options]
 * @returns {string}
 */
export function formatTime(timestamp, options = {}) {
  const format = options.format || "MMM DD, YYYY";
  const locale = resolveLocale(timestamp, options.locale);
  return dayjs(timestamp).locale(locale).format(format);
}

/**
 * Relative time string — same output as <Time relative />.
 * `from` sets the reference point (pass `now(...)` for a reactive result).
 * @param {import("dayjs").ConfigType} timestamp
 * @param {{ locale?: import("./locales").Locales, withoutSuffix?: boolean, from?: import("dayjs").ConfigType }} [options]
 * @returns {string}
 */
export function relativeTime(timestamp, options = {}) {
  const locale = resolveLocale(timestamp, options.locale);
  const withoutSuffix = options.withoutSuffix ?? false;
  const from = options.from ?? dayjs();
  return dayjs(timestamp).locale(locale).from(from, withoutSuffix);
}

import { dayjs } from "./dayjs";

/**
 * Pick the effective locale. An explicit non-default `locale` wins.
 * Otherwise keep a `$L` locale on a dayjs-instance `timestamp` for
 * backward compatibility. Otherwise use `locale`.
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
 * Format a timestamp as a string. Same output as <Time format={...} />.
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
 * Relative time string. Same output as <Time relative />.
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

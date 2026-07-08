import { dayjs } from "./dayjs";

const TOKEN_REGEX = /\[([^\]]+)]|Y+|M+|D+|H+|m+|s+|S+/g;

/** Largest-to-smallest so excess magnitude rolls into the largest
 * token present in the template instead of being dropped. */
const HIERARCHY = /** @type {const} */ (["Y", "M", "D", "H", "m", "s", "S"]);

/** Matches dayjs duration's own approximation constants (365d/year, ~30.4d/month). */
const UNIT_MS = {
  Y: 31536000000,
  M: 2628000000,
  D: 86400000,
  H: 3600000,
  m: 60000,
  s: 1000,
  S: 1,
};

/**
 * Render `totalMs` against `template`. Unlike dayjs's own decomposed
 * `duration.format()` (which drops any magnitude above the units present
 * in the template — e.g. `format="mm:ss"` on 90 minutes renders "30:00"),
 * this rolls all magnitude larger than the largest present token into
 * that token — the same example renders "90:00". Supports the `[...]`
 * literal-text escape.
 * @param {number} totalMs
 * @param {string} template
 * @returns {string}
 */
function renderTemplate(totalMs, template) {
  const tokens = template.match(TOKEN_REGEX) || [];
  const presentTypes = new Set(
    tokens.filter((token) => token[0] !== "[").map((token) => token[0]),
  );

  const negative = totalMs < 0;
  let remaining = Math.abs(totalMs);
  /** @type {Record<string, number>} */
  const values = {};

  for (const type of HIERARCHY) {
    if (!presentTypes.has(type)) continue;
    const unitMs = UNIT_MS[type];
    values[type] = Math.floor(remaining / unitMs);
    remaining -= values[type] * unitMs;
  }

  const rendered = template.replace(TOKEN_REGEX, (match, bracketed) => {
    if (bracketed !== undefined) return bracketed;
    return String(values[match[0]]).padStart(match.length, "0");
  });

  return negative && presentTypes.size > 0 ? `-${rendered}` : rendered;
}

/**
 * Normalize `value` into a dayjs `Duration` and render it, shared by the
 * `Duration` component, `svelteDuration` action, and `duration` attachment
 * so the formatting logic lives in exactly one place.
 * @param {object} options
 * @param {number | string | object | import("./duration-format").DayjsDuration} [options.value]
 * @param {"milliseconds" | "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years"} [options.unit]
 * @param {string} [options.format]
 * @param {boolean} [options.humanize]
 * @param {boolean} [options.withSuffix]
 * @param {import("./locales").Locales | string} [options.locale]
 * @returns {{ formatted: string, datetime: string }}
 */
export function formatDuration({
  value = 0,
  unit = "milliseconds",
  format = "HH:mm:ss",
  humanize = false,
  withSuffix = false,
  locale = "en",
} = {}) {
  const base = dayjs.isDuration(value)
    ? value
    : typeof value === "number"
      ? dayjs.duration(value, unit)
      : dayjs.duration(
          /** @type {import("dayjs/plugin/duration").DurationUnitsObjectType} */ (
            value
          ),
        );

  const duration = base.locale(locale);

  return {
    formatted: humanize
      ? duration.humanize(withSuffix)
      : renderTemplate(duration.asMilliseconds(), format),
    datetime: duration.toISOString(),
  };
}

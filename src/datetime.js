import { dayjs } from "./dayjs";

/**
 * Machine-readable value for the `datetime` attribute.
 * Valid strings pass through untouched (the user may already provide a
 * spec-valid value dayjs can't parse-and-reproduce); Date/Dayjs/number
 * inputs are normalized to ISO 8601. Invalid inputs return undefined so
 * the attribute is omitted rather than set to garbage.
 * @param {import("dayjs").ConfigType} timestamp
 * @returns {string | undefined}
 */
export function toDatetime(timestamp) {
  const day = dayjs(timestamp);
  if (!day.isValid()) return undefined;
  return typeof timestamp === "string" ? timestamp : day.toISOString();
}

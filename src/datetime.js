import { dayjs } from "./dayjs";

/**
 * Machine-readable value for the `datetime` attribute.
 * Valid strings pass through untouched; the caller may already have a
 * spec-valid value dayjs can't round-trip. Date/Dayjs/number inputs
 * become ISO 8601. Invalid inputs return undefined so the attribute
 * is omitted instead of set to garbage.
 * @param {import("dayjs").ConfigType} timestamp
 * @returns {string | undefined}
 */
export function toDatetime(timestamp) {
  const day = dayjs(timestamp);
  if (!day.isValid()) return undefined;
  return typeof timestamp === "string" ? timestamp : day.toISOString();
}

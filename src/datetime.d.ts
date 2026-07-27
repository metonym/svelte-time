import type { ConfigType } from "dayjs";

/**
 * Machine-readable value for the `datetime` attribute.
 * Valid strings pass through untouched; the caller may already have a
 * spec-valid value dayjs can't round-trip. Date/Dayjs/number inputs
 * become ISO 8601. Invalid inputs return undefined so the attribute
 * is omitted instead of set to garbage.
 */
export declare function toDatetime(timestamp: ConfigType): string | undefined;

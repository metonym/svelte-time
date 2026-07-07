import type { ConfigType } from "dayjs";

/**
 * Machine-readable value for the `datetime` attribute.
 * Valid strings pass through untouched (the user may already provide a
 * spec-valid value dayjs can't parse-and-reproduce); Date/Dayjs/number
 * inputs are normalized to ISO 8601. Invalid inputs return undefined so
 * the attribute is omitted rather than set to garbage.
 */
export declare function toDatetime(timestamp: ConfigType): string | undefined;

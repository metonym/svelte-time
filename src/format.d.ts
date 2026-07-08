import type { ConfigType } from "dayjs";
import type { Locales } from "./locales";

/**
 * Format a timestamp as a string — same output as <Time format={...} />.
 */
export declare function formatTime(
  timestamp: ConfigType,
  options?: { format?: string; locale?: Locales },
): string;

/**
 * Relative time string — same output as <Time relative />.
 * `from` sets the reference point (pass `now(...)` for a reactive result).
 */
export declare function relativeTime(
  timestamp: ConfigType,
  options?: {
    locale?: Locales;
    withoutSuffix?: boolean;
    from?: ConfigType;
  },
): string;

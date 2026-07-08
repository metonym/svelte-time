import type { ConfigType } from "dayjs";
import type { Locales } from "./locales";

/**
 * Resolve the effective locale: an explicit non-default `locale` wins;
 * otherwise a `$L` locale carried by a dayjs-instance `timestamp` is
 * preserved for backward compatibility; otherwise falls back to `locale`.
 */
export declare function resolveLocale(
  timestamp: ConfigType,
  locale?: Locales,
): Locales;

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

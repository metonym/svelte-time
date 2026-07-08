/**
 * Compact single-unit relative time, e.g. "4d", "2h", "5y", "1m", "6s".
 * Largest applicable unit, floor-rounded, magnitude only (no sign/suffix —
 * pair with a "+"/"-" prefix yourself if you need direction).
 */
export declare function microFormat(ms: number): string;

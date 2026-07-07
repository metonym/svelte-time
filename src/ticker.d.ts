import type { Dayjs } from "dayjs";

/**
 * Reactive "now". When read inside an effect or derived, the caller
 * re-runs on every tick of the shared timer for `intervalMs`.
 */
export declare function sharedNow(intervalMs: number): Dayjs;

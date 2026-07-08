import type { Dayjs } from "dayjs";

/**
 * Reactive "now". When read inside an effect or derived, the caller
 * re-runs on every tick of the shared timer for `intervalMs`.
 */
export declare function sharedNow(intervalMs: number): Dayjs;

/** Update interval appropriate to the timestamp's age. */
export declare function liveInterval(ageMs: number): number;

/**
 * Reactive current time backed by the shared ticker. When read inside
 * an effect or derived, the caller re-runs every `intervalMs`
 * (default 60s). All readers of the same interval share one timer.
 * On the server, returns a fresh non-reactive instance.
 */
export declare function now(intervalMs?: number): Dayjs;

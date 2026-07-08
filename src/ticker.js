import { createSubscriber } from "svelte/reactivity";
import { dayjs } from "./dayjs";

/**
 * One shared timer per distinct interval (ms), active only while
 * subscribed. The map is bounded by the number of distinct interval
 * values in the app.
 */
const tickers = new Map();

/**
 * Update interval appropriate to the timestamp's age.
 * @param {number} ageMs
 * @returns {number}
 */
export function liveInterval(ageMs) {
  const age = Math.abs(ageMs);
  if (age < 60_000) return 10_000; // seconds-old: tick every 10s
  if (age < 3_600_000) return 30_000; // minutes-old: every 30s
  if (age < 86_400_000) return 300_000; // hours-old: every 5 min
  return 3_600_000; // days-old and beyond: hourly
}

/**
 * Reactive "now". When read inside an effect or derived, the caller
 * re-runs on every tick of the shared timer for `intervalMs`.
 * @param {number} intervalMs
 * @returns {import("dayjs").Dayjs}
 */
export function sharedNow(intervalMs) {
  let read = tickers.get(intervalMs);
  if (!read) {
    let now = dayjs();
    const subscribe = createSubscriber((update) => {
      now = dayjs(); // refresh on (re)activation — the module may be old
      const id = setInterval(() => {
        now = dayjs();
        update();
      }, intervalMs);

      /** @type {(() => void) | undefined} */
      let onVisibilityChange;
      if (typeof document !== "undefined") {
        onVisibilityChange = () => {
          if (!document.hidden) {
            now = dayjs();
            update();
          }
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
      }

      return () => {
        clearInterval(id);
        if (onVisibilityChange) {
          document.removeEventListener("visibilitychange", onVisibilityChange);
        }
      };
    });
    read = () => {
      subscribe();
      return now;
    };
    tickers.set(intervalMs, read);
  }
  return read();
}

/**
 * Reactive current time backed by the shared ticker. When read inside
 * an effect or derived, the caller re-runs every `intervalMs`
 * (default 60s). All readers of the same interval share one timer.
 * On the server, returns a fresh non-reactive instance.
 * @param {number} [intervalMs]
 * @returns {import("dayjs").Dayjs}
 */
export function now(intervalMs = 60_000) {
  if (typeof document === "undefined") return dayjs();
  return sharedNow(Math.abs(intervalMs));
}

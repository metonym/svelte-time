import { createSubscriber } from "svelte/reactivity";
import { dayjs } from "./dayjs";

/**
 * One shared timer per distinct interval (ms), active only while
 * subscribed. The map is bounded by the number of distinct interval
 * values in the app.
 */
const tickers = new Map();

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
      return () => clearInterval(id);
    });
    read = () => {
      subscribe();
      return now;
    };
    tickers.set(intervalMs, read);
  }
  return read();
}

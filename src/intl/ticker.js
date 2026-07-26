import { createSubscriber } from "svelte/reactivity";

/**
 * One shared timer per distinct interval (ms), active only while
 * subscribed. Same pattern as `../ticker.js`, but backed by plain `Date`
 * instead of dayjs, to keep this subpackage dependency-free.
 */
const tickers = new Map();

/**
 * Reactive "now". When read inside an effect or derived, the caller
 * re-runs on every tick of the shared timer for `intervalMs`.
 * @param {number} intervalMs
 * @returns {Date}
 */
export function sharedNow(intervalMs) {
  let read = tickers.get(intervalMs);
  if (!read) {
    let now = new Date();
    const subscribe = createSubscriber((update) => {
      now = new Date();
      const id = setInterval(() => {
        now = new Date();
        update();
      }, intervalMs);

      /** @type {(() => void) | undefined} */
      let onVisibilityChange;
      if (typeof document !== "undefined") {
        onVisibilityChange = () => {
          if (!document.hidden) {
            now = new Date();
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

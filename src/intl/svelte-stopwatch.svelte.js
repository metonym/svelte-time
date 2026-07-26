import { formatDuration, toISODuration } from "./format";

const DEFAULT_INTERVAL = 1_000;

/**
 * @typedef {object} SvelteStopwatchOptions
 * @property {import("./format").TimeInput} since
 * @property {boolean} running
 * @property {"digital" | "long" | "short" | "narrow"} style
 * @property {string} locale
 * @property {boolean | number} live
 */

/**
 * Action version of `Stopwatch.svelte`.
 * @type {import("svelte/action").Action<HTMLElement, Partial<SvelteStopwatchOptions>>}
 */
export const svelteStopwatch = (node, options = {}) => {
  /** @type {undefined | ReturnType<typeof setInterval>} */
  let interval;

  /** @type {undefined | Date} */
  let anchor;
  let pausedMs = 0;
  /** @type {undefined | Date} */
  let pausedAt;
  /** @type {undefined | import("./format").TimeInput} */
  let prevSince;
  let prevRunning = true;

  /** @param {Partial<SvelteStopwatchOptions>} [options] */
  const render = (options = {}) => {
    const style = options.style ?? "digital";
    const locale = options.locale ?? "en";

    const now = new Date();
    const elapsedMs = Math.max(
      0,
      now.getTime() -
        /** @type {Date} */ (anchor).getTime() -
        pausedMs -
        (pausedAt ? now.getTime() - pausedAt.getTime() : 0),
    );

    node.setAttribute("datetime", toISODuration(elapsedMs));
    node.textContent = formatDuration(elapsedMs, { locale, style });
  };

  /** @param {Partial<SvelteStopwatchOptions>} [options] */
  const updateStopwatch = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    const since = options.since;
    const running = options.running ?? true;

    if (anchor === undefined || (since !== undefined && since !== prevSince)) {
      anchor = since === undefined ? (anchor ?? new Date()) : new Date(since);
      pausedMs = 0;
      pausedAt = running ? undefined : new Date();
    } else if (running !== prevRunning) {
      if (running) {
        if (pausedAt !== undefined) {
          pausedMs += Date.now() - pausedAt.getTime();
          pausedAt = undefined;
        }
      } else if (pausedAt === undefined) {
        pausedAt = new Date();
      }
    }

    prevSince = since;
    prevRunning = running;

    render(options);

    const live = options.live ?? true;
    if (running && live !== false) {
      interval = setInterval(
        () => render(options),
        Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
      );
    }
  };

  updateStopwatch(options);

  return {
    update: updateStopwatch,
    destroy() {
      clearInterval(interval);
    },
  };
};

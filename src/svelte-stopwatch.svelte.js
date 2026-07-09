import { dayjs } from "./dayjs";
import { formatDuration } from "./duration-format";

const DEFAULT_INTERVAL = 1_000;

/**
 * @typedef {import("./svelte-stopwatch.svelte").SvelteStopwatchOptions} SvelteStopwatchOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteStopwatchOptions>>} SvelteStopwatchAction
 * @type {SvelteStopwatchAction}
 */
export const svelteStopwatch = (node, options = {}) => {
  /** @type {undefined | NodeJS.Timeout} */
  let interval;

  /** @type {undefined | import("dayjs").Dayjs} */
  let anchor;
  let pausedMs = 0;
  /** @type {undefined | import("dayjs").Dayjs} */
  let pausedAt;
  /** @type {import("dayjs").ConfigType} */
  let prevSince;
  let prevRunning = true;

  /** @param {Partial<SvelteStopwatchOptions>} [options] */
  const render = (options = {}) => {
    const format = options.format ?? "HH:mm:ss";
    const humanize = options.humanize ?? false;
    const withSuffix = options.withSuffix ?? false;
    const locale = options.locale ?? "en";

    const now = dayjs();
    const elapsedMs = Math.max(
      0,
      now.diff(anchor) - pausedMs - (pausedAt ? now.diff(pausedAt) : 0),
    );

    const result = formatDuration({
      value: elapsedMs,
      unit: "milliseconds",
      format,
      humanize,
      withSuffix,
      locale,
    });

    node.setAttribute("datetime", result.datetime);
    node.textContent = result.formatted;
  };

  /** @param {Partial<SvelteStopwatchOptions>} [options] */
  const updateStopwatch = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    const since = options.since;
    const running = options.running ?? true;

    if (anchor === undefined || (since !== undefined && since !== prevSince)) {
      // Initial mount, or `since` changed to a new instant: reset.
      anchor = since === undefined ? (anchor ?? dayjs()) : dayjs(since);
      pausedMs = 0;
      pausedAt = running ? undefined : dayjs();
    } else if (running !== prevRunning) {
      // `running` toggled: track the paused interval so resuming
      // excludes it from the elapsed count.
      if (running) {
        if (pausedAt !== undefined) {
          pausedMs += dayjs().diff(pausedAt);
          pausedAt = undefined;
        }
      } else if (pausedAt === undefined) {
        pausedAt = dayjs();
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

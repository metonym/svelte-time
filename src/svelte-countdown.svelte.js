import { dayjs } from "./dayjs";
import { formatDuration } from "./duration-format";

const DEFAULT_INTERVAL = 1_000;

/**
 * @typedef {import("./svelte-countdown.svelte").SvelteCountdownOptions} SvelteCountdownOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteCountdownOptions>>} SvelteCountdownAction
 * @type {SvelteCountdownAction}
 */
export const svelteCountdown = (node, options = {}) => {
  /** @type {undefined | NodeJS.Timeout} */
  let interval;
  let completed = false;

  /** @param {Partial<SvelteCountdownOptions>} [options] */
  const render = (options = {}) => {
    const to = options.to;
    const format = options.format ?? "HH:mm:ss";
    const humanize = options.humanize ?? false;
    const withSuffix = options.withSuffix ?? false;
    const locale = options.locale ?? "en";

    const remainingMs = Math.max(0, dayjs(to).diff(dayjs()));

    const result = formatDuration({
      value: remainingMs,
      unit: "milliseconds",
      format,
      humanize,
      withSuffix,
      locale,
    });

    node.setAttribute("datetime", result.datetime);
    node.textContent = result.formatted;

    if (remainingMs === 0 && !completed) {
      completed = true;
      clearInterval(interval);
      interval = undefined;
      options.oncomplete?.();
    }
  };

  /** @param {Partial<SvelteCountdownOptions>} [options] */
  const updateCountdown = (options = {}) => {
    clearInterval(interval);
    interval = undefined;
    completed = false;

    render(options);

    const live = options.live ?? true;
    if (live !== false && !completed) {
      interval = setInterval(
        () => render(options),
        Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
      );
    }
  };

  updateCountdown(options);

  return {
    update: updateCountdown,
    destroy() {
      clearInterval(interval);
    },
  };
};

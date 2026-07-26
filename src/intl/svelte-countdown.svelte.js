import { formatDuration, toISODuration } from "./format";

const DEFAULT_INTERVAL = 1_000;

/**
 * @typedef {object} SvelteCountdownOptions
 * @property {import("./format").TimeInput} to
 * @property {"digital" | "long" | "short" | "narrow"} style
 * @property {string} locale
 * @property {boolean | number} live
 * @property {() => void} oncomplete
 */

/**
 * Action version of `Countdown.svelte`.
 * @type {import("svelte/action").Action<HTMLElement, Partial<SvelteCountdownOptions>>}
 */
export const svelteCountdown = (node, options = {}) => {
  /** @type {undefined | ReturnType<typeof setInterval>} */
  let interval;
  let completed = false;
  /** @type {undefined | import("./format").TimeInput} */
  let lastTo;

  /** @param {Partial<SvelteCountdownOptions>} [options] */
  const render = (options = {}) => {
    const to = options.to;
    const style = options.style ?? "digital";
    const locale = options.locale ?? "en";

    const remainingMs = Math.max(0, new Date(to ?? "").getTime() - Date.now());

    node.setAttribute("datetime", toISODuration(remainingMs));
    node.textContent = formatDuration(remainingMs, { locale, style });

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

    if (options.to !== lastTo) {
      completed = false;
      lastTo = options.to;
    }

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

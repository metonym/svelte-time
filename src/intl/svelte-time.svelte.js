import { formatTime, relativeTime } from "./format";

/**
 * @typedef {object} SvelteTimeOptions
 * @property {import("./format").TimeInput} timestamp
 * @property {Intl.DateTimeFormatOptions} options
 * @property {boolean} relative
 * @property {"always" | "auto"} numeric
 * @property {boolean | number} live
 * @property {string} locale
 */

/**
 * Action version of `Time.svelte`, backed by `Intl.DateTimeFormat` /
 * `Intl.RelativeTimeFormat` instead of dayjs.
 * @type {import("svelte/action").Action<HTMLElement, Partial<SvelteTimeOptions>>}
 */
export const svelteTime = (node, options = {}) => {
  /** @type {undefined | ReturnType<typeof setInterval>} */
  let interval;

  /** @param {Partial<SvelteTimeOptions>} [options] */
  const updateTime = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    const timestamp = options.timestamp ?? new Date().toISOString();
    const locale = options.locale ?? "en";
    const relative = options.relative === true;
    const numeric = options.numeric ?? "auto";
    const dtOptions = options.options ?? {};
    const live = options.live ?? false;

    const render = () => {
      node.textContent = relative
        ? relativeTime(timestamp, { locale, numeric })
        : formatTime(timestamp, { locale, ...dtOptions });

      if (relative) {
        node.setAttribute(
          "title",
          formatTime(timestamp, { locale, ...dtOptions }),
        );
      } else {
        node.removeAttribute("title");
      }

      const date = new Date(timestamp);
      if (Number.isNaN(date.getTime())) {
        node.removeAttribute("datetime");
      } else {
        node.setAttribute("datetime", date.toISOString());
      }
    };

    render();

    if (relative && live !== false) {
      interval = setInterval(
        render,
        Math.abs(typeof live === "number" ? live : 60_000),
      );
    }
  };

  updateTime(options);

  return {
    update: updateTime,
    destroy() {
      clearInterval(interval);
    },
  };
};

// @ts-check
import { dayjs } from "./dayjs";

/**
 * @typedef {import("./svelte-time").SvelteTimeOptions} SvelteTimeOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteTimeOptions>>} SvelteTimeAction
 * @type {SvelteTimeAction}
 */
export const svelteTime = (node, options = {}) => {
  const DEFAULT_INTERVAL = 60 * 1_000;

  /** @type {undefined | NodeJS.Timeout} */
  let interval = undefined;

  const initDayjs = (ts, timezone) =>
    timezone !== undefined ? dayjs(ts).tz(timezone) : dayjs(ts);

  /** @type {SvelteTimeAction} */
  const setTime = (node, options = {}) => {
    const timestamp = options.timestamp || new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const live = options.live ?? false;
    const timezone = options.timezone;

    let formatted_from = initDayjs(timestamp, timezone).from();
    let formatted = initDayjs(timestamp, timezone).format(format);

    if (relative) {
      node.setAttribute("title", formatted);

      if (live !== false) {
        interval = setInterval(
          () => {
            node.innerText = initDayjs(timestamp, timezone).from();
          },
          Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
        );
      }
    }

    node.setAttribute("datetime", timestamp);
    node.innerText = relative ? formatted_from : formatted;
  };

  setTime(node, options);

  return {
    update(options = {}) {
      setTime(node, options);
    },
    destroy() {
      clearInterval(interval);
    },
  };
};

import { dayjs } from "./dayjs";

/**
 * @typedef {import("./svelte-time.svelte").SvelteTimeOptions} SvelteTimeOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteTimeOptions>>} SvelteTimeAction
 * @type {SvelteTimeAction}
 */
export const svelteTime = (node, options = {}) => {
  const DEFAULT_INTERVAL = 60 * 1_000;

  /** @type {undefined | NodeJS.Timeout} */
  let interval = undefined;

  const updateTime = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    const timestamp = options.timestamp || new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const live = options.live ?? false;

    const formatted_from = dayjs(timestamp).from();
    const formatted = dayjs(timestamp).format(format);

    if (relative) {
      if ("title" in options) {
        if (options.title !== undefined) {
          node.setAttribute("title", options.title);
        }
      } else {
        node.setAttribute("title", formatted);
      }

      if (live !== false) {
        interval = setInterval(
          () => {
            node.innerText = dayjs(timestamp).from();
          },
          Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
        );
      }
    } else {
      node.removeAttribute("title");
    }

    node.setAttribute("datetime", timestamp);
    node.innerText = relative ? formatted_from : formatted;
  };

  updateTime(options);

  return {
    update: updateTime,
    destroy() {
      clearInterval(interval);
    },
  };
};

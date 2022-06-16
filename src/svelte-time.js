import { dayjs } from "./dayjs";

/**
 * @typedef {{ timestamp?: import("dayjs").ConfigType; format?: import("dayjs").OptionType; relative?: boolean; live?: boolean | number; }} SvelteTimeActionOptions
 * @type {(node: HTMLElement, options?: SvelteTimeActionOptions )}
 */
export function svelteTime(node, options = {}) {
  const DEFAULT_INTERVAL = 60 * 1000;

  let interval = undefined;

  function setTime(node, options = {}) {
    const timestamp = options.timestamp || new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const live = options.live ?? false;

    let formatted_from = dayjs(timestamp).from();
    let formatted = dayjs(timestamp).format(format);

    if (relative) {
      node.setAttribute("title", formatted);

      if (live !== false) {
        interval = setInterval(() => {
          node.innerText = dayjs(timestamp).from();
        }, Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL));
      }
    }

    node.setAttribute("datetime", timestamp);
    node.innerText = relative ? formatted_from : formatted;
  }

  setTime(node, options);

  return {
    update(options = {}) {
      setTime(node, options);
    },
    destroy() {
      if (typeof interval === "number") {
        clearInterval(interval);
      }
    },
  };
}

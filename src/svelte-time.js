import { dayjs } from "./dayjs";

/**
 * @param {HTMLElement} node
 * @param {{ timestamp?: import("dayjs").ConfigType; format?: import("dayjs").OptionType; relative?: boolean; live?: boolean | number; }} [options]
 */
export function svelteTime(node, options = {}) {
  const DEFAULT_INTERVAL = 60 * 1000;

  let interval = undefined;

  function setTime(node, options = {}) {
    const timestamp = options.timestamp || new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const live = options.live === true;
    const formatted = relative ? dayjs(timestamp).from() : dayjs(timestamp).format(format);

    if (relative) {
      node.setAttribute("title", timestamp);

      if (live !== false) {
        interval = setInterval(() => {
          node.innerText = dayjs(timestamp).from();
        }, Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL));
      }
    }

    node.innerText = formatted;
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

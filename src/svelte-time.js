import { dayjs } from "./dayjs";



/**
 * @param {HTMLElement} node
 * @param {{ timestamp?: import("dayjs").ConfigType; format?: import("dayjs").OptionType; relative?: boolean; }} [options]
 */
export function svelteTime(node, options = {}) {
  function setTime(node, options = {}) {
    const timestamp = options.timestamp || new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const formatted = relative
      ? dayjs(timestamp).from()
      : dayjs(timestamp).format(format);

    if (relative) {
      node.setAttribute("title", timestamp);
    }

    node.innerText = formatted;
  }

  setTime(node, options);

  return {
    update(options = {}) {
      setTime(node, options);
    },
  };
}

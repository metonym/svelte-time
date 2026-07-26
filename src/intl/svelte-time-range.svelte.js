import { formatRange } from "./format";

/**
 * @typedef {object} SvelteTimeRangeOptions
 * @property {import("./format").TimeInput} start
 * @property {import("./format").TimeInput} end
 * @property {Intl.DateTimeFormatOptions} options
 * @property {string} locale
 */

/**
 * Action version of `TimeRange.svelte`.
 * @type {import("svelte/action").Action<HTMLElement, Partial<SvelteTimeRangeOptions>>}
 */
export const svelteTimeRange = (node, options = {}) => {
  const updateTimeRange = (
    /** @type {Partial<SvelteTimeRangeOptions>} */ options = {},
  ) => {
    const {
      start = "",
      end = "",
      locale = "en",
      options: dtOptions = {},
    } = options;

    const startDate = new Date(start ?? "");
    const endDate = new Date(end ?? "");
    if (
      !Number.isNaN(startDate.getTime()) &&
      !Number.isNaN(endDate.getTime())
    ) {
      node.setAttribute(
        "datetime",
        `${startDate.toISOString()}/${endDate.toISOString()}`,
      );
    } else {
      node.removeAttribute("datetime");
    }

    node.textContent = formatRange(start, end, { locale, ...dtOptions });
  };

  updateTimeRange(options);

  return { update: updateTimeRange };
};

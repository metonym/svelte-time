import { toDatetime } from "./datetime";
import { dayjs } from "./dayjs";
import { resolveLocale } from "./format";

/**
 * @typedef {import("./svelte-time-range.svelte").SvelteTimeRangeOptions} SvelteTimeRangeOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteTimeRangeOptions>>} SvelteTimeRangeAction
 * @type {SvelteTimeRangeAction}
 */
export const svelteTimeRange = (node, options = {}) => {
  // An action attaches to a single node, but a range needs two <time>
  // elements — build them once here and mutate their attributes/text
  // on every update, mirroring how `svelteTime` mutates a single node.
  const startTime = document.createElement("time");
  const separatorText = document.createTextNode("");
  const endTime = document.createElement("time");
  node.replaceChildren(startTime, separatorText, endTime);

  /** @param {import("dayjs").Dayjs} base */
  const requireTz = (base) => {
    if (typeof base.tz === "function") return;
    throw new Error(
      "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins — " +
        "see https://github.com/metonym/svelte-time#custom-timezone",
    );
  };

  /** @param {Partial<SvelteTimeRangeOptions>} [options] */
  const updateTimeRange = (options = {}) => {
    const format = options.format || "MMM DD, YYYY";
    const separator = options.separator ?? " – ";
    const tz = options.tz;
    const locale = resolveLocale(options.start, options.locale);

    /** @param {import("dayjs").ConfigType} value */
    const getDay = (value) => {
      const base = dayjs(value);
      if (tz === undefined) return base.locale(locale);
      requireTz(base);
      return base.tz(tz).locale(locale);
    };

    const startDay = getDay(options.start);
    const startDatetime = toDatetime(options.start);
    if (startDatetime === undefined) startTime.removeAttribute("datetime");
    else startTime.setAttribute("datetime", startDatetime);
    startTime.textContent = startDay.format(format);

    const endDay = getDay(options.end);
    const endDatetime = toDatetime(options.end);
    if (endDatetime === undefined) endTime.removeAttribute("datetime");
    else endTime.setAttribute("datetime", endDatetime);
    endTime.textContent = endDay.format(format);

    separatorText.textContent = separator;
  };

  updateTimeRange(options);

  return {
    update: updateTimeRange,
  };
};

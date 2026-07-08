import { toDatetime } from "./datetime";
import { dayjs } from "./dayjs";
import { resolveLocale } from "./format";
import { microFormat } from "./micro";

/**
 * @typedef {import("./svelte-time.svelte").SvelteTimeOptions} SvelteTimeOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteTimeOptions>>} SvelteTimeAction
 * @type {SvelteTimeAction}
 */
export const svelteTime = (node, options = {}) => {
  const DEFAULT_INTERVAL = 60 * 1_000;

  /** @type {undefined | NodeJS.Timeout} */
  let interval;

  /** @param {Partial<SvelteTimeOptions>} [options] */
  const updateTime = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    const timestamp = options.timestamp ?? new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const withoutSuffix = options.withoutSuffix ?? false;
    const relativeStyle = options.relativeStyle ?? "default";
    const live = options.live ?? false;
    const tz = options.tz;
    const relativeThreshold = options.relativeThreshold;
    const locale = resolveLocale(timestamp, options.locale);

    const getDay = () => {
      const base = dayjs(timestamp);
      if (tz === undefined) return base.locale(locale);
      if (typeof base.tz !== "function") {
        throw new Error(
          "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins — " +
            "see https://github.com/metonym/svelte-time#custom-timezone",
        );
      }
      return base.tz(tz).locale(locale);
    };

    /** @param {import("dayjs").Dayjs} at */
    const isPastThreshold = (at) =>
      relativeThreshold != null &&
      Math.abs(getDay().diff(at)) >= relativeThreshold;

    let formatted = getDay().format(format);

    if (relative && !isPastThreshold(dayjs())) {
      formatted =
        relativeStyle === "micro"
          ? microFormat(getDay().diff(dayjs()))
          : getDay().from(dayjs(), withoutSuffix);

      if ("title" in options) {
        if (options.title != null) {
          node.setAttribute("title", options.title);
        }
      } else {
        node.setAttribute("title", getDay().format(format));
      }

      if (live !== false) {
        interval = setInterval(
          () => {
            const now = dayjs();
            if (isPastThreshold(now)) {
              node.textContent = getDay().format(format);
              node.removeAttribute("title");
              return;
            }
            node.textContent =
              relativeStyle === "micro"
                ? microFormat(getDay().diff(now))
                : getDay().from(now, withoutSuffix);
          },
          Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
        );
      }
    } else {
      node.removeAttribute("title");
    }

    const datetime = toDatetime(timestamp);
    if (datetime === undefined) {
      node.removeAttribute("datetime");
    } else {
      node.setAttribute("datetime", datetime);
    }
    node.textContent = formatted;
  };

  updateTime(options);

  return {
    update: updateTime,
    destroy() {
      clearInterval(interval);
    },
  };
};

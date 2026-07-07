import { toDatetime } from "./datetime";
import { dayjs } from "./dayjs";
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
    let locale = options.locale ?? "en";

    // If locale is default "en" and timestamp is a dayjs instance with a locale set,
    // preserve the timestamp's locale for backward compatibility
    if (
      locale === "en" &&
      timestamp &&
      typeof timestamp === "object" &&
      "$L" in timestamp
    ) {
      const timestampLocale = timestamp.$L;
      if (timestampLocale && timestampLocale !== "en") {
        locale = timestampLocale;
      }
    }

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
        if (options.title !== undefined) {
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

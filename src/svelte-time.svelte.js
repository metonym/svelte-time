import { dayjs } from "./dayjs";
import { toDatetime } from "./datetime";
import { microFormat } from "./micro";

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

    const timestamp = options.timestamp ?? new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const withoutSuffix = options.withoutSuffix ?? false;
    const relativeStyle = options.relativeStyle ?? "default";
    const live = options.live ?? false;
    const tz = options.tz;
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

    let formatted = getDay().format(format);

    if (relative) {
      formatted =
        relativeStyle === "micro"
          ? microFormat(getDay().diff(dayjs()))
          : // Use dayjs's built-in withoutSuffix parameter (locale-aware)
            getDay().from(dayjs(), withoutSuffix);

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
            node.textContent =
              relativeStyle === "micro"
                ? microFormat(getDay().diff(dayjs()))
                : getDay().from(dayjs(), withoutSuffix);
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

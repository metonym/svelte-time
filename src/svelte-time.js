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

  /** @type {SvelteTimeAction} */
  const setTime = (node, options = {}) => {
    const timestamp = options.timestamp || new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const withoutSuffix = options.withoutSuffix ?? false;
    const live = options.live ?? false;
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

    // Clear any existing interval before setting up a new one
    clearInterval(interval);
    interval = undefined;

    let formatted = dayjs(timestamp).locale(locale).format(format);

    if (relative) {
      // Use dayjs's built-in withoutSuffix parameter (locale-aware)
      formatted = dayjs(timestamp).locale(locale).from(dayjs(), withoutSuffix);

      if ("title" in options) {
        if (options.title !== undefined) {
          node.setAttribute("title", options.title);
        }
      } else {
        node.setAttribute(
          "title",
          dayjs(timestamp).locale(locale).format(format),
        );
      }

      if (live !== false) {
        interval = setInterval(
          () => {
            node.innerText = dayjs(timestamp)
              .locale(locale)
              .from(dayjs(), withoutSuffix);
          },
          Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
        );
      }
    }

    node.setAttribute("datetime", timestamp);
    node.innerText = formatted;
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

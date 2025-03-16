import { dayjs } from "./dayjs-duration";

/**
 * @typedef {import("./svelte-duration.svelte").SvelteDurationOptions} SvelteDurationOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteDurationOptions>>} SvelteDurationAction
 * @type {SvelteDurationAction}
 */
export const svelteDuration = (node, options = {}) => {
  const DEFAULT_INTERVAL = 60 * 1_000;

  /** @type {undefined | NodeJS.Timeout} */
  let interval = undefined;

  const updateDuration = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    const value = options.value ?? 0;
    const unit = options.unit ?? "milliseconds";
    const format = options.format;
    const humanize = options.humanize ?? false;
    const locale = options.locale ?? "en";
    const live = options.live ?? false;

    let duration;
    if (typeof value === "number") {
      duration = dayjs.duration(value, unit);
    } else {
      duration = value;
    }

    let formatted;
    if (format) {
      // Use custom format (e.g., "HH:mm:ss", "mm:ss")
      const totalSeconds = Math.floor(duration.asSeconds());
      const hasHours = /H/.test(format);
      const hours = Math.floor(totalSeconds / 3600);
      // If format doesn't include hours, use total minutes; otherwise use minutes after hours
      const minutes = hasHours
        ? Math.floor((totalSeconds % 3600) / 60)
        : Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const ms = duration.milliseconds() % 1000;

      formatted = format
        .replace(/HHH/g, String(hours).padStart(3, "0"))
        .replace(/HH/g, String(hours).padStart(2, "0"))
        .replace(/H/g, String(hours))
        .replace(/mmm/g, String(minutes).padStart(3, "0"))
        .replace(/mm/g, String(minutes).padStart(2, "0"))
        .replace(/m/g, String(minutes))
        .replace(/sss/g, String(seconds).padStart(3, "0"))
        .replace(/ss/g, String(seconds).padStart(2, "0"))
        .replace(/s/g, String(seconds))
        .replace(/SSSS/g, String(ms).padStart(4, "0"))
        .replace(/SSS/g, String(ms).padStart(3, "0"))
        .replace(/SS/g, String(ms).padStart(2, "0"))
        .replace(/S/g, String(ms));
    } else if (humanize) {
      // Use human-readable format with locale
      formatted = duration.locale(locale).humanize();
    } else {
      // Fallback: return duration in milliseconds
      formatted = String(duration.asMilliseconds());
    }

    // Set datetime attribute with ISO 8601 duration format for semantic HTML
    if (node.tagName === "TIME") {
      node.setAttribute("datetime", duration.toISOString());
    }

    node.innerText = formatted;

    if (live !== false) {
      interval = setInterval(
        () => {
          // For live updates, we need to recalculate if value is a number
          // For duration objects, they're already fixed
          let currentDuration;
          if (typeof value === "number") {
            currentDuration = dayjs.duration(value, unit);
          } else {
            currentDuration = value;
          }

          let currentFormatted;
          if (format) {
            const totalSeconds = Math.floor(currentDuration.asSeconds());
            const hasHours = /H/.test(format);
            const hours = Math.floor(totalSeconds / 3600);
            // If format doesn't include hours, use total minutes; otherwise use minutes after hours
            const minutes = hasHours
              ? Math.floor((totalSeconds % 3600) / 60)
              : Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            const ms = currentDuration.milliseconds() % 1000;

            currentFormatted = format
              .replace(/HHH/g, String(hours).padStart(3, "0"))
              .replace(/HH/g, String(hours).padStart(2, "0"))
              .replace(/H/g, String(hours))
              .replace(/mmm/g, String(minutes).padStart(3, "0"))
              .replace(/mm/g, String(minutes).padStart(2, "0"))
              .replace(/m/g, String(minutes))
              .replace(/sss/g, String(seconds).padStart(3, "0"))
              .replace(/ss/g, String(seconds).padStart(2, "0"))
              .replace(/s/g, String(seconds))
              .replace(/SSSS/g, String(ms).padStart(4, "0"))
              .replace(/SSS/g, String(ms).padStart(3, "0"))
              .replace(/SS/g, String(ms).padStart(2, "0"))
              .replace(/S/g, String(ms));
          } else if (humanize) {
            currentFormatted = currentDuration.locale(locale).humanize();
          } else {
            currentFormatted = String(currentDuration.asMilliseconds());
          }

          // Update datetime attribute for live updates
          if (node.tagName === "TIME") {
            node.setAttribute("datetime", currentDuration.toISOString());
          }

          node.innerText = currentFormatted;
        },
        Math.abs(typeof live === "number" ? live : DEFAULT_INTERVAL),
      );
    }
  };

  updateDuration(options);

  return {
    update: updateDuration,
    destroy() {
      clearInterval(interval);
    },
  };
};

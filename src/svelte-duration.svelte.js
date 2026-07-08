import { dayjs } from "./dayjs";
import { formatDuration } from "./duration-format";

/**
 * @typedef {import("./svelte-duration.svelte").SvelteDurationOptions} SvelteDurationOptions
 * @typedef {import ("svelte/action").Action<HTMLElement, Partial<SvelteDurationOptions>>} SvelteDurationAction
 * @type {SvelteDurationAction}
 */
export const svelteDuration = (node, options = {}) => {
  const DEFAULT_INTERVAL = 60 * 1_000;

  /** @type {undefined | NodeJS.Timeout} */
  let interval;

  const render = (options = {}) => {
    const value = options.value ?? 0;
    const unit = options.unit ?? "milliseconds";
    const since = options.since;
    const format = options.format ?? "HH:mm:ss";
    const humanize = options.humanize ?? false;
    const withSuffix = options.withSuffix ?? false;
    const locale = options.locale ?? "en";

    const result =
      since === undefined
        ? formatDuration({ value, unit, format, humanize, withSuffix, locale })
        : formatDuration({
            value: dayjs().diff(dayjs(since)),
            unit: "milliseconds",
            format,
            humanize,
            withSuffix,
            locale,
          });

    node.setAttribute("datetime", result.datetime);
    node.textContent = result.formatted;
  };

  const updateDuration = (options = {}) => {
    clearInterval(interval);
    interval = undefined;

    render(options);

    const live = options.live ?? false;
    if (options.since !== undefined && live !== false) {
      interval = setInterval(
        () => render(options),
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

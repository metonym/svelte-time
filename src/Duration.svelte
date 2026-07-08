<script>
  /** @type {import("./Duration.svelte.d.ts").DurationProps} */
  const {
    /**
     * Duration value. Accepts anything dayjs's `duration()` accepts: a
     * number (paired with `unit`), an ISO 8601 duration string (e.g.
     * "PT1H30M"), a plain object of unit fields, or a dayjs `Duration`
     * instance. Ignored when `since` is provided.
     * @type {number | string | object | import("./duration-format").DayjsDuration}
     */
    value = 0,

    /**
     * Unit for the duration value. Only applies when `value` is a plain number.
     * @type {import("./duration-format").DurationUnit}
     */
    unit = "milliseconds",

    /**
     * Start instant to count elapsed time from (e.g. a stopwatch/timer).
     * When provided, `value` and `unit` are ignored and the displayed
     * duration is `now - since`.
     * @type {import("dayjs").ConfigType}
     */
    since = undefined,

    /**
     * Format for display, using dayjs's duration `format()` tokens
     * (e.g. "HH:mm:ss"). Ignored when `humanize` is `true`.
     * @type {string}
     */
    format = "HH:mm:ss",

    /**
     * Set to `true` to display the duration in a human-readable format
     * (e.g. "an hour", "2 minutes") instead of `format`.
     * @type {boolean}
     */
    humanize = false,

    /**
     * Set to `true` to include a relative suffix in humanized output
     * (e.g. "in an hour" / "an hour ago"). Only applies when `humanize`
     * is `true`.
     * @type {boolean}
     */
    withSuffix = false,

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * Set to `true` to update the elapsed duration at an adaptive
     * interval. Pass a number (ms) to specify a fixed interval. Only
     * applies when `since` is provided.
     * @type {boolean | number}
     */
    live = false,

    /**
     * Snippet rendered inside the `time` element instead of the plain
     * formatted string. Receives the formatted value as its argument.
     * @type {import("svelte").Snippet<[string]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { untrack } from "svelte";
  import { dayjs } from "./dayjs";
  import { formatDuration } from "./duration-format";
  import { liveInterval, sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  // Tier for adaptive `live === true` scheduling. See Time.svelte for
  // why this is seeded via `$state` + an effect rather than derived
  // directly from `now` (avoiding a `now` -> interval -> `now` cycle).
  let interval = $state(
    untrack(() =>
      liveInterval(since === undefined ? 0 : dayjs(since).diff(dayjs())),
    ),
  );

  $effect(() => {
    if (since !== undefined && live === true) {
      const next = liveInterval(dayjs(since).diff(now));
      if (next !== interval) interval = next;
    }
  });

  const effectiveInterval = $derived(
    typeof live === "number" ? Math.abs(live) : interval,
  );

  const now = $derived(
    since !== undefined && live !== false && canTick
      ? sharedNow(effectiveInterval)
      : dayjs(),
  );

  /**
   * Formatted duration and its ISO 8601 `datetime` value.
   * @type {{ formatted: string, datetime: string }}
   */
  const result = $derived.by(() => {
    if (since !== undefined) {
      return formatDuration({
        value: now.diff(dayjs(since)),
        unit: "milliseconds",
        format,
        humanize,
        withSuffix,
        locale,
      });
    }
    return formatDuration({
      value,
      unit,
      format,
      humanize,
      withSuffix,
      locale,
    });
  });
</script>

{#if children}
  <time
    datetime={result.datetime}
    {...rest}
  >
    {@render children(result.formatted)}
  </time>
{:else}
  <time
    datetime={result.datetime}
    {...rest}
  >
    {result.formatted}
  </time>
{/if}

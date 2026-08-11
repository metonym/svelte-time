<script>
  /** @type {import("./Duration.svelte.d.ts").DurationProps} */
  const {
    /**
     * Duration value: a number with `unit`, an ISO 8601 string like
     * "PT1H30M", a plain object of unit fields, or a dayjs `Duration`.
     * Ignored when `since` is set.
     * @type {number | string | object | import("./duration-format").DayjsDuration}
     */
    value = 0,

    /**
     * Unit for the duration value. Only applies when `value` is a plain number.
     * @type {import("./duration-format").DurationUnit}
     */
    unit = "milliseconds",

    /**
     * Start instant for elapsed time. When set, `value`/`unit` are
     * ignored and the display is `now - since`.
     * @type {import("dayjs").ConfigType}
     */
    since = undefined,

    /**
     * Display format using dayjs duration tokens (e.g. "HH:mm:ss").
     * Ignored when `humanize` is `true`.
     * @type {string}
     */
    format = "HH:mm:ss",

    /**
     * Human-readable duration (e.g. "an hour") instead of `format`.
     * @type {boolean}
     */
    humanize = false,

    /**
     * Add a relative suffix to humanized output (e.g. "in an hour").
     * Only applies when `humanize` is `true`.
     * @type {boolean}
     */
    withSuffix = false,

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * Keep elapsed duration updating. `true` uses the adaptive schedule;
     * a number sets a fixed interval in ms. Only applies with `since`.
     * @type {boolean | number}
     */
    live = false,

    /**
     * Custom markup inside the `time` element. Receives the formatted
     * value as its argument.
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
  // why this is seeded via `$state` + an effect, not derived from `now`
  // (avoids a `now` -> interval -> `now` cycle).
  let interval = $state(
    untrack(() =>
      liveInterval(since === undefined ? 0 : dayjs(since).diff(dayjs())),
    ),
  );

  $effect(() => {
    if (since !== undefined && live === true) {
      // Track `now` only to re-run on each tick of the shared clock; the
      // tier decision itself uses a fresh, non-cached current time so it
      // can't disagree with itself as `interval` switches which shared
      // clock `now` reads from.
      void now;
      const next = liveInterval(dayjs(since).diff(dayjs()));
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

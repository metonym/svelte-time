<script>
  /** @type {import("./Countdown.svelte.d.ts").CountdownProps} */
  const {
    /**
     * Target instant to count down to. Changing `to` restarts the
     * countdown (and resets `oncomplete` to fire again once the new
     * target is reached).
     * @type {import("dayjs").ConfigType}
     */
    to,

    /**
     * Format for display, using dayjs's duration `format()` tokens
     * (e.g. "HH:mm:ss"). Ignored when `humanize` is `true`.
     * @type {string}
     */
    format = "HH:mm:ss",

    /**
     * Set to `true` to display the remaining time in a human-readable
     * format (e.g. "an hour") instead of `format`.
     * @type {boolean}
     */
    humanize = false,

    /**
     * Set to `true` to include a relative suffix in humanized output
     * (e.g. "in an hour"). Only applies when `humanize` is `true`.
     * @type {boolean}
     */
    withSuffix = false,

    /**
     * The locale to use for formatting
     * @type {import("./locales").Locales}
     */
    locale = "en",

    /**
     * Set to `true` to tick every second. Pass a number (ms) to use a
     * custom fixed interval instead. Unlike `Duration`'s `since`/`live`
     * (tuned for slowly-decaying "x minutes ago" text), a countdown's
     * final seconds matter most, so this is a flat interval rather than
     * one that coarsens over time.
     * @type {boolean | number}
     */
    live = true,

    /**
     * Called once, when the countdown reaches `to`.
     * @type {(() => void) | undefined}
     */
    oncomplete,

    /**
     * Snippet rendered inside the `time` element instead of the plain
     * formatted string. Receives the formatted value and whether the
     * countdown has completed.
     * @type {import("svelte").Snippet<[string, boolean]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { dayjs } from "./dayjs";
  import { formatDuration } from "./duration-format";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  // Once the countdown completes, `now` stops depending on the shared
  // ticker (see below), which freezes `remainingMs` at 0 and lets the
  // timer subscription tear down instead of ticking forever.
  let completed = $state(false);

  // Reset completion when `to` moves to a new instant, so a caller can
  // restart the countdown by simply changing `to`.
  $effect(() => {
    to;
    completed = false;
  });

  const effectiveInterval = $derived(
    typeof live === "number" ? Math.abs(live) : 1000,
  );

  const now = $derived(
    live !== false && canTick && !completed
      ? sharedNow(effectiveInterval)
      : dayjs(),
  );

  const remainingMs = $derived(Math.max(0, dayjs(to).diff(now)));

  $effect(() => {
    if (remainingMs === 0 && !completed) {
      completed = true;
      oncomplete?.();
    }
  });

  const result = $derived.by(() =>
    formatDuration({
      value: remainingMs,
      unit: "milliseconds",
      format,
      humanize,
      withSuffix,
      locale,
    }),
  );
</script>

{#if children}
  <time
    datetime={result.datetime}
    {...rest}
  >
    {@render children(result.formatted, completed)}
  </time>
{:else}
  <time
    datetime={result.datetime}
    {...rest}
  >
    {result.formatted}
  </time>
{/if}

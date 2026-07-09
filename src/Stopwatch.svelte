<script>
  /** @type {import("./Stopwatch.svelte.d.ts").StopwatchProps} */
  const {
    /**
     * Start instant to count elapsed time from. Captured once at mount
     * as "now" when omitted. Changing `since` resets the stopwatch to
     * zero from the new anchor (mirrors `Countdown`'s "changing `to`
     * restarts it").
     * @type {import("dayjs").ConfigType}
     */
    since = undefined,

    /**
     * Set to `false` to pause the stopwatch (freezes the displayed
     * elapsed value). Set back to `true` to resume — the paused
     * interval is excluded from the elapsed count.
     * @type {boolean}
     */
    running = true,

    /**
     * Format for display, using dayjs's duration `format()` tokens
     * (e.g. "HH:mm:ss"). Ignored when `humanize` is `true`.
     * @type {string}
     */
    format = "HH:mm:ss",

    /**
     * Set to `true` to display the elapsed time in a human-readable
     * format (e.g. "an hour", "2 minutes") instead of `format`.
     * @type {boolean}
     */
    humanize = false,

    /**
     * Set to `true` to include a relative suffix in humanized output
     * (e.g. "an hour ago"). Only applies when `humanize` is `true`.
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
     * custom fixed interval instead. Unlike `Duration`'s adaptive
     * coarsening (tuned for slowly-decaying "x minutes ago" text), an
     * actively-running stopwatch always needs its seconds ticking, so
     * this follows `Countdown`'s flat-interval reasoning. Only applies
     * while `running` is `true`.
     * @type {boolean | number}
     */
    live = true,

    /**
     * Snippet rendered inside the `time` element instead of the plain
     * formatted string. Receives the formatted value and the current
     * `running` state.
     * @type {import("svelte").Snippet<[string, boolean]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { untrack } from "svelte";
  import { dayjs } from "./dayjs";
  import { formatDuration } from "./duration-format";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  // Anchor instant the stopwatch counts up from. Captured once at
  // mount when `since` is omitted; updated (and reset) when a caller
  // later passes or changes `since`.
  let anchor = $state(
    untrack(() => (since === undefined ? dayjs() : dayjs(since))),
  );

  // Total milliseconds spent paused so far, and the instant the
  // current pause began (or `undefined` while running). `elapsedMs`
  // below subtracts both so resuming never jumps the display forward
  // by the paused duration.
  let pausedMs = $state(0);
  /** @type {import("dayjs").Dayjs | undefined} */
  let pausedAt = $state(undefined);

  // Changing `since` restarts the stopwatch from the new anchor. Reads
  // `running` untracked so toggling pause/resume doesn't itself
  // re-trigger this reset.
  $effect(() => {
    if (since !== undefined) {
      anchor = dayjs(since);
      pausedMs = 0;
      pausedAt = untrack(() => running) ? undefined : dayjs();
    }
  });

  // Track paused time whenever `running` toggles, excluding it from
  // the elapsed count on resume.
  $effect(() => {
    if (running) {
      if (pausedAt !== undefined) {
        pausedMs += dayjs().diff(pausedAt);
        pausedAt = undefined;
      }
    } else if (pausedAt === undefined) {
      pausedAt = dayjs();
    }
  });

  const effectiveInterval = $derived(
    typeof live === "number" ? Math.abs(live) : 1000,
  );

  const now = $derived(
    running && live !== false && canTick
      ? sharedNow(effectiveInterval)
      : dayjs(),
  );

  const elapsedMs = $derived(
    Math.max(
      0,
      now.diff(anchor) - pausedMs - (pausedAt ? now.diff(pausedAt) : 0),
    ),
  );

  const result = $derived.by(() =>
    formatDuration({
      value: elapsedMs,
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
    {@render children(result.formatted, running)}
  </time>
{:else}
  <time
    datetime={result.datetime}
    {...rest}
  >
    {result.formatted}
  </time>
{/if}

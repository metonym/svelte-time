<script>
  /** @type {import("./Stopwatch.svelte.d.ts").StopwatchProps} */
  const {
    /**
     * Start instant. Captured as "now" at mount when omitted. Changing
     * `since` resets to zero from the new anchor.
     * @type {import("dayjs").ConfigType}
     */
    since = undefined,

    /**
     * Set to `false` to pause (freezes the display). Set back to `true`
     * to resume; the paused gap is excluded from the elapsed count.
     * @type {boolean}
     */
    running = true,

    /**
     * Display format using dayjs duration tokens (e.g. "HH:mm:ss").
     * Ignored when `humanize` is `true`.
     * @type {string}
     */
    format = "HH:mm:ss",

    /**
     * Human-readable elapsed time (e.g. "an hour") instead of `format`.
     * @type {boolean}
     */
    humanize = false,

    /**
     * Add a relative suffix to humanized output (e.g. "an hour ago").
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
     * Tick every second when `true`, or at a fixed ms interval when a
     * number. Flat interval like `Countdown`: a running stopwatch needs
     * its seconds. Only applies while `running` is `true`.
     * @type {boolean | number}
     */
    live = true,

    /**
     * Custom markup inside the `time` element. Receives the formatted
     * value and the current `running` state.
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

  // Anchor the stopwatch counts up from. Captured at mount when
  // `since` is omitted; reset when `since` is later set or changed.
  let anchor = $state(
    untrack(() => (since === undefined ? dayjs() : dayjs(since))),
  );

  // Total ms paused so far, and when the current pause began
  // (`undefined` while running). `elapsedMs` subtracts both so resume
  // never jumps forward by the paused duration.
  let pausedMs = $state(0);
  /** @type {import("dayjs").Dayjs | undefined} */
  let pausedAt = $state(undefined);

  // Changing `since` restarts from the new anchor. Reads `running`
  // untracked so pause/resume does not re-trigger this reset.
  $effect(() => {
    if (since !== undefined) {
      anchor = dayjs(since);
      pausedMs = 0;
      pausedAt = untrack(() => running) ? undefined : dayjs();
    }
  });

  // Track paused time when `running` toggles; exclude it on resume.
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

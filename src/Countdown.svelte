<script>
  /** @type {import("./Countdown.svelte.d.ts").CountdownProps} */
  const {
    /**
     * Target instant. Changing `to` restarts the countdown and lets
     * `oncomplete` fire again when the new target is reached.
     * @type {import("dayjs").ConfigType}
     */
    to,

    /**
     * Display format using dayjs duration tokens (e.g. "HH:mm:ss").
     * Ignored when `humanize` is `true`.
     * @type {string}
     */
    format = "HH:mm:ss",

    /**
     * Human-readable remaining time (e.g. "an hour") instead of `format`.
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
     * Tick every second when `true`, or at a fixed ms interval when a
     * number. Flat interval on purpose: a countdown's last seconds
     * matter more than the coarser adaptive "x minutes ago" schedule.
     * @type {boolean | number}
     */
    live = true,

    /**
     * Called once, when the countdown reaches `to`.
     * @type {(() => void) | undefined}
     */
    oncomplete,

    /**
     * Custom markup inside the `time` element. Receives the formatted
     * value and whether the countdown has completed.
     * @type {import("svelte").Snippet<[string, boolean]> | undefined}
     */
    children,
    ...rest
  } = $props();

  import { dayjs } from "./dayjs";
  import { formatDuration } from "./duration-format";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  // Once complete, `now` stops depending on the shared ticker, which
  // freezes `remainingMs` at 0 and lets the timer subscription tear down.
  let completed = $state(false);

  // Reset completion when `to` changes so the countdown can restart.
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

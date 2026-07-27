<script>
  const {
    /** Start instant. Captured as "now" at mount when omitted. Changing
     * `since` resets the stopwatch.
     * @type {import("./format").TimeInput | undefined} */
    since = undefined,

    /** Set to `false` to pause (freezes the display); back to `true`
     * to resume. The paused gap is excluded.
     * @type {boolean} */
    running = true,

    /** @type {"digital" | "long" | "short" | "narrow"} */
    style = "digital",

    /** @type {string} */
    locale = "en",

    /** Set to `true` to tick every second. Pass a number (ms) for a
     * custom fixed interval. Only applies while `running` is `true`.
     * @type {boolean | number} */
    live = true,

    /** @type {import("svelte").Snippet<[string, boolean]> | undefined} */
    children,
    ...rest
  } = $props();

  import { untrack } from "svelte";
  import { formatDuration, toISODuration } from "./format";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  let anchor = $state(
    untrack(() => (since === undefined ? new Date() : new Date(since))),
  );

  let pausedMs = $state(0);
  let pausedAt = $state(/** @type {Date | undefined} */ (undefined));

  $effect(() => {
    if (since !== undefined) {
      anchor = new Date(since);
      pausedMs = 0;
      pausedAt = untrack(() => running) ? undefined : new Date();
    }
  });

  $effect(() => {
    if (running) {
      if (pausedAt !== undefined) {
        pausedMs += Date.now() - pausedAt.getTime();
        pausedAt = undefined;
      }
    } else if (pausedAt === undefined) {
      pausedAt = new Date();
    }
  });

  const effectiveInterval = $derived(
    typeof live === "number" ? Math.abs(live) : 1_000,
  );

  const now = $derived(
    running && live !== false && canTick
      ? sharedNow(effectiveInterval)
      : new Date(),
  );

  const elapsedMs = $derived(
    Math.max(
      0,
      now.getTime() -
        anchor.getTime() -
        pausedMs -
        (pausedAt ? now.getTime() - pausedAt.getTime() : 0),
    ),
  );

  const formatted = $derived(
    formatDuration(elapsedMs, {
      locale,
      style: /** @type {"digital" | "long" | "short" | "narrow"} */ (style),
    }),
  );
  const datetime = $derived(toISODuration(elapsedMs));
</script>

{#if children}
  <time
    {datetime}
    {...rest}
  >
    {@render children(formatted, running)}
  </time>
{:else}
  <time
    {datetime}
    {...rest}
  >
    {formatted}
  </time>
{/if}

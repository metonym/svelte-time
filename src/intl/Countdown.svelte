<script>
  const {
    /** Target instant. Changing `to` restarts the countdown.
     * @type {import("./format").TimeInput} */
    to,

    /** @type {"digital" | "long" | "short" | "narrow"} */
    style = "digital",

    /** @type {string} */
    locale = "en",

    /** Set to `true` to tick every second. Pass a number (ms) for a
     * custom fixed interval.
     * @type {boolean | number} */
    live = true,

    /** Called once, when the countdown reaches `to`.
     * @type {(() => void) | undefined} */
    oncomplete,

    /** @type {import("svelte").Snippet<[string, boolean]> | undefined} */
    children,
    ...rest
  } = $props();

  import { formatDuration, toISODuration } from "./format";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  let completed = $state(false);

  $effect(() => {
    to;
    completed = false;
  });

  const effectiveInterval = $derived(
    typeof live === "number" ? Math.abs(live) : 1_000,
  );

  const now = $derived(
    live !== false && canTick && !completed
      ? sharedNow(effectiveInterval)
      : new Date(),
  );

  const remainingMs = $derived(
    Math.max(0, new Date(to).getTime() - now.getTime()),
  );

  $effect(() => {
    if (remainingMs === 0 && !completed) {
      completed = true;
      oncomplete?.();
    }
  });

  const formatted = $derived(
    formatDuration(remainingMs, {
      locale,
      style: /** @type {"digital" | "long" | "short" | "narrow"} */ (style),
    }),
  );
  const datetime = $derived(toISODuration(remainingMs));
</script>

{#if children}
  <time
    {datetime}
    {...rest}
  >
    {@render children(formatted, completed)}
  </time>
{:else}
  <time
    {datetime}
    {...rest}
  >
    {formatted}
  </time>
{/if}

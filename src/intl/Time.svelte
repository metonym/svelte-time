<script>
  const {
    /** @type {import("./format").TimeInput} */
    timestamp = new Date().toISOString(),

    /** Passed to `Intl.DateTimeFormat`. Defaults to `{ dateStyle: "medium" }`.
     * @type {Intl.DateTimeFormatOptions} */
    options = {},

    /** @type {boolean} */
    relative = false,

    /** @type {"always" | "auto"} */
    numeric = "auto",

    /** Set to `true` (or a ms interval) to keep `relative` output live.
     * @type {boolean | number} */
    live = false,

    /** @type {string} */
    locale = "en",

    /** @type {import("svelte").Snippet<[string]> | undefined} */
    children,
    ...rest
  } = $props();

  import { formatTime, relativeTime } from "./format";
  import { sharedNow } from "./ticker";

  const canTick = typeof document !== "undefined";

  const now = $derived(
    relative && live !== false && canTick
      ? sharedNow(Math.abs(typeof live === "number" ? live : 60_000))
      : new Date(),
  );

  const formatted = $derived(
    relative
      ? relativeTime(timestamp, {
          locale,
          from: now,
          numeric: /** @type {"always" | "auto"} */ (numeric),
        })
      : formatTime(timestamp, { locale, ...options }),
  );

  const title = $derived(
    relative ? formatTime(timestamp, { locale, ...options }) : undefined,
  );

  const datetime = $derived.by(() => {
    const date = new Date(timestamp);
    return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
  });
</script>

{#if children}
  <time
    {title}
    {...rest}
    {datetime}
  >
    {@render children(formatted)}
  </time>
{:else}
  <time
    {title}
    {...rest}
    {datetime}
  >
    {formatted}
  </time>
{/if}

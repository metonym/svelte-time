<script>
  const {
    /** Start instant of the range.
     * @type {import("./format").TimeInput} */
    start,

    /** End instant of the range.
     * @type {import("./format").TimeInput} */
    end,

    /** @type {Intl.DateTimeFormatOptions} */
    options = {},

    /** @type {string} */
    locale = "en",

    /** @type {import("svelte").Snippet<[string]> | undefined} */
    children,
    ...rest
  } = $props();

  import { formatRange } from "./format";

  const formatted = $derived(formatRange(start, end, { locale, ...options }));

  // ISO 8601 interval (start/end). A single instant can't represent a
  // range. The main package's `TimeRange` uses two <time> elements; this
  // one uses a single element with the native condensed text.
  const datetime = $derived.by(() => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return undefined;
    }
    return `${startDate.toISOString()}/${endDate.toISOString()}`;
  });
</script>

{#if children}
  <time
    {datetime}
    {...rest}
  >
    {@render children(formatted)}
  </time>
{:else}
  <time
    {datetime}
    {...rest}
  >
    {formatted}
  </time>
{/if}

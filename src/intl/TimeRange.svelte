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

  // ISO 8601 interval notation (RFC — start/end), since a single instant
  // can't represent a range; unlike the main package's two-<time>-element
  // `TimeRange`, this renders one element with the native condensed text.
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

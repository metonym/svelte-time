import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { TimeInput } from "./format";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface TimeRangeProps extends RestProps {
  /** Start instant of the range. */
  start: TimeInput;

  /** End instant of the range. */
  end: TimeInput;

  /** Passed to `Intl.DateTimeFormat`. Defaults to `{ dateStyle: "medium" }`. */
  options?: Intl.DateTimeFormatOptions;

  /** @default "en" */
  locale?: string;

  children?: Snippet<[string]>;
}

declare const TimeRange: Component<TimeRangeProps>;

export default TimeRange;

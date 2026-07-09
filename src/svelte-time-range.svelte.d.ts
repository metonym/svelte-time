import type { Action } from "svelte/action";
import type { TimeRangeProps } from "./TimeRange.svelte";

export interface SvelteTimeRangeOptions
  extends Pick<
    TimeRangeProps,
    "start" | "end" | "format" | "separator" | "locale" | "tz"
  > {}

export const svelteTimeRange: Action<
  HTMLElement,
  undefined | Partial<SvelteTimeRangeOptions>
>;

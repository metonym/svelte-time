import type { Action } from "svelte/action";
import type { StopwatchProps } from "./Stopwatch.svelte";

export interface SvelteStopwatchOptions
  extends Pick<
    StopwatchProps,
    "since" | "running" | "style" | "locale" | "live"
  > {}

export const svelteStopwatch: Action<
  HTMLElement,
  undefined | Partial<SvelteStopwatchOptions>
>;

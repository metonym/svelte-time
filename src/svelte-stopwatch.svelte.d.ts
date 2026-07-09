import type { Action } from "svelte/action";
import type { StopwatchProps } from "./Stopwatch.svelte";

export interface SvelteStopwatchOptions
  extends Pick<
    StopwatchProps,
    | "since"
    | "running"
    | "format"
    | "humanize"
    | "withSuffix"
    | "locale"
    | "live"
  > {}

export const svelteStopwatch: Action<
  HTMLElement,
  undefined | Partial<SvelteStopwatchOptions>
>;

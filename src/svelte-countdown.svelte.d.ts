import type { Action } from "svelte/action";
import type { CountdownProps } from "./Countdown.svelte";

export interface SvelteCountdownOptions
  extends Pick<
    CountdownProps,
    | "to"
    | "format"
    | "humanize"
    | "withSuffix"
    | "locale"
    | "live"
    | "oncomplete"
  > {}

export const svelteCountdown: Action<
  HTMLElement,
  undefined | Partial<SvelteCountdownOptions>
>;

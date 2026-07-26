import type { Action } from "svelte/action";
import type { TimeProps } from "./Time.svelte";

export interface SvelteTimeOptions
  extends Pick<
    TimeProps,
    "timestamp" | "options" | "relative" | "numeric" | "live" | "locale"
  > {}

export const svelteTime: Action<
  HTMLElement,
  undefined | Partial<SvelteTimeOptions>
>;

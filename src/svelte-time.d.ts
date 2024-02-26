import type { Action } from "svelte/action";
import type { TimeProps } from "./Time.svelte";

export interface SvelteTimeOptions
  extends Pick<TimeProps, "timestamp" | "format" | "relative" | "live" | "timezone"> {}

export const svelteTime: Action<
  HTMLElement,
  undefined | Partial<SvelteTimeOptions>
>;

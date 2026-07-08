import type { Action } from "svelte/action";
import type { TimeProps } from "./Time.svelte";

export interface SvelteTimeOptions extends Pick<
  TimeProps,
  | "timestamp"
  | "format"
  | "relative"
  | "withoutSuffix"
  | "relativeStyle"
  | "live"
  | "title"
  | "locale"
  | "tz"
> {}

export const svelteTime: Action<
  HTMLElement,
  undefined | Partial<SvelteTimeOptions>
>;

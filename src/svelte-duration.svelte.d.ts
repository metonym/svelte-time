import type { Action } from "svelte/action";
import type { DurationProps } from "./Duration.svelte";

export interface SvelteDurationOptions extends Pick<
  DurationProps,
  "value" | "unit" | "format" | "humanize" | "locale" | "live"
> {}

export const svelteDuration: Action<
  HTMLElement,
  undefined | Partial<SvelteDurationOptions>
>;

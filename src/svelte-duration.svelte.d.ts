import type { Action } from "svelte/action";
import type { DurationProps } from "./Duration.svelte";

export interface SvelteDurationOptions
  extends Pick<
    DurationProps,
    | "value"
    | "unit"
    | "since"
    | "format"
    | "humanize"
    | "withSuffix"
    | "locale"
    | "live"
  > {}

export const svelteDuration: Action<
  HTMLElement,
  undefined | Partial<SvelteDurationOptions>
>;

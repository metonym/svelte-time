import type { Attachment } from "svelte/attachments";
import type { SvelteCountdownOptions } from "./svelte-countdown.svelte";
import type { SvelteDurationOptions } from "./svelte-duration.svelte";
import type { SvelteTimeOptions } from "./svelte-time.svelte";
import type { SvelteTimeRangeOptions } from "./svelte-time-range.svelte";

export function time(
  options?: Partial<SvelteTimeOptions>,
): Attachment<HTMLElement>;

export function duration(
  options?: Partial<SvelteDurationOptions>,
): Attachment<HTMLElement>;

export function countdown(
  options?: Partial<SvelteCountdownOptions>,
): Attachment<HTMLElement>;

export function timeRange(
  options?: Partial<SvelteTimeRangeOptions>,
): Attachment<HTMLElement>;

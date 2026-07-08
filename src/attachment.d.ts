import type { Attachment } from "svelte/attachments";
import type { SvelteDurationOptions } from "./svelte-duration.svelte";
import type { SvelteTimeOptions } from "./svelte-time.svelte";

export function time(
  options?: Partial<SvelteTimeOptions>,
): Attachment<HTMLElement>;

export function duration(
  options?: Partial<SvelteDurationOptions>,
): Attachment<HTMLElement>;

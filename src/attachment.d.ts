import type { Attachment } from "svelte/attachments";
import type { SvelteTimeOptions } from "./svelte-time.svelte";

export function time(
  options?: Partial<SvelteTimeOptions>,
): Attachment<HTMLElement>;

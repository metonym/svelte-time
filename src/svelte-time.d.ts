import { TimeProps } from "./Time.svelte";

export interface SvelteTimeOptions
  extends Pick<TimeProps, "timestamp" | "format" | "relative" | "live"> {}

export function svelteTime(
  node: HTMLElement,
  options?: Partial<SvelteTimeOptions>
): {
  update: (options?: Partial<SvelteTimeOptions>) => void;
  destroy: () => void;
};

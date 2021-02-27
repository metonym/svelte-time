import { ConfigType, OptionType } from "dayjs";

export interface SvelteTimeOptions {
  relative: boolean;
  timestamp: ConfigType;
  format: OptionType;
}

export function svelteTime(
  node: HTMLElement,
  options?: Partial<SvelteTimeOptions>
): {};

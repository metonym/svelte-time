import { ConfigType, OptionType } from "dayjs";

export interface SvelteTimeOptions {
  timestamp: ConfigType;
  format: OptionType;
  relative: boolean;
  live: boolean;
}

export function svelteTime(
  node: HTMLElement,
  options?: Partial<SvelteTimeOptions>
): {
  update: (options?: Partial<SvelteTimeOptions>) => void;
  destroy: () => void;
};

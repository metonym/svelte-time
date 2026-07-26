import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { TimeInput } from "./format";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface TimeProps extends RestProps {
  /** @default new Date().toISOString() */
  timestamp?: TimeInput;

  /** Passed to `Intl.DateTimeFormat`. Defaults to `{ dateStyle: "medium" }`. */
  options?: Intl.DateTimeFormatOptions;

  /** @default false */
  relative?: boolean;

  /** Only applies when `relative` is `true`. @default "auto" */
  numeric?: "always" | "auto";

  /** @default false */
  live?: boolean | number;

  /** @default "en" */
  locale?: string;

  children?: Snippet<[string]>;
}

declare const Time: Component<TimeProps>;

export default Time;

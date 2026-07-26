import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { TimeInput } from "./format";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface StopwatchProps extends RestProps {
  /** Start instant to count elapsed time from. Captured once at mount
   * as "now" when omitted. Changing `since` resets the stopwatch.
   * @default undefined
   */
  since?: TimeInput;

  /** Set to `false` to pause; back to `true` to resume.
   * @default true
   */
  running?: boolean;

  /** @default "digital" */
  style?: "digital" | "long" | "short" | "narrow";

  /** @default "en" */
  locale?: string;

  /** @default true */
  live?: boolean | number;

  /**
   * Snippet rendered inside the `time` element instead of the plain
   * formatted string. Receives the formatted value and the current
   * `running` state.
   */
  children?: Snippet<[string, boolean]>;
}

declare const Stopwatch: Component<StopwatchProps>;

export default Stopwatch;

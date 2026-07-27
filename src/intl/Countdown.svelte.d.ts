import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { TimeInput } from "./format";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface CountdownProps extends RestProps {
  /** Target instant. Changing `to` restarts the countdown. */
  to: TimeInput;

  /** @default "digital" */
  style?: "digital" | "long" | "short" | "narrow";

  /** @default "en" */
  locale?: string;

  /** @default true */
  live?: boolean | number;

  /** Called once when the countdown reaches `to`. */
  oncomplete?: () => void;

  /**
   * Custom markup inside the `time` element. Receives the formatted
   * value and whether the countdown has completed.
   */
  children?: Snippet<[string, boolean]>;
}

declare const Countdown: Component<CountdownProps>;

export default Countdown;

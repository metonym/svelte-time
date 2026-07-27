import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface CountdownProps extends RestProps {
  /**
   * Target instant. Changing `to` restarts the countdown and lets
   * `oncomplete` fire again when the new target is reached.
   */
  to: ConfigType;

  /**
   * Display format using dayjs duration tokens (e.g. "HH:mm:ss").
   * Ignored when `humanize` is `true`.
   * @default "HH:mm:ss"
   */
  format?: string;

  /**
   * Human-readable remaining time (e.g. "an hour") instead of `format`.
   * @default false
   */
  humanize?: boolean;

  /**
   * Add a relative suffix to humanized output (e.g. "in an hour").
   * Only applies when `humanize` is `true`.
   * @default false
   */
  withSuffix?: boolean;

  /**
   * The locale to use for formatting
   * @default "en"
   */
  locale?: Locales;

  /**
   * Tick every second when `true`, or at a fixed ms interval when a
   * number.
   * @default true
   */
  live?: boolean | number;

  /**
   * Called once when the countdown reaches `to`. Fires on mount if
   * `to` is already past. Fires again if `to` later changes to another
   * already-elapsed instant.
   */
  oncomplete?: () => void;

  /**
   * Custom markup inside the `time` element. Receives the formatted
   * value and whether the countdown has completed.
   */
  children?: Snippet<[string, boolean]>;

  [key: `data-${string}`]: unknown;
}

declare const Countdown: Component<CountdownProps>;

export default Countdown;

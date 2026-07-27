import type { ConfigType } from "dayjs";
import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";
import type { Locales } from "./locales";

type RestProps = Omit<SvelteHTMLElements["time"], "children">;

export interface StopwatchProps extends RestProps {
  /**
   * Start instant. Captured as "now" at mount when omitted. Changing
   * `since` resets to zero from the new anchor.
   * @default undefined
   */
  since?: ConfigType;

  /**
   * Set to `false` to pause (freezes the display). Set back to `true`
   * to resume; the paused gap is excluded from the elapsed count.
   * @default true
   */
  running?: boolean;

  /**
   * Display format using dayjs duration tokens (e.g. "HH:mm:ss").
   * Ignored when `humanize` is `true`.
   * @default "HH:mm:ss"
   */
  format?: string;

  /**
   * Human-readable elapsed time (e.g. "an hour") instead of `format`.
   * @default false
   */
  humanize?: boolean;

  /**
   * Add a relative suffix to humanized output (e.g. "an hour ago").
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
   * number. Only applies while `running` is `true`.
   * @default true
   */
  live?: boolean | number;

  /**
   * Custom markup inside the `time` element. Receives the formatted
   * value and the current `running` state.
   */
  children?: Snippet<[string, boolean]>;

  [key: `data-${string}`]: unknown;
}

declare const Stopwatch: Component<StopwatchProps>;

export default Stopwatch;

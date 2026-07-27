import {
  formatDuration,
  formatRange,
  formatTime,
  relativeTime,
  toISODuration,
} from "./format";
import { sharedNow } from "./ticker";

/**
 * Attachment version of `svelteTime` (intl). Options are reactive: the
 * attachment re-runs when any reactive value used to build `options`
 * changes. Live mode subscribes to the shared ticker.
 * @param {Partial<import("./svelte-time.svelte").SvelteTimeOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach time({ relative: true, timestamp })}></time>
 */
export function time(options = {}) {
  return (node) => {
    const timestamp = options.timestamp ?? new Date().toISOString();
    const locale = options.locale ?? "en";
    const relative = options.relative === true;
    const numeric = options.numeric ?? "auto";
    const dtOptions = options.options ?? {};
    const live = options.live ?? false;

    let now = new Date();
    if (relative && live !== false) {
      // Reading sharedNow subscribes this attachment to the shared
      // clock; each tick re-runs the whole attachment.
      now = sharedNow(Math.abs(typeof live === "number" ? live : 60_000));
    }

    if (relative) {
      node.setAttribute(
        "title",
        formatTime(timestamp, { locale, ...dtOptions }),
      );
    } else {
      node.removeAttribute("title");
    }

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) node.removeAttribute("datetime");
    else node.setAttribute("datetime", date.toISOString());

    node.textContent = relative
      ? relativeTime(timestamp, { locale, numeric, from: now })
      : formatTime(timestamp, { locale, ...dtOptions });
  };
}

/**
 * Attachment version of `svelteTimeRange`.
 * @param {Partial<import("./svelte-time-range.svelte").SvelteTimeRangeOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach timeRange({ start, end })}></time>
 */
export function timeRange(options = {}) {
  return (node) => {
    const {
      start = "",
      end = "",
      locale = "en",
      options: dtOptions = {},
    } = options;

    const startDate = new Date(start);
    const endDate = new Date(end);
    if (
      !Number.isNaN(startDate.getTime()) &&
      !Number.isNaN(endDate.getTime())
    ) {
      node.setAttribute(
        "datetime",
        `${startDate.toISOString()}/${endDate.toISOString()}`,
      );
    } else {
      node.removeAttribute("datetime");
    }

    node.textContent = formatRange(start, end, { locale, ...dtOptions });
  };
}

/**
 * Attachment version of `svelteCountdown`.
 * @param {Partial<import("./svelte-countdown.svelte").SvelteCountdownOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach countdown({ to: target, oncomplete: () => {} })}></time>
 */
export function countdown(options = {}) {
  let completed = false;

  return (node) => {
    const to = options.to ?? "";
    const style = options.style ?? "digital";
    const locale = options.locale ?? "en";
    const live = options.live ?? true;

    let now = new Date();
    if (live !== false && !completed) {
      const interval = typeof live === "number" ? Math.abs(live) : 1_000;
      now = sharedNow(interval);
    }

    const remainingMs = Math.max(0, new Date(to).getTime() - now.getTime());

    node.setAttribute("datetime", toISODuration(remainingMs));
    node.textContent = formatDuration(remainingMs, { locale, style });

    if (remainingMs === 0 && !completed) {
      completed = true;
      options.oncomplete?.();
    }
  };
}

/**
 * Per-node pause/resume bookkeeping for the `stopwatch` attachment,
 * keyed by the attached DOM node. Same approach as the main package:
 * the outer factory is re-invoked whenever `running` changes.
 * @type {WeakMap<HTMLElement, { anchor: undefined | Date, pausedMs: number, pausedAt: undefined | Date, prevSince: undefined | import("./format").TimeInput, prevRunning: boolean }>}
 */
const stopwatchStateByNode = new WeakMap();

/**
 * Attachment version of `svelteStopwatch`.
 * @param {Partial<import("./svelte-stopwatch.svelte").SvelteStopwatchOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach stopwatch({ since: startedAt, running })}></time>
 */
export function stopwatch(options = {}) {
  return (node) => {
    let state = stopwatchStateByNode.get(node);
    if (!state) {
      state = {
        anchor: undefined,
        pausedMs: 0,
        pausedAt: undefined,
        prevSince: undefined,
        prevRunning: true,
      };
      stopwatchStateByNode.set(node, state);
    }

    const since = options.since;
    const running = options.running ?? true;
    const style = options.style ?? "digital";
    const locale = options.locale ?? "en";
    const live = options.live ?? true;

    if (
      state.anchor === undefined ||
      (since !== undefined && since !== state.prevSince)
    ) {
      state.anchor =
        since === undefined ? (state.anchor ?? new Date()) : new Date(since);
      state.pausedMs = 0;
      state.pausedAt = running ? undefined : new Date();
    } else if (running !== state.prevRunning) {
      if (running) {
        if (state.pausedAt !== undefined) {
          state.pausedMs += Date.now() - state.pausedAt.getTime();
          state.pausedAt = undefined;
        }
      } else if (state.pausedAt === undefined) {
        state.pausedAt = new Date();
      }
    }

    state.prevSince = since;
    state.prevRunning = running;

    let now = new Date();
    if (running && live !== false) {
      const interval = typeof live === "number" ? Math.abs(live) : 1_000;
      now = sharedNow(interval);
    }

    const elapsedMs = Math.max(
      0,
      now.getTime() -
        state.anchor.getTime() -
        state.pausedMs -
        (state.pausedAt ? now.getTime() - state.pausedAt.getTime() : 0),
    );

    node.setAttribute("datetime", toISODuration(elapsedMs));
    node.textContent = formatDuration(elapsedMs, { locale, style });
  };
}

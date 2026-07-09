import { toDatetime } from "./datetime";
import { dayjs } from "./dayjs";
import { formatDuration } from "./duration-format";
import { resolveLocale } from "./format";
import { microFormat } from "./micro";
import { liveInterval, sharedNow } from "./ticker";

const DEFAULT_INTERVAL = 60 * 1_000;

/**
 * Attachment version of `svelteTime`. Options are reactive: the
 * attachment re-runs when any reactive value used to build `options`
 * changes, and live mode subscribes to the shared ticker.
 *
 * @param {Partial<import("./svelte-time.svelte").SvelteTimeOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach time({ relative: true, timestamp })}></time>
 */
export function time(options = {}) {
  return (node) => {
    const timestamp = options.timestamp ?? new Date().toISOString();
    const format = options.format || "MMM DD, YYYY";
    const relative = options.relative === true;
    const withoutSuffix = options.withoutSuffix ?? false;
    const relativeStyle = options.relativeStyle ?? "default";
    const live = options.live ?? false;
    const tz = options.tz;
    const relativeThreshold = options.relativeThreshold;
    const locale = resolveLocale(timestamp, options.locale);

    const base = dayjs(timestamp);
    if (tz !== undefined && typeof base.tz !== "function") {
      throw new Error(
        "svelte-time: the `tz` prop requires the dayjs `utc` and `timezone` plugins — " +
          "see https://github.com/metonym/svelte-time#custom-timezone",
      );
    }
    const day = (tz === undefined ? base : base.tz(tz)).locale(locale);

    let now = dayjs();
    if (relative && live !== false) {
      // Reading sharedNow subscribes this attachment to the shared
      // clock; each tick re-runs the whole attachment. Tier selection
      // uses a fresh age each run so components migrate tiers
      // naturally on re-run, with no state and no cycles.
      const interval =
        typeof live === "number"
          ? Math.abs(live)
          : live === true
            ? liveInterval(day.diff(dayjs()))
            : DEFAULT_INTERVAL;
      now = sharedNow(interval);
    }

    const isPastThreshold =
      relativeThreshold != null && Math.abs(day.diff(now)) >= relativeThreshold;
    const showRelative = relative && !isPastThreshold;

    if (showRelative) {
      if ("title" in options) {
        if (options.title != null) {
          node.setAttribute("title", options.title);
        }
      } else {
        node.setAttribute("title", day.format(format));
      }
    } else {
      node.removeAttribute("title");
    }

    const datetime = toDatetime(timestamp);
    if (datetime) node.setAttribute("datetime", datetime);
    else node.removeAttribute("datetime");
    node.textContent = showRelative
      ? relativeStyle === "micro"
        ? microFormat(day.diff(now))
        : day.from(now, withoutSuffix)
      : day.format(format);
  };
}

/**
 * Attachment version of `svelteDuration`. Options are reactive: the
 * attachment re-runs when any reactive value used to build `options`
 * changes, and `since` + `live` mode subscribes to the shared ticker.
 *
 * @param {Partial<import("./svelte-duration.svelte").SvelteDurationOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach duration({ since: startedAt, live: true })}></time>
 */
export function duration(options = {}) {
  return (node) => {
    const value = options.value ?? 0;
    const unit = options.unit ?? "milliseconds";
    const since = options.since;
    const format = options.format ?? "HH:mm:ss";
    const humanize = options.humanize ?? false;
    const withSuffix = options.withSuffix ?? false;
    const locale = options.locale ?? "en";
    const live = options.live ?? false;

    let result;

    if (since === undefined) {
      result = formatDuration({
        value,
        unit,
        format,
        humanize,
        withSuffix,
        locale,
      });
    } else {
      let now = dayjs();
      if (live !== false) {
        // Reading sharedNow subscribes this attachment to the shared
        // clock; each tick re-runs the whole attachment.
        const interval =
          typeof live === "number"
            ? Math.abs(live)
            : liveInterval(dayjs(since).diff(dayjs()));
        now = sharedNow(interval);
      }
      result = formatDuration({
        value: now.diff(dayjs(since)),
        unit: "milliseconds",
        format,
        humanize,
        withSuffix,
        locale,
      });
    }

    node.setAttribute("datetime", result.datetime);
    node.textContent = result.formatted;
  };
}

/**
 * Attachment version of `svelteCountdown`. Options are reactive: the
 * attachment re-runs when any reactive value used to build `options`
 * changes, and `live` mode subscribes to the shared ticker. Unlike
 * `duration`'s `since`/`live` (tuned for slowly-decaying "x minutes
 * ago" text), `live` here ticks every second by default, since a
 * countdown's final seconds matter most.
 *
 * @param {Partial<import("./svelte-countdown.svelte").SvelteCountdownOptions>} [options]
 * @returns {(node: HTMLElement) => void}
 * @example <time {@attach countdown({ to: target, oncomplete: () => {} })}></time>
 */
export function countdown(options = {}) {
  let completed = false;

  return (node) => {
    const to = options.to;
    const format = options.format ?? "HH:mm:ss";
    const humanize = options.humanize ?? false;
    const withSuffix = options.withSuffix ?? false;
    const locale = options.locale ?? "en";
    const live = options.live ?? true;

    let now = dayjs();
    if (live !== false && !completed) {
      // Reading sharedNow subscribes this attachment to the shared
      // clock; each tick re-runs the whole attachment.
      const interval = typeof live === "number" ? Math.abs(live) : 1_000;
      now = sharedNow(interval);
    }

    const remainingMs = Math.max(0, dayjs(to).diff(now));

    const result = formatDuration({
      value: remainingMs,
      unit: "milliseconds",
      format,
      humanize,
      withSuffix,
      locale,
    });

    node.setAttribute("datetime", result.datetime);
    node.textContent = result.formatted;

    if (remainingMs === 0 && !completed) {
      completed = true;
      options.oncomplete?.();
    }
  };
}

/**
 * Per-node pause/resume bookkeeping for the `stopwatch` attachment,
 * keyed by the attached DOM node. Unlike `duration`/`countdown`
 * (whose `completed`-style closures live in the outer factory), the
 * `stopwatch` attachment's own outer factory is re-invoked fresh
 * whenever `running` changes (since `running` must be read to build
 * `options`, and that read makes the whole `{@attach}` expression —
 * including the outer factory call — re-evaluate). A plain outer
 * closure would therefore lose `pausedMs`/`pausedAt` on every toggle,
 * so this state is tracked per-node instead, which stays stable
 * across those re-invocations.
 * @type {WeakMap<HTMLElement, { anchor: undefined | import("dayjs").Dayjs, pausedMs: number, pausedAt: undefined | import("dayjs").Dayjs, prevSince: import("dayjs").ConfigType, prevRunning: boolean }>}
 */
const stopwatchStateByNode = new WeakMap();

/**
 * Attachment version of `svelteStopwatch`. Options are reactive: the
 * attachment re-runs when any reactive value used to build `options`
 * changes, and `live` mode subscribes to the shared ticker.
 *
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
    const format = options.format ?? "HH:mm:ss";
    const humanize = options.humanize ?? false;
    const withSuffix = options.withSuffix ?? false;
    const locale = options.locale ?? "en";
    const live = options.live ?? true;

    if (
      state.anchor === undefined ||
      (since !== undefined && since !== state.prevSince)
    ) {
      // Initial run, or `since` changed to a new instant: reset.
      state.anchor =
        since === undefined ? (state.anchor ?? dayjs()) : dayjs(since);
      state.pausedMs = 0;
      state.pausedAt = running ? undefined : dayjs();
    } else if (running !== state.prevRunning) {
      // `running` toggled: track the paused interval so resuming
      // excludes it from the elapsed count.
      if (running) {
        if (state.pausedAt !== undefined) {
          state.pausedMs += dayjs().diff(state.pausedAt);
          state.pausedAt = undefined;
        }
      } else if (state.pausedAt === undefined) {
        state.pausedAt = dayjs();
      }
    }

    state.prevSince = since;
    state.prevRunning = running;

    let now = dayjs();
    if (running && live !== false) {
      // Reading sharedNow subscribes this attachment to the shared
      // clock; each tick re-runs the whole attachment.
      const interval = typeof live === "number" ? Math.abs(live) : 1_000;
      now = sharedNow(interval);
    }

    const elapsedMs = Math.max(
      0,
      now.diff(state.anchor) -
        state.pausedMs -
        (state.pausedAt ? now.diff(state.pausedAt) : 0),
    );

    const result = formatDuration({
      value: elapsedMs,
      unit: "milliseconds",
      format,
      humanize,
      withSuffix,
      locale,
    });

    node.setAttribute("datetime", result.datetime);
    node.textContent = result.formatted;
  };
}

import * as API from "svelte-time";

test("Library has exports", () => {
  expect(Object.keys(API).sort()).toEqual([
    "Countdown",
    "Duration",
    "Stopwatch",
    "TimeRange",
    "countdown",
    "dayjs",
    "default",
    "duration",
    "formatTime",
    "now",
    "relativeTime",
    "stopwatch",
    "svelteCountdown",
    "svelteDuration",
    "svelteStopwatch",
    "svelteTime",
    "svelteTimeRange",
    "time",
    "timeRange",
  ]);
});

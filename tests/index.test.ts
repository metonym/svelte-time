import * as API from "svelte-time";

test("Library has exports", () => {
  expect(Object.keys(API).sort()).toEqual([
    "Countdown",
    "Duration",
    "TimeRange",
    "countdown",
    "dayjs",
    "default",
    "duration",
    "formatTime",
    "now",
    "relativeTime",
    "svelteCountdown",
    "svelteDuration",
    "svelteTime",
    "svelteTimeRange",
    "time",
    "timeRange",
  ]);
});

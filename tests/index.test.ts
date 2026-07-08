import * as API from "svelte-time";

test("Library has exports", () => {
  expect(Object.keys(API).sort()).toEqual([
    "Countdown",
    "Duration",
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
    "time",
  ]);
});

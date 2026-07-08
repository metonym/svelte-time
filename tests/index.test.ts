import * as API from "svelte-time";

test("Library has exports", () => {
  expect(Object.keys(API).sort()).toEqual([
    "Duration",
    "dayjs",
    "default",
    "duration",
    "svelteDuration",
    "svelteTime",
    "time",
  ]);
});

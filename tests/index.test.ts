import * as API from "svelte-time";

test("Library has exports", () => {
  expect(Object.keys(API).sort()).toEqual(["dayjs", "default", "svelteTime"]);
});

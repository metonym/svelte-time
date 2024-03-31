import * as API from "../src";

test("Library has exports", () => {
  expect(Object.keys(API)).toMatchInlineSnapshot(`
    [
      "dayjs",
      "svelteTime",
      "default",
    ]
  `);
});

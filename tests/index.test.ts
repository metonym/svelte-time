import { test, expect } from "vitest";
import * as API from "../src";

test("Library has exports", () => {
  expect(Object.keys(API)).toMatchInlineSnapshot(`
    [
      "default",
      "svelteTime",
      "dayjs",
    ]
  `);
});

import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const src = resolve(__dirname, "../src");

/** Every published `.js` module needs a sibling `.d.ts` (see #116). */
test.each(["", "intl"])("src/%s ships a .d.ts for every .js", (dir) => {
  const root = join(src, dir);
  const missing = readdirSync(root)
    .filter((file) => file.endsWith(".js"))
    .map((file) => file.replace(/\.js$/, ".d.ts"))
    .filter((dts) => !existsSync(join(root, dts)));
  expect(missing).toEqual([]);
});

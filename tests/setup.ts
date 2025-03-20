import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { plugin } from "bun";
import fs from "node:fs";
import { compile, preprocess } from "svelte/compiler";

GlobalRegistrator.register();

await plugin({
  name: "svelte loader",
  async setup(builder) {
    builder.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      return {
        contents: compile(
          await preprocess(
            fs.readFileSync(path, "utf8"),
            vitePreprocess(),
          ).then((processed) => processed.code),
          {
            filename: path,
            generate: "client",
          },
        ).js.code,
        loader: "js",
      };
    });
  },
});

import { plugin } from "bun";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

await plugin({
  name: "svelte loader",
  async setup(builder) {
    const { compile, preprocess } = await import("svelte/compiler");
    const { readFileSync } = await import("fs");

    builder.onLoad({ filter: /\.svelte$/ }, async ({ path }) => {
      return {
        contents: compile(
          await preprocess(readFileSync(path, "utf8"), vitePreprocess()).then(
            (processed) => processed.code,
          ),
          {
            filename: path,
            generate: "dom",
          },
        ).js.code,
        loader: "js",
      };
    });
  },
});

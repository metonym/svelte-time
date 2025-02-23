import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import { defineConfig } from "vite";
import pkg from "./package.json";
import { pluginReadme } from "./plugin-readme";

export default defineConfig({
  base: "/" + pkg.name,
  plugins: [
    pluginReadme({
      baseUrl: "https://github.com/metonym/svelte-time/tree/master/",
    }),
    svelte({
      compilerOptions: {
        runes: true,
      },
      extensions: [".svelte", ".md"],
      hot: false,
      preprocess: [vitePreprocess()],
    }),
  ],
  resolve: {
    alias: {
      [pkg.name]: path.resolve("./src"),
    },
    conditions: ["browser"],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});

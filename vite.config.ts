import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import { defineConfig } from "vite";
import pkg from "./package.json";
import { pluginReadme } from "./plugin-readme";

export default defineConfig({
  base: "/" + pkg.name,
  plugins: [
    pluginReadme({
      componentsDir: "tests/examples",
      baseUrl: "https://github.com/metonym/svelte-time/tree/master/",
    }),
    svelte({
      compilerOptions: {
        runes: true,
        // Disable HMR for the README.md file since the Svelte plugin attempts to cache it.
        hmr: false,
      },
      extensions: [".svelte", ".md"],
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

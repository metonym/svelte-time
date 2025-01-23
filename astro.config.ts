import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import pkg from "./package.json";
import path from "node:path";

export default defineConfig({
  base: pkg.name,
  outDir: "dist",
  integrations: [
    svelte({
      compilerOptions: {
        runes: true,
      },
    }),
    mdx(),
  ],
  srcDir: "./www",
  publicDir: "./www/public",
  vite: {
    resolve: {
      alias: {
        [pkg.name]: path.resolve("./src"),
      },
    },
  },
});

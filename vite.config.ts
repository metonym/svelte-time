/// <reference types="vitest" />
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig(({ mode }) => ({
  plugins: [
    svelte({
      compilerOptions: {
        runes: true,
      },
      hot: false,
      preprocess: [vitePreprocess()],
    }),
  ],
  resolve: {
    alias: {
      [pkg.name]: path.resolve("./src"),
    },
    conditions: mode === "test" ? ["browser"] : [],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
}));

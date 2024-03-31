/// <reference types="vitest" />
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [svelte({ hot: false, preprocess: [vitePreprocess()] })],
  resolve: {
    alias: {
      [pkg.name]: path.resolve("./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import pkg from "./package.json";

export default defineConfig({
  plugins: [svelte({ hot: false })],
  resolve: {
    alias: {
      [pkg.name]: pkg.main,
    },
  },
  test: {
    environment: "jsdom",
  },
});

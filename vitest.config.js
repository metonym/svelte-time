import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    svelte({
      hot: false,
    }),
  ],
  resolve: {
    alias: {
      "svelte-time": path.resolve("src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});

import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [svelte()],
    optimizeDeps: {
      include: ["dayjs/plugin/relativeTime.js"],
    },
  };
});

import { svelte } from "@sveltejs/vite-plugin-svelte";
import type { UserConfig } from "vite";

export default {
  plugins: [svelte()],
} satisfies UserConfig;

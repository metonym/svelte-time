import path from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import pkg from "./package.json";
import { pluginReadme } from "./plugin-readme";

declare module "vite" {
  interface UserConfig {
    test?: import("vitest/config").TestUserConfig;
  }
}

export default defineConfig({
  base: `/${pkg.name}`,
  root: "./tests",
  build: { outDir: "../dist", emptyOutDir: true },
  plugins: [
    pluginReadme({
      title: pkg.name,
      description: pkg.description,
      watchDir: "./tests/examples",
      baseUrl: "https://github.com/metonym/svelte-time/tree/master/",
    }),
    svelte({
      compilerOptions: { runes: true },
      extensions: [".svelte", ".md"],
    }),
  ],
  resolve: {
    alias: { [pkg.name]: path.resolve("./src") },
  },
  test: {
    globals: true,
    projects: [
      {
        extends: true,
        resolve: { conditions: ["browser"] },
        test: {
          name: "client",
          environment: "jsdom",
          setupFiles: ["./setup.ts"],
          include: ["**/*.test.ts"],
          exclude: ["**/node_modules/**", "ssr/**"],
          typecheck: {
            enabled: true,
            include: ["**/*.test-d.ts"],
            ignoreSourceErrors: true,
          },
        },
      },
      {
        extends: true,
        test: {
          name: "ssr",
          environment: "node",
          include: ["ssr/**/*.test.ts"],
        },
      },
    ],
  },
});

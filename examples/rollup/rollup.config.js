import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  // ignore Rollup warnings for circular dependencies
  onwarn: (warning, warn) => {
    if (warning.code === "CIRCULAR_DEPENDENCY") {
      if (warning.ids.some((id) => /node_modules\/svelte/.test(id))) {
        return;
      }
    }
    warn(warning);
  },
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        dev: !production,
      },
    }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    css({ output: "bundle.css" }),
    production && terser(),
  ],
};

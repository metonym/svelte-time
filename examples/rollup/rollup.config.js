import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    sourcemap: !production,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({ compilerOptions: { dev: !production } }),
    css({ output: "bundle.css" }),
    resolve({ browser: true, dedupe: ["svelte"] }),
    commonjs(),
    production && terser(),
  ],
};

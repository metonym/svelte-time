import svelteReadme from "svelte-readme";
import commonjs from "@rollup/plugin-commonjs";

export default svelteReadme({
  style: `time { display: block; margin-bottom: 0.5rem; }`,
  plugins: [commonjs()],
});

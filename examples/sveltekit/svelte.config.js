import adapter from "@sveltejs/adapter-node"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    target: "#svelte",
    adapter: adapter()
  },
};

export default config;

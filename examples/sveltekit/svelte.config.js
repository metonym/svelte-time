import adapter from "@sveltejs/adapter-node";

/** @type {import('@sveltejs/kit').Config} */
export default config = {
  kit: {
    adapter: adapter(),
  },
};

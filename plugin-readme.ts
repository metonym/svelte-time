import { Marked } from "marked";
import { baseUrl } from "marked-base-url";
import { markedHighlight } from "marked-highlight";
import { codeToHtml } from "shiki";
import type { Plugin } from "vite";

type PluginReadmeOptions = {
  baseUrl: string;
};

export const pluginReadme = (options: PluginReadmeOptions): Plugin => {
  const marked = new Marked(
    markedHighlight({
      async: true,
      async highlight(code, lang) {
        const highlightedCode = await codeToHtml(code, {
          lang,
          theme: "github-dark",
        });

        return `{@html ${JSON.stringify(highlightedCode)}}\n`;
      },
    }),
    baseUrl(options.baseUrl),
    {
      renderer: {
        code(code) {
          // Shiki returns a string with the code wrapped in a <pre> tag.
          // We need to return the code without the extra <pre> tag.
          return code.text;
        },
      },
      gfm: true,
      breaks: true,
    },
  );

  return {
    name: "vite:process-readme",

    // Run this plugin before the Svelte plugin.
    enforce: "pre",
    async transform(code, id) {
      if (id.endsWith("README.md")) {
        return marked.parse(code);
      }
    },
  };
};

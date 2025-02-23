import { Marked } from "marked";
import { baseUrl } from "marked-base-url";
import { markedHighlight } from "marked-highlight";
import fs from "node:fs";
import path from "node:path";
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
        html(html) {
          if (html.text.includes("render:")) {
            // Parse the name from the comment (after "render:")
            const regex = /<!--\s*render:(\w+)\s*-->/;
            const match = html.text.match(regex);
            const componentName = match?.[1];

            if (!componentName) {
              return html.text;
            }

            // Return the component wrapped in a div with the class "code-demo"
            return `<div class="code-demo"><${componentName} /></div>`;
          }
          return html.text;
        },
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

    // Run before the Svelte plugin.
    enforce: "pre",
    async transform(code, id) {
      if (id.endsWith("README.md")) {
        const html = await marked.parse(code);

        // Read svelte files from www/components
        const components = fs.readdirSync(
          path.join(__dirname, "www/components"),
        );
        const svelteFiles = components.filter((file) =>
          file.endsWith(".svelte"),
        );
        const svelteFileNames = svelteFiles.map((file) =>
          file.replace(".svelte", ""),
        );

        // Add these files to the Vite watch files
        svelteFiles.forEach((file) => {
          this.addWatchFile(path.join(__dirname, "www/components", file));
        });

        const importsBlock = `
        <script>
           ${svelteFileNames.map((file) => `import ${file} from "./www/components/${file}.svelte";`).join("\n")}
        </script>
        `;

        return importsBlock + html;
      }
    },
  };
};

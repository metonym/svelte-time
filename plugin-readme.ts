import { Marked } from "marked";
import { baseUrl } from "marked-base-url";
import { markedHighlight } from "marked-highlight";
import fsp from "node:fs/promises";
import path from "node:path";
import { codeToHtml } from "shiki";
import type { Plugin } from "vite";

type PluginReadmeOptions = {
  title: string;
  description: string;
  watchDir: string;
  baseUrl: string;
};

export const pluginReadme = (options: PluginReadmeOptions): Plugin => {
  const watchDir = path.join(__dirname, options.watchDir);
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
    configureServer(server) {
      server.watcher.add(watchDir);
    },
    handleHotUpdate({ file, server }) {
      // If a README.md file changed, force reload the page
      // This ensures clean state and no duplicate scripts.
      if (file.endsWith("README.md")) {
        server.ws.send({ type: "full-reload" });
        return [];
      }

      // If a Svelte component in the watched directory changed,
      // let the Svelte plugin handle the HMR.
      if (file.startsWith(watchDir) && file.endsWith(".svelte")) {
        return;
      }
    },
    transformIndexHtml(html) {
      return `<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="${options.description}"
    />
    <title>${options.title}</title>
    <style>
      html {
        color-scheme: dark;
      }

      main {
        max-width: 960px;
        margin: auto;
        padding: 0 1rem;
      }

      .markdown-body pre.shiki {
        border-radius: 0;
      }

      .code-demo {
        padding: 1rem;
        border: 1px solid #24292e;
      }
    </style>
  </head>

  <body class="markdown-body">
    <main id="readme"></main>
    ${html}
  </body>
</html>
`;
    },
    async transform(code, id) {
      if (id.endsWith("README.md")) {
        let imports = "";

        const watchedFiles = await fsp.readdir(
          path.join(__dirname, options.watchDir),
        );

        for (const file of watchedFiles) {
          if (file.endsWith(".svelte")) {
            const moduleName = file.replace(".svelte", "");
            imports += `import ${moduleName} from "${options.watchDir}/${file}";\n`;
          }
        }

        const importsBlock = `<script>${imports}</script>`;
        const html = await marked.parse(code);

        return importsBlock + html;
      }
    },
  };
};

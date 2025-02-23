import { codeToHtml } from "shiki";
import type { Plugin } from "vite";

const htmlEntities = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
} as const;

const escapeHtml = (text: string) => {
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
};

const processLinks = (linkRefs: Map<string, string>, text: string): string => {
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
    return `<a href="${escapeHtml(url)}">${escapeHtml(linkText)}</a>`;
  });

  text = text.replace(
    /\[([^\]]+)\](?:\[([^\]]*)\])?/g,
    (match, linkText, ref) => {
      const reference = (ref || linkText).toLowerCase();
      const url = linkRefs.get(reference);
      if (url) {
        return `<a href="${escapeHtml(url)}">${escapeHtml(linkText)}</a>`;
      }
      return match;
    },
  );

  return text;
};

export const pluginReadme = (): Plugin => {
  return {
    name: "vite:process-readme",
    enforce: "pre",
    async transform(code, id) {
      if (id.endsWith(".md")) {
        let html = "";
        let inCodeBlock = false;
        let currentCodeBlock = "";
        let currentLanguage = "";
        let currentParagraph = "";

        const linkRefs = new Map<string, string>();

        for (const line of code.split("\n")) {
          const refMatch = line.match(/^\[([^\]]+)\]:\s*(.+?)\s*$/);
          if (refMatch) {
            const [, ref, url] = refMatch;
            linkRefs.set(ref.toLowerCase(), url);
          }
        }

        for (const line of code.split("\n")) {
          if (line.startsWith("```")) {
            if (inCodeBlock) {
              const highlightedCode = await codeToHtml(currentCodeBlock, {
                lang: currentLanguage,
                theme: "github-dark",
              });

              html += `{@html ${JSON.stringify(highlightedCode)}}\n`;
              inCodeBlock = false;
              currentCodeBlock = "";
              currentLanguage = "";
            } else {
              currentLanguage = line.slice(3).trim() || "plaintext";
              inCodeBlock = true;
            }
            continue;
          }

          if (inCodeBlock) {
            currentCodeBlock += line + "\n";
            continue;
          }

          // Skip reference link definitions
          if (line.match(/^\[([^\]]+)\]:\s*(.+?)\s*$/)) {
            continue;
          }

          if (line.startsWith("#")) {
            const headerMatch = line.match(/^#+/);
            if (headerMatch) {
              const level = headerMatch[0].length;
              const text = escapeHtml(line.replace(/^#+\s*/, ""));
              html += `<h${level}>${processLinks(linkRefs, text)}</h${level}>\n`;
              continue;
            }
          }

          let processedLine = escapeHtml(line)
            .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.+?)\*/g, "<em>$1</em>")
            .replace(/`(.+?)`/g, "<code>$1</code>");

          // Process links after other inline formatting
          processedLine = processLinks(linkRefs, processedLine);

          if (line.trim() === "") {
            if (currentParagraph) {
              html += `<p>${currentParagraph}</p>\n`;
              currentParagraph = "";
            }
          } else {
            currentParagraph += (currentParagraph ? " " : "") + processedLine;
          }
        }

        if (currentParagraph) {
          html += `<p>${currentParagraph}</p>\n`;
        }

        return html;
      }
    },
  };
};

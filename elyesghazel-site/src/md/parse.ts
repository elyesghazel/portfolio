import { Marked, type Tokens } from "marked";
import { href as withBase } from "../router";

/**
 * Markdown for posts and project pages.
 *
 * Plain GitHub-flavoured markdown, plus:
 *   ++text++          amber hardware highlight (and **bold** turns green on
 *                     pages with `highlight: true` in their frontmatter)
 *   > [!note] ...     callout; also [!tip], [!warn], [!bad]
 *   ```flow           diagram (mermaid syntax), themed to the site
 *   ```bars           horizontal bar chart
 *   ```stats          a row of big numbers
 *   ```gallery        photos with captions and a lightbox
 *   ```term           terminal transcript ("$ " lines are commands)
 *   ```sh title=x     any other code block; gets a filename and a copy button
 * The block syntaxes are documented in src/markdown/README.md.
 */

export type Frontmatter = Record<string, string | string[]>;

/** `key: value` lines between --- fences. Lists as [a, b, c]. Nothing nested. */
export function splitFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let value = kv[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      data[kv[1]] = value
        .slice(1, -1)
        .split(",")
        .map((v) => unquote(v.trim()))
        .filter(Boolean);
      continue;
    }
    value = unquote(value);
    data[kv[1]] = value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function unquote(v: string) {
  return /^(["']).*\1$/.test(v) ? v.slice(1, -1) : v;
}

export const str = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : v ?? "");
export const list = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v : v ? v.split(",").map((s) => s.trim()) : [];

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9äöü]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Words / 220, rounded up. Code blocks count too; they take reading. */
export function readingTime(body: string) {
  return Math.max(1, Math.ceil(body.split(/\s+/).length / 220));
}

/** The info string of a fence: "sh title=deploy.sh" -> { lang: "sh", opts: { title } }. */
export function fenceInfo(token: Tokens.Code) {
  const first = token.raw.split("\n", 1)[0].replace(/^\s*(`{3,}|~{3,})/, "").trim();
  const [lang = "", ...rest] = first.match(/(?:[^\s"]+|"[^"]*")+/g) ?? [];
  const opts: Record<string, string> = {};
  for (const part of rest) {
    const [k, ...v] = part.split("=");
    opts[k] = v.length ? unquote(v.join("=")) : "true";
  }
  return { lang: lang.toLowerCase(), opts };
}

export const md = new Marked({ gfm: true });

md.use({
  extensions: [
    {
      name: "hw",
      level: "inline",
      start: (src: string) => src.indexOf("++"),
      tokenizer(src: string) {
        const m = /^\+\+([^+\n]+?)\+\+/.exec(src);
        if (m) return { type: "hw", raw: m[0], text: m[1] };
      },
      renderer: (token) => `<span class="text-hw">${token.text}</span>`,
    },
  ],
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const id = slugify(html);
      if (depth === 2) {
        return `<h2 id="${id}" class="section-label md-h2"><span class="slashes" aria-hidden="true">//</span>${html}</h2>`;
      }
      return `<h${depth} id="${id}" class="md-h${depth}">${html}</h${depth}>`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const t = title ? ` title="${title}"` : "";
      return external
        ? `<a href="${href}"${t} class="link-accent" target="_blank" rel="noreferrer noopener">${text}</a>`
        : `<a href="${href.startsWith("/") ? withBase(href) : href}"${t} class="link-accent" data-to="${href}">${text}</a>`;
    },
    image({ href, title, text }) {
      const src = href.startsWith("/") ? withBase(href) : href;
      const cap = title ? `<figcaption class="md-caption">${title}</figcaption>` : "";
      return `<figure class="md-img"><img src="${src}" alt="${text}" loading="lazy" decoding="async" />${cap}</figure>`;
    },
    table(token) {
      // Wrap so wide tables scroll on a phone instead of breaking the column.
      const head = token.header
        .map((c, i) => `<th${align(token.align[i])}>${this.parser.parseInline(c.tokens)}</th>`)
        .join("");
      const rows = token.rows
        .map(
          (r) =>
            `<tr>${r.map((c, i) => `<td${align(token.align[i])}>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`,
        )
        .join("");
      return `<div class="md-table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
    },
  },
});

function align(a: string | null) {
  return a ? ` style="text-align:${a}"` : "";
}

/** Rows of a block tool: one per non-empty line, cells split on "|". */
export function rows(text: string): string[][] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("|").map((c) => c.trim()));
}

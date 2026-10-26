import { list, readingTime, splitFrontmatter, str } from "../md/parse";

/** Every markdown file is bundled at build time; there is no runtime fetch. */
const projectFiles = import.meta.glob("./projects/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const postFiles = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

const slugOf = (path: string) => path.split("/").pop()!.replace(/\.md$/, "");

export type ProjectPage = {
  slug: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  tags: string[];
  link?: { label: string; url: string };
  highlight: boolean;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  minutes: number;
  body: string;
};

export const projects: ProjectPage[] = Object.entries(projectFiles)
  .map(([path, raw]) => {
    const { data, body } = splitFrontmatter(raw);
    return {
      order: Number(str(data.order)) || 99,
      page: {
        slug: slugOf(path),
        title: str(data.title),
        role: str(data.role),
        period: str(data.period),
        summary: str(data.summary),
        tags: list(data.tags),
        link: data.url ? { label: str(data.link) || str(data.url), url: str(data.url) } : undefined,
        highlight: str(data.highlight) === "true",
        body,
      },
    };
  })
  .sort((a, b) => a.order - b.order)
  .map((p) => p.page);

export const posts: Post[] = Object.entries(postFiles)
  .map(([path, raw]) => {
    const { data, body } = splitFrontmatter(raw);
    return {
      draft: str(data.draft) === "true",
      post: {
        slug: slugOf(path),
        title: str(data.title),
        date: str(data.date),
        summary: str(data.summary),
        tags: list(data.tags),
        minutes: readingTime(body),
        body,
      },
    };
  })
  .filter((p) => import.meta.env.DEV || !p.draft)
  .map((p) => p.post)
  .sort((a, b) => b.date.localeCompare(a.date));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 2026-10-26 -> "26 Oct 2026" */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return d && m ? `${d} ${MONTHS[m - 1]} ${y}` : iso;
}

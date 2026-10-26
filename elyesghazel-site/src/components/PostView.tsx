import { useMemo } from "react";
import type { Tokens } from "marked";
import { formatDate, posts, type Post } from "../markdown/load";
import { md, slugify } from "../md/parse";
import Markdown from "../md/Markdown";
import Header from "./Header";
import Footer from "./Footer";
import Link from "../router";

export default function PostView({ post }: { post: Post }) {
  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  // "On this page" from the ## headings, only when there are enough to need it.
  const toc = useMemo(
    () =>
      md
        .lexer(post.body)
        .filter((t): t is Tokens.Heading => t.type === "heading" && (t as Tokens.Heading).depth === 2)
        .map((h) => ({ text: h.text, id: slugify(md.parseInline(h.text) as string) })),
    [post.body],
  );

  return (
    <div id="top" className="min-h-screen">
      <Header variant="project" />

      <main className="mx-auto max-w-[var(--measure)] px-6 pb-4">
        <article className="pt-12 md:pt-20">
          <Link to="/blog" className="text-sm text-dim transition-colors hover:text-ink">
            <span aria-hidden>&larr;</span> all posts
          </Link>

          <p className="section-label mt-10">
            <span className="slashes" aria-hidden>
              //
            </span>
            post
            <span className="aside">{post.minutes} min read</span>
          </p>

          <h1 className="mt-6 text-[length:var(--fs-xl)] leading-[var(--lh-tight)] tracking-tight text-ink sm:text-[length:var(--fs-2xl)]">
            {post.title}
          </h1>

          <p className="mt-5 max-w-[34rem] text-[length:var(--fs-md)] leading-relaxed">
            {post.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-rule py-3 text-sm">
            <time dateTime={post.date} className="text-ink tabular-nums">
              {formatDate(post.date)}
            </time>
            <span className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </span>
          </div>

          {toc.length >= 3 && (
            <nav aria-label="On this page" className="mt-8 text-sm">
              <p className="text-xs text-faint">on this page</p>
              <ol className="mt-2 space-y-1">
                {toc.map((h, i) => (
                  <li key={h.id} className="flex gap-3">
                    <span className="w-5 text-faint tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <a href={`#${h.id}`} className="link text-dim hover:text-ink">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-12">
            <Markdown source={post.body} />
          </div>
        </article>

        <nav className="mt-20 grid gap-3 sm:grid-cols-2" aria-label="More posts">
          {older ? (
            <Link to={`/blog/${older.slug}`} className="card group block p-5">
              <span className="text-xs text-faint">older</span>
              <span className="mt-1 block text-ink">
                <span aria-hidden>&larr;</span> {older.title}
              </span>
            </Link>
          ) : (
            <Link to="/blog" className="card group block p-5">
              <span className="text-xs text-faint">back</span>
              <span className="mt-1 block text-ink">
                <span aria-hidden>&larr;</span> all posts
              </span>
            </Link>
          )}
          {newer ? (
            <Link to={`/blog/${newer.slug}`} className="card group block p-5 sm:text-right">
              <span className="text-xs text-faint">newer</span>
              <span className="mt-1 block text-ink">
                {newer.title} <span aria-hidden className="arr arr-r">&rarr;</span>
              </span>
            </Link>
          ) : (
            <Link to="/#work" className="card group block p-5 sm:text-right">
              <span className="text-xs text-faint">meanwhile</span>
              <span className="mt-1 block text-ink">
                the things I built <span aria-hidden className="arr arr-r">&rarr;</span>
              </span>
            </Link>
          )}
        </nav>

        <Footer />
      </main>
    </div>
  );
}

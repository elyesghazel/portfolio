import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import type { Tokens } from "marked";
import { md, slugify } from "../md/parse";
import Markdown from "../md/Markdown";
import Header from "./Header";
import Footer from "./Footer";
import Link from "../router";

type Heading = { text: string; id: string };

/** Which heading is under the header, and how far through the article we are. */
function useReading(toc: Heading[], body: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const line = 140;
      let current: string | null = null;
      for (const h of toc) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);
      const box = body.current?.getBoundingClientRect();
      if (box) {
        const done = (window.innerHeight * 0.5 - box.top) / box.height;
        setProgress(Math.max(0, Math.min(1, done)));
      }
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [toc, body]);

  return { active, progress };
}

/** Click any picture in the post to see it full size. */
function useZoom(body: RefObject<HTMLDivElement | null>) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const root = body.current;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest<HTMLImageElement>(".md-img img");
      if (img) setZoom({ src: img.currentSrc || img.src, alt: img.alt });
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [body]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return { zoom, close: () => setZoom(null) };
}

type Props = {
  back: { to: string; label: string };
  /** Small line above the title. */
  meta: ReactNode;
  title: string;
  summary: string;
  /** Extra block under the summary, e.g. a project's role/when/link row. */
  facts?: ReactNode;
  tags: string[];
  body: string;
  highlight?: boolean;
  /** Under the article, the "keep reading" area. */
  after: ReactNode;
};

/**
 * The long-form page used by posts and project write-ups: title block, then
 * a sticky outline on the left (fold-out on a phone) and the text.
 */
export default function Article({ back, meta, title, summary, facts, tags, body, highlight, after }: Props) {
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const toc = useMemo<Heading[]>(
    () =>
      md
        .lexer(body)
        .filter((t): t is Tokens.Heading => t.type === "heading" && (t as Tokens.Heading).depth === 2)
        .map((h) => ({ text: h.text, id: slugify(md.parseInline(h.text) as string) })),
    [body],
  );

  const { active, progress } = useReading(toc, bodyRef);
  const { zoom, close } = useZoom(bodyRef);

  return (
    <div id="top" className="min-h-screen">
      <Header variant="project" />
      <div aria-hidden className="read-bar" style={{ transform: `scaleX(${progress})` }} />

      <main className="mx-auto max-w-[var(--measure)] px-4 pb-4 sm:px-6">
        <article className="pt-8 md:pt-16">
          <header className="lg:pl-[calc(13rem+3rem)]">
            <Link to={back.to} className="text-sm text-dim transition-colors hover:text-ink">
              <span aria-hidden>&larr;</span> {back.label}
            </Link>
            <p className="mt-6 text-sm text-faint tabular-nums sm:mt-8">
              {meta}
              {toc.length > 0 && ` · ${toc.length} parts`}
            </p>
            <h1 className="mt-4 max-w-[22ch] text-[length:var(--fs-2xl)] leading-[var(--lh-tight)] tracking-tight text-ink lg:text-[length:var(--fs-3xl)]">
              {title}
            </h1>
            <p className="mt-5 max-w-[42rem] text-[length:var(--fs-md)] leading-relaxed text-dim">{summary}</p>
            {facts}
            <div className="mt-5 flex flex-wrap gap-1.5 lg:hidden">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="mt-8 border-t border-rule pt-8 sm:mt-10 sm:pt-10 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-12">
            <aside className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              {toc.length > 0 && (
                <>
                  <details className="card mb-8 p-4 lg:hidden">
                    <summary className="cursor-pointer text-sm text-ink">
                      on this page <span className="text-faint">· {toc.length} parts</span>
                    </summary>
                    <Outline toc={toc} active={active} />
                  </details>

                  <nav aria-label="On this page" className="hidden lg:block">
                    <p className="text-xs uppercase tracking-[var(--tracking-label)] text-faint">on this page</p>
                    <Outline toc={toc} active={active} />
                    <p className="mt-4 text-xs text-faint tabular-nums">{Math.round(progress * 100)}% read</p>
                  </nav>
                </>
              )}

              <div className={`hidden lg:block ${toc.length > 0 ? "mt-8 border-t border-rule pt-6" : ""}`}>
                <p className="text-xs uppercase tracking-[var(--tracking-label)] text-faint">tags</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#top" className="mt-6 inline-block text-sm text-dim hover:text-ink">
                  back to top <span aria-hidden>&uarr;</span>
                </a>
              </div>
            </aside>

            <div ref={bodyRef} className="post-body min-w-0">
              <Markdown source={body} highlight={highlight} />
            </div>
          </div>
        </article>

        <nav className="mt-20 sm:mt-24 lg:pl-[calc(13rem+3rem)]" aria-label="More">
          {after}
        </nav>

        <Footer />
      </main>

      {zoom && (
        <button
          type="button"
          onClick={close}
          aria-label="Close image"
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-paper/95 p-4 backdrop-blur-sm sm:p-10"
        >
          <img src={zoom.src} alt={zoom.alt} className="max-h-full max-w-full object-contain" />
        </button>
      )}
    </div>
  );
}

function Outline({ toc, active }: { toc: Heading[]; active: string | null }) {
  return (
    <ol className="mt-3 grid gap-0.5 text-sm">
      {toc.map((h, i) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className={`toc-item ${active === h.id ? "is-active" : ""}`}
            aria-current={active === h.id ? "location" : undefined}
          >
            <span className="tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
            <span>{h.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}


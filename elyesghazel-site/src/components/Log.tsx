import { useEffect, useRef, type ReactNode } from "react";
import { hero, log as curated, type LogEntry } from "../content";
import { posts } from "../markdown/load";

/** The curated log plus one entry per blog post, newest first. */
const log: LogEntry[] = [
  ...curated,
  ...posts.map((p) => ({
    year: p.date.slice(0, 4),
    month: p.date.slice(5, 7),
    kind: "post" as const,
    text: `wrote: ${p.title}`,
    to: `/blog/${p.slug}`,
  })),
].sort((a, b) => `${b.year}${b.month ?? "00"}`.localeCompare(`${a.year}${a.month ?? "00"}`));
import Link from "../router";

/** Line icons for each kind of entry, 24-unit grid, drawn with currentColor. */
const icons: Record<LogEntry["kind"] | "now", ReactNode> = {
  build: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
  ),
  business: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  school: (
    <>
      <path d="M22 10 12 5 2 10l10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6" />
    </>
  ),
  infra: (
    <>
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <rect x="2" y="13" width="20" height="8" rx="2" />
      <path d="M6 7h.01M6 17h.01" />
    </>
  ),
  start: (
    <>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <path d="M4 22v-7" />
    </>
  ),
  post: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  now: <circle cx="12" cy="12" r="4" fill="currentColor" />,
};

function Node({ kind }: { kind: LogEntry["kind"] | "now" }) {
  return (
    <span className="log-node" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icons[kind]}
      </svg>
    </span>
  );
}

/**
 * What happened when, grouped by year. A hairline runs down the left; a
 * brighter line fills it as you scroll, and each node fills in once the line
 * passes it. The top entry is "now" and wears the accent.
 */
export default function Log() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;
    const entries = [...root.querySelectorAll<HTMLElement>(".log-entry")];

    let queued = false;
    const update = () => {
      queued = false;
      const box = root.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      const h = Math.max(0, Math.min(box.height - 20, line - box.top - 10));
      fill.style.height = `${h}px`;
      for (const entry of entries) {
        entry.classList.toggle("on", entry.getBoundingClientRect().top + 10 < line);
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
  }, []);

  const years = [...new Set(log.map((e) => e.year))];

  return (
    <div className="log" ref={rootRef}>
      <div className="log-rail" aria-hidden />
      <div className="log-fill" aria-hidden ref={fillRef} />

      <div className="log-year">
        <h3>
          <span className="text-accent">now</span>
        </h3>
        <ol>
          <li className="log-entry now on">
            <Node kind="now" />
            <div className="flex items-baseline gap-x-3">
              <span className="w-6 shrink-0" aria-hidden />
              <p className="min-w-0 flex-1 text-ink">{hero.now}</p>
            </div>
            <p className="mt-0.5 pl-9 text-sm text-dim">2nd year of the EFZ, building this site</p>
          </li>
        </ol>
      </div>

      {years.map((year) => (
        <div key={year} className="log-year">
          <h3>{year}</h3>
          <ol>
            {log
              .filter((e) => e.year === year)
              .map((entry) => (
                <Entry key={entry.text} entry={entry} />
              ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function Entry({ entry }: { entry: LogEntry }) {
  const title = entry.to ? (
    <Link to={entry.to} className="group text-ink">
      <span className="link">{entry.text}</span>{" "}
      <span aria-hidden className="arr arr-r text-faint group-hover:text-ink">
        &rarr;
      </span>
    </Link>
  ) : (
    <span className="text-ink">{entry.text}</span>
  );

  return (
    <li className="log-entry">
      <Node kind={entry.kind} />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="log-month w-6 shrink-0">{entry.month ?? "--"}</span>
        <span className="min-w-0 flex-1">{title}</span>
        <span className="tag hidden sm:inline-flex">{entry.kind}</span>
      </div>
      {entry.note && <p className="mt-0.5 pl-9 text-sm text-dim">{entry.note}</p>}
    </li>
  );
}

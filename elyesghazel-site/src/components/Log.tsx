import { useEffect, useRef } from "react";
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
            <span className="log-node" aria-hidden />
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
      <span className="log-node" aria-hidden />
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="log-month w-6 shrink-0">{entry.month ?? "--"}</span>
        <span className="min-w-0 flex-1">{title}</span>
        <span className="tag hidden sm:inline-flex">{entry.kind}</span>
      </div>
      {entry.note && <p className="mt-0.5 pl-9 text-sm text-dim">{entry.note}</p>}
    </li>
  );
}

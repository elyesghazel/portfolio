import { useEffect, useRef, type CSSProperties } from "react";
import { also, log, type Commit, type Stage } from "../content";
import Link from "../router";

/** Short fake commit hash, stable per project id. */
function hash(id: string) {
  let h = 0x811c9dc5;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 0x01000193);
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/**
 * Projects as `git log --graph`. The rail fills as you scroll, each node
 * lights up when it crosses the middle of the screen, and the rail takes on
 * the colour of the newest lit commit. j / k step between commits.
 */
export default function WorkLog() {
  const logRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = logRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    const commits = [...root.querySelectorAll<HTMLElement>(".commit")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seen = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("seen");
            seen.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -15% 0px" },
    );
    commits.forEach((c) => seen.observe(c));

    let last = -2;
    let queued = false;
    const update = () => {
      queued = false;
      const box = root.getBoundingClientRect();
      const mid = innerHeight * 0.5;
      const h = Math.max(0, Math.min(box.height, mid - box.top));
      fill.style.height = `${h}px`;
      fill.classList.toggle("lit", h > 2);

      let lit = -1;
      commits.forEach((c, i) => {
        const on = c.getBoundingClientRect().top + 10 < mid;
        c.classList.toggle("on", on);
        if (on) lit = i;
      });
      if (lit !== last) {
        last = lit;
        root.style.setProperty("--accent", getComputedStyle(commits[Math.max(lit, 0)]).getPropertyValue("--c"));
      }
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(input|textarea|select)$/i.test((e.target as HTMLElement).tagName)) return;
      if (e.key !== "j" && e.key !== "k") return;
      const y = scrollY + 100;
      const tops = commits.map((c) => c.getBoundingClientRect().top + scrollY);
      const to =
        e.key === "j" ? tops.find((t) => t > y + 8) : [...tops].reverse().find((t) => t < y - 8);
      if (to !== undefined) scrollTo({ top: to - 100, behavior: reduce ? "auto" : "smooth" });
    };

    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", update);
    addEventListener("keydown", onKey);
    return () => {
      seen.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", update);
      removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <div className="work" ref={logRef}>
        <div className="rail" aria-hidden>
          <div className="fill" ref={fillRef} />
        </div>
        {log.map((commit) => (
          <CommitView key={commit.id} commit={commit} />
        ))}
      </div>

      <p className="hint">
        <kbd>j</kbd> <kbd>k</kbd> step through projects
      </p>

      <div className="also rv">
        <h3 className="also-h">Also built</h3>
        <ul>
          {also.map((a) => (
            <li key={a.name}>
              <a href={a.href} target="_blank" rel="noreferrer noopener">
                <span className="n">{a.name}</span>
                <span className="d">{a.text}</span>
                <span className="y">{a.year} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function CommitView({ commit }: { commit: Commit }) {
  const [first, ...rest] = commit.refs;

  return (
    <article className="commit" id={commit.id} style={{ "--c": commit.color } as CSSProperties}>
      <span className="node" aria-hidden />
      <div className="when">
        <span className="date">{commit.date}</span>
        <span className="hash">{hash(commit.id)}</span>
      </div>

      <div className="case">
        <div className="text">
          <div className="refs">
            <span className="ref">{first}</span>
            {rest.map((r) => (
              <span key={r} className="ref muted">
                {r}
              </span>
            ))}
          </div>
          <h3>{commit.title}</h3>
          <p className="one">{commit.one}</p>
          <p className="why">{commit.why}</p>
          <dl className="facts">
            {commit.facts.map((f) => (
              <div key={f.label} style={{ display: "contents" }}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="links">
            {commit.links.map((l, i) => {
              const cls = i === 0 ? "btn primary" : "btn";
              const body = (
                <>
                  {l.label} {i === 0 && <span className="arr" aria-hidden>→</span>}
                </>
              );
              return l.href.startsWith("/") ? (
                <Link key={l.href} to={l.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className={cls} target="_blank" rel="noreferrer noopener">
                  {body}
                </a>
              );
            })}
          </div>
        </div>

        <div className="stage">
          <StageView stage={commit.stage} />
          {commit.caption && <div className="cap">{commit.caption}</div>}
        </div>
      </div>
    </article>
  );
}

function StageView({ stage }: { stage: Stage }) {
  if (stage.kind === "image") {
    return (
      <div className={`shot${stage.tall ? " tall" : ""}`}>
        <img src={stage.src} alt={stage.alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div className="term" aria-hidden>
      <div className="bar">
        <i />
        <i />
        <i />
        <span>{stage.title}</span>
      </div>
      <div className="out">
        {stage.lines.map((line, i) => (
          <div key={i} className="line" style={{ "--i": i } as CSSProperties}>
            {line.startsWith("$ ") ? (
              <>
                <span className="p">❯</span> {line.slice(2)}
              </>
            ) : line.startsWith("+ ") ? (
              <>
                <span className="ok">✓</span> {line.slice(2)}
              </>
            ) : (
              <span className="d">{line}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

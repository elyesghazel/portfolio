import { type CSSProperties } from "react";
import { also, log, type Commit, type Stage } from "../content";
import Link, { withBase } from "../router";

/**
 * Projects as parts on a board: one row each, refdes J1..Jn matching the
 * pads in the hero, text and visual alternating sides.
 */
export default function WorkLog() {
  return (
    <>
      <div className="parts">
        {log.map((commit, i) => (
          <Part key={commit.id} commit={commit} index={i} />
        ))}
      </div>

      <div className="also rv">
        {also.map((a) => (
          <a key={a.name} href={a.href} target="_blank" rel="noreferrer noopener">
            <span className="n">{a.name}</span>
            <span className="d">{a.text}</span>
            <span className="y">{a.year} ↗</span>
          </a>
        ))}
      </div>
    </>
  );
}

function Part({ commit, index }: { commit: Commit; index: number }) {
  return (
    <article
      className={`part rv${index % 2 ? " flip" : ""}`}
      id={commit.id}
      style={{ "--c": commit.color } as CSSProperties}
    >
      <div className="text">
        <div className="head">
          <span className="ref cu">
            <span className="sw" aria-hidden />J{index + 1}
          </span>
          {commit.refs.map((r) => (
            <span key={r} className="ref">
              {r}
            </span>
          ))}
          <span className="date">{commit.date}</span>
        </div>
        <h3>{commit.title}</h3>
        <p className="one">{commit.one}</p>
        <p className="why">{commit.why}</p>
        <table className="spec">
          <tbody>
            {commit.facts.map((f) => (
              <tr key={f.label}>
                <th scope="row">{f.label}</th>
                <td>{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="links">
          {commit.links.map((l, i) => {
            const cls = i === 0 ? "btn primary" : "btn";
            const body = (
              <>
                {l.label} <span className="arr" aria-hidden>{l.href.startsWith("/") ? "→" : "↗"}</span>
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

      <figure className="stage">
        <StageView stage={commit.stage} />
        {commit.caption && <figcaption>{commit.caption}</figcaption>}
      </figure>
    </article>
  );
}

function StageView({ stage }: { stage: Stage }) {
  if (stage.kind === "image") {
    return (
      <div className={`shot${stage.tall ? " tall" : ""}`}>
        <img src={withBase(stage.src)} alt={stage.alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  return (
    <div className="serial" aria-hidden>
      <div className="bar">
        <span className="led" />
        <span>{stage.title}</span>
        <span className="baud">115200 baud</span>
      </div>
      <div className="out">
        {stage.lines.map((line, i) => (
          <div key={i} className="line" style={{ "--i": i } as CSSProperties}>
            {line.startsWith("$ ") ? (
              <>
                <span className="p">&gt;</span> {line.slice(2)}
              </>
            ) : line.startsWith("+ ") ? (
              <>
                <span className="ok">ok</span> {line.slice(2)}
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

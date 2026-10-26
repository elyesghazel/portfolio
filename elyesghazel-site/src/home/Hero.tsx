import { hero, site } from "../content";
import Board from "./Board";

export default function Hero() {
  const [first, ...rest] = site.name.split(" ");

  return (
    <section className="hero" aria-label="Intro">
      <div>
        <div className="kicker">
          <span className="ref cu">U1</span>
          <span className="ref">{site.role}</span>
          <span className="ref">{site.location}</span>
        </div>
        <h1>
          <span>{first}</span>
          <span className="last">{rest.join(" ")}</span>
        </h1>
        <p className="line">{hero.line}</p>

        <dl className="tblock">
          {hero.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>
                {m.lines[0]} <span>· {m.lines[1]}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Board />
    </section>
  );
}

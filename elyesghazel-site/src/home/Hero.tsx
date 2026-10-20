import { useEffect, useRef, useState } from "react";
import { hero, site } from "../content";

const GLYPHS = "01abcdef#$%&/\\<>{}=+*";

/** The name, letters scrambling in left to right on first paint. */
function Name() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const chars = ref.current ? [...ref.current.querySelectorAll<HTMLSpanElement>(".ch")] : [];
    if (!chars.length || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const final = chars.map((c) => c.textContent ?? "");
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      let done = 0;
      chars.forEach((c, i) => {
        if (now - start > 180 + i * 70) {
          c.textContent = final[i];
          c.classList.remove("scr");
          done++;
        } else {
          c.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          c.classList.add("scr");
        }
      });
      if (done < chars.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      chars.forEach((c, i) => {
        c.textContent = final[i];
        c.classList.remove("scr");
      });
    };
  }, []);

  return (
    <h1 className="name" aria-label={site.name}>
      <span aria-hidden ref={ref}>
        {[...site.name].map((ch, i) =>
          ch === " " ? <span key={i} className="sp" /> : <span key={i} className="ch">{ch}</span>,
        )}
      </span>
    </h1>
  );
}

const clockFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Zurich",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function zoneName() {
  const part = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Zurich", timeZoneName: "short" })
    .formatToParts(new Date())
    .find((p) => p.type === "timeZoneName");
  return part ? part.value.replace("GMT+2", "CEST").replace("GMT+1", "CET") : "";
}

function Clock() {
  const [now, setNow] = useState(() => clockFormat.format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(clockFormat.format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <dt>local time</dt>
      <dd>
        <span className="live">{now}</span>
        <br />
        Zürich, {zoneName()}
      </dd>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <Name />

      <dl className="meta">
        {hero.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>
              {m.lines[0]}
              <br />
              {m.lines[1]}
            </dd>
          </div>
        ))}
        <Clock />
      </dl>

      <p className="lead rv">{hero.line}</p>

      <div className="proof rv">
        {hero.proof.map((p) => (
          <a key={p.value} href={p.href}>
            <b>{p.value}</b>
            <span>{p.text}</span>
          </a>
        ))}
      </div>
    </>
  );
}

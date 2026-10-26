import { useEffect, useRef, useState } from "react";
import { rows } from "../parse";

/**
 * ```bars title="Per clip" ratio
 * label | sub | value | shown value | *
 * ```
 * Bars scale to the largest value. `*` in the last cell marks the row that
 * matters (accent). `ratio` prints xN against the row above.
 */
export default function Bars({ source, title, ratio }: { source: string; title?: string; ratio?: boolean; unit?: string }) {
  const data = rows(source).map(([label, sub, value, shown, flag]) => ({
    label,
    sub,
    value: Number.parseFloat(value) || 0,
    shown: shown || value,
    hot: flag === "*" || shown === "*",
  }));
  const max = Math.max(...data.map((d) => d.value), 1);

  const ref = useRef<HTMLElement | null>(null);
  const [grown, setGrown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setGrown(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setGrown(true), io.disconnect()), {
      rootMargin: "0px 0px -10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className="md-tool md-bars">
      {title && <figcaption className="md-tool-title">{title}</figcaption>}
      <ul>
        {data.map((d, i) => {
          const prev = data[i - 1];
          const factor = ratio && prev && prev.value ? d.value / prev.value : null;
          return (
            <li key={d.label + i} className={d.hot ? "hot" : ""}>
              <div className="md-bars-label">
                <span className="text-ink">{d.label}</span>
                {d.sub && <span className="md-bars-sub">{d.sub}</span>}
              </div>
              <div className="md-bars-track" aria-hidden>
                <i style={{ width: grown ? `${Math.max((d.value / max) * 100, 1.5)}%` : "0%", transitionDelay: `${i * 90}ms` }} />
              </div>
              <div className="md-bars-value">
                <span>{d.shown}</span>
                {factor !== null && (
                  <span className="md-bars-sub">
                    ×{factor >= 10 ? factor.toFixed(0) : factor.toFixed(1)}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

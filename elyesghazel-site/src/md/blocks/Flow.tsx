import { useEffect, useId, useRef, useState } from "react";

/**
 * A diagram in mermaid syntax, drawn in the site's own colours and font.
 * Mermaid is big, so it is only downloaded when a page actually has one.
 */
export default function Flow({ source, caption }: { source: string; caption?: string }) {
  const id = "flow-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      const { default: mermaid } = await import("mermaid");
      const css = getComputedStyle(document.documentElement);
      const v = (name: string) => css.getPropertyValue(name).trim();
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        fontFamily: v("--font-mono"),
        flowchart: { curve: "basis", padding: 14, nodeSpacing: 36, rankSpacing: 44, htmlLabels: true },
        themeVariables: {
          darkMode: v("--ink") === "#ffffff",
          fontFamily: v("--font-mono"),
          fontSize: "13px",
          background: "transparent",
          primaryColor: v("--bg-raised"),
          primaryBorderColor: v("--rule-strong"),
          primaryTextColor: v("--ink"),
          secondaryColor: v("--bg-raised"),
          tertiaryColor: v("--bg-sunken"),
          lineColor: v("--dim"),
          textColor: v("--body"),
          clusterBkg: v("--bg-sunken"),
          clusterBorder: v("--rule"),
          edgeLabelBackground: v("--bg"),
          noteBkgColor: v("--bg-raised"),
          noteBorderColor: v("--rule-strong"),
          actorBkg: v("--bg-raised"),
          actorBorder: v("--rule-strong"),
          actorTextColor: v("--ink"),
          signalColor: v("--dim"),
          signalTextColor: v("--body"),
        },
      });
      try {
        const { svg } = await mermaid.render(id + "-" + Date.now(), source);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    }

    draw();
    const redraw = () => draw();
    const scheme = window.matchMedia("(prefers-color-scheme: light)");
    window.addEventListener("themechange", redraw);
    scheme.addEventListener("change", redraw);
    return () => {
      cancelled = true;
      window.removeEventListener("themechange", redraw);
      scheme.removeEventListener("change", redraw);
    };
  }, [id, source]);

  return (
    <figure className="md-tool md-flow-fig">
      <div ref={ref} className="md-flow-svg" role="img" aria-label={caption ?? "diagram"} />
      {error && (
        <>
          <pre className="md-flow-fallback">{source}</pre>
          <p className="text-sm text-faint">diagram failed to draw: {error}</p>
        </>
      )}
      {caption && <figcaption className="md-caption">{caption}</figcaption>}
    </figure>
  );
}

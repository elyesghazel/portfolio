import { useEffect, useMemo, useRef, type ReactNode } from "react";
import type { Token, Tokens } from "marked";
import { fenceInfo, md } from "./parse";
import { navigate } from "../router";
import Gallery from "../components/Gallery";
import Bars from "./blocks/Bars";
import Stats from "./blocks/Stats";
import Flow from "./blocks/Flow";
import Term from "./blocks/Term";
import Code from "./blocks/Code";
import { rows } from "./parse";

const CALLOUT = /^\s*\[!(note|tip|warn|bad)\]\s*/i;

/**
 * Renders markdown top-level block by block: plain blocks go through marked
 * to HTML, fenced block tools (flow, bars, ...) and callouts become React
 * components so they can be interactive and follow the theme.
 */
export default function Markdown({ source, highlight }: { source: string; highlight?: boolean }) {
  const tokens = useMemo(() => md.lexer(source), [source]);
  const ref = useRef<HTMLDivElement | null>(null);

  // Internal links inside rendered HTML route client-side.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-to]");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const to = a.dataset.to ?? "";
      if (!to.startsWith("/")) return; // "#anchor" links work on their own
      e.preventDefault();
      navigate(to);
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return (
    <div ref={ref} className={`md${highlight ? " md-hl" : ""}`}>
      {tokens.map((token, i) => (
        <Block key={i} token={token} />
      ))}
    </div>
  );
}

function Html({ tokens }: { tokens: Token[] }) {
  const html = useMemo(() => md.parser(tokens), [tokens]);
  return <div className="md-flow" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Block({ token }: { token: Token }): ReactNode {
  if (token.type === "space") return null;

  if (token.type === "code") {
    const code = token as Tokens.Code;
    const { lang, opts } = fenceInfo(code);
    switch (lang) {
      case "flow":
      case "mermaid":
        return <Flow source={code.text} caption={opts.caption} />;
      case "bars":
        return <Bars source={code.text} title={opts.title} ratio={opts.ratio === "true"} unit={opts.unit} />;
      case "stats":
        return <Stats source={code.text} />;
      case "gallery":
        return (
          <Gallery
            images={rows(code.text).map(([src, alt, caption]) => ({ src, alt: alt ?? "", caption }))}
          />
        );
      case "term":
        return <Term source={code.text} title={opts.title} />;
      default:
        return <Code source={code.text} lang={lang} title={opts.title} />;
    }
  }

  if (token.type === "blockquote") {
    const quote = token as Tokens.Blockquote;
    const m = CALLOUT.exec(quote.text);
    if (m) {
      const kind = m[1].toLowerCase();
      const inner = md.lexer(quote.text.replace(CALLOUT, ""));
      return (
        <aside className={`md-callout ${kind}`}>
          <span className="md-callout-kind">{kind}</span>
          <Html tokens={inner} />
        </aside>
      );
    }
  }

  return <Html tokens={[token]} />;
}

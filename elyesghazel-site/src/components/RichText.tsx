import type { ReactNode } from "react";
import Link from "../router";

/** Renders [label](href) inside an otherwise plain string. Nothing else. */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export default function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK)) {
    const [raw, label, href] = match;
    const start = match.index;

    if (start > cursor) nodes.push(text.slice(cursor, start));

    nodes.push(
      href.startsWith("/") ? (
        <Link key={start} to={href} className="link-accent">
          {label}
        </Link>
      ) : (
        <a
          key={start}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="link-accent"
        >
          {label}
        </a>
      ),
    );

    cursor = start + raw.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));

  return <>{nodes}</>;
}

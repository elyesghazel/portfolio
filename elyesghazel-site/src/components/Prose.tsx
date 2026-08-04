import type { ReactNode } from "react";

/**
 * Inline keyword highlighting for project prose.
 *   **term**  -> green  (software, attacks, firmware)
 *   ++term++  -> amber  (hardware, electronics)
 * Everything else renders as plain text.
 */
const TOKEN = /\*\*(.+?)\*\*|\+\+(.+?)\+\+/g;

export default function Prose({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(TOKEN)) {
    const start = match.index;
    if (start > cursor) nodes.push(text.slice(cursor, start));

    const [, green, amber] = match;
    nodes.push(
      <span key={start} className={green ? "text-key" : "text-hw"}>
        {green ?? amber}
      </span>,
    );

    cursor = start + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

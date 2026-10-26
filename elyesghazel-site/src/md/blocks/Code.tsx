import Copy from "./Copy";

/** A plain code block: filename (or language) on top, copy button, no colours. */
export default function Code({ source, lang, title }: { source: string; lang?: string; title?: string }) {
  return (
    <figure className="md-tool md-code">
      <figcaption className="md-code-head">
        <span>{title ?? lang ?? "code"}</span>
        <Copy text={source} />
      </figcaption>
      <pre>
        <code>{source}</code>
      </pre>
    </figure>
  );
}

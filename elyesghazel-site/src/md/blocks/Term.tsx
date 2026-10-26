import Copy from "./Copy";

/**
 * A real terminal transcript. Lines starting "$ " are commands (copyable),
 * "# " lines are comments, everything else is output.
 */
export default function Term({ source, title }: { source: string; title?: string }) {
  const lines = source.split("\n");
  const commands = lines.filter((l) => l.startsWith("$ ")).map((l) => l.slice(2));

  return (
    <figure className="md-tool md-code md-term">
      <figcaption className="md-code-head">
        <span>{title ?? "terminal"}</span>
        {commands.length > 0 && <Copy text={commands.join("\n")} label="copy commands" />}
      </figcaption>
      <pre>
        <code>
          {lines.map((line, i) =>
            line.startsWith("$ ") ? (
              <span key={i} className="cmd">
                <span className="prompt" aria-hidden>
                  ${" "}
                </span>
                {line.slice(2)}
                {"\n"}
              </span>
            ) : line.startsWith("# ") ? (
              <span key={i} className="cmt">
                {line}
                {"\n"}
              </span>
            ) : (
              <span key={i} className="out">
                {line}
                {"\n"}
              </span>
            ),
          )}
        </code>
      </pre>
    </figure>
  );
}

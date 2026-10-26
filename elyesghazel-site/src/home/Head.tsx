/** Section heading: refdes tag, condensed title, a rule that ends in a via. */
export default function Head({
  id,
  refdes,
  label,
  aside,
}: {
  id: string;
  refdes: string;
  label: string;
  aside?: string;
}) {
  return (
    <header className="sec" id={id}>
      <h2>
        <span className="ref cu">{refdes}</span>
        {label}
      </h2>
      {aside && <p>{aside}</p>}
    </header>
  );
}

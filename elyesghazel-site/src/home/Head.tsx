/** `//////////` in blue, an uppercase label, a hairline, optional aside. */
export default function Head({ id, label, aside }: { id: string; label: string; aside?: string }) {
  return (
    <h2 className="head" id={id}>
      <span className="slashes" aria-hidden>
        //////////
      </span>
      {label}
      <span className="rule" aria-hidden />
      {aside && <span className="aside">{aside}</span>}
    </h2>
  );
}

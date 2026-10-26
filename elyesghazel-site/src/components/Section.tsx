import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  /** Small text at the right end of the rule. */
  aside?: string;
  children: ReactNode;
};

/** `// LABEL ----------- aside`, then the content. */
export default function Section({ id, label, aside, children }: Props) {
  return (
    <section id={id} className="rv pt-20 md:pt-28">
      <h2 className="section-label">
        <span className="slashes" aria-hidden>
          //
        </span>
        {label}
        {aside && <span className="aside">{aside}</span>}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

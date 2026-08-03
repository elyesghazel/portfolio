import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  children: ReactNode;
};

/** A lowercase label, a hairline to the right of it, then the content. */
export default function Section({ id, label, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20 pt-16 md:pt-24">
      <h2 className="flex items-center gap-4 text-ink text-sm tracking-[0.2em] uppercase">
        <span className="text-faint">//</span>
        {label}
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

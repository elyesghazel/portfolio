import Link from "../router";
import { site } from "../content";

const nav = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "work", href: "#work" },
  { label: "contact", href: "#contact" },
];

export default function Header({ variant }: { variant: "home" | "project" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-6 px-6 py-3.5">
        <Link to="/" className="text-ink">
          {site.domain}
        </Link>

        {variant === "home" ? (
          <nav className="flex items-center gap-5 text-dim">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="shrink-0 transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <Link to="/" className="text-dim transition-colors hover:text-ink">
            <span aria-hidden>&larr;</span> back
          </Link>
        )}
      </div>
    </header>
  );
}

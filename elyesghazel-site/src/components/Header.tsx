import { useEffect, useState } from "react";
import Link from "../router";
import { site } from "../content";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { label: "about", id: "about" },
  { label: "stack", id: "stack" },
  { label: "work", id: "work" },
  { label: "blog", id: "blog" },
  { label: "log", id: "log" },
  { label: "contact", id: "contact" },
];

/** Which section is under the header right now, for the nav highlight. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let queued = false;
    const update = () => {
      queued = false;
      const line = 120;
      let current: string | null = null;
      for (const { id } of nav) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = nav[nav.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return active;
}

export default function Header({ variant }: { variant: "home" | "project" }) {
  const home = variant === "home";
  const active = useActiveSection(home);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const [name, tld] = site.domain.split(/(?=\.)/);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--measure)] items-center justify-between gap-6 px-6">
        <Link to="/" className="group flex items-baseline text-ink" onClick={() => setOpen(false)}>
          <span>{name}</span>
          <span className="text-faint transition-colors group-hover:text-accent">{tld}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-5">
          <nav aria-label="Sections" className="hidden items-center gap-5 text-dim sm:flex">
            {nav.map((item) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                className={`relative shrink-0 py-1 transition-colors hover:text-ink ${
                  active === item.id ? "text-ink" : ""
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-px h-px bg-ink transition-transform duration-200 ${
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="flex h-9 items-center px-2 text-dim transition-colors hover:text-ink sm:hidden"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "close" : "menu"}
          </button>

          <ThemeToggle />
        </div>
      </div>

      {open && (
        <nav
          id="menu"
          aria-label="Sections"
          className="border-t border-rule bg-paper sm:hidden"
        >
          <ul className="mx-auto max-w-[var(--measure)] px-6 py-2">
            {nav.map((item) => (
              <li key={item.id} className="border-b border-rule last:border-0">
                <Link
                  to={`/#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 text-ink"
                >
                  <span>
                    <span className="text-faint">// </span>
                    {item.label}
                  </span>
                  <span aria-hidden className="text-faint">
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

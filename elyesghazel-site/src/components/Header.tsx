import { useEffect, useState } from "react";
import Link from "../router";
import { site } from "../content";

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about", hideSmall: true },
  { label: "Stack", href: "#stack", hideSmall: true },
  { label: "Contact", href: "#contact" },
];

type Theme = "dark" | "light";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** The wordmark: a small IC package with "EG" on it. */
export function Chip() {
  return (
    <svg viewBox="0 0 26 26" aria-hidden>
      <g stroke="currentColor" strokeWidth="2">
        <path d="M8 1v4M13 1v4M18 1v4M8 21v4M13 21v4M18 21v4M1 8h4M1 13h4M1 18h4M21 8h4M21 13h4M21 18h4" />
      </g>
      <rect className="chip-body" x="5" y="5" width="16" height="16" rx="2.5" />
      <text className="chip-text" x="13" y="16.5" textAnchor="middle" fontSize="9" fontWeight="800" fontFamily="var(--sans)" style={{ fontStretch: "70%" }}>
        EG
      </text>
    </svg>
  );
}

export default function Header({ variant }: { variant: "home" | "project" }) {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
    setTheme(next);
  }

  return (
    <header className={`top${scrolled ? " scrolled" : ""}`} id="top">
      <div className="wrap">
        <Link to="/" className="brand">
          <Chip />
          {site.name}
        </Link>

        <nav className="nav" aria-label="Main">
          {variant === "home" ? (
            nav.map((item) => (
              <a key={item.href} href={item.href} className={item.hideSmall ? "hide-s" : undefined}>
                {item.label}
              </a>
            ))
          ) : (
            <Link to="/">
              <span aria-hidden>&larr;</span>&nbsp;Back
            </Link>
          )}
          <button
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Dark mode"
            className="switch"
            onClick={toggle}
          >
            <span className="knob">{theme === "light" ? <Sun /> : <Moon />}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

import { useEffect, useState } from "react";
import Link from "../router";
import { site } from "../content";

const nav = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about", hideSmall: true },
  { label: "stack", href: "#stack", hideSmall: true },
  { label: "contact", href: "#contact" },
];

type Theme = "dark" | "light";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
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
          {site.domain} <span className="cursor" aria-hidden />
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
              <span aria-hidden>&larr;</span>&nbsp;back
            </Link>
          )}
          <button type="button" onClick={toggle} aria-label="Switch light or dark">
            {theme === "light" ? <Sun /> : <Moon />}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z" />
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

/** Minimal history-API router. Three routes do not justify a dependency. */

/** Vite's `base` without the trailing slash: "" in production, a prefix on lab previews. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix a root-absolute path ("/log/a.webp", "/projects/x") with the base. */
export function withBase(path: string): string {
  return path.startsWith("/") ? BASE + path : path;
}

function currentPath(): string {
  const path = window.location.pathname;
  const local = path.startsWith(BASE) ? path.slice(BASE.length) : path;
  return local.replace(/(.)\/$/, "$1") || "/";
}

export function usePath(): string {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return path;
}

export function navigate(to: string) {
  if (to === currentPath()) return;
  window.history.pushState({}, "", withBase(to));
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

type LinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
};

/** A real <a href> - middle-click, ctrl-click and crawlers all still work. */
export default function Link({ to, className, children }: LinkProps) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={withBase(to)} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

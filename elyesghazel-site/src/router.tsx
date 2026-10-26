import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

/**
 * Minimal history-API router. Three routes do not justify a dependency.
 *
 * Paths inside the app are always written root-relative ("/projects/x"). The
 * build can live under a subpath (Vite's `base`, e.g. a preview at
 * /portfolio/redesign-v3/), so everything that touches the URL bar goes
 * through `href()` and `usePath()`, which add and strip that prefix.
 */

const BASE = import.meta.env.BASE_URL; // "/" in production

/** App path -> real URL, e.g. "/projects/x" -> "/portfolio/redesign-v3/projects/x". */
export function href(to: string): string {
  return to.startsWith("/") ? BASE + to.slice(1) : to;
}

/** Same as href(), for files in public/. */
export const asset = href;

function current(): string {
  const raw = window.location.pathname;
  const path = raw.startsWith(BASE) ? "/" + raw.slice(BASE.length) : raw;
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function usePath(): string {
  const [path, setPath] = useState(current);

  useEffect(() => {
    const sync = () => setPath(current());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return path;
}

export function navigate(to: string) {
  const [path, hash] = to.split("#");
  const url = href(path || "/") + (hash ? `#${hash}` : "");
  const samePage = (path || "/") === current();

  if (!samePage) {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  } else if (hash) {
    window.history.replaceState({}, "", url);
  }

  // Let the new page render before looking for the anchor.
  requestAnimationFrame(() => {
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView({ behavior: samePage ? "smooth" : "auto" });
    else if (!samePage) window.scrollTo(0, 0);
  });
}

type LinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-current"?: "page" | "location" | undefined;
};

/** A real <a href> - middle-click, ctrl-click and crawlers all still work. */
export default function Link({ to, className, children, onClick, ...rest }: LinkProps) {
  function handle(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.();
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  const [path, hash] = to.split("#");
  return (
    <a href={href(path || "/") + (hash ? `#${hash}` : "")} onClick={handle} className={className} {...rest}>
      {children}
    </a>
  );
}

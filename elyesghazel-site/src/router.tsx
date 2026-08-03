import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

/** Minimal history-API router. Three routes do not justify a dependency. */

export function usePath(): string {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return path;
}

export function navigate(to: string) {
  if (to === window.location.pathname) return;
  window.history.pushState({}, "", to);
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
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

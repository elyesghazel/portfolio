import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const media = () => window.matchMedia("(prefers-color-scheme: light)");

/** The theme actually showing: the saved choice, else the OS preference. */
export function activeTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return media().matches ? "light" : "dark";
}

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(activeTheme);

  useEffect(() => {
    const sync = () => setTheme(activeTheme());
    const mq = media();
    mq.addEventListener("change", sync);
    window.addEventListener("themechange", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("themechange", sync);
    };
  }, []);

  function toggle() {
    const next: Theme = activeTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just won't persist */
    }
    window.dispatchEvent(new Event("themechange"));
  }

  return [theme, toggle];
}

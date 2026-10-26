import { useEffect } from "react";

/** Adds `.in` to every `.rv` element the first time it scrolls into view. */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".rv:not(.in)")];
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

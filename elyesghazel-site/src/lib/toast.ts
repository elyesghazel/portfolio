let el: HTMLDivElement | null = null;
let timer = 0;

/** One shared toast at the bottom of the screen. Plain text only. */
export function toast(text: string, ms = 2600) {
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.replaceChildren();
  const dot = document.createElement("span");
  dot.className = "dot";
  dot.setAttribute("aria-hidden", "true");
  el.append(dot, text);
  el.classList.add("show");
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el?.classList.remove("show"), ms);
}

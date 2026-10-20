let el: HTMLDivElement | null = null;
let timer = 0;

/** A single shared toast at the bottom of the screen. `html` is trusted markup. */
export function toast(html: string, ms = 3200) {
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.innerHTML = html;
  el.classList.add("show");
  window.clearTimeout(timer);
  timer = window.setTimeout(() => el?.classList.remove("show"), ms);
}

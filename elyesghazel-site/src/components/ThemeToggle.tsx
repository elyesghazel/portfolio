import { useTheme } from "../lib/theme";

/** A circle, half filled. Switches dark and light and remembers the choice. */
export default function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`${next} theme`}
      className="group grid size-9 place-items-center text-dim transition-colors hover:text-ink"
    >
      <svg
        viewBox="0 0 16 16"
        width="15"
        height="15"
        aria-hidden
        className="transition-transform duration-300 group-hover:rotate-180"
      >
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  );
}

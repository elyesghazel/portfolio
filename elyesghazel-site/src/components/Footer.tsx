import { site } from "../content";

export default function Footer() {
  return (
    <footer className="mt-28 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule py-8 text-sm text-faint md:mt-36">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <span className="hidden sm:inline">served from a server I run myself</span>
      <span className="flex items-center gap-x-6">
        <a
          href={site.kofi}
          target="_blank"
          rel="noreferrer noopener"
          title="support me on ko-fi"
          className="transition-colors hover:text-ink"
        >
          ko-fi <span aria-hidden className="arr arr-ne">&#8599;</span>
        </a>
        <a href="#top" className="transition-colors hover:text-ink">
          top <span aria-hidden className="arr arr-u">&uarr;</span>
        </a>
      </span>
    </footer>
  );
}

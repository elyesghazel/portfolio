import { useEffect, useRef } from "react";
import { alsoBuilt, work, type Media, type WorkItem } from "../content";
import Link, { asset } from "../router";
import Img from "./Img";

/**
 * Selected work: one row per project, number and text on one side, a framed
 * picture on the other, alternating. The picture is what tells them apart.
 */
export default function Work() {
  return (
    <>
      <ol className="grid gap-20 md:gap-28">
        {work.map((item, i) => (
          <Exhibit key={item.title} item={item} index={i} />
        ))}
      </ol>
      <AlsoBuilt />
    </>
  );
}

function Exhibit({ item, index }: { item: WorkItem; index: number }) {
  const n = String(index + 1).padStart(2, "0");
  const flip = index % 2 === 1;
  const [primary, ...rest] = item.links;

  return (
    <li className="rv exhibit grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <figure className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Frame media={item.media} />
        <figcaption className="mt-3 flex gap-2 text-xs text-faint">
          <span className="shrink-0 text-dim">fig. {n}</span>
          <span>{item.caption}</span>
        </figcaption>
      </figure>

      <div className={`min-w-0 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex items-baseline gap-4">
          <span aria-hidden className="exhibit-n">
            {n}
          </span>
          <div className="min-w-0 flex-1 border-t border-rule pt-2 text-xs text-faint">
            <span>{item.kicker}</span>
            <span className="float-right tabular-nums">{item.period}</span>
          </div>
        </div>

        <h3 className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[length:var(--fs-2xl)] leading-[var(--lh-tight)] tracking-tight text-ink">
          {item.title}
          {item.badge && (
<span className="tag">{item.badge}</span>
          )}
        </h3>
        <p className="mt-3 text-[length:var(--fs-md)] leading-snug text-ink">{item.line}</p>
        <p className="mt-4 text-dim">{item.description}</p>

        <dl className="mt-6 border-t border-rule text-sm">
          {item.specs.map((spec) => (
            <div key={spec.label} className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-rule py-2">
              <dt className="text-faint">{spec.label}</dt>
              <dd className="text-body">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {primary && <Action link={primary} primary />}
          {rest.map((link) => (
            <Action key={link.href} link={link} />
          ))}
        </div>
      </div>
    </li>
  );
}

function Action({ link, primary }: { link: { label: string; href: string }; primary?: boolean }) {
  const cls = `btn ${primary ? "btn-primary" : ""}`;
  if (link.href.startsWith("/")) {
    return (
      <Link to={link.href} className={cls}>
        {link.label} <span aria-hidden className="arr arr-r">&rarr;</span>
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noreferrer noopener" className={cls}>
      {link.label} <span aria-hidden className="arr arr-ne">↗</span>
    </a>
  );
}

/** The picture in a raised frame with a thin title bar, like a window. */
function Frame({ media }: { media: Media }) {
  return (
    <div className="frame">
      <div aria-hidden className="frame-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="frame-body">
        {media.kind === "image" && (
          <Img src={media.src} alt={media.alt} className="block aspect-[16/10] w-full object-cover" />
        )}
        {media.kind === "video" && <Clip media={media} />}
        {media.kind === "terminal" && <Terminal media={media} />}
      </div>
    </div>
  );
}

function Clip({ media }: { media: Extract<Media, { kind: "video" }> }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  // Only play while on screen, and never under reduced motion.
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.3,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={asset(media.src)}
      poster={asset(media.poster)}
      aria-label={media.alt}
      muted
      loop
      playsInline
      preload="none"
      className="block aspect-[16/9] w-full object-cover"
    />
  );
}

function Terminal({ media }: { media: Extract<Media, { kind: "terminal" }> }) {
  return (
    <div className="terminal aspect-[16/10] w-full">
      {media.lines.map((line, i) =>
        line.cmd ? (
          <p key={i} className="text-ink">
            <span className="text-faint">{media.title} $ </span>
            {line.cmd}
          </p>
        ) : line.out ? (
          <p key={i} className="grid grid-cols-[9rem_1fr] text-dim">
            <span>{line.out[0]}</span>
            <span className="flex items-center gap-2 text-body">
              <span aria-hidden className="status-dot" />
              {line.out[1]}
            </span>
          </p>
        ) : null,
      )}
      <p className="text-ink">
        <span className="text-faint">{media.title} $ </span>
        <span aria-hidden className="caret" />
      </p>
    </div>
  );
}

function AlsoBuilt() {
  return (
    <div className="rv mt-24">
      <h3 className="text-xs uppercase tracking-[var(--tracking-label)] text-faint">also built</h3>
      <ul className="mt-4 border-t border-rule">
        {alsoBuilt.map((item) => (
          <li key={item.title} className="border-b border-rule">
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group -mx-3 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 px-3 py-3.5 transition-colors hover:bg-hover sm:grid-cols-[11rem_1fr_6rem_auto]"
            >
              <span className="text-ink">{item.title}</span>
              <span className="col-span-2 row-start-2 text-sm text-dim sm:col-span-1 sm:row-start-auto">
                {item.line}
              </span>
              <span className="hidden text-xs text-faint sm:block">{item.lang}</span>
              <span className="col-start-2 row-start-1 text-xs text-faint tabular-nums sm:col-start-auto sm:row-start-auto">
                {item.year} <span aria-hidden className="arr arr-ne group-hover:text-ink">↗</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm">
        <a href="https://github.com/elyesghazel" target="_blank" rel="noreferrer noopener" className="link">
          everything on GitHub <span aria-hidden className="arr arr-ne">↗</span>
        </a>
      </p>
    </div>
  );
}

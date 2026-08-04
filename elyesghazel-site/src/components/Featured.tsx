import { featured } from "../content";
import Link from "../router";
import Img from "./Img";

/**
 * The one project that gets visual weight: a full border (nothing else on the
 * site has one) and a lead photo (nothing else has an image). On an all-text
 * page, that alone reads as "start here."
 */
export default function Featured() {
  return (
    <section id="featured" className="scroll-mt-20 pt-16 md:pt-24">
      <h2 className="flex items-center gap-4 text-ink text-sm tracking-[0.2em] uppercase">
        <span className="text-faint">//</span>
        {featured.label}
        <span aria-hidden className="h-px flex-1 bg-rule" />
      </h2>

      <article className="mt-8 border border-rule">
        <Link to={`/projects/${featured.slug}`} className="group block">
          <Img
            src={featured.image.src}
            alt={featured.image.alt}
            className="block aspect-[16/10] w-full border-b border-rule object-cover grayscale transition duration-500 group-hover:grayscale-0"
          />
        </Link>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Link
              to={`/projects/${featured.slug}`}
              className="link text-xl text-ink sm:text-2xl"
            >
              {featured.title}
            </Link>
            <span className="text-faint">{featured.role}</span>
          </div>

          <p className="mt-4 max-w-xl">{featured.tagline}</p>

          <dl className="mt-6 grid grid-cols-2 divide-rule border-y border-rule sm:grid-cols-4 sm:divide-x">
            {featured.specs.map((spec) => (
              <div key={spec.label} className="py-3 sm:px-4 sm:first:pl-0 sm:last:pr-0">
                <dt className="text-sm text-faint">{spec.label}</dt>
                <dd className="text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm text-faint">{featured.tags.join("  ·  ")}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to={`/projects/${featured.slug}`} className="link text-sm">
              read the story <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href={featured.repo.url}
              target="_blank"
              rel="noreferrer noopener"
              className="link text-sm"
            >
              {featured.repo.label}
              <span aria-hidden className="ml-1 text-dim">
                ↗
              </span>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

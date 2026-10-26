import { featured } from "../content";
import Link from "../router";
import Img from "./Img";

/**
 * The one project that gets visual weight: a framed card with a lead photo.
 * On an otherwise text-led page, that alone reads as "start here."
 */
export default function Featured() {
  const to = `/projects/${featured.slug}`;

  return (
    <article className="card rv overflow-hidden">
      <Link to={to} className="group relative block overflow-hidden border-b border-rule">
        <Img
          src={featured.image.src}
          alt={featured.image.alt}
          className="block aspect-[16/10] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
        />
        <span className="absolute left-4 top-4 bg-paper/85 px-2 py-1 text-xs uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
          {featured.label}
        </span>
      </Link>

      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[length:var(--fs-xl)] leading-tight tracking-tight text-ink">
            <Link to={to} className="link">
              {featured.title}
            </Link>
          </h3>
          <span className="text-sm text-faint">{featured.role}</span>
        </div>

        <p className="mt-4 max-w-xl">{featured.tagline}</p>

        <dl className="mt-7 grid grid-cols-2 border-t border-rule sm:grid-cols-4">
          {featured.specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`border-b border-rule py-3 sm:border-b-0 sm:px-4 sm:first:pl-0 ${
                i % 2 === 0 ? "pr-4" : "border-l pl-4"
              } sm:[&:not(:first-child)]:border-l`}
            >
              <dt className="text-xs text-faint">{spec.label}</dt>
              <dd className="mt-0.5 text-sm text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-rule pt-6 sm:border-t sm:pt-6">
          {featured.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link to={to} className="btn btn-primary">
            read the story <span aria-hidden className="arr arr-r">&rarr;</span>
          </Link>
          <a href={featured.repo.url} target="_blank" rel="noreferrer noopener" className="btn">
            {featured.repo.label} <span aria-hidden className="arr arr-ne text-dim">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

import { projects, type ProjectPage } from "../markdown/load";
import Markdown from "../md/Markdown";
import Header from "./Header";
import Footer from "./Footer";
import Link from "../router";

export default function ProjectView({ project }: { project: ProjectPage }) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <div id="top" className="min-h-screen">
      <Header variant="project" />

      <main className="mx-auto max-w-[var(--measure)] px-6 pb-4">
        <article className="pt-12 md:pt-20">
          <Link to="/#work" className="group text-sm text-dim transition-colors hover:text-ink">
            <span aria-hidden className="arr inline-block transition-transform group-hover:-translate-x-0.5">
              &larr;
            </span>{" "}
            all work
          </Link>

          <p className="section-label mt-10">
            <span className="slashes" aria-hidden>
              //
            </span>
            project
          </p>

          <h1 className="mt-6 text-[length:var(--fs-2xl)] leading-[var(--lh-tight)] tracking-tight text-ink sm:text-[length:var(--fs-3xl)]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[34rem] text-[length:var(--fs-md)] leading-relaxed">
            {project.summary}
          </p>

          <dl className="mt-10 grid grid-cols-2 border-y border-rule sm:grid-cols-3">
            <Meta label="role" value={project.role} />
            <Meta label="when" value={project.period} border />
            {project.link && (
              <div className="col-span-2 border-t border-rule py-4 sm:col-span-1 sm:border-t-0 sm:border-l sm:px-5">
                <dt className="text-xs text-faint">link</dt>
                <dd className="mt-1 truncate text-sm">
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link"
                  >
                    {project.link.label.replace(/^github\.com\/elyesghazel\//, "")}
                  </a>{" "}
                  <span aria-hidden className="text-faint">
                    ↗
                  </span>
                </dd>
              </div>
            )}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Markdown source={project.body} highlight={project.highlight} />
          </div>
        </article>

        <nav className="mt-20 grid gap-3 sm:grid-cols-2" aria-label="More">
          <Link to="/#work" className="card group block p-5">
            <span className="text-xs text-faint">back</span>
            <span className="mt-1 block text-ink">
              <span aria-hidden className="arr">&larr;</span> everything else
            </span>
          </Link>
          <Link to={`/projects/${next.slug}`} className="card group block p-5 sm:text-right">
            <span className="text-xs text-faint">next project</span>
            <span className="mt-1 block text-ink">
              {next.title} <span aria-hidden className="arr arr-r">&rarr;</span>
            </span>
          </Link>
        </nav>

        <Footer />
      </main>
    </div>
  );
}

function Meta({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`py-4 ${border ? "border-l border-rule pl-4 sm:px-5" : "pr-4"}`}>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-sm text-ink">{value}</dd>
    </div>
  );
}

import { projects, type ProjectPage } from "../markdown/load";
import { work } from "../content";
import Article from "./Article";
import Img from "./Img";
import Link from "../router";

export default function ProjectView({ project }: { project: ProjectPage }) {
  const index = projects.indexOf(project);
  const others = [projects[(index + 1) % projects.length], projects[(index + 2) % projects.length]].filter(
    (p, i, all) => p !== project && all.indexOf(p) === i,
  );

  return (
    <Article
      back={{ to: "/#work", label: "all work" }}
      meta={
        <>
          <span className="text-ink">project</span> · {project.period}
        </>
      }
      title={project.title}
      summary={project.summary}
      facts={
        <dl className="mt-6 grid max-w-[42rem] grid-cols-2 border-y border-rule text-sm sm:grid-cols-3">
          <Meta label="role" value={project.role} />
          <Meta label="when" value={project.period} border />
          {project.link && (
            <div className="col-span-2 border-t border-rule py-3 sm:col-span-1 sm:border-t-0 sm:border-l sm:px-4">
              <dt className="text-xs text-faint">link</dt>
              <dd className="mt-1 truncate">
                <a href={project.link.url} target="_blank" rel="noreferrer noopener" className="link">
                  {project.link.label.replace(/^github\.com\/elyesghazel\//, "")}
                </a>{" "}
                <span aria-hidden className="text-faint">
                  ↗
                </span>
              </dd>
            </div>
          )}
        </dl>
      }
      tags={project.tags}
      body={project.body}
      highlight={project.highlight}
      after={
        <>
          <p className="text-xs uppercase tracking-[var(--tracking-label)] text-faint">more projects</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((p) => (
              <NextProject key={p.slug} project={p} />
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link to="/#work" className="link">
              everything I built <span aria-hidden className="arr arr-r">&rarr;</span>
            </Link>
          </p>
        </>
      }
    />
  );
}

function Meta({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`py-3 ${border ? "border-l border-rule pl-4 sm:px-4" : "pr-4"}`}>
      <dt className="text-xs text-faint">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}

/** Uses the picture from the home page's work list, if that project has one. */
function NextProject({ project }: { project: ProjectPage }) {
  const media = work.find((w) => w.links.some((l) => l.href === `/projects/${project.slug}`))?.media;
  const src = media?.kind === "image" ? media.src : media?.kind === "video" ? media.poster : undefined;

  return (
    <Link to={`/projects/${project.slug}`} className="card group flex gap-4 overflow-hidden p-3">
      <div className="cover aspect-square w-20 shrink-0 overflow-hidden rounded-[var(--radius-1)]">
        {src ? (
          <Img src={src} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="cover-type min-h-0 p-2 text-sm">
            <span className="text-faint">//</span>
          </div>
        )}
      </div>
      <div className="min-w-0 py-1">
        <span className="text-xs text-faint">{project.role}</span>
        <span className="mt-1 line-clamp-2 block text-sm text-ink">
          <span className="link">{project.title}</span>
        </span>
      </div>
    </Link>
  );
}

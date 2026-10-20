import type { ProjectPage } from "../content";
import Header from "./Header";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Prose from "./Prose";
import Link from "../router";

export default function ProjectView({ project }: { project: ProjectPage }) {
  return (
    <>
      <Header variant="project" />

      <main className="wrap">
        <article className="max-w-3xl pt-16 md:pt-24">
          <p className="text-sm text-faint">
            <span className="text-[var(--blue)]">//////////</span> project
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-ink sm:text-6xl">
            {project.title}
          </h1>

          <p className="mt-2 text-dim">
            {project.role} · {project.period}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed">{project.summary}</p>

          <p className="mt-6 border-y border-rule py-3 text-sm text-faint">
            {project.tags.join("  ·  ")}
          </p>

          {project.link && (
            <p className="mt-6">
              <a
                href={project.link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="link"
              >
                {project.link.label}
                <span aria-hidden className="ml-1 text-dim">
                  ↗
                </span>
              </a>
            </p>
          )}

          {project.images && project.images.length > 0 && (
            <Gallery images={project.images} />
          )}

          <div className="mt-12 max-w-2xl space-y-5 text-dim [&_p]:leading-[1.75]">
            {project.blocks.map((block, index) => {
              if (block.type === "h") {
                return (
                  <h2
                    key={index}
                    className="pt-6 text-sm uppercase tracking-[0.2em] text-ink"
                  >
                    <span aria-hidden className="text-key">
                      //{" "}
                    </span>
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={index} className="space-y-1.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="text-key">
                          -
                        </span>
                        <span>
                          <Prose text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index}>
                  <Prose text={block.text} />
                </p>
              );
            })}
          </div>
        </article>

        <p className="mt-16">
          <Link to="/" className="link">
            <span aria-hidden>&larr;</span> back to everything else
          </Link>
        </p>
      </main>

      <Footer />
    </>
  );
}

import type { ProjectPage } from "../content";
import Header from "./Header";
import Footer from "./Footer";
import Link from "../router";

export default function ProjectView({ project }: { project: ProjectPage }) {
  return (
    <div className="min-h-screen">
      <Header variant="project" />

      <main className="mx-auto max-w-2xl px-6 pb-4">
        <article className="pt-16 md:pt-24">
          <p className="text-sm text-faint">// project</p>

          <h1 className="mt-4 text-2xl leading-tight tracking-tight text-ink sm:text-3xl">
            {project.title}
          </h1>

          <p className="mt-2 text-dim">
            {project.role} · {project.period}
          </p>

          <p className="mt-6 max-w-lg">{project.summary}</p>

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

          <div className="mt-12 space-y-5">
            {project.blocks.map((block, index) => {
              if (block.type === "h") {
                return (
                  <h2
                    key={index}
                    className="pt-6 text-sm uppercase tracking-[0.2em] text-ink"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={index} className="space-y-1.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="text-faint">
                          -
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return <p key={index}>{block.text}</p>;
            })}
          </div>
        </article>

        <p className="mt-16">
          <Link to="/" className="link">
            <span aria-hidden>&larr;</span> back to everything else
          </Link>
        </p>

        <Footer />
      </main>
    </div>
  );
}

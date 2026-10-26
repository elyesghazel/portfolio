import type { ProjectPage } from "../content";
import { log } from "../content";
import Header from "./Header";
import Footer from "./Footer";
import Gallery from "./Gallery";
import Prose from "./Prose";
import Link from "../router";

export default function ProjectView({ project }: { project: ProjectPage }) {
  const index = log.findIndex((c) => c.id === project.slug);

  return (
    <>
      <Header variant="project" />

      <main className="wrap">
        <article className="proj max-w-3xl pt-14 md:pt-20">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ref cu">{index >= 0 ? `J${index + 1}` : "J"} · project</span>
            <span className="ref">{project.period}</span>
          </div>

          <h1>{project.title}</h1>

          <p className="mt-4 font-mono text-sm text-faint">{project.role}</p>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {project.link && (
            <p className="mt-8">
              <a href={project.link.url} target="_blank" rel="noreferrer noopener" className="btn primary">
                {project.link.label} <span className="arr" aria-hidden>↗</span>
              </a>
            </p>
          )}

          {project.images && project.images.length > 0 && <Gallery images={project.images} />}

          <div className="prose mt-12 max-w-2xl space-y-5 text-dim [&_p]:leading-[1.75]">
            {project.blocks.map((block, index) => {
              if (block.type === "h") return <h2 key={index} className="text-ink">{block.text}</h2>;

              if (block.type === "ul") {
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>
                        <Prose text={item} />
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
          <Link to="/" className="btn">
            <span aria-hidden>&larr;</span> Back to everything else
          </Link>
        </p>
      </main>

      <Footer />
    </>
  );
}

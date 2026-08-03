import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import ProjectView from "./components/ProjectView";
import RichText from "./components/RichText";
import Link, { usePath } from "./router";
import {
  about,
  contactNote,
  hero,
  links,
  projects,
  site,
  stack,
  work,
} from "./content";

export default function App() {
  const path = usePath();
  const project = projects.find((entry) => path === `/projects/${entry.slug}`);

  useEffect(() => {
    document.title = project
      ? `${project.title} - ${site.name}`
      : `${site.name} - Software Engineer`;
  }, [project]);

  if (path.startsWith("/projects/")) {
    return project ? <ProjectView project={project} /> : <NotFound />;
  }

  return <Home />;
}

function Home() {
  return (
    <div className="min-h-screen">
      <Header variant="home" />

      <main className="mx-auto max-w-2xl px-6 pb-4">
        <Hero />

        <Section id="about" label="about">
          <div className="space-y-5">
            {about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </Section>

        <Section id="stack" label="stack">
          <dl className="divide-y divide-rule border-y border-rule">
            {stack.map((group) => (
              <div
                key={group.group}
                className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="text-dim">{group.group}</dt>
                <dd className="text-ink">{group.items.join("  ·  ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="work" label="work">
          <ol className="divide-y divide-rule border-y border-rule">
            {work.map((item) => (
              <li key={item.title} className="py-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link"
                    >
                      {item.title}
                      <span aria-hidden className="ml-1 text-dim">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="text-ink">{item.title}</span>
                  )}
                  <span className="text-faint">{item.role}</span>
                  <span className="ml-auto shrink-0 text-dim tabular-nums">
                    {item.period}
                  </span>
                </div>

                <p className="mt-2.5">{item.description}</p>

                <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <p className="text-sm text-faint">{item.tags.join("  ·  ")}</p>
                  {item.slug && (
                    <Link to={`/projects/${item.slug}`} className="link text-sm">
                      read more <span aria-hidden>&rarr;</span>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" label="contact">
          <p className="max-w-lg">{contactNote}</p>
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="group grid grid-cols-[6rem_1fr_auto] items-center gap-4 py-3"
                >
                  <span className="text-dim">{link.label}</span>
                  <span className="truncate text-ink">{link.value}</span>
                  <span
                    aria-hidden
                    className="text-faint transition-colors group-hover:text-ink"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Footer />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-16 md:pt-24">
      <h1 className="text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        {site.name}
      </h1>
      <p className="mt-2 text-dim">
        {site.role} · {site.location}
      </p>
      <p className="mt-6 max-w-lg">{hero.line}</p>

      <dl className="mt-10 grid grid-cols-1 divide-y divide-rule border-y border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {hero.facts.map((fact) => (
          <div key={fact.label} className="py-3 sm:px-4 sm:first:pl-0 sm:last:pr-0">
            <dt className="text-sm text-faint">{fact.label}</dt>
            <dd className="text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen">
      <Header variant="project" />
      <main className="mx-auto max-w-2xl px-6 pt-24">
        <p className="text-faint">404</p>
        <h1 className="mt-4 text-2xl text-ink">No such project.</h1>
        <p className="mt-6">
          <Link to="/" className="link">
            <span aria-hidden>&larr;</span> back to everything else
          </Link>
        </p>
      </main>
    </div>
  );
}

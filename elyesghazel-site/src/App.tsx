import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Work from "./components/Work";
import Writing, { LatestPost } from "./components/Writing";
import Log from "./components/Log";
import Starfield from "./components/Starfield";
import ProjectView from "./components/ProjectView";
import PostView from "./components/PostView";
import BlogIndex from "./components/BlogIndex";
import RichText from "./components/RichText";
import Link, { usePath } from "./router";
import { posts, projects } from "./markdown/load";
import { useReveal } from "./lib/reveal";
import { toast } from "./lib/toast";
import { about, alsoBuilt, contactNote, hero, links, site, stack, work } from "./content";

export default function App() {
  const path = usePath();
  const project = projects.find((entry) => path === `/projects/${entry.slug}`);
  const post = posts.find((entry) => path === `/blog/${entry.slug}`);
  useReveal(path);

  useEffect(() => {
    document.title = project
      ? `${project.title} - ${site.name}`
      : post
        ? `${post.title} - ${site.name}`
        : path === "/blog"
          ? `Blog - ${site.name}`
          : `${site.name} - Software Engineer`;
  }, [project, post, path]);

  let content;
  if (path.startsWith("/projects/")) content = project ? <ProjectView project={project} /> : <NotFound />;
  else if (path === "/blog") content = <BlogIndex />;
  else if (path.startsWith("/blog/")) content = post ? <PostView post={post} /> : <NotFound />;
  else if (path === "/") content = <Home />;
  else content = <NotFound />;

  return (
    <>
      <Starfield />
      {content}
    </>
  );
}

function Home() {
  return (
    <div id="top" className="min-h-screen">
      <Header variant="home" />

      <main className="mx-auto max-w-[var(--measure)] px-4 sm:px-6 pb-4">
        <Hero />

        <Section id="work" label="work" aside={`${work.length} selected · ${alsoBuilt.length} more`}>
          <Work />
        </Section>

        {posts.length > 0 && (
          <Section id="blog" label="writing" aside={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}>
            <Writing />
          </Section>
        )}

        <Section id="about" label="about">
          <About />
        </Section>

        <Section id="log" label="log" aside="newest first">
          <p className="mb-10 max-w-lg text-dim">
            What I did, and when. Projects, school, the business, the server.
          </p>
          <Log />
        </Section>

        <Contact />

        <Footer />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-14 sm:pt-20 md:pt-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="flex items-start gap-2.5 text-sm text-dim">
            <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
            <span>
              <span className="text-faint">now:</span> {hero.now}
            </span>
          </p>

          <h1 className="hero-name mt-6 text-ink">{site.name}</h1>
          <p className="mt-4 text-dim">
            {site.role} · {site.location}
          </p>

          <p className="mt-8 max-w-[36rem] text-[length:var(--fs-lg)] leading-snug text-body">{hero.line}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">
              see the work <span aria-hidden className="arr arr-d">&darr;</span>
            </a>
            <a href="#contact" className="btn">
              get in touch
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-2">
          <LatestPost />
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-3 border-y border-rule">
        {hero.facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`py-4 sm:py-5 ${i === 0 ? "pr-2.5" : "border-l border-rule px-2.5 sm:px-5"}`}
          >
            <dd className="text-[length:var(--fs-lg)] leading-none text-ink tabular-nums sm:text-[length:var(--fs-xl)]">
              {fact.value}
            </dd>
            <dt className="mt-2 text-xs leading-snug text-faint sm:text-sm">{fact.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Lede on the left, the rest and the stack on the right. */
function About() {
  const [lede, ...rest] = about;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <p className="text-[length:var(--fs-lg)] leading-snug tracking-tight text-ink lg:col-span-5 lg:text-[length:var(--fs-xl)] lg:leading-[1.3]">
        <RichText text={lede} />
      </p>
      <div className="lg:col-span-7">
        <div className="space-y-5">
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        <dl className="mt-10 border-t border-rule">
          {stack.map((group) => (
            <div
              key={group.group}
              className="grid grid-cols-1 gap-2.5 border-b border-rule py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-4"
            >
              <dt className="text-sm text-faint sm:pt-0.5">{group.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="tag text-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Contact() {
  const [mail, ...rest] = links;

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      toast(`copied ${site.email}`);
    } catch {
      toast("couldn't copy, select it instead");
    }
  }

  return (
    <Section id="contact" label="contact">
      <p className="max-w-lg">{contactNote}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-rule py-6">
        <a
          href={mail.href}
          className="link break-all text-[length:var(--fs-xl)] tracking-tight sm:text-[length:var(--fs-2xl)] lg:text-[length:var(--fs-3xl)]"
        >
          {mail.value}
        </a>
        <button type="button" onClick={copy} className="btn ml-auto h-8 px-3 text-xs">
          copy
        </button>
      </div>

      <ul className="divide-y divide-rule border-b border-rule">
        {rest.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group -mx-3 grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 px-3 py-3.5 transition-colors hover:bg-hover"
            >
              <span className="text-dim">{link.label}</span>
              <span className="truncate text-ink">{link.value}</span>
              <span aria-hidden className="arr arr-ne text-faint group-hover:text-ink">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function NotFound() {
  return (
    <div id="top" className="min-h-screen">
      <Header variant="project" />
      <main className="mx-auto max-w-[var(--measure)] px-4 sm:px-6 pt-24">
        <p className="text-faint">404</p>
        <h1 className="mt-4 text-2xl text-ink">Nothing here.</h1>
        <p className="mt-6">
          <Link to="/" className="link">
            <span aria-hidden>&larr;</span> back to everything else
          </Link>
        </p>
      </main>
    </div>
  );
}

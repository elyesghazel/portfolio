import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Featured from "./components/Featured";
import Log from "./components/Log";
import Starfield from "./components/Starfield";
import ProjectView from "./components/ProjectView";
import PostView from "./components/PostView";
import BlogIndex from "./components/BlogIndex";
import PostList from "./components/PostList";
import RichText from "./components/RichText";
import Img from "./components/Img";
import Link, { usePath } from "./router";
import { posts, projects } from "./markdown/load";
import { useReveal } from "./lib/reveal";
import { toast } from "./lib/toast";
import {
  about,
  contactNote,
  hero,
  links,
  site,
  stack,
  work,
  type WorkItem,
} from "./content";

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

      <main className="mx-auto max-w-[var(--measure)] px-6 pb-4">
        <Hero />

        <Section id="about" label="about">
          <div className="space-y-5">
            {about.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 24)}
                className={i === 0 ? "text-[length:var(--fs-md)] leading-relaxed text-ink" : ""}
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </Section>

        <Section id="stack" label="stack">
          <dl className="border-t border-rule">
            {stack.map((group) => (
              <div
                key={group.group}
                className="grid grid-cols-1 gap-2.5 border-b border-rule py-4 sm:grid-cols-[10rem_1fr] sm:gap-4"
              >
                <dt className="text-sm text-dim sm:pt-0.5">{group.group}</dt>
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
        </Section>

        <Section id="work" label="work" aside={`${work.length + 1} projects`}>
          <Featured />
          <ul className="mt-6 grid gap-6">
            {work.map((item) => (
              <WorkCard key={item.title} item={item} />
            ))}
          </ul>
        </Section>

        {posts.length > 0 && (
          <Section id="blog" label="blog" aside={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}>
            <PostList posts={posts.slice(0, 3)} />
            <p className="mt-6 text-sm">
              <Link to="/blog" className="link">
                all posts <span aria-hidden className="arr arr-r">&rarr;</span>
              </Link>
            </p>
          </Section>
        )}

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
    <section className="pt-16 sm:pt-24 md:pt-32">
      <p className="flex items-start gap-2.5 text-sm text-dim">
        <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
        <span>
          <span className="text-faint">now:</span> {hero.now}
        </span>
      </p>

      <h1 className="mt-6 text-[length:var(--fs-2xl)] leading-[var(--lh-tight)] tracking-tight text-ink sm:text-[length:var(--fs-3xl)]">
        {site.name}
      </h1>
      <p className="mt-3 text-dim">
        {site.role} · {site.location}
      </p>

      <p className="mt-8 max-w-[34rem] text-[length:var(--fs-md)] leading-relaxed text-body">
        {hero.line}
      </p>

      <div className="mt-9 flex flex-wrap gap-3">
        <a href="#work" className="btn btn-primary">
          see the work <span aria-hidden className="arr arr-d">&darr;</span>
        </a>
        <a href="#contact" className="btn">
          get in touch
        </a>
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

function WorkCard({ item }: { item: WorkItem }) {
  const external = !item.slug && item.href;

  const body = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-[length:var(--fs-lg)] leading-snug text-ink">
          <span className="link">{item.title}</span>
        </h3>
        <span className="ml-auto shrink-0 text-sm text-faint tabular-nums">{item.period}</span>
      </div>
      <p className="mt-1 text-sm text-dim">{item.role}</p>
      <p className="mt-4">{item.description}</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
        {(item.slug || item.href) && (
          <span className="text-sm text-ink">
            {item.slug ? "read more" : "visit"}{" "}
            <span aria-hidden className={`arr ${external ? "arr-ne" : "arr-r"}`}>
              {external ? "↗" : "→"}
            </span>
          </span>
        )}
      </div>
    </>
  );

  const inner = item.image ? (
    <div className="grid gap-5 sm:grid-cols-[1fr_11rem]">
      <div className="min-w-0">{body}</div>
      <div className="order-first overflow-hidden border border-rule sm:order-none">
        <Img
          src={item.image.src}
          alt={item.image.alt}
          className="aspect-[16/10] h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04] sm:aspect-auto"
        />
      </div>
    </div>
  ) : (
    body
  );

  const cls = "card group block p-5 sm:p-7";

  return (
    <li className="rv">
      {item.slug ? (
        <Link to={`/projects/${item.slug}`} className={cls}>
          {inner}
        </Link>
      ) : item.href ? (
        <a href={item.href} target="_blank" rel="noreferrer noopener" className={cls}>
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
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
          className="link break-all text-[length:var(--fs-lg)] sm:text-[length:var(--fs-xl)]"
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
      <main className="mx-auto max-w-[var(--measure)] px-6 pt-24">
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

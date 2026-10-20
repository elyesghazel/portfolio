import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectView from "./components/ProjectView";
import RichText from "./components/RichText";
import Head from "./home/Head";
import Hero from "./home/Hero";
import WorkLog from "./home/WorkLog";
import Contact from "./home/Contact";
import Link, { usePath } from "./router";
import { about, projects, pull, site, stack } from "./content";

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

/** Fades `.rv` blocks in the first time they scroll into view. */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Home() {
  useReveal();

  return (
    <>
      <Header variant="home" />

      <main className="home">
        <div className="wrap">
          <Hero />

          <Head id="work" label="work" aside="git log --graph" />
          <WorkLog />

          <Head id="about" label="about" />
          <div className="about">
            <p className="pull rv">{pull}</p>
            <div className="body rv">
              {about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </div>

          <Head id="stack" label="stack" />
          <dl className="stack rv">
            {stack.map((group) => (
              <div key={group.group}>
                <dt>{group.group}</dt>
                <dd>
                  {group.items.map((item) => (
                    <span key={item} className="pill">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <Head id="contact" label="contact" />
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <>
      <Header variant="project" />
      <main className="wrap">
        <div className="max-w-3xl pt-24">
          <p className="text-faint">404</p>
          <h1 className="mt-4 text-2xl text-ink">No such project.</h1>
          <p className="mt-6">
            <Link to="/" className="link">
              <span aria-hidden>&larr;</span> back to everything else
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

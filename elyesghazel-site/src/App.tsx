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
import { about, hero, projects, pull, site, stack } from "./content";

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
  const [pullHead, pullTail] = pull.split(/(?<=thing )/);

  return (
    <>
      <Header variant="home" />

      <main className="home">
        <div className="wrap">
          <Hero />

          <Head id="work" refdes="J1-4" label="Work" aside="Four parts, newest first. The pads on the board above link here." />
          <WorkLog />

          <Head id="about" refdes="R1" label="About" />
          <div className="about">
            <div className="rv">
              <p className="pull">
                {pullHead}
                <em>{pullTail}</em>
              </p>
              <table className="spec ratings">
                <caption>Ratings</caption>
                <tbody>
                  {hero.proof.map((p) => (
                    <tr key={p.value}>
                      <td className="v">{p.value}</td>
                      <td>
                        <a href={p.href}>{p.text}</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="body rv">
              {about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </div>

          <Head id="stack" refdes="BOM" label="Stack" aside="Bill of materials: what the things above are made of." />
          <table className="bom rv">
            <thead>
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Group</th>
                <th scope="col">Parts</th>
                <th scope="col" className="q">Qty</th>
              </tr>
            </thead>
            <tbody>
              {stack.map((group, i) => (
                <tr key={group.group}>
                  <td className="r">L{i + 1}</td>
                  <th scope="row" className="g">
                    {group.group[0].toUpperCase() + group.group.slice(1)}
                  </th>
                  <td className="items-cell">
                    <div className="items">
                      {group.items.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="q">{group.items.length}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Head id="contact" refdes="J0" label="Contact" />
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
        <div className="proj max-w-3xl pt-24">
          <span className="ref cu">404 · no connect</span>
          <h1>No such project.</h1>
          <p className="mt-8">
            <Link to="/" className="btn">
              <span aria-hidden>&larr;</span> back to everything else
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

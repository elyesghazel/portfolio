import { useState } from "react";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Projects, { SwisscomTimeline } from "./components/Projects";
import { type Project, projects } from "./data/projects";
import ReactMarkdown from "react-markdown";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import { Reveal } from "./components/Reveal";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router";

function MainContent() {
  const location = useLocation();
  const isSwisscomMode = location.pathname === "/sc";

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const privateProjects = projects.filter((p) => p.type === "private");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-blue-500/30 font-mono overflow-x-hidden">
      <main className="pt-24 max-w-6xl mx-auto px-4 flex flex-col items-center space-y-32">
        <Reveal>
          <Hero />
        </Reveal>

        <Reveal>
          <About />
        </Reveal>

        <Reveal>
          <Skills />
        </Reveal>

        <section id="projects" className="w-full flex flex-col items-center">
          <Reveal>
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center">
                <span className="text-blue-500 mr-3">/</span> private_projekte
                <span className="text-blue-500 ml-3">/</span>
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <Projects
                displayProjects={privateProjects}
                onProjectClick={(p) => setSelectedProject(p)}
              />
            </div>
          </Reveal>
        </section>

        {isSwisscomMode && (
          <section id="experience" className="w-full">
            <Reveal>
              <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center">
                  <span className="text-blue-500 mr-3">/</span>{" "}
                  swisscom_projekte
                  <span className="text-blue-500 ml-3">/</span>
                </h2>
              </div>
            </Reveal>

            <Reveal>
              <div className="w-full">
                <SwisscomTimeline
                  onProjectClick={(p) => setSelectedProject(p)}
                />
              </div>
            </Reveal>
          </section>
        )}

        <Reveal>
          <Contact />
        </Reveal>

        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            ></div>
            <div className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                ✕
              </button>
              <header className="mb-10 text-center flex flex-col items-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-blue-500 font-mono text-xs tracking-widest px-2 py-1 bg-blue-500/10 rounded">
                    {selectedProject.type.toUpperCase()}
                  </span>
                  <span className="text-slate-500 font-mono text-xs">
                    {selectedProject.date}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight mx-auto">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap items-start justify-center gap-8 md:gap-12 pb-8 border-b border-white/5 w-full">
                  <div className="flex flex-col items-center min-w-[120px]">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-2 tracking-widest">
                      Rolle
                    </p>
                    <p className="text-sm text-slate-300 font-medium">
                      {selectedProject.role}
                    </p>
                  </div>
                  <div className="flex flex-col items-center max-w-md">
                    <p className="text-[10px] uppercase text-slate-500 font-bold mb-2 tracking-widest">
                      Technologies
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-slate-400 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </header>
              <div className="bg-white/[0.02] rounded-2xl p-6 md:p-8 border border-white/[0.05]">
                <article className="prose prose-invert prose-blue max-w-none">
                  <ReactMarkdown>{selectedProject.markdown}</ReactMarkdown>
                </article>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 p-10 border-t border-white/5 flex justify-center items-center text-slate-600 font-mono text-[12px] uppercase tracking-widest">
        <div>© 2026 ELYES — ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] ...">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/sc" element={<MainContent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

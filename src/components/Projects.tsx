import { type Project } from "../data/projects";
import { projects } from "../data/projects";

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <section id="projects" className="w-full">
      <div
        onClick={onClick}
        className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-2
        ${
          project.type === "swisscom"
            ? "bg-blue-900/10 border-blue-500/20 hover:border-blue-500/50"
            : "bg-white/5 border-white/10 hover:border-emerald-500/50"
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <span
            className={`text-xs font-mono px-2 py-1 rounded ${project.type === "swisscom" ? "bg-blue-500/20 text-blue-300" : "bg-emerald-500/20 text-emerald-300"}`}
          >
            {project.type === "swisscom" ? "Swisscom" : "Personal"}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {project.date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-100 group-hover:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 line-clamp-3">
          {project.shortDescription}
        </p>
      </div>
    </section>
  );
}

export default function Projects({
  displayProjects,
  onProjectClick,
}: {
  displayProjects: Project[];
  onProjectClick: (p: Project) => void;
}) {
  return (
    <>
      {displayProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </>
  );
}

export function SwisscomTimeline({
  onProjectClick,
}: {
  onProjectClick: (p: Project) => void;
}) {
  const scProjects = projects.filter((p) => p.type === "swisscom");

  return (
    <div className="relative mx-auto py-10">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent transform md:-translate-x-1/2" />

      <div className="space-y-16">
        {scProjects.map((p, index) => (
          <div
            key={p.id}
            className="relative flex items-center justify-between md:justify-normal group"
          >
            <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#0a0a0a] border-2 border-blue-500 rounded-full z-10 transform -translate-x-1/2  group-hover:scale-125 transition-transform" />

            {/* Content Container */}
            <div
              className={`
                w-[calc(100%-3rem)] md:w-[42%] ml-auto md:ml-0 
                ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
              `}
            >
              <div
                onClick={() => onProjectClick(p)}
                className={`
                  p-6 rounded-2xl bg-white/5 border border-white/10 
                  hover:border-blue-500/50 transition-all cursor-pointer 
                  hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]
                  ${index % 2 === 0 ? "md:text-right" : "md:text-left"}
                `}
              >
                <header
                  className={`flex flex-col mb-3 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}
                >
                  <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                    {p.duration || p.date}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                </header>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {p.shortDescription}
                </p>

                <div
                  className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                >
                  <div
                    className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
                  >
                    {p.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 uppercase font-medium"
                      >
                        {tag}
                      </span>
                    ))}

                    {p.tags.length > 3 && (
                      <span className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded text-slate-500 uppercase font-bold">
                        + {p.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

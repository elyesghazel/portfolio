const skillCategories = [
  {
    title: "Fullstack Development",
    description:
      "Von Minecraft-Plugins bis Spring Boot & React. Erfahren in komplexer Auth (JWT) & API-Design.",
    skills: ["Kotlin", "Spring Boot", "Java", "React", "Prisma", "PostgreSQL"],
    color: "#3b82f6",
  },
  {
    title: "DevOps & Self-Hosting",
    description:
      "Betrieb eigener Infrastruktur mit Traefik, Docker & Forgejo. Fokus auf CI/CD & Monitoring.",
    skills: ["Docker", "Linux", "Traefik", "CI/CD", "MailU", "Uptime Kuma"],
    color: "#a855f7",
  },
  {
    title: "Product & UI/UX Design",
    description:
      "Founder von slideplate.ch. Design-to-Code Workflow mit Figma & Responsive Web Design.",
    skills: [
      "Figma",
      "UI/UX",
      "Shopify",
      "Jira / Scrum",
      "Azure DevOps",
      "CAD",
    ],
    color: "#26c648ff",
  },
];

export default function Skills() {
  return (
    <section className="w-full max-w-6xl mx-auto py-20" id="skills">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <span className="text-blue-500 mr-3">/</span> tech_stack
          <span className="text-blue-500 ml-3">/</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            style={{ "--accent-color": cat.color } as React.CSSProperties}
            className="flex flex-col text-left p-8 gap-5 rounded-3xl 
                 bg-white/[0.02] border border-white/10 
                 hover:border-[var(--accent-color)] hover:shadow-[0_0_20px_var(--accent-color)]/10
                 hover:scale-105 transition-all duration-500 group relative overflow-hidden"
          >
            <div
              style={{ backgroundColor: cat.color }}
              className="absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
            ></div>

            <div className="top relative z-10">
              <div className="inline-block mb-2">
                <h3 className="text-xl font-bold text-white transition-colors">
                  {cat.title}
                </h3>
                <div
                  style={{ backgroundColor: cat.color }}
                  className="h-1 w-1/3 mt-1 rounded-full opacity-70 group-hover:w-full transition-all duration-500"
                ></div>
              </div>

              <p className="text-xs text-slate-500 mt-4 font-mono leading-relaxed h-10">
                {cat.description}
              </p>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg 
                       text-[11px] text-slate-400 font-mono 
                       group-hover:text-slate-200 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

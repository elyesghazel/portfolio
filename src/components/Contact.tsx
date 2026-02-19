import React from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const user = "elyes.ghazel";
  const domain = "swisscom.com";

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  const contactLinks = [
    {
      label: "LinkedIn",
      sub: "Professional Network",
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://linkedin.com/in/elyes-ghazel",
      color: "hover:text-blue-500",
      glow: "group-hover:bg-blue-500/10",
    },
    {
      label: "GitHub",
      sub: "Code Repositories",
      icon: <Github className="w-6 h-6" />,
      href: "https://git.elyesghazel.ch",
      color: "hover:text-white",
      glow: "group-hover:bg-purple-500/10",
    },
    {
      label: "Email",
      sub: "Let's write a message",
      icon: <Mail className="w-6 h-6" />,
      href: "#",
      onClick: handleEmailClick,
      color: "hover:text-emerald-400",
      glow: "group-hover:bg-emerald-400/10",
    },
  ];

  return (
    <section
      id="contact"
      className="w-full max-w-6xl mx-auto px-6 pt-10 pb-3 relative"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
          Lust auf ein{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">
            Gespräch?
          </span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-mono">
          Ich bin immer offen für spannende Projekte, fachlichen Austausch oder
          neue Möglichkeiten bei Swisscom.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={link.onClick}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group relative p-10 rounded-3xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/20"
          >
            {/* Hover Glow Effect */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${link.glow}`}
            ></div>

            <div className="relative z-10 flex flex-col h-full">
              <div
                className={`mb-8 transition-colors duration-300 ${link.color}`}
              >
                {link.icon}
              </div>

              <div className="mt-auto">
                <span className="block text-xs font-mono text-slate-500 uppercase tracking-[0.2em] mb-2">
                  {link.sub}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-slate-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

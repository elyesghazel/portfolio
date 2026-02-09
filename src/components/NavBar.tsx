import TypewriterName from "./TypewriterName";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Über mich", href: "#about" },
    { name: "Projekte", href: "#projects" },
    { name: "Swisscom", href: "#experience" },
    { name: "Kontakt", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md ">
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo/Name */}
        <div className="cursor-pointer">
          <TypewriterName />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 relative z-[1000]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative font-mono text-sm text-slate-400 hover:text-white transition-all duration-300 py-2 block pointer-events-auto group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
            ) : (
              <path d="M4 6h16M4 12h16m-7 6h7" strokeWidth="2" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-[#0a0a0a] border-b border-white/10 transition-all duration-300 ${isOpen ? "opacity-100 h-auto py-6" : "opacity-0 h-0 overflow-hidden"}`}
      >
        <div className="flex flex-col px-6 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-mono text-lg text-slate-400 hover:text-blue-500"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

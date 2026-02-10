export default function Hero() {
  return (
    <section
      className="relative pt-20 pb-20 max-w-6xl mx-auto overflow-hidden"
      id="hero"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[120px] -z-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <h2 className="text-blue-500 font-mono text-sm tracking-widest uppercase">
            Informatiker Applikationsentwicklung @ Swisscom
          </h2>

          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
            Hey I'm <br />
            <span className="text-blue-500/80 italic font-serif font-light pr-2">
              Elyes
            </span>{" "}
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-mono leading-relaxed mt-6 border-l-2 border-blue-500/30 pl-6">
            Ich entwickle skalierbare Software bei{" "}
            <span className="text-white font-semibold">Swisscom</span> und fülle
            die Lücke zur Hardware. Von Cloud-Infrastruktur bis zum selbst
            entwickelten{" "}
            <span className="text-white border-b border-white/20 pb-0.5 uppercase text-sm">
              Physical Computing
            </span>{" "}
            Interface.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95"
            >
              Projekte ansehen
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/10 text-white rounded-full hover:bg-white/5 transition-all active:scale-95"
            >
              Kontakt
            </a>
          </div>
        </div>

        <div className="md:col-span-5 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-50 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-[#161616]">
            <img
              src="/profile.png"
              alt="Elyes Ghazel"
              className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 hover:scale-100"
            />
          </div>

          <div className="absolute -bottom-4 -right-4 bg-[#0a0a0a] border border-white/10 p-3 rounded-xl hidden md:block">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                Open for ideas!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

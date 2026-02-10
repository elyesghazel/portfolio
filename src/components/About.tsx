export default function About() {
  return (
    <section className="w-full max-w-4xl mx-auto py-10" id="about">
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="text-blue-500 mr-2">01.</span> Background
          </h2>

          <div className="space-y-6 text-slate-400 leading-relaxed text-md">
            <p>
              Ich habe mit{" "}
              <span className="text-white font-medium">8 Jahren</span>{" "}
              angefangen zu programmieren. Was mit Minecraft-Plugins in Java
              begann, hat sich zu einer Leidenschaft für komplexe Systeme
              entwickelt. Heute, mit 15, kombiniere ich meine Ausbildung bei{" "}
              <span className="text-blue-400">Swisscom</span> mit dem Betrieb
              eigener Infrastruktur.
            </p>

            <p>
              Mein Fokus liegt auf{" "}
              <span className="text-white font-medium">
                Fullstack Engineering
              </span>{" "}
              (Kotlin/Spring Boot/React) und{" "}
              <span className="text-white font-medium">System-Architektur</span>
              . Ich hoste meine eigenen Dienste - von Mailservern über
              Git-Instanzen bis hin zu Monitoring-Tools - und habe mit{" "}
              <span className="text-emerald-400 underline underline-offset-5 hover:text-emerald-300 transition-colors">
                <a href="https://slideplate.ch">slideplate.ch</a>
              </span>{" "}
              bewiesen, dass ich Hardware, Software und Business verbinden kann.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Erfahrung
                </p>
                <p className="text-white font-mono">7+ Jahre</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Status
                </p>
                <p className="text-white font-mono">1. Lehrjahr*</p>
                <p className="text-[10px] text-slate-600 italic">
                  *Skillset 4. LJ
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Hosting
                </p>
                <p className="text-white font-mono">Self-hosted</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Business
                </p>
                <p className="text-white font-mono">slideplate.ch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

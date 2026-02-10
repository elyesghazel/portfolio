import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/testimonials";
import ReactMarkdown from "react-markdown";

export default function Recommendations() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full max-w-5xl mx-auto py-12 md:py-20 px-4 relative">
      <div className="flex flex-col items-center mb-8 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
          <span className="text-blue-500 mr-2 md:mr-3">/</span> empfehlungen
          <span className="text-blue-500 ml-2 md:ml-3">/</span>
        </h2>
      </div>

      <div className="relative group">
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 px-1 md:px-5"
                style={
                  {
                    "--accent": `var(--color-${t.accentColor})`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="relative p-5 md:p-12 bg-white/[0.02] rounded-3xl md:rounded-4xl border transition-all duration-500 min-h-[320px] md:min-h-[400px] flex flex-col justify-center"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--accent), transparent 80%)",
                  }}
                >
                  <div className="relative z-10 text-center">
                    {/* Textgröße auf Mobile reduziert (text-base) */}
                    <div className="text-base md:text-xl text-slate-300 italic leading-relaxed mb-6 md:mb-10 max-w-2xl mx-auto prose prose-invert prose-p:leading-relaxed">
                      <ReactMarkdown>{t.content}</ReactMarkdown>
                    </div>

                    <div className="flex flex-col items-center mt-auto">
                      <div
                        className="w-8 md:w-12 h-[2px] mb-4 md:mb-6 shadow-[0_0_15px_var(--accent)]"
                        style={{ backgroundColor: "var(--accent)" }}
                      />
                      <h4 className="text-white font-bold text-base md:text-lg">
                        {t.author}
                      </h4>
                      <p
                        className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] mt-1"
                        style={{ color: "var(--accent)" }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pfeile - Nur auf Desktop sichtbar (hidden md:block) */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots - etwas kompakter auf Mobile */}
      <div className="flex justify-center gap-2 md:gap-3 mt-8 md:mt-10">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-6 md:w-8 bg-blue-500"
                : "w-1 md:w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

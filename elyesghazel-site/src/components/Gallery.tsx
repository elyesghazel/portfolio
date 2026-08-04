import { useEffect, useState } from "react";
import type { ProjectImage } from "../content";

/**
 * A colour photo gallery. Click any image to expand it into a full-screen
 * lightbox with arrow-key navigation. Images that 404 remove themselves,
 * caption and all, so slots can exist before their files do.
 */
export default function Gallery({ images }: { images: ProjectImage[] }) {
  const [broken, setBroken] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);

  const order = images.map((_, i) => i).filter((i) => !broken.has(i));

  function markBroken(i: number) {
    setBroken((prev) => new Set(prev).add(i));
  }

  function step(dir: 1 | -1) {
    setActive((cur) => {
      if (cur === null || order.length === 0) return cur;
      const pos = order.indexOf(cur);
      return order[(pos + dir + order.length) % order.length];
    });
  }

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      <div className="mt-12 space-y-8">
        {images.map((image, i) =>
          broken.has(i) ? null : (
            <figure key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Expand image: ${image.alt}`}
                className="group block w-full cursor-zoom-in overflow-hidden border border-rule"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  onError={() => markBroken(i)}
                  className="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </button>
              {image.caption && (
                <figcaption className="mt-3 text-sm text-faint">{image.caption}</figcaption>
              )}
            </figure>
          ),
        )}
      </div>

      {active !== null && images[active] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={images[active].alt}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-paper/95 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 text-2xl leading-none text-dim transition-colors hover:text-ink"
          >
            ✕
          </button>

          {order.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl leading-none text-dim transition-colors hover:text-ink sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-4 text-3xl leading-none text-dim transition-colors hover:text-ink sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <img
            src={images[active].src}
            alt={images[active].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-[92vw] object-contain"
          />
          {images[active].caption && (
            <figcaption
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl text-center text-sm text-dim"
            >
              {images[active].caption}
            </figcaption>
          )}
        </div>
      )}
    </>
  );
}

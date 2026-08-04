import { useState } from "react";
import type { ProjectImage } from "../content";

/**
 * A captioned image that hides itself - caption and all - if the file 404s.
 * Lets a project's gallery be wired up before the photos are dropped in.
 */
export default function Figure({ image }: { image: ProjectImage }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;

  return (
    <figure>
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        onError={() => setBroken(true)}
        className="w-full border border-rule object-cover grayscale"
      />
      {image.caption && (
        <figcaption className="mt-3 text-sm text-faint">{image.caption}</figcaption>
      )}
    </figure>
  );
}

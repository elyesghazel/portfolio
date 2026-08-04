import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * An <img> that removes itself if the file 404s. Lets us wire up photo slots
 * before the files exist without showing a broken-image icon in the meantime.
 */
export default function Img({ src, alt, className }: Props) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className={className}
    />
  );
}

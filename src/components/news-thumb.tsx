"use client";

import { useEffect, useRef, useState } from "react";
import { NewsArt } from "@/components/news-art";
import type { NewsCategory } from "@/content/news";

// The article's own preview image when it has one, our illustration when it
// does not or when the image fails to load (blocked, moved, offline).
export function NewsThumb({
  category,
  seed,
  image,
  className,
}: {
  category: NewsCategory;
  seed: string;
  image?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail before React attaches onError, so check once after mount.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (!image || failed) return <NewsArt category={category} seed={seed} className={className} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={image}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${className ?? ""} bg-[#14141b] object-cover`}
    />
  );
}

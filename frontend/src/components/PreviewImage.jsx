import { useState } from "react";

/**
 * Walks an ordered list of image candidates. On a load error it advances to the
 * next source (actually swapping `src`, not merely hiding a broken <img>); when
 * every candidate has failed it renders nothing, leaving whatever the parent
 * placed behind it visible.
 *
 * The parent is expected to render its own placeholder underneath this image —
 * that placeholder is what shows while a slow screenshot is still loading, and
 * what remains if all sources are exhausted. So there is no blank state.
 */
export default function PreviewImage({ sources = [], alt = "", className = "" }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Reset the chain if the candidate list itself changes (adjusting state during
  // render, rather than in an effect, so there's no extra paint with stale state).
  const key = sources.join("|");
  const [prevKey, setPrevKey] = useState(key);
  if (key !== prevKey) {
    setPrevKey(key);
    setIndex(0);
    setLoaded(false);
  }

  const src = sources[index];
  if (!src) return null; // every candidate failed — parent's placeholder shows through

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={className}
      style={{ opacity: loaded ? 1 : 0 }}
      onLoad={() => setLoaded(true)}
      onError={() => {
        setLoaded(false);
        setIndex((i) => i + 1);
      }}
    />
  );
}

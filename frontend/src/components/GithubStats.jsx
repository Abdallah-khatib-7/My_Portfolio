import { useCallback, useMemo, useState } from "react";
import Reveal from "./Reveal";

const USER = "Abdallah-khatib-7";

const CARD = "border border-border rounded-2xl overflow-hidden bg-[#0a0a0a] p-2";

/**
 * Every one of these services sends a long browser Cache-Control — readme-stats
 * and streak-stats both send max-age=86400, so without this the browser reuses a
 * day-old image. Neither honours a no-cache query param (readme-stats clamps
 * cache_seconds to a 12h floor; streak-stats ignores it), so a unique param per
 * load is the only thing that actually forces a re-fetch.
 *
 * It also busts the services' own edge caches: a new query string is a new cache
 * key, which returns X-Vercel-Cache: MISS and makes them recompute against the
 * GitHub API rather than replay a cached SVG. So this buys genuinely fresh data,
 * not just a re-download.
 *
 * The streak card is a static SVG committed daily to the profile repo by a
 * scheduled GitHub Action (the public streak-stats.herokuapp.com host is dead),
 * so busting its cache re-fetches it but cannot make it newer than the Action's
 * last run. Same story for the snake.
 */

// width/height are each SVG's intrinsic dimensions — the rendered size is still
// controlled by CSS, but the attributes give the browser the aspect ratio up
// front so the cards reserve their space instead of shifting layout on load.
const IMAGES = (nonce) => [
  {
    key: "stats",
    alt: "GitHub stats",
    width: 467,
    height: 195,
    src:
      `https://github-readme-stats-one-iota-93.vercel.app/api?username=${USER}` +
      `&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0a0a0a` +
      `&title_color=ef7f3f&icon_color=ef7f3f&text_color=f5efe8&rank_icon=github` +
      `&cache_seconds=1800&t=${nonce}`,
  },
  {
    key: "streak",
    alt: "GitHub streak",
    width: 495,
    height: 195,
    src:
      `https://raw.githubusercontent.com/${USER}/${USER}/main/profile/streak-portfolio.svg` +
      `?t=${nonce}`,
  },
  {
    key: "snake",
    alt: "Contribution snake",
    width: 880,
    height: 192,
    src:
      `https://raw.githubusercontent.com/${USER}/${USER}/output/` +
      `github-contribution-grid-snake.svg?t=${nonce}`,
  },
  {
    key: "activity",
    alt: "GitHub activity graph",
    width: 1200,
    height: 420,
    src:
      `https://github-readme-activity-graph.vercel.app/graph?username=${USER}` +
      `&bg_color=0a0a0a&color=a89a8a&line=ef7f3f&point=f5efe8&area=true` +
      `&hide_border=true&t=${nonce}`,
  },
];

export default function GithubStats() {
  // A fresh nonce per mount (and per manual refresh) — every image URL is unique.
  const [nonce, setNonce] = useState(() => Date.now());
  const [settled, setSettled] = useState(0);

  const images = useMemo(() => IMAGES(nonce), [nonce]);
  const byKey = useMemo(
    () => Object.fromEntries(images.map((i) => [i.key, i])),
    [images]
  );

  const total = images.length;
  const refreshing = settled < total;

  // Counts both loads and errors, so a failing image can't wedge it on "Refreshing".
  const onSettle = useCallback(() => setSettled((n) => n + 1), []);

  const refresh = useCallback(() => {
    setSettled(0);
    setNonce(Date.now());
  }, []);

  const updatedAt = useMemo(
    () =>
      new Date(nonce).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [nonce]
  );

  // `key` is applied directly on each <img> (not spread — React warns on that) so
  // a refresh remounts the element rather than reusing the already-decoded image.
  const imgProps = (key) => ({
    src: byKey[key].src,
    alt: byKey[key].alt,
    width: byKey[key].width,
    height: byKey[key].height,
    loading: "lazy",
    onLoad: onSettle,
    onError: onSettle,
  });

  return (
    <div
      id="github"
      className="max-w-[1200px] mx-auto pt-[130px] px-12 pb-[110px] mobile:pt-[90px] mobile:px-6 mobile:pb-[70px]"
    >
      <Reveal className="flex items-baseline gap-6 flex-wrap">
        <div className="text-accent font-mono text-[15px] font-bold">04</div>
        <div className="font-display text-[44px] font-extrabold tracking-[-1.5px] mobile:text-[32px]">
          GitHub, live
        </div>
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted font-mono text-[14px] font-medium ml-auto transition-colors duration-200 hover:text-accent"
        >
          @{USER} ↗
        </a>
      </Reveal>

      {/* ─── live indicator + manual refresh ─── */}
      <Reveal delay={0.05} className="flex items-center gap-3 mt-6 flex-wrap">
        <span className="inline-flex items-center gap-2 font-mono text-[12px] font-medium text-muted-2">
          <span
            className={`w-[7px] h-[7px] rounded-full ${
              refreshing ? "bg-accent animate-pulse" : "bg-whatsapp"
            }`}
          />
          {refreshing ? "Fetching latest…" : `Live · updated on load at ${updatedAt}`}
        </span>
        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          aria-label="Refresh GitHub stats"
          className="inline-flex items-center gap-2 font-mono text-[12px] font-medium text-muted-2 border border-border rounded-full py-1.5 px-3 [transition:color_0.2s,border-color_0.2s] hover:text-accent hover:border-border-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className={`inline-block ${refreshing ? "animate-spin" : ""}`}>↻</span>
          Refresh
        </button>
      </Reveal>

      <div className="grid grid-cols-2 gap-5 mt-8 mobile:grid-cols-1">
        <Reveal className={CARD}>
          <img key={nonce} {...imgProps("stats")} className="w-full block" />
        </Reveal>
        <Reveal delay={0.1} className={CARD}>
          <img key={nonce} {...imgProps("streak")} className="w-full block" />
        </Reveal>
      </div>

      <Reveal className="mt-5 border border-border rounded-2xl bg-fg p-6">
        <div className="text-muted-3 font-mono text-[12px] font-semibold tracking-[2px] mb-[14px]">
          CONTRIBUTION SNAKE
        </div>
        <img key={nonce} {...imgProps("snake")} />
      </Reveal>

      <Reveal className={`${CARD} mt-5`}>
        <img key={nonce} {...imgProps("activity")} className="w-full block" />
      </Reveal>
    </div>
  );
}

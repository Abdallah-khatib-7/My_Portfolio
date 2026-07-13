import { Link } from "react-router-dom";
import Reveal from "./Reveal";

export default function ProjectCard({
  p,
  expanded,
  onToggle,
  onHoverStart,
  onHoverEnd,
  onActionsHoverStart,
  onActionsHoverEnd,
}) {
  const stop = (e) => e.stopPropagation();

  // LIVE reads green; anything else (e.g. JARVIS's "In Development") reads amber.
  const isLive = p.status === "LIVE";
  const badgeClass = isLive
    ? "text-whatsapp border-[rgba(37,211,102,0.3)]"
    : "text-[#f59e0b] border-[rgba(245,158,11,0.3)]";

  return (
    <Reveal delay={Number(p.num) % 2 === 0 ? 0.08 : 0}>
      <div
        className="group border-t border-border py-[26px] px-1 cursor-pointer"
        onClick={onToggle}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-[18px] min-w-0">
            <span className="text-accent font-mono text-[15px] font-bold shrink-0">
              {p.num}
            </span>
            <span className="relative font-display text-[clamp(24px,4vw,34px)] font-bold tracking-[-0.5px] text-fg">
              {p.name}
              <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-accent transition-[width] duration-300 ease-smooth group-hover:w-full" />
            </span>
          </div>
          <div
            className="flex items-center gap-4 shrink-0 mobile:gap-[10px]"
            onMouseEnter={onActionsHoverStart}
            onMouseLeave={onActionsHoverEnd}
          >
            <span
              className={`font-mono text-[11px] font-medium border rounded-full py-1 px-3 whitespace-nowrap mobile:hidden ${badgeClass}`}
            >
              ● {p.badge}
            </span>
            <Link
              to={`/work/${p.slug}`}
              onClick={stop}
              className="text-accent font-mono text-[11px] font-medium border border-[rgba(239,127,63,0.3)] rounded-full py-1 px-3 whitespace-nowrap transition-colors duration-200 hover:bg-accent hover:text-bg"
            >
              See full details →
            </Link>
            <span
              className="inline-block text-accent font-display text-[22px] font-bold transition-transform duration-[350ms]"
              style={{ transform: expanded ? "rotate(45deg)" : "none" }}
            >
              +
            </span>
          </div>
        </div>

        <div className="text-muted font-sans text-[15.5px] font-normal leading-[1.6] mt-[10px] max-w-[640px]">
          {p.tagline}
        </div>

        <div
          className="overflow-hidden [transition:max-height_0.55s_cubic-bezier(0.2,0.7,0.2,1),opacity_0.4s]"
          style={{
            maxHeight: expanded ? "1000px" : "0px",
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="pt-[22px]">
            <div className="border-t border-border pt-[22px] text-body font-sans text-[15px] font-normal leading-[1.75]">
              {p.description}
            </div>
            <div className="flex gap-2 flex-wrap mt-5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-muted-2 font-mono text-[12px] font-medium border border-border rounded-md py-[5px] px-[11px]"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-6 flex-wrap">
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={stop}
                  className="bg-accent text-bg font-sans text-[14px] font-semibold py-[11px] px-5 rounded-full inline-block transition-transform duration-200 hover:-translate-y-[3px] hover:text-bg"
                >
                  {p.ctaLabel} ↗
                </a>
              )}
              <a
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={stop}
                className="border border-border-2 text-fg font-sans text-[14px] font-semibold py-[11px] px-5 rounded-full inline-flex items-center gap-[10px] transition-[border-color,transform] duration-200 hover:border-accent hover:-translate-y-[3px] hover:text-fg"
              >
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

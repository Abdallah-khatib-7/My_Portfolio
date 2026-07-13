import Reveal from "./Reveal";

export default function ProjectCard({ p, expanded, onToggle, onHoverStart, onHoverEnd }) {
  const stop = (e) => e.stopPropagation();

  return (
    <Reveal delay={Number(p.num) % 2 === 0 ? 0.08 : 0}>
      <div
        className="work__row"
        onClick={onToggle}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className="work__row-top">
          <div className="work__row-main">
            <span className="work__row-num">{p.num}</span>
            <span className="work__row-name">
              {p.name}
              <span className="work__row-underline" />
            </span>
          </div>
          <div className="work__row-side">
            <span className="project-card__badge">● {p.badge}</span>
            <span
              className="work__row-plus"
              style={{ transform: expanded ? "rotate(45deg)" : "none" }}
            >
              +
            </span>
          </div>
        </div>

        <div className="work__row-tagline">{p.tagline}</div>

        <div
          className="project-card__detail"
          style={{
            maxHeight: expanded ? "1000px" : "0px",
            opacity: expanded ? 1 : 0,
          }}
        >
          <div className="project-card__detail-inner">
            <div className="project-card__desc">{p.description}</div>
            <div className="project-card__tags" style={{ marginTop: 20 }}>
              {p.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
            <div className="project-card__actions">
              <a href={p.liveUrl} target="_blank" rel="noreferrer" onClick={stop} className="btn-primary">
                {p.ctaLabel} ↗
              </a>
              <a href={p.repoUrl} target="_blank" rel="noreferrer" onClick={stop} className="btn-outline">
                GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
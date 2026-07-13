import Reveal from "./Reveal";

export default function ProjectCard({ p, expanded, onToggle }) {
  const stop = (e) => e.stopPropagation();

  return (
    <Reveal delay={(p.num % 2) * 0.12}>
      <div className="project-card" onClick={onToggle}>
        <div className="project-card__top">
          <div className="project-card__num">{p.num}</div>
          <span className="project-card__badge">● {p.badge}</span>
        </div>
        <div className="project-card__name">{p.name}</div>
        <div className="project-card__tagline">{p.tagline}</div>
        <div className="project-card__tags">
          {p.stackPreview.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
          <span className="project-card__more">{p.moreCount}</span>
        </div>
        <div
          className="project-card__detail"
          style={{
            maxHeight: expanded ? "800px" : "0px",
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
        <div className="project-card__expand">
          <span
            className="project-card__plus"
            style={{ transform: expanded ? "rotate(45deg)" : "none" }}
          >
            +
          </span>
          <span>{expanded ? "close" : "expand"}</span>
        </div>
      </div>
    </Reveal>
  );
}

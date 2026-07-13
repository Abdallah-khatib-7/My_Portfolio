import { useState } from "react";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../data";

export default function Work() {
  const [expanded, setExpanded] = useState(-1);

  return (
    <div id="work" className="section" style={{ paddingTop: 0, paddingBottom: 130 }}>
      <Reveal className="work__header">
        <div className="section-index">02</div>
        <div className="section-title">Selected work</div>
        <div className="work__hint">click a row to expand</div>
      </Reveal>
      <div className="work__grid">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.name}
            p={p}
            expanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? -1 : i)}
          />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "../data";

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

const PREVIEW_W = 300;
const PREVIEW_H = 150;

export default function Work() {
  const [expanded, setExpanded] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [smooth, setSmooth] = useState({ x: 0, y: 0 });
  const [broken, setBroken] = useState({});
  const rafRef = useRef(null);

  useEffect(() => {
    function animate() {
      setSmooth((prev) => ({
        x: lerp(prev.x, mouse.x, 0.15),
        y: lerp(prev.y, mouse.y, 0.15),
      }));
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouse]);

  function handleMouseMove(e) {
    setMouse({ x: e.clientX, y: e.clientY });
  }

  const maxX = typeof window !== "undefined" ? window.innerWidth - PREVIEW_W - 24 : 0;
  const maxY = typeof window !== "undefined" ? window.innerHeight - PREVIEW_H - 24 : 0;
  const clampedX = Math.min(Math.max(smooth.x + 24, 24), Math.max(maxX, 24));
  const clampedY = Math.min(Math.max(smooth.y - 90, 24), Math.max(maxY, 24));

  return (
    <div
      id="work"
      className="section work"
      style={{ paddingTop: 0, paddingBottom: 130 }}
      onMouseMove={handleMouseMove}
    >
      <Reveal className="work__header">
        <div className="section-index">02</div>
        <div className="section-title">Selected work</div>
        <div className="work__hint">hover to preview, click to expand</div>
      </Reveal>

      <div
        className="work__preview"
        style={{
          transform: `translate3d(${clampedX}px, ${clampedY}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="work__preview-box">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="work__preview-cover"
              style={{ background: p.color, opacity: hoveredIndex === i ? 1 : 0 }}
            >
              {!broken[p.name] ? (
                <img
                  src={p.previewImage}
                  alt=""
                  className="work__preview-img"
                  onError={() => setBroken((b) => ({ ...b, [p.name]: true }))}
                />
              ) : (
                <>
                  <span className="work__preview-num">{p.num}</span>
                  <span className="work__preview-name">{p.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="work__list">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.name}
            p={p}
            expanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? -1 : i)}
            onHoverStart={() => {
              setHoveredIndex(i);
              setIsVisible(true);
            }}
            onHoverEnd={() => {
              setHoveredIndex(-1);
              setIsVisible(false);
            }}
          />
        ))}
      </div>
    </div>
  );
}
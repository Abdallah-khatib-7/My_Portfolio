import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import PreviewImage from "./PreviewImage";
import { projects } from "../data";

const PREVIEW_W = 300;
const PREVIEW_H = 150;

// Tuned to feel like the old per-frame lerp(…, 0.15) follow.
const FOLLOW_SPRING = { stiffness: 260, damping: 34, mass: 0.9 };

export default function Work() {
  const [expanded, setExpanded] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  // Set while the cursor is over a row's action buttons, so the floating preview
  // never sits on top of them and swallow their clicks.
  const [overActions, setOverActions] = useState(false);

  // The hover-follow smoothing lives in motion values, not React state: updates
  // are written straight to the preview's transform without re-rendering the
  // section, and the springs' internal animation stops as soon as they settle —
  // there is no always-on requestAnimationFrame loop.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, FOLLOW_SPRING);
  const springY = useSpring(mouseY, FOLLOW_SPRING);
  const previewX = useTransform(springX, (x) => {
    const max = Math.max(window.innerWidth - PREVIEW_W - 24, 24);
    return Math.min(Math.max(x + 24, 24), max);
  });
  const previewY = useTransform(springY, (y) => {
    const max = Math.max(window.innerHeight - PREVIEW_H - 24, 24);
    return Math.min(Math.max(y - 90, 24), max);
  });

  function handleMouseMove(e) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }

  return (
    <div
      id="work"
      className="relative max-w-[1200px] mx-auto pt-0 px-12 pb-[130px] mobile:px-6"
      onMouseMove={handleMouseMove}
    >
      <Reveal className="flex items-baseline gap-6 flex-wrap">
        <div className="text-accent font-mono text-[15px] font-bold">02</div>
        <div className="font-display text-[44px] font-extrabold tracking-[-1.5px] mobile:text-[32px]">
          Selected work
        </div>
        <div className="text-muted-3 font-mono text-[13px] font-medium ml-auto">
          hover to preview, click to expand
        </div>
      </Reveal>

      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none mobile:hidden"
        style={{
          x: previewX,
          y: previewY,
          opacity: isVisible && !overActions ? 1 : 0,
        }}
      >
        <div className="relative w-[300px] h-[150px] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="absolute inset-0 flex flex-col items-center justify-center gap-[6px] transition-opacity duration-[350ms] ease-out"
              style={{ background: p.color, opacity: hoveredIndex === i ? 1 : 0 }}
            >
              {/* Base layer: always rendered on the project's gradient. It shows
                  while a slow screenshot loads, and remains if every preview
                  source fails — so this box is never blank. */}
              <span className="relative z-[1] font-mono text-[15px] font-bold text-[rgba(0,0,0,0.55)]">
                {p.num}
              </span>
              <span className="relative z-[1] font-display text-[26px] font-extrabold text-[#14121f] tracking-[-0.5px]">
                {p.name}
              </span>

              {/* Screenshot → GitHub OG card → (nothing, placeholder shows). */}
              <PreviewImage
                sources={p.previewSources}
                className="absolute inset-0 z-[2] w-full h-full object-cover object-top transition-opacity duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-11">
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
              setOverActions(false);
            }}
            onActionsHoverStart={() => setOverActions(true)}
            onActionsHoverEnd={() => setOverActions(false)}
          />
        ))}
      </div>
    </div>
  );
}

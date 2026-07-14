import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Reveal from "./Reveal";
import { stackItems, stackCategories } from "../data";

const TABS = ["All", ...stackCategories];

const SPRING = { type: "spring", stiffness: 260, damping: 22, mass: 0.5 };
const TILT_SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

/* Max degrees the card leans. Deliberately small — "catches the light", not a
   spinning card. */
const TILT = 7;

const GRID_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 24, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: SPRING },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.18, ease: "easeOut" } },
};

/* A device with no hover-capable pointer gets the entrance animation and a tap
   scale, but no tilt and no cursor glow — there is no cursor to track. */
function useIsTouch() {
  const [isTouch] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: none)").matches === true
  );
  return isTouch;
}

function StackCard({ item, isTouch, ...motionProps }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Cursor position within the card, normalised to 0..1. Centre (0.5, 0.5) is flat.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [TILT, -TILT]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-TILT, TILT]), TILT_SPRING);

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(239,127,63,0.20), transparent 60%)`;

  function handlePointerMove(e) {
    if (isTouch) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    setHovered(false);
    // Springs ease back to flat rather than snapping.
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      layout
      variants={CARD_VARIANTS}
      className="[perspective:900px]"
      {...motionProps}
    >
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => !isTouch && setHovered(true)}
        onPointerLeave={handlePointerLeave}
        whileTap={isTouch ? { scale: 0.95 } : undefined}
        style={
          isTouch
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }
        }
        className="relative flex flex-col items-center gap-3 bg-bg border border-border rounded-[14px] pt-6 px-3 pb-5 overflow-hidden [transition:border-color_0.3s] hover:border-border-3"
      >
        {/* Cursor-following glow. Sits under the content, never eats pointer events. */}
        {!isTouch && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{ background: glow }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}

        {/* Icon animates on its own, so the card feels layered rather than flat. */}
        <motion.div
          className="relative"
          animate={hovered ? { rotate: -8, scale: 1.14 } : { rotate: 0, scale: 1 }}
          transition={SPRING}
        >
          {item.icon && (
            <div
              role="img"
              aria-label={item.name}
              className="w-9 h-9 bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url("${item.icon}")`,
                filter: item.invert ? "invert(1)" : "none",
              }}
            />
          )}
          {item.glyph && (
            <div className="h-9 flex items-center justify-center text-accent font-mono text-[20px] font-bold">
              {item.glyph}
            </div>
          )}
        </motion.div>

        <div className="relative font-sans text-[13.5px] font-medium text-body text-center">
          {item.name}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Stack() {
  const isTouch = useIsTouch();
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? stackItems
        : stackItems.filter((s) => s.category === active),
    [active]
  );

  return (
    <div id="stack" className="bg-bg-alt border-t border-b border-border">
      <div className="max-w-[1200px] mx-auto py-[110px] px-12">
        <Reveal className="flex items-baseline gap-6">
          <div className="text-accent font-mono text-[15px] font-bold">03</div>
          <div className="font-display text-[44px] font-extrabold tracking-[-1.5px] mobile:text-[32px]">
            Tech stack
          </div>
        </Reveal>

        {/* ─── category filter tabs ─── */}
        <Reveal delay={0.1} className="flex gap-2 flex-wrap mt-8">
          {TABS.map((tab) => {
            const isActive = active === tab;
            return (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                aria-pressed={isActive}
                className={`relative font-mono text-[12px] font-medium border rounded-full py-2 px-4 [transition:color_0.2s,border-color_0.2s] ${
                  isActive
                    ? "text-bg border-accent"
                    : "text-muted-2 border-border hover:text-fg hover:border-border-3"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="stack-tab-pill"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={SPRING}
                  />
                )}
                <span className="relative z-[1]">{tab}</span>
              </button>
            );
          })}
        </Reveal>

        <motion.div
          variants={GRID_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-[14px] mt-8"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((s) => (
              <StackCard key={s.name} item={s} isTouch={isTouch} exit="exit" />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

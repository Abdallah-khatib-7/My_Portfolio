import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Reveal from "./Reveal";

const STATS = [
  { value: 6, suffix: "", label: "systems built end-to-end" },
  { value: 6, suffix: "", label: "live in production" },
  { value: 5, suffix: "+", label: "years managing a pharmacy" },
];

const HEADING_WORDS = "Not tutorial projects. Not clones.".split(" ");

function StatCounter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="font-display text-[40px] font-extrabold text-accent block tabular-nums"
    >
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <div
      id="about"
      className="max-w-[1200px] mx-auto pt-[130px] px-12 pb-[110px] mobile:pt-[90px] mobile:px-6 mobile:pb-[70px] grid grid-cols-[1fr_1.4fr] gap-20 tablet:grid-cols-1 tablet:gap-10"
    >
      <div>
        <Reveal>
          <div className="flex items-center gap-[14px]">
            <span className="text-accent font-mono text-[15px] font-bold">01</span>
            <span className="h-px flex-1 bg-[linear-gradient(90deg,var(--color-accent),transparent)] max-w-[120px]" />
          </div>
        </Reveal>

        <div className="mt-5 font-mono text-[14px] font-medium text-muted-2 tracking-[1px]">
          <span className="text-accent animate-[blink_1.1s_step-end_infinite] mr-[2px]">
            $
          </span>{" "}
          whoami
        </div>

        <h2 className="font-display text-[44px] font-extrabold leading-[1.05] tracking-[-1.5px] mt-[14px]">
          {HEADING_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h2>
      </div>

      <div>
        <Reveal delay={0.15}>
          <p className="font-sans text-[18px] font-normal leading-[1.75] text-body m-0">
            I'm a Computer Science graduate from the Lebanese International
            University with 5+ years of real pharmacy management experience. I
            build full-stack systems that solve real problems.
          </p>
          <p className="font-sans text-[18px] font-normal leading-[1.75] text-body m-0 mt-[18px]">
            Every system I've built has been designed from scratch — database
            schema, REST API, frontend UI, real-time features, AI integration,
            and cloud deployment. I think like a product engineer, not just a
            coder.
          </p>
        </Reveal>

        <div className="flex gap-5 mt-11 flex-wrap">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={0.25 + i * 0.1}
              className="flex-[1_1_140px] bg-bg-alt border border-border rounded-[14px] py-[22px] px-5 [transition:transform_0.3s_cubic-bezier(0.2,0.7,0.2,1),border-color_0.3s,box-shadow_0.3s] hover:-translate-y-[5px] hover:border-border-3 hover:shadow-[0_20px_40px_-24px_rgba(239,127,63,0.25)]"
            >
              <StatCounter value={s.value} suffix={s.suffix} />
              <div className="text-muted font-sans text-[13px] font-medium mt-[6px]">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.6}
          className="mt-7 text-muted-3 font-mono text-[13px] font-medium border-t border-border pt-[18px]"
        >
          // 0 tutorials followed. 0 templates cloned.
        </Reveal>
      </div>
    </div>
  );
}

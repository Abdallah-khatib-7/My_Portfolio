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
    <span ref={ref} className="about__stat-num">
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <div id="about" className="section about">
      <div>
        <Reveal>
          <div className="about__index-wrap">
            <span className="section-index">01</span>
            <span className="about__index-line" />
          </div>
        </Reveal>

        <div className="about__kicker">
          <span className="about__cursor">$</span> whoami
        </div>

        <h2 className="about__heading">
          {HEADING_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="about__heading-word"
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
        <Reveal delay={0.15} className="about__body">
          <p>
            I'm a Computer Science graduate from the Lebanese International
            University with 5+ years of real pharmacy management experience. I
            build full-stack systems that solve real problems.
          </p>
          <p>
            Every system I've built has been designed from scratch — database
            schema, REST API, frontend UI, real-time features, AI integration,
            and cloud deployment. I think like a product engineer, not just a
            coder.
          </p>
        </Reveal>

        <div className="about__stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.25 + i * 0.1} className="about__stat-card">
              <StatCounter value={s.value} suffix={s.suffix} />
              <div className="about__stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.6} className="about__annotation">
          // 0 tutorials followed. 0 templates cloned.
        </Reveal>
      </div>
    </div>
  );
}
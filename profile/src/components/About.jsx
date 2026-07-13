import Reveal from "./Reveal";

export default function About() {
  return (
    <div id="about" className="section about">
      <Reveal>
        <div className="section-index">01</div>
        <div className="about__heading">Not tutorial projects. Not clones.</div>
      </Reveal>
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
        <div className="about__stats">
          <div>
            <div className="about__stat-num">6</div>
            <div className="about__stat-label">systems built end-to-end</div>
          </div>
          <div>
            <div className="about__stat-num">5</div>
            <div className="about__stat-label">live in production</div>
          </div>
          <div>
            <div className="about__stat-num">5+</div>
            <div className="about__stat-label">years managing a pharmacy</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

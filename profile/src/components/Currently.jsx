import Reveal from "./Reveal";
import { currently } from "../data";

export default function Currently() {
  return (
    <div className="section-band">
      <div className="section about" style={{ padding: "110px 48px" }}>
        <Reveal>
          <div className="section-index">05</div>
          <div className="about__heading">Currently</div>
        </Reveal>
        <Reveal delay={0.15} className="currently__list">
          {currently.map((c) => (
            <div key={c} className="currently__item">
              <span className="currently__arrow">→</span>
              <span className="currently__text">{c}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

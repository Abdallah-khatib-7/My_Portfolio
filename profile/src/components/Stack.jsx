import Reveal from "./Reveal";
import { stackItems } from "../data";

export default function Stack() {
  return (
    <div id="stack" className="section-band">
      <div className="section" style={{ padding: "110px 48px" }}>
        <Reveal style={{ display: "flex", alignItems: "baseline", gap: 24 }}>
          <div className="section-index">03</div>
          <div className="section-title">Tech stack</div>
        </Reveal>
        <div className="stack__grid">
          {stackItems.map((s, i) => (
            <Reveal key={s.name} delay={(i % 6) * 0.06}>
              <div className="stack-item">
                {s.icon && (
                  <div
                    role="img"
                    aria-label={s.name}
                    className="stack-item__icon"
                    style={{
                      backgroundImage: `url("${s.icon}")`,
                      filter: s.invert ? "invert(1)" : "none",
                    }}
                  />
                )}
                {s.glyph && <div className="stack-item__glyph">{s.glyph}</div>}
                <div className="stack-item__name">{s.name}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

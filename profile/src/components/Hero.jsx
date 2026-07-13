import { useTypewriter } from "../hooks/useTypewriter";
import { typedLines } from "../data";
import photo from "../assets/profile-picture.jpg";
import { CV_HREF } from "./Nav";

const WA_MESSAGE = "Hi Abdallah! I saw your portfolio and I'd like to talk.";
const WA_HREF = "https://wa.me/9613806359?text=" + encodeURIComponent(WA_MESSAGE);

export default function Hero() {
  const typed = useTypewriter(typedLines);

  return (
    <div id="top" className="hero">
      <div className="hero__photo-wrap">
        <img src={photo} alt="Abdallah Khatib" className="hero__photo" />
      </div>
      <div className="hero__blob" />
      <div className="hero__content">
        <div className="hero__eyebrow">Full-Stack Developer — Beirut, Lebanon</div>
        <div className="hero__title">
          From schema
          <br />
           to deployment<span>.</span>
        </div>
        <div className="hero__typed">
          &gt; {typed}
          <span className="hero__cursor">▌</span>
        </div>
        <div className="hero__ctas">
          <a href={CV_HREF} download="Abdallah-Khatib-CV.pdf" className="btn-primary">
            Download CV ↓
          </a>
          <a href={WA_HREF} target="_blank" rel="noreferrer" className="btn-outline">
            <span className="btn-outline__dot" />
            WhatsApp me →
          </a>
        </div>
      </div>
      <div className="hero__scroll-hint">SCROLL ↓</div>
    </div>
  );
}

export { WA_HREF };

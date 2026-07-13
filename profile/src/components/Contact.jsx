import Reveal from "./Reveal";
import { WA_HREF } from "./Hero";

export default function Contact() {
  return (
    <div id="contact" className="contact">
      <div className="contact__blob" />
      <div className="contact__inner">
        <Reveal className="contact__eyebrow">Open to full-stack opportunities</Reveal>
        <Reveal className="contact__title">
          Let's build something
          <br />
          real<span>.</span>
        </Reveal>
        <Reveal className="contact__ctas">
          <a href={WA_HREF} target="_blank" rel="noreferrer" className="btn-whatsapp">
            WhatsApp — reply fast →
          </a>
          <a href="mailto:abdallah.khatib2003@gmail.com" className="btn-outline">
            Email me
          </a>
          <a
            href="https://linkedin.com/in/abdallah-khatib"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            LinkedIn ↗
          </a>
        </Reveal>
        <Reveal className="contact__footer">
          <span>"It works on my machine" has never once shipped to production.</span>
          <span>Built in Lebanon 🇱🇧 · Available worldwide</span>
        </Reveal>
      </div>
    </div>
  );
}

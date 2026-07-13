const CV_HREF = "/Abdallah-Khatib-CV.pdf";

export default function Nav() {
  return (
    <div className="nav">
      <a href="#top" className="nav__logo">
        AK<span style={{ color: "var(--accent)" }}>.</span>
      </a>
      <div className="nav__links">
        <a href="#about" className="nav__link">
          About
        </a>
        <a href="#work" className="nav__link">
          Work
        </a>
        <a href="#stack" className="nav__link">
          Stack
        </a>
        <a href="#github" className="nav__link">
          GitHub
        </a>
        <a href="#contact" className="nav__link">
          Contact
        </a>
        <a href={CV_HREF} download="Abdallah-Khatib-CV.pdf" className="nav__cta">
          Download CV ↓
        </a>
      </div>
    </div>
  );
}

export { CV_HREF };

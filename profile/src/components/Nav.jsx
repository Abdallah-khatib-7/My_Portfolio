const CV_HREF = "/Abdallah-Khatib-CV.pdf";

const NAV_LINK =
  "text-muted transition-colors duration-200 hover:text-fg tablet:hidden";

export default function Nav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-[18px] px-12 bg-[rgba(14,12,10,0.8)] backdrop-blur-[14px] border-b border-border tablet:py-4 tablet:px-6">
      <a
        href="#top"
        className="font-display text-[20px] font-extrabold tracking-[-0.5px] text-fg"
      >
        AK<span className="text-accent">.</span>
      </a>
      <div className="flex gap-8 items-center font-sans text-[14px] font-medium tablet:gap-4 tablet:text-[12.5px]">
        <a href="#about" className={NAV_LINK}>
          About
        </a>
        <a href="#work" className={NAV_LINK}>
          Work
        </a>
        <a href="#stack" className={NAV_LINK}>
          Stack
        </a>
        <a href="#github" className={NAV_LINK}>
          GitHub
        </a>
        <a href="#contact" className={NAV_LINK}>
          Contact
        </a>
        <a
          href={CV_HREF}
          download="Abdallah-Khatib-CV.pdf"
          className="bg-accent text-bg font-semibold py-[10px] px-5 rounded-full transition-colors duration-200 hover:bg-fg hover:text-bg"
        >
          Download CV ↓
        </a>
      </div>
    </div>
  );
}

export { CV_HREF };

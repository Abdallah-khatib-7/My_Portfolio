import { useState } from "react";

const CV_HREF = "/Abdallah-Khatib-CV.pdf";

const LINKS = [
  ["#about", "About"],
  ["#work", "Work"],
  ["#stack", "Stack"],
  ["#github", "GitHub"],
  ["#contact", "Contact"],
];

const NAV_LINK =
  "text-muted transition-colors duration-200 hover:text-fg tablet:hidden";

const MOBILE_NAV_LINK =
  "text-muted font-sans text-[15px] font-medium py-3 border-b border-border last:border-b-0 transition-colors duration-200 hover:text-fg";

const BAR = "block w-[18px] h-[2px] bg-fg rounded-full transition-transform duration-200";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-[18px] px-12 bg-[rgba(14,12,10,0.8)] backdrop-blur-[14px] border-b border-border tablet:py-4 tablet:px-6">
      <a
        href="#top"
        className="font-display text-[20px] font-extrabold tracking-[-0.5px] text-fg"
      >
        AK<span className="text-accent">.</span>
      </a>
      <div className="flex gap-8 items-center font-sans text-[14px] font-medium tablet:gap-4 tablet:text-[12.5px]">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} className={NAV_LINK}>
            {label}
          </a>
        ))}
        <a
          href={CV_HREF}
          download="Abdallah-Khatib-CV.pdf"
          className="bg-accent text-bg font-semibold py-[10px] px-5 rounded-full transition-colors duration-200 hover:bg-fg hover:text-bg"
        >
          Download CV ↓
        </a>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="hidden tablet:flex flex-col items-center justify-center gap-[4px] w-9 h-9 -mr-1 cursor-pointer bg-transparent border-0 p-0"
        >
          <span className={`${BAR} ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`${BAR} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`${BAR} ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown — only exists at tablet widths; the desktop row above
          already shows these links. Closes on any link tap. */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="hidden tablet:flex absolute top-full left-0 right-0 flex-col px-6 py-2 bg-[rgba(14,12,10,0.95)] backdrop-blur-[14px] border-b border-border font-sans"
        >
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className={MOBILE_NAV_LINK}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export { CV_HREF };

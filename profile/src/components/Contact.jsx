import Reveal from "./Reveal";
import { WA_HREF } from "./Hero";

const BTN_OUTLINE =
  "border border-border-2 text-fg font-sans text-[16px] font-semibold py-4 px-8 rounded-full inline-flex items-center gap-0 transition-[border-color,transform] duration-200 hover:border-accent hover:-translate-y-[3px] hover:text-fg";

// Gmail's compose URL rather than a mailto: — mailto: hands off to the OS, which
// shows an app-picker dialog (or nothing at all) when no default mail client is set.
export const MAIL_HREF =
  "https://mail.google.com/mail/?view=cm&fs=1&to=abdallah.khatib2003@gmail.com&su=Portfolio%20Inquiry";

export default function Contact() {
  return (
    <div id="contact" className="relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(239,127,63,0.12),transparent_70%)] bottom-[-200px] right-[-100px] animate-[drift_11s_ease-in-out_infinite]" />
      <div className="relative max-w-[1200px] mx-auto pt-[150px] px-12 pb-[60px] text-center mobile:pt-[120px] mobile:px-6 mobile:pb-[50px]">
        <Reveal className="text-accent font-sans text-[13px] font-semibold tracking-[4px] uppercase">
          Open to full-stack opportunities
        </Reveal>
        <Reveal className="font-display text-[clamp(48px,6vw,84px)] font-extrabold leading-none tracking-[-2.5px] mt-[22px]">
          Let's build something
          <br />
          real<span className="text-accent">.</span>
        </Reveal>
        <Reveal className="flex gap-4 justify-center mt-11 flex-wrap">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noreferrer"
            className="bg-whatsapp text-bg font-sans text-[16px] font-semibold py-4 px-8 rounded-full inline-flex items-center gap-[10px] transition-transform duration-200 hover:-translate-y-[3px] hover:text-bg"
          >
            WhatsApp — reply fast →
          </a>
          <a href={MAIL_HREF} target="_blank" rel="noopener noreferrer" className={BTN_OUTLINE}>
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/abdallah-khatib-8b0499349"
            target="_blank"
            rel="noreferrer"
            className={BTN_OUTLINE}
          >
            LinkedIn ↗
          </a>
        </Reveal>
        <Reveal className="mt-[110px] border-t border-border pt-7 flex justify-between items-center gap-4 flex-wrap text-muted-3 font-mono text-[13px] font-medium mobile:justify-center mobile:text-center">
          <span>"It works on my machine" has never once shipped to production.</span>
          <span>Built in Lebanon 🇱🇧 · Available worldwide</span>
        </Reveal>
      </div>
    </div>
  );
}

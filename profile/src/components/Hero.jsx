import { useTypewriter } from "../hooks/useTypewriter";
import { typedLines } from "../data";
import photo from "../assets/profile-picture.jpg";
import { CV_HREF } from "./Nav";

const WA_MESSAGE = "Hi Abdallah! I saw your portfolio and I'd like to talk.";
const WA_HREF = "https://wa.me/9613806359?text=" + encodeURIComponent(WA_MESSAGE);

export default function Hero() {
  const typed = useTypewriter(typedLines);

  return (
    <div
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute right-[-60px] top-0 bottom-0 w-[52vw] animate-[photoIn_1.6s_cubic-bezier(0.2,0.7,0.2,1)_both] mobile:w-full mobile:opacity-25">
        <img
          src={photo}
          alt="Abdallah Khatib"
          className="w-full h-full object-cover object-top [mask-image:linear-gradient(90deg,transparent,black_45%)] [-webkit-mask-image:linear-gradient(90deg,transparent,black_45%)]"
        />
      </div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(239,127,63,0.14),transparent_70%)] top-[20%] left-[-120px] animate-[drift_9s_ease-in-out_infinite]" />
      <div className="relative pt-[140px] px-12 pb-[100px] max-w-[720px] mobile:pt-[130px] mobile:px-6 mobile:pb-[90px]">
        <div className="text-accent font-sans text-[13px] font-semibold tracking-[4px] uppercase animate-[heroIn_0.8s_0.1s_both]">
          Full-Stack Developer — Beirut, Lebanon
        </div>
        <div className="font-display text-[clamp(56px,7.5vw,104px)] font-extrabold leading-[0.98] tracking-[-3px] mt-6 animate-[heroIn_0.8s_0.25s_both]">
          From schema
          <br />
           to deployment<span className="text-accent">.</span>
        </div>
        <div className="mt-[26px] font-mono text-[20px] font-medium text-muted h-[28px] animate-[heroIn_0.8s_0.45s_both]">
          &gt; {typed}
          <span className="text-accent animate-[blink_1s_step-end_infinite]">▌</span>
        </div>
        <div className="flex gap-[14px] mt-[38px] flex-wrap animate-[heroIn_0.8s_0.6s_both]">
          <a
            href={CV_HREF}
            download="Abdallah-Khatib-CV.pdf"
            className="bg-accent text-bg font-sans text-[15px] font-semibold py-[15px] px-7 rounded-full inline-block transition-transform duration-200 hover:-translate-y-[3px] hover:text-bg"
          >
            Download CV ↓
          </a>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noreferrer"
            className="border border-border-2 text-fg font-sans text-[15px] font-semibold py-[15px] px-7 rounded-full inline-flex items-center gap-[10px] transition-[border-color,transform] duration-200 hover:border-whatsapp hover:-translate-y-[3px] hover:text-fg"
          >
            <span className="w-[9px] h-[9px] rounded-full bg-whatsapp inline-block" />
            WhatsApp me →
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-12 text-muted-3 font-mono text-[12px] font-medium tracking-[2px] mobile:left-6">
        SCROLL ↓
      </div>
    </div>
  );
}

export { WA_HREF };

import Reveal from "./Reveal";
import { currently } from "../data";

export default function Currently() {
  return (
    <div className="bg-bg-alt border-t border-b border-border">
      <div className="max-w-[1200px] mx-auto py-[110px] px-12 grid grid-cols-[1fr_1.4fr] gap-20 tablet:grid-cols-1 tablet:gap-10">
        <Reveal>
          <div className="text-accent font-mono text-[15px] font-bold">05</div>
          <div className="font-display text-[44px] font-extrabold leading-[1.05] tracking-[-1.5px] mt-[14px]">
            Currently
          </div>
        </Reveal>
        <Reveal delay={0.15} className="flex flex-col">
          {currently.map((c) => (
            <div
              key={c}
              className="flex gap-[18px] items-baseline py-[18px] border-b border-border"
            >
              <span className="text-accent font-mono text-[14px] font-medium flex-none">
                →
              </span>
              <span className="font-sans text-[17px] font-normal leading-[1.6] text-body">
                {c}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

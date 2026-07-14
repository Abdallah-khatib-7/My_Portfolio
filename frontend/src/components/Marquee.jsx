import { marqueeItems } from "../data";

function Track() {
  return (
    <>
      {marqueeItems.map((t) => (
        <span key={t}>
          {t} <span className="text-accent ml-11">✦</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="border-t border-b border-border py-[22px] overflow-hidden bg-bg-alt">
      <div className="flex gap-14 w-max animate-[marquee_30s_linear_infinite] font-mono text-[15px] font-semibold text-muted-2 whitespace-nowrap">
        <Track />
        <Track />
      </div>
    </div>
  );
}

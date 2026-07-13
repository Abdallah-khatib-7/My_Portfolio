import { marqueeItems } from "../data";

function Track() {
  return (
    <>
      {marqueeItems.map((t) => (
        <span key={t}>
          {t} <span className="marquee__star">✦</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        <Track />
        <Track />
      </div>
    </div>
  );
}

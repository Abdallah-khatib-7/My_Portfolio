import { useEffect, useRef, useState } from "react";

export function useTypewriter(lines, { startDelay = 900 } = {}) {
  const [typed, setTyped] = useState("");
  const stateRef = useRef({ lineIndex: 0, charIndex: 0, deleting: false });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const s = stateRef.current;
      const line = lines[s.lineIndex];

      if (!s.deleting) {
        s.charIndex++;
        if (s.charIndex >= line.length) {
          s.deleting = true;
          timeoutRef.current = setTimeout(tick, 1800);
        } else {
          timeoutRef.current = setTimeout(tick, 55);
        }
      } else {
        s.charIndex--;
        if (s.charIndex <= 0) {
          s.deleting = false;
          s.lineIndex = (s.lineIndex + 1) % lines.length;
          timeoutRef.current = setTimeout(tick, 500);
        } else {
          timeoutRef.current = setTimeout(tick, 28);
        }
      }
      setTyped(line.slice(0, s.charIndex));
    };

    timeoutRef.current = setTimeout(tick, startDelay);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return typed;
}

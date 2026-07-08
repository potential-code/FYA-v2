"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ported from Landing.dc.html's hero stat count-up: cubic ease-out over ~1.6s,
 * starting after a 700ms delay, driven by requestAnimationFrame.
 */
export function useCountUp(target: number, { delay = 700, duration = 1600 } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start - delay;
      const p = Math.min(1, Math.max(0, elapsed / duration));
      const eased = elapsed < 0 ? 0 : 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

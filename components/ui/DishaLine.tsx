"use client";
import { useEffect, useRef } from "react";

/**
 * The "Disha line": a gold hairline path that draws itself once when it enters the viewport.
 * Purely decorative (aria-hidden). Reduced-motion users see it fully drawn.
 */
export function DishaLine({
  d,
  viewBox = "0 0 100 100",
  className = "",
  preserveAspectRatio = "none",
}: {
  d: string | string[];
  viewBox?: string;
  className?: string;
  preserveAspectRatio?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const ds = Array.isArray(d) ? d : [d];
  return (
    <svg ref={ref} aria-hidden="true" viewBox={viewBox} preserveAspectRatio={preserveAspectRatio} className={`draw pointer-events-none ${className}`}>
      {ds.map((p, i) => (
        <path key={i} d={p} pathLength={1} className="disha-path" />
      ))}
    </svg>
  );
}

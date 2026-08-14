import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LazyBoundary({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Instantly refresh GSAP ScrollTrigger when lazy section mounts
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, []);


  return (
    <div ref={containerRef} className="lazy-section-boundary">
      {children}
    </div>
  );
}

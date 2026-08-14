import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LazyBoundary({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // When lazy-loaded component mounts into DOM, refresh GSAP ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="lazy-section-boundary">
      {children}
    </div>
  );
}

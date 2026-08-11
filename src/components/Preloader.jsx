import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [bootStep, setBootStep] = useState(0);
  const containerRef = useRef(null);

  const logs = [
    { title: "INITIALIZING SYSTEM...", items: [] },
    { title: "LOADING COMPONENTS...", items: ["REACT ✓", "NODE ✓", "MONGODB ✓", "API ✓"] },
    { title: "SYSTEM READY", items: ["ALL MODULES LOADED", "BOOT COMPLETE"] }
  ];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setBootStep(1), 350);
    const t2 = setTimeout(() => setBootStep(2), 900);
    const t3 = setTimeout(() => {
      if (!containerRef.current) return;
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = 'none';
          onComplete();
        }
      });
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="dev-preloader">
      <div className="dev-preloader__window">
        <div className="dev-preloader__header">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
          <span className="dev-preloader__title">system_boot.exe — 64bit</span>
        </div>
        <div className="dev-preloader__body">
          <div className="dev-preloader__log">
            <span className="dev-preloader__prompt">&gt;</span>
            <span className="dev-preloader__status">{logs[bootStep].title}</span>
          </div>

          <div className="dev-preloader__items">
            {logs[bootStep].items.map((item, idx) => (
              <span key={idx} className="dev-preloader__item">{item}</span>
            ))}
          </div>

          <div className="dev-preloader__progress-track">
            <div 
              className="dev-preloader__progress-bar" 
              style={{ width: `${(bootStep + 1) * 33.33}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

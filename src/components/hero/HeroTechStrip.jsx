import React, { useRef, useEffect } from 'react';

export default function HeroTechStrip({ scrollVelocity, setCursor }) {
  const g1Ref = useRef(null);
  const g2Ref = useRef(null);

  const techItems = ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "REST API", "JAVASCRIPT", "C++ DSA", "TAILWIND", "BOOTSTRAP 5"];

  useEffect(() => {
    if (!g1Ref.current || !g2Ref.current) return;
    const absVel = Math.abs(scrollVelocity);
    const speedBoost = Math.min(absVel * 0.04, 4);
    const targetDuration = Math.max(10, 24 - speedBoost * 3.5);
    g1Ref.current.style.animationDuration = `${targetDuration}s`;
    g2Ref.current.style.animationDuration = `${targetDuration}s`;
  }, [scrollVelocity]);

  return (
    <div 
      className="hero-tech-strip"
      onMouseEnter={() => setCursor('hover', 'STACK')}
      onMouseLeave={() => setCursor('default')}
    >
      <div className="hero-tech-strip__track">
        <div ref={g1Ref} className="hero-tech-strip__group">
          {techItems.map((tech, idx) => (
            <React.Fragment key={idx}>
              <span className="hero-tech-strip__item">{tech}</span>
              <span className="hero-tech-strip__sep">/</span>
            </React.Fragment>
          ))}
        </div>

        <div ref={g2Ref} className="hero-tech-strip__group" aria-hidden="true">
          {techItems.map((tech, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span className="hero-tech-strip__item">{tech}</span>
              <span className="hero-tech-strip__sep">/</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useEffect } from 'react';

export default function Marquee({ technologies, scrollVelocity, setCursor }) {
  const group1Ref = useRef(null);
  const group2Ref = useRef(null);

  useEffect(() => {
    if (!group1Ref.current || !group2Ref.current) return;
    
    // Dynamically adjust marquee speed based on scroll velocity
    const absVel = Math.abs(scrollVelocity);
    const speedBoost = Math.min(absVel * 0.04, 4);
    const baseDuration = 30; // seconds
    const targetDuration = Math.max(10, baseDuration - speedBoost * 4);

    group1Ref.current.style.animationDuration = `${targetDuration}s`;
    group2Ref.current.style.animationDuration = `${targetDuration}s`;
  }, [scrollVelocity]);

  return (
    <div 
      className="marquee"
      onMouseEnter={() => setCursor('view', 'TECH')}
      onMouseLeave={() => setCursor('default')}
    >
      <div className="marquee__track">
        {/* Primary Group */}
        <div ref={group1Ref} className="marquee__group">
          {technologies.map((tech, idx) => (
            <React.Fragment key={idx}>
              <span>{tech}</span>
              <i aria-hidden="true">&#10022;</i>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate Group for Seamless Pixel-Perfect Infinite Loop */}
        <div ref={group2Ref} className="marquee__group" aria-hidden="true">
          {technologies.map((tech, idx) => (
            <React.Fragment key={`dup-${idx}`}>
              <span>{tech}</span>
              <i aria-hidden="true">&#10022;</i>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function HeroTypography({ mousePos, setCursor }) {
  const containerRef = useRef(null);
  const accentRef = useRef(null);
  const accentOffsetRef = useRef({ x: 0, y: 0 });

  // Initial SplitType character animation
  useEffect(() => {
    if (!containerRef.current) return;

    const split = new SplitType('.hero-typo__text', { types: 'words, chars' });

    gsap.fromTo(split.chars,
      { y: 50, opacity: 0, rotateX: -20 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        duration: 1,
        ease: 'power4.out',
        clearProps: 'transform,opacity'
      }
    );

    return () => split.revert();
  }, []);

  // Mouse Forcefield calculation on typography
  useEffect(() => {
    if (window.innerWidth < 768) return;

    let animationFrameId;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const animateForcefield = () => {
      if (accentRef.current) {
        const rect = accentRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.hypot(mousePos.x - centerX, mousePos.y - centerY);

        let targetX = 0;
        let targetY = 0;
        if (dist < 260) {
          const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
          const force = (260 - dist) * 0.12;
          targetX = Math.cos(angle) * force;
          targetY = Math.sin(angle) * force;
        }

        accentOffsetRef.current.x = lerp(accentOffsetRef.current.x, targetX, 0.1);
        accentOffsetRef.current.y = lerp(accentOffsetRef.current.y, targetY, 0.1);

        accentRef.current.style.transform = `translate3d(${accentOffsetRef.current.x}px, ${accentOffsetRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateForcefield);
    };

    animationFrameId = requestAnimationFrame(animateForcefield);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  return (
    <div 
      ref={containerRef} 
      className="hero-typo"
      onMouseEnter={() => setCursor('hover', 'JARIR')}
      onMouseLeave={() => setCursor('default')}
    >
      <h1 className="hero-typo__text">
        <span className="hero-typo__line hero-typo__line--1">HELLO,</span>
        <span ref={accentRef} className="hero-typo__line hero-typo__line--accent">
          I'M JARIR
        </span>
      </h1>
    </div>
  );
}

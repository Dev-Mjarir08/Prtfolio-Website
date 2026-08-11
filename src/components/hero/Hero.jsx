import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroTypography from './HeroTypography';
import HeroScene from './HeroScene';
import HeroTechStrip from './HeroTechStrip';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ data, mousePos, scrollVelocity, setCursor }) {
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.hero-typo', {
        y: -60,
        opacity: 0.3,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-lab hero-lab--centered" id="hero">
      {/* 3D Interactive Tech Network Scene */}
      <HeroScene mousePos={mousePos} scrollVelocity={scrollVelocity} />

      {/* Hero Container with Centered Layout */}
      <div ref={containerRef} className="hero-lab__container">
        {/* Main Centered Content */}
        <div className="hero-lab__centered-wrapper">
          <HeroTypography mousePos={mousePos} setCursor={setCursor} />

          <div className="hero-lab__cta-row">
            <a 
              href="#work" 
              className="btn btn--fill magnetic"
              onMouseEnter={() => setCursor('hover', 'WORK')}
              onMouseLeave={() => setCursor('default')}
            >
              <span>View Projects</span>
              <i className="btn__arrow">&#8594;</i>
            </a>
            <a 
              href="#contact" 
              className="btn btn--ghost magnetic"
              onMouseEnter={() => setCursor('hover', 'TALK')}
              onMouseLeave={() => setCursor('default')}
            >
              <span>Get In Touch</span>
            </a>
          </div>
        </div>

        {/* Bottom Technical Ticker Strip */}
        <HeroTechStrip scrollVelocity={scrollVelocity} setCursor={setCursor} />

        {/* Bottom Scroll Exploration Indicator */}
        <div className="hero-lab__bottom-bar">
          <div className="hero-lab__meta">
            <span className="hero-lab__index">01 — FULL STACK DEVELOPER</span>
            <span className="hero-lab__sep">•</span>
            <span className="hero-lab__stack">REACT / NODE / MONGODB / REST API</span>
          </div>

          <div 
            className="hero-lab__explore"
            onMouseEnter={() => setCursor('hover', 'EXPLORE')}
            onMouseLeave={() => setCursor('default')}
          >
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

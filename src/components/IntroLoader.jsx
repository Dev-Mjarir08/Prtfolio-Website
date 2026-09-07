import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IntroLoader({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const tagRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const container = containerRef.current;
    const logo = logoRef.current;
    const tag = tagRef.current;
    const frame = frameRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // Initial states
    gsap.set(container, { display: 'flex', opacity: 1 });
    gsap.set(logo, { opacity: 0, scale: 0.8, filter: 'blur(25px)' });
    gsap.set(tag, { opacity: 0, y: 15 });
    gsap.set(frame, { opacity: 0 });

    // Funky Logotype Sequence
    tl.to(frame, { opacity: 1, duration: 0.4, ease: 'power2.inOut' })
      .to(logo, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power4.out'
      }, '-=0.1')
      .to(tag, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.35')
      .to([logo, tag], {
        opacity: 0,
        scale: 1.08,
        filter: 'blur(16px)',
        duration: 0.5,
        ease: 'power3.in',
        delay: 0.35
      })
      .to(container, {
        yPercent: -100,
        duration: 0.85,
        ease: 'expo.inOut',
        onStart: () => {
          if (onComplete) onComplete();
        }
      }, '-=0.25');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      {/* Subtle architectural frame & corner marks */}
      <div
        ref={frameRef}
        className="absolute inset-8 md:inset-16 border border-white/[0.06] pointer-events-none flex flex-col justify-between p-4"
      >
        <div className="flex justify-between font-orbitron text-[9px] text-brand-dim uppercase tracking-widest font-bold italic">
          <span>SYS://BOOT</span>
          <span>DEV.2026</span>
        </div>
        <div className="flex justify-between font-orbitron text-[9px] text-brand-dim uppercase tracking-widest font-bold italic">
          <span>SURAT • GUJARAT</span>
          <span>PORTFOLIO.JM</span>
        </div>
      </div>

      <div className="relative text-center px-6 flex flex-col items-center justify-center">
        {/* Giant Orbitron Logotype MJ - Ultra Italic */}
        <div ref={logoRef} className="relative select-none flex flex-col items-center">
          {/* Subtle Ambient Behind Glow */}
          <div className="absolute inset-0 bg-accent/25 blur-[120px] rounded-full scale-150 pointer-events-none" />

          {/* Orbitron Futuristic Italic Logotype Characters - Full View Unclipped */}
          <div className="relative flex items-center justify-center tracking-tighter italic -skew-x-6 py-4  overflow-visible">
            <span className="inline-block pt-6 pb-4  font-orbitron text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black italic leading-[1.2] text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400 drop-shadow-[0_12px_40px_rgba(255,255,255,0.2)] select-none">
              M
            </span>
            <span className="inline-block pt-6 pb-4  font-orbitron text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black italic leading-[1.2] text-transparent bg-clip-text bg-gradient-to-b from-accent via-sky-300 to-cyan-400 drop-shadow-[0_0_60px_rgba(56,189,248,0.75)] select-none">
              J
            </span>
            {/* Electric Accent Dot */}
            <span className="relative flex h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5 self-end mb-6 sm:mb-8 md:mb-12 ml-1 sm:ml-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-5 md:w-5 bg-accent shadow-[0_0_20px_#38BDF8]" />
            </span>
          </div>

          {/* Orbitron Italic Monogram Tagline */}
          <div ref={tagRef} className="mt-3 flex items-center justify-center gap-4 italic">
            <span className="h-[1.5px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-accent" />
            <span className="font-orbitron text-[10px] sm:text-xs tracking-[0.45em] uppercase text-brand-muted font-bold italic">
              EST. 2026 // STUDIO
            </span>
            <span className="h-[1.5px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';
import { useLenis } from '../hooks/useLenis';
import MagneticButton from '../components/MagneticButton';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isReady = true }) {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const bgGridRef = useRef(null);
  const { scrollTo } = useLenis();

  // Dynamic continuous role fade transition
  const roles = [
    "FULL STACK DEVELOPER",
    "MERN STACK DEVELOPER",
    "ERP SOLUTIONS & REST APIS"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFade, setRoleFade] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    const interval = setInterval(() => {
      setRoleFade(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setRoleFade(true);
      }, 400);
    }, 3200);

    return () => clearInterval(interval);
  }, [isReady, roles.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hero = heroRef.current;
    const headlineLines = headlineRef.current?.querySelectorAll('.hero-line');
    const subtext = subtextRef.current;
    const meta = metaRef.current;
    const cta = ctaRef.current;
    const scrollInd = scrollIndicatorRef.current;
    const bgGrid = bgGridRef.current;

    if (!hero) return;

    // While loader is active, keep hero elements prepared and invisible
    if (!isReady) {
      gsap.set([meta, headlineLines, subtext, cta, scrollInd], { opacity: 0 });
      gsap.set(headlineLines, { y: 45, filter: 'blur(16px)' });
      return;
    }

    if (prefersReducedMotion) {
      gsap.set([meta, headlineLines, subtext, cta, scrollInd], { opacity: 1, y: 0, filter: 'none' });
      return;
    }

    // Entrance Timeline with smooth cinematic fade transitions - triggers right when loader opens!
    const tl = gsap.timeline({ delay: 0.1 });

    if (meta) {
      tl.fromTo(
        meta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (headlineLines && headlineLines.length > 0) {
      tl.fromTo(
        headlineLines,
        {
          opacity: 0,
          y: 45,
          filter: 'blur(16px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.2,
          duration: 1.3,
          ease: 'power3.out'
        },
        '-=0.3'
      );
    }

    if (subtext) {
      tl.fromTo(
        subtext,
        { opacity: 0, y: 25, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, ease: 'power3.out' },
        '-=0.6'
      );
    }

    if (cta) {
      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }

    if (scrollInd) {
      tl.fromTo(
        scrollInd,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    }

    // ScrollTrigger Exit Parallax & Fade-out Animation
    const exitTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        pin: false
      }
    });

    exitTl
      .to(headlineRef.current, { y: -90, opacity: 0, filter: 'blur(12px)', ease: 'power2.in' }, 0)
      .to(subtext, { y: -60, opacity: 0, filter: 'blur(8px)', ease: 'power2.in' }, 0)
      .to(meta, { y: -40, opacity: 0, ease: 'none' }, 0)
      .to(cta, { y: -30, opacity: 0, ease: 'none' }, 0)
      .to(bgGrid, { scale: 1.08, opacity: 0.05, ease: 'none' }, 0);

    return () => {
      tl.kill();
      exitTl.kill();
    };
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 bg-background overflow-hidden selection:bg-accent selection:text-black"
    >
      {/* Background Architectural Grid & Subtle Radial Glow */}
      <div
        ref={bgGridRef}
        className="absolute inset-0 pointer-events-none noise-overlay opacity-20"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Metadata Bar */}
      <div ref={metaRef} className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-text font-bold">
            {personalInfo.name}
          </span>
          <span className="text-brand-dim hidden sm:inline">•</span>
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold hidden sm:inline">
            {personalInfo.role}
          </span>
        </div>

        <div className="font-mono text-xs uppercase tracking-wider text-brand-muted flex items-center gap-2">
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Main Hero Headline - Centered Italic */}
      <div className="max-w-7xl mx-auto w-full my-auto py-10 flex flex-col items-center text-center">
        <div ref={headlineRef} className="space-y-1 sm:space-y-3">
          <div>
            <p className="hero-line font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-accent font-semibold mb-2 transition-all italic">
              I'm
            </p>
          </div>
          <div>
            <h1 className="hero-line text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display font-black tracking-tight text-brand-text uppercase leading-[0.88] transition-all italic -skew-x-3">
              JARIR
            </h1>
          </div>
          <div>
            <h1 className="hero-line text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 uppercase leading-[0.88] flex items-baseline justify-center gap-2 transition-all italic -skew-x-3">
              MULTANI
            </h1>
          </div>
        </div>

        {/* Supporting subtext & Dynamic Role Fade - Italic */}
        <div ref={subtextRef} className="mt-8 sm:mt-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="h-7 flex items-center justify-center mb-3 overflow-hidden">
            <p
              className={`font-mono text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold italic transition-all duration-400 ease-in-out ${roleFade ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-2 blur-[4px]'
                }`}
            >
              {roles[roleIndex]}
            </p>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-brand-muted font-light leading-relaxed max-w-xl italic">
            Building responsive, scalable web applications and ERP solutions using the MERN stack.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#work');
            }}
            variant="primary"
            icon={<ArrowUpRight size={16} />}
          >
            <span className="italic">VIEW MY WORK</span>
          </MagneticButton>

          <MagneticButton
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
            variant="secondary"
          >
            <span className="italic">LET'S CONNECT</span>
          </MagneticButton>
        </div>
      </div>

      {/* Bottom Exploration Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-4 text-brand-dim font-mono text-[11px] uppercase tracking-widest"
      >
        <div className="flex items-center gap-2">
          <span>COORDINATES</span>
          <span className="text-brand-muted">{personalInfo.coordinates}</span>
        </div>

        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#about');
          }}
          className="flex items-center gap-2 text-brand-muted hover:text-accent transition-colors duration-300 group py-1"
        >
          <span className="group-hover:tracking-[0.2em] transition-all duration-300">SCROLL TO EXPLORE</span>
          <ArrowDown size={14} className="group-hover:translate-y-1.5 group-hover:scale-125 transition-transform duration-300 text-accent" />
        </a>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coreStrengths } from '../data/portfolioData';
import { Check, Shield, Database, Users, Code2, GitBranch, Server } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const strengthsRef = useRef(null);

  const statement = "Full Stack Developer focused on building scalable web applications, ERP solutions, and reliable software systems.";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const words = wordsContainerRef.current?.querySelectorAll('.reveal-word');
    const strengths = strengthsRef.current?.querySelectorAll('.strength-card');

    // Word illumination on scroll
    if (words && words.length > 0) {
      gsap.fromTo(
        words,
        { opacity: 0.2, color: '#444444' },
        {
          opacity: 1,
          color: '#F5F5F5',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: wordsContainerRef.current,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.5
          }
        }
      );
    }

    // Strengths cards stagger
    if (strengths && strengths.length > 0) {
      gsap.fromTo(
        strengths,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: strengthsRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  const icons = [
    <Server className="text-accent" size={20} />,
    <Shield className="text-accent" size={20} />,
    <Database className="text-accent" size={20} />,
    <Code2 className="text-accent" size={20} />,
    <Users className="text-accent" size={20} />,
    <GitBranch className="text-accent" size={20} />
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-surface border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            01 / PHILOSOPHY
          </span>
          <div className="h-[1px] w-12 bg-accent/40" />
        </div>

        {/* Section Title */}
        <div className="mb-14">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-brand-dim mb-4">
            ABOUT ME
          </h2>

          {/* Large Editorial Statement with Scroll Word Illumination */}
          <div ref={wordsContainerRef} className="max-w-5xl">
            <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight md:leading-tight">
              {statement.split(' ').map((word, idx) => (
                <span
                  key={idx}
                  className="reveal-word inline-block mr-2.5 sm:mr-3.5 transition-colors"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* Supporting Pillars & Core Strengths */}
        <div className="mt-20">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-muted font-semibold">
              CORE CAPABILITIES & ENGINEERING PRINCIPLES
            </h3>
            <span className="font-mono text-xs text-brand-dim hidden sm:inline">
              MERN STACK • SCALABILITY • CLEAN CODE
            </span>
          </div>

          <div ref={strengthsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreStrengths.map((strength, index) => (
              <div
                key={index}
                className="strength-card group relative p-6 sm:p-7 rounded-xl bg-surface-card border border-white/[0.06] hover:border-accent/50 hover:bg-surface-elevated/90 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Laser top edge beam expansion */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent via-sky-300 to-accent group-hover:w-full transition-all duration-500 rounded-t-xl shadow-[0_0_12px_#38BDF8]" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-accent group-hover:bg-accent/15 group-hover:text-accent group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-all duration-300">
                      {icons[index % icons.length]}
                    </div>
                    <span className="font-mono text-xs text-brand-dim font-bold group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="text-lg font-heading font-semibold text-brand-text group-hover:text-accent transition-colors">
                    {strength.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {strength.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04] group-hover:border-accent/20 flex items-center justify-between text-[11px] font-mono text-brand-dim transition-colors">
                  <span className="group-hover:text-brand-text transition-colors">PRODUCTION TESTED</span>
                  <Check size={14} className="text-accent group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

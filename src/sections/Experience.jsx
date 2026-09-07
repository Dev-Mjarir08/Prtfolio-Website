import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../data/portfolioData';
import { Calendar, MapPin, CheckCircle, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-surface border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              03 / CAREER JOURNEY
            </span>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <span className="font-mono text-xs text-brand-dim uppercase tracking-wider hidden sm:inline">
            PROFESSIONAL TIMELINE
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-text">
            EXPERIENCE<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 font-mono text-xs sm:text-sm text-brand-muted max-w-xl">
            Track record of full-stack development, team leadership in enterprise systems, and modular architecture.
          </p>
        </div>

        {/* Editorial Timeline Items */}
        <div className="relative border-l border-white/[0.08] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-16">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              ref={(el) => (itemsRef.current[idx] = el)}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent/60 flex items-center justify-center group-hover:scale-150 group-hover:border-accent group-hover:shadow-[0_0_15px_#38BDF8] group-hover:bg-accent/20 transition-all duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
              </div>

              {/* Experience Card */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-surface-card border border-white/[0.06] hover:border-accent/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.12)] group-hover:translate-x-2 transition-all duration-300 space-y-6 overflow-hidden">
                {/* Cyber Left Accent Line on Hover */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#38BDF8] transition-opacity duration-300" />

                {/* Header Info */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                        EXPERIENCE {exp.index}
                      </span>
                      {exp.highlightBadge && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-accent/15 text-accent border border-accent/30 flex items-center gap-1.5 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-all">
                          <Users size={12} />
                          {exp.highlightBadge}
                        </span>
                      )}
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] text-brand-muted border border-white/[0.08]">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold uppercase text-brand-text group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                      {exp.role}
                    </h3>

                    <p className="text-sm sm:text-base font-heading font-semibold text-brand-text/90 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end font-mono text-xs text-brand-dim space-y-1">
                    <div className="flex items-center gap-1.5 text-brand-muted">
                      <Calendar size={13} className="text-accent" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Main Description */}
                <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {exp.points.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-accent/30 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <CheckCircle size={15} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-brand-muted leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, certifications } from '../data/portfolioData';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);
  const eduRef = useRef([]);
  const certRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    if (eduRef.current.length > 0) {
      gsap.fromTo(
        eduRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.edu-grid'),
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (certRef.current.length > 0) {
      gsap.fromTo(
        certRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.cert-grid'),
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-surface border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              05 / CREDENTIALS & ACADEMICS
            </span>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <span className="font-mono text-xs text-brand-dim uppercase tracking-wider hidden sm:inline">
            CONTINUOUS LEARNING
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Education */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-brand-dim mb-3">
                FOUNDATIONAL TRAINING
              </h2>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-brand-text">
                EDUCATION<span className="text-accent">.</span>
              </h3>
            </div>

            <div className="edu-grid space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  ref={(el) => (eduRef.current[idx] = el)}
                  className="group p-6 sm:p-7 rounded-2xl bg-surface-card border border-white/[0.06] hover:border-accent/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.1)] hover:-translate-y-1 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-white/[0.04] pb-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-accent">
                        {edu.type}
                      </span>
                      <h4 className="text-lg font-heading font-bold text-brand-text uppercase mt-1 group-hover:text-accent transition-colors">
                        {edu.program}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-brand-dim shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-brand-muted font-medium">
                    {edu.institution}
                  </p>

                  <p className="text-xs text-brand-dim leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-brand-dim mb-3">
                ACCREDITATIONS
              </h2>
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold uppercase tracking-tight text-brand-text">
                CERTIFICATIONS<span className="text-accent">.</span>
              </h3>
            </div>

            <div className="cert-grid space-y-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  ref={(el) => (certRef.current[idx] = el)}
                  className="group relative overflow-hidden p-5 sm:p-6 rounded-xl bg-surface-card border border-white/[0.06] hover:border-accent/60 hover:bg-surface-elevated hover:shadow-[0_0_25px_rgba(56,189,248,0.12)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-4"
                >
                  <span className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 pointer-events-none" />

                  <div className="flex items-start gap-3.5 relative z-10">
                    <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-accent group-hover:bg-accent/15 group-hover:border-accent/40 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 mt-0.5 shadow-sm">
                      <Award size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-heading font-semibold text-brand-text group-hover:text-accent transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-xs text-brand-muted mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 relative z-10">
                    <span className="font-mono text-[11px] text-brand-dim block">
                      {cert.date}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-accent px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] group-hover:border-accent/30 inline-block mt-1 transition-colors">
                      {cert.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

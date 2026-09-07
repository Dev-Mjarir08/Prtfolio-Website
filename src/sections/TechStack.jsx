import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techStack, skillsEditorial } from '../data/portfolioData';
import { Code, Server, Database, Terminal, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef(null);
  const categoriesRef = useRef([]);
  const editorialRef = useRef([]);

  const categoryIcons = [
    <Code size={18} className="text-accent" />,
    <Server size={18} className="text-accent" />,
    <Database size={18} className="text-accent" />,
    <Terminal size={18} className="text-accent" />,
    <Cpu size={18} className="text-accent" />
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    // Stagger categories
    if (categoriesRef.current.length > 0) {
      gsap.fromTo(
        categoriesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.tech-categories-grid'),
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Editorial layout reveal
    if (editorialRef.current.length > 0) {
      gsap.fromTo(
        editorialRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.editorial-skills-grid'),
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-background border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              04 / TECHNICAL ECOSYSTEM
            </span>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <span className="font-mono text-xs text-brand-dim uppercase tracking-wider hidden sm:inline">
            CORE PROFICIENCIES & TOOLING
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-text">
            TOOLS I BUILD WITH<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 font-mono text-xs sm:text-sm text-brand-muted max-w-xl">
            Modern, battle-tested technologies engineered for performance, maintainability, and enterprise-grade reliability.
          </p>
        </div>

        {/* Part 1: Editorial Skills Visualization (No generic progress bars) */}
        <div className="mb-20">
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-dim mb-8 font-semibold">
            DISCIPLINE BREAKDOWN // ARCHITECTURAL PILLARS
          </h3>

          <div className="editorial-skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsEditorial.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => (editorialRef.current[idx] = el)}
                className="group relative p-7 rounded-2xl bg-surface-card border border-white/[0.06] hover:border-accent/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Cyber Corner Dot */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 shadow-[0_0_8px_#38BDF8] transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-white/[0.04] pb-3">
                    <span className="font-mono text-sm font-extrabold text-accent group-hover:shadow-[0_0_10px_rgba(56,189,248,0.5)] transition-all">
                      {item.number}
                    </span>
                    <span className="font-mono text-[10px] text-brand-dim tracking-widest uppercase group-hover:text-accent/80 transition-colors">
                      DISCIPLINE
                    </span>
                  </div>

                  <h4 className="font-display text-xl font-bold uppercase tracking-tight text-brand-text group-hover:text-accent group-hover:translate-x-1 transition-all mb-4">
                    {item.category}
                  </h4>

                  <div className="flex flex-col gap-2 mb-6">
                    {item.tags.map((tag, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-center justify-between font-mono text-xs text-brand-text py-1 border-b border-white/[0.03] hover:text-accent hover:pl-1 transition-all duration-200 cursor-default"
                      >
                        <span className="font-semibold">{tag}</span>
                        <span className="text-brand-dim text-[10px] group-hover:text-accent transition-colors">●</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed font-mono pt-4 border-t border-white/[0.04]">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Categorized Tech Stack Grid */}
        <div className="pt-12 border-t border-white/[0.06]">
          <h3 className="font-mono text-xs uppercase tracking-widest text-brand-dim mb-8 font-semibold">
            COMPLETE TECHNOLOGY DIRECTORY
          </h3>

          <div className="tech-categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((category, idx) => (
              <div
                key={idx}
                ref={(el) => (categoriesRef.current[idx] = el)}
                className="group/cat p-6 sm:p-7 rounded-2xl bg-surface border border-white/[0.06] hover:border-accent/40 hover:shadow-[0_0_25px_rgba(56,189,248,0.08)] transition-all duration-300 space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover/cat:border-accent/40 group-hover/cat:bg-accent/10 transition-colors">
                      {categoryIcons[idx % categoryIcons.length]}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-bold uppercase tracking-tight text-brand-text group-hover/cat:text-accent transition-colors">
                        {category.category}
                      </h4>
                      <span className="font-mono text-[10px] text-brand-dim">
                        0{idx + 1} // DOMAIN
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed">
                  {category.description}
                </p>

                {/* Skills Chips with Holographic Hover */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="group/chip flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated border border-white/[0.06] hover:border-accent hover:bg-accent/[0.08] hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 cursor-pointer select-none"
                    >
                      <span className="font-mono text-xs text-brand-text font-medium group-hover/chip:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/[0.06] text-brand-dim group-hover/chip:bg-accent group-hover/chip:text-black group-hover/chip:font-bold transition-all duration-200">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

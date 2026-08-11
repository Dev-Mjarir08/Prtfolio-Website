import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsNetwork({ skills, technologies, setCursor, preloaderComplete }) {
  const [activeTag, setActiveTag] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.skill-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [preloaderComplete]);

  return (
    <section ref={sectionRef} className="skills" id="skills">
      <div className="section-head">
        <span className="section-head__index">05</span>
        <h2 className="section-head__title reveal-text">Technical Skills</h2>
        <span className="section-head__note">Core Stack &amp; Expertise</span>
      </div>

      <div className="skills__grid">
        {skills.map((skill, idx) => {
          const isHighlighted = !activeTag || skill.tags.some(t => t.toLowerCase() === activeTag.toLowerCase());
          return (
            <div 
              key={idx}
              className={`skill-card ${!isHighlighted ? 'skill-card--dimmed' : 'skill-card--active'}`}
              onMouseEnter={() => setCursor('hover', skill.title)}
              onMouseLeave={() => setCursor('default')}
            >
              <div className="skill-card__header">
                <span className="skill-card__id">{skill.id}</span>
                <span className="skill-card__badge">Domain</span>
              </div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="skill-card__tags">
                {skill.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className={`tag-chip ${activeTag === tag ? 'is-active' : ''}`}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setActiveTag(tag);
                      setCursor('hover', tag);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setActiveTag(null);
                      setCursor('default');
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tech stack ecosystem */}
      <div className="techstack">
        <span className="techstack__label">Technologies &amp; Tools Ecosystem</span>
        <div className="techstack__row">
          {technologies.map((tech, idx) => (
            <span 
              key={idx}
              className={`tech-chip ${activeTag === tech ? 'is-active' : ''}`}
              onMouseEnter={() => {
                setActiveTag(tech);
                setCursor('hover', tech);
              }}
              onMouseLeave={() => {
                setActiveTag(null);
                setCursor('default');
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

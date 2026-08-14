import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Timeline from './Timeline';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function About({ data, setCursor }) {
  const sectionRef = useRef(null);
  const portraitRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Portrait Parallax & Clip-path Reveal
      gsap.fromTo(portraitRef.current,
        { clipPath: 'inset(10% 10% 10% 10%)', scale: 0.95 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          scale: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );

      // 2. Line-by-line text reveal using SplitType
      const splitText = new SplitType('.about__lead, .about__text', { types: 'lines' });

      gsap.from(splitText.lines, {
        opacity: 0,
        y: 15,
        stagger: 0.03,
        duration: 0.4,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 98%'
        }
      });
    }, sectionRef);


    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="section-head">
        <span className="section-head__index">02</span>
        <h2 className="section-head__title reveal-text">About Me</h2>
      </div>

      <div className="about__grid">
        <div 
          ref={portraitRef} 
          className="about__portrait"
          onMouseEnter={() => setCursor('view', 'PROFILE')}
          onMouseLeave={() => setCursor('default')}
        >
          <div className="reveal-img">
            <img 
              src="/assets/profile.png" 
              alt="Jarir Multani portrait" 

              width="896" 
              height="1200" 
              loading="lazy"
              decoding="async" 
            />
          </div>
          <span className="about__portrait-caption">Fig. 01 — Jarir Multani, Full Stack Developer</span>
        </div>

        <div ref={textRef} className="about__body">
          <p className="about__lead">{data.personalInfo.bioLead}</p>
          <p className="about__text">{data.personalInfo.bioMain}</p>
          <p className="about__text">{data.personalInfo.bioDsa}</p>

          <div className="about__signature">
            <span className="about__sign-name">{data.personalInfo.name}</span>
            <span className="about__sign-role">{data.personalInfo.role}</span>
          </div>
        </div>
      </div>

      {/* Experience & Education timeline */}
      <Timeline items={data.timeline} setCursor={setCursor} />
    </section>
  );
});


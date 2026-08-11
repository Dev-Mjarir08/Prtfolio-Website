import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import HeroCanvas from './HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ data, mousePos, scrollVelocity, setCursor }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const bgWordRef = useRef(null);
  const roleRef = useRef(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'scalable web applications',
    'React 19 interfaces',
    'RESTful MERN APIs',
    'C++ DSA logic'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    const splitTitle = new SplitType(titleRef.current, { types: 'words, chars' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(bgWordRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 1.2,
        ease: 'power3.out'
      })
      .from(splitTitle.chars, {
        y: 60,
        opacity: 0,
        rotateX: -30,
        stagger: 0.02,
        duration: 0.9,
        ease: 'power4.out',
        clearProps: 'transform,opacity'
      }, '-=0.9')
      .from('.hero__meta-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      }, '-=0.5')
      .from('.hero__centered-content > *', {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      }, '-=0.6');

      gsap.to(bgWordRef.current, {
        xPercent: -15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, heroRef);

    return () => {
      splitTitle.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero hero--centered" id="hero">
      <HeroCanvas mousePos={mousePos} scrollVelocity={scrollVelocity} />

      {/* Layer 1: Background Floating Word */}
      <div 
        ref={bgWordRef} 
        className="hero__bg-word" 
        aria-hidden="true"
      >
        <span>FULL STACK</span>
      </div>

      {/* Top Header Meta Bar */}
      <div className="hero__top-bar">
        <div className="hero__meta-item">
          <span className="tick">01 — {data.personalInfo.role}</span>
          <span className="hero__location">{data.personalInfo.location}</span>
        </div>
        <div 
          className="hero__meta-item hero__scroll"
          onMouseEnter={() => setCursor('hover', 'SCROLL')}
          onMouseLeave={() => setCursor('default')}
        >
          <span>Scroll Down</span>
          <span className="hero__scroll-line" />
        </div>
      </div>

      {/* Centered Headline & Content */}
      <div className="hero__centered-content">
        <h1 ref={titleRef} className="hero__title hero__title--centered">
          <span className="line"><span className="word">CLEAN</span> <span className="word">CODE.</span></span>
          <span className="line line--accent"><span className="word">SEAMLESS</span></span>
          <span className="line"><span className="word">USER</span> <span className="word">EXPERIENCES.</span></span>
        </h1>

        <div className="hero__role hero__role--centered">
          <span className="hero__role-static">Specializing in</span>
          <span ref={roleRef} className="hero__role-rotate">
            <span key={roleIndex} className="role-fade">
              {roles[roleIndex]}
            </span>
          </span>
        </div>

        <p className="hero__bio hero__bio--centered">{data.personalInfo.bioMain}</p>

        <div className="hero__cta-row hero__cta-row--centered">
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
    </section>
  );
}

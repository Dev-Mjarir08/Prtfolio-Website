import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default React.memo(function ProcessTimeline({ steps, setCursor }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Draw progress line as user scrolls
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true
          }
        }
      );

      // 2. Reveal process steps sequentially
      gsap.from('.process__step', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.process__list',
          start: 'top 75%'
        }
      });
    }, containerRef);


    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="process" id="process">
      <div className="section-head">
        <span className="section-head__index">06</span>
        <h2 className="section-head__title reveal-text">Development Method</h2>
      </div>

      <div className="process__line-wrapper">
        <div ref={lineRef} className="process__line-fill" />
      </div>

      <div className="process__list">
        {steps.map((step, idx) => (
          <div 
            key={idx}
            className="process__step"
            onMouseEnter={() => setCursor('view', `STEP ${step.num}`)}
            onMouseLeave={() => setCursor('default')}
          >
            <span className="process__num">{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});


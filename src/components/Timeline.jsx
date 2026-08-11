import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ items, setCursor }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.timeline__item', {
        y: 40,
        opacity: 0,
        stagger: 0.18,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="timeline" id="timeline">
      <span className="timeline__label">03 — Experience &amp; Education</span>

      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="timeline__item"
          onMouseEnter={() => setCursor('hover', item.year)}
          onMouseLeave={() => setCursor('default')}
        >
          <span className="timeline__year">{item.year}</span>
          <div className="timeline__body">
            <h3>{item.title}</h3>
            <span className="timeline__co">{item.organization}</span>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

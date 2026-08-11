import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials({ testimonials, setCursor }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.quote', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
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
    <section ref={containerRef} className="quotes" id="quotes">
      <div className="section-head">
        <span className="section-head__index">07</span>
        <h2 className="section-head__title reveal-text">Recommendations</h2>
      </div>

      <div className="quotes__grid">
        {testimonials.map((item, idx) => (
          <blockquote 
            key={idx}
            className="quote"
            onMouseEnter={() => setCursor('view', 'QUOTE')}
            onMouseLeave={() => setCursor('default')}
          >
            <p>&ldquo;{item.quote}&rdquo;</p>
            <footer>
              <span>{item.author}</span>
              <span>{item.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

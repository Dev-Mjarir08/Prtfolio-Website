import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatsCounter({ stats, setCursor }) {
  const statsRef = useRef(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const ctx = gsap.context(() => {
      const statElements = gsap.utils.toArray('.stat__num');

      statElements.forEach((el) => {
        const targetVal = parseInt(el.getAttribute('data-count'), 10);

        gsap.to(el, {
          innerText: targetVal,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            once: true
          }
        });
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={statsRef} className="stats" id="stats">
      <div className="stats__grid">
        {stats.map((item, idx) => (
          <div 
            key={idx}
            className="stat"
            onMouseEnter={() => setCursor('hover', item.suffix)}
            onMouseLeave={() => setCursor('default')}
          >
            <div className="stat__val">
              <span className="stat__num" data-count={item.count}>0</span>
              <span className="stat__plus">{item.suffix}</span>
            </div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

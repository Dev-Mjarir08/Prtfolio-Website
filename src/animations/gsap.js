import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function animateGrowthTree(scope) {
  const context = gsap.context(() => {
    gsap.utils.toArray('.grow-line').forEach((line) => {
      gsap.fromTo(
        line,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 82%',
            end: 'bottom 30%',
            scrub: 1.2
          }
        }
      );
    });

    gsap.utils.toArray('.parallax-layer').forEach((layer) => {
      const speed = Number(layer.dataset.speed || 0.16);
      gsap.to(layer, {
        yPercent: speed * -100,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, scope);

  return () => context.revert();
}

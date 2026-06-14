import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition.js';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 360, damping: 34 });
  const springY = useSpring(cursorY, { stiffness: 360, damping: 34 });
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    cursorX.set(x - 18);
    cursorY.set(y - 18);
    if (x > 0 && y > 0) {
      setTrail((items) => [{ x, y, id: `${Date.now()}-${x}` }, ...items].slice(0, 10));
    }
  }, [x, y, cursorX, cursorY]);

  useEffect(() => {
    const enter = (event) => setActive(Boolean(event.target.closest('a, button, [data-cursor]')));
    const leaveWindow = () => setHidden(true);
    const enterWindow = () => setHidden(false);

    window.addEventListener('pointerover', enter);
    window.addEventListener('pointerout', enter);
    window.addEventListener('mouseleave', leaveWindow);
    window.addEventListener('mouseenter', enterWindow);

    return () => {
      window.removeEventListener('pointerover', enter);
      window.removeEventListener('pointerout', enter);
      window.removeEventListener('mouseleave', leaveWindow);
      window.removeEventListener('mouseenter', enterWindow);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden mix-blend-screen lg:block" aria-hidden="true">
      {trail.map((item, index) => (
        <span
          key={item.id}
          className="cursor-trail"
          style={{
            left: item.x,
            top: item.y,
            opacity: Math.max(0, 0.35 - index * 0.03),
            transform: `translate(-50%, -50%) scale(${1 - index * 0.06})`
          }}
        />
      ))}
      <motion.span
        className={`custom-cursor ${active ? 'is-active' : ''} ${hidden ? 'is-hidden' : ''}`}
        style={{ x: springX, y: springY }}
      />
    </div>
  );
}

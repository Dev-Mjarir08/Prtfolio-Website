import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function MagneticButton({ href, children, variant = 'primary', className = '', onClick, type = 'button' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.2 });
  const Component = href ? motion.a : motion.button;
  const variantClass =
    variant === 'primary'
      ? 'magnetic-button magnetic-button-primary'
      : 'magnetic-button magnetic-button-secondary';

  const handleMove = (event) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left - box.width / 2) * 0.22);
    y.set((event.clientY - box.top - box.height / 2) * 0.22);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Component
      ref={ref}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${variantClass} ${className}`}
      data-cursor="magnetic"
    >
      <span>{children}</span>
    </Component>
  );
}

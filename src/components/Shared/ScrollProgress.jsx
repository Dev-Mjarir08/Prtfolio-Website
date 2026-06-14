import { motion, useSpring } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';

export function ScrollProgress() {
  const progress = useScrollProgress();
  const scaleX = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.2 });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
